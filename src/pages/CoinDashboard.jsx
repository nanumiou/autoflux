import React, { useEffect, useState, useCallback } from 'react';
import { supabase, ADMIN_UUID } from '../supabaseClient';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot
} from 'recharts';
import './CoinDashboard.css';

const CoinDashboard = () => {
    // KPI 데이터
    const [kpi, setKpi] = useState(null);
    // 가격 히스토리
    const [prices, setPrices] = useState([]);
    // 매매 신호
    const [signals, setSignals] = useState([]);
    // 로그
    const [logs, setLogs] = useState([]);
    // 로딩 상태
    const [loading, setLoading] = useState(true);
    // 에러 메시지
    const [error, setError] = useState(null);

    // 데이터 로드
    const fetchData = useCallback(async () => {
        if (!ADMIN_UUID) {
            setError('관리자 UUID가 설정되지 않았습니다.');
            setLoading(false);
            return;
        }

        try {
            // KPI 조회
            const { data: kpiData, error: kpiError } = await supabase
                .from('coin_dashboard_kpi')
                .select('*')
                .eq('admin_id', ADMIN_UUID)
                .maybeSingle();

            if (kpiError) throw kpiError;
            setKpi(kpiData);

            // 가격 히스토리 조회
            const { data: priceData, error: priceError } = await supabase
                .from('coin_dashboard_prices')
                .select('*')
                .eq('admin_id', ADMIN_UUID)
                .order('timestamp', { ascending: true })
                .limit(2000);

            if (priceError) throw priceError;
            setPrices(priceData || []);

            // 매매 신호 조회
            const { data: signalData, error: signalError } = await supabase
                .from('coin_dashboard_signals')
                .select('*')
                .eq('admin_id', ADMIN_UUID)
                .order('timestamp', { ascending: true });

            if (signalError) throw signalError;
            setSignals(signalData || []);

            // 로그 조회
            const { data: logData, error: logError } = await supabase
                .from('coin_dashboard_logs')
                .select('*')
                .eq('admin_id', ADMIN_UUID)
                .order('timestamp', { ascending: false })
                .limit(100);

            if (logError) throw logError;
            setLogs(logData || []);

            setError(null);
        } catch (err) {
            console.error('데이터 로드 오류:', err);
            setError('데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    // 초기 로드 및 Realtime 구독
    useEffect(() => {
        document.body.classList.add('dashboard-page-body');
        fetchData();

        // Realtime 구독 설정
        if (ADMIN_UUID) {
            // KPI 업데이트 구독
            const kpiChannel = supabase
                .channel('dashboard_kpi')
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'coin_dashboard_kpi',
                    filter: `admin_id=eq.${ADMIN_UUID}`
                }, (payload) => {
                    setKpi(payload.new);
                })
                .subscribe();

            // 가격 업데이트 구독
            const priceChannel = supabase
                .channel('dashboard_prices')
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'coin_dashboard_prices',
                    filter: `admin_id=eq.${ADMIN_UUID}`
                }, (payload) => {
                    setPrices(prev => [...prev.slice(-1999), payload.new]);
                })
                .subscribe();

            // 로그 업데이트 구독
            const logChannel = supabase
                .channel('dashboard_logs')
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'coin_dashboard_logs',
                    filter: `admin_id=eq.${ADMIN_UUID}`
                }, (payload) => {
                    setLogs(prev => [payload.new, ...prev.slice(0, 99)]);
                })
                .subscribe();

            // 신호 업데이트 구독
            const signalChannel = supabase
                .channel('dashboard_signals')
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'coin_dashboard_signals',
                    filter: `admin_id=eq.${ADMIN_UUID}`
                }, (payload) => {
                    setSignals(prev => [...prev, payload.new]);
                })
                .subscribe();

            // 정리
            return () => {
                document.body.classList.remove('dashboard-page-body');
                supabase.removeChannel(kpiChannel);
                supabase.removeChannel(priceChannel);
                supabase.removeChannel(logChannel);
                supabase.removeChannel(signalChannel);
            };
        }

        return () => {
            document.body.classList.remove('dashboard-page-body');
        };
    }, [fetchData]);

    // 숫자 포맷팅
    const formatNumber = (num, decimals = 0) => {
        if (num === null || num === undefined) return '-';
        return new Intl.NumberFormat('ko-KR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    };

    // 시간 포맷팅 (한국 시간대 명시)
    const formatTime = (timestamp) => {
        if (!timestamp) return '-';
        const date = new Date(timestamp);
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Seoul'
        });
    };

    // 차트 데이터 가공
    const chartData = prices.map(p => ({
        time: formatTime(p.timestamp),
        price: p.close_price,
        timestamp: new Date(p.timestamp).getTime()
    }));

    // 로딩 화면
    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>데이터를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    // 에러 화면
    if (error && !kpi) {
        return (
            <div className="dashboard-container">
                <div className="error-message">
                    <h2>⚠️ 오류 발생</h2>
                    <p>{error}</p>
                    <button onClick={fetchData} className="retry-button">다시 시도</button>
                </div>
            </div>
        );
    }

    // 봇 실행 상태 판단 (조합 방식)
    const isBotRunning = () => {
        if (kpi?.bot_status !== 'running') return false;

        // 마지막 업데이트가 5분 이내인지 확인 (비정상 종료 대비)
        if (kpi?.updated_at) {
            const lastUpdate = new Date(kpi.updated_at);
            const diffMinutes = (new Date() - lastUpdate) / 1000 / 60;
            return diffMinutes < 5;
        }
        return false;
    };

    // 봇 시작 시간 포맷팅 (한국 시간대 명시)
    const formatBotStartTime = () => {
        if (!kpi?.bot_started_at) return '-';
        const date = new Date(kpi.bot_started_at);
        return date.toLocaleString('ko-KR', {
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Seoul'
        });
    };

    return (
        <div className="dashboard-container">
            {/* 헤더 */}
            <header className="dashboard-header">
                <h1>AutoFlux 코인 대시보드</h1>
                <div className="header-info">
                    <span className="last-update">
                        매매 시작: {formatBotStartTime()}
                    </span>
                    <span className={`status-indicator ${isBotRunning() ? 'active' : 'inactive'}`}>
                        {isBotRunning() ? '● 실행중' : '○ 중지됨'}
                    </span>
                </div>
            </header>

            {/* KPI 카드 - 4x2 레이아웃 */}
            <section className="kpi-section">
                <div className="kpi-grid">
                    {/* Row 1 */}
                    <div className="kpi-card">
                        <h3>총 자산 가치</h3>
                        <p className="kpi-value">{formatNumber(kpi?.total_value)}원</p>
                    </div>
                    <div className="kpi-card">
                        <h3>주문 가능 현금</h3>
                        <p className="kpi-value">{formatNumber(kpi?.krw_balance)}원</p>
                    </div>
                    <div className="kpi-card">
                        <h3>코인 평가 금액</h3>
                        <p className="kpi-value">{formatNumber(kpi?.total_coin_value)}원</p>
                    </div>
                    <div className="kpi-card">
                        <h3>평가 손익 합계</h3>
                        <p className={`kpi-value ${(kpi?.total_evaluation_pnl || 0) >= 0 ? 'positive' : 'negative'}`}>
                            {formatNumber(kpi?.total_evaluation_pnl)}원
                        </p>
                    </div>
                    {/* Row 2 */}
                    <div className="kpi-card">
                        <h3>실현 손익</h3>
                        <p className={`kpi-value ${(kpi?.realized_profit_loss || 0) >= 0 ? 'positive' : 'negative'}`}>
                            {formatNumber(kpi?.realized_profit_loss)}원
                        </p>
                    </div>
                    <div className="kpi-card">
                        <h3>매수거래</h3>
                        <p className="kpi-value">{formatNumber(kpi?.buy_trades)} 회</p>
                    </div>
                    <div className="kpi-card">
                        <h3>매도거래</h3>
                        <p className="kpi-value">{formatNumber(kpi?.sell_trades)} 회</p>
                    </div>
                    <div className="kpi-card">
                        <h3>승률</h3>
                        <p className="kpi-value">{kpi?.win_rate?.toFixed(1) || '0.0'}%</p>
                    </div>
                </div>
            </section>

            {/* 가격 차트 */}
            <section className="chart-section">
                <h2>가격 차트</h2>
                {chartData.length > 0 ? (
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                                    interval="preserveStartEnd"
                                />
                                <YAxis
                                    stroke="#9CA3AF"
                                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                                    domain={['auto', 'auto']}
                                    tickFormatter={(v) => formatNumber(v)}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#F3F4F6'
                                    }}
                                    formatter={(value) => [formatNumber(value) + '원', '가격']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 4, fill: '#3B82F6' }}
                                />
                                {/* 매수/매도 마커 */}
                                {signals.map((signal, idx) => {
                                    const signalTime = new Date(signal.timestamp).getTime();
                                    const matchingPrice = chartData.find(d =>
                                        Math.abs(d.timestamp - signalTime) < 60000
                                    );
                                    if (!matchingPrice) return null;
                                    return (
                                        <ReferenceDot
                                            key={idx}
                                            x={matchingPrice.time}
                                            y={signal.price}
                                            r={6}
                                            fill={signal.action === 'buy' ? '#10B981' : '#EF4444'}
                                            stroke="#fff"
                                            strokeWidth={2}
                                        />
                                    );
                                })}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="no-data">
                        <p>가격 데이터가 없습니다</p>
                    </div>
                )}
            </section>

            {/* 로그 섹션 */}
            <section className="logs-section">
                <h2>실시간 로그</h2>
                <div className="logs-container">
                    {logs.length > 0 ? (
                        logs.map((log, idx) => (
                            <div key={log.id || idx} className={`log-item ${log.level?.toLowerCase() || 'info'}`}>
                                <span className="log-time">{formatTime(log.timestamp)}</span>
                                <span className="log-message">{log.message}</span>
                            </div>
                        ))
                    ) : (
                        <div className="no-data">
                            <p>로그가 없습니다</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 푸터 */}
            <footer className="dashboard-footer">
                <p>© {new Date().getFullYear()} AutoFlux Coin Dashboard</p>
            </footer>
        </div>
    );
};

export default CoinDashboard;
