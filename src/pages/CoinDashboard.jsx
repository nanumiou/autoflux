import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceDot,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';
import { ADMIN_UUID, supabase } from '../supabaseClient';
import './CoinDashboard.css';

const CoinDashboard = () => {
    // KPI 데이터
    const [kpi, setKpi] = useState(null);
    // 가격 히스토리
    const [prices, setPrices] = useState([]);
    // 매매 신호
    const [signals, setSignals] = useState([]);
    // 실현 손익 데이터
    const [realizedPnl, setRealizedPnl] = useState([]);
    // 로그
    const [logs, setLogs] = useState([]);
    // 로딩 상태
    const [loading, setLoading] = useState(true);
    // 에러 메시지
    const [error, setError] = useState(null);
    // 방문자 통계
    const [visitorStats, setVisitorStats] = useState({ today: 0, total: 0 });
    // 다운로드 로딩 상태
    const [downloadLoading, setDownloadLoading] = useState(false);
    // 모달 표시 상태
    const [showModal, setShowModal] = useState(false);

    // 다운로드 버튼 클릭 핸들러
    const handleDownloadClick = () => {
        setShowModal(true);
    };

    // 다운로드 확정 처리
    const confirmDownload = async () => {
        setShowModal(false);
        setDownloadLoading(true);
        try {
            const response = await fetch('https://api.github.com/repos/nanumiou/autoflux/releases/latest');
            const data = await response.json();

            const asset = data.assets.find(asset =>
                asset.name.includes('win') || asset.name.endsWith('.exe') || asset.name.endsWith('.msi')
            );

            if (asset) {
                window.open(asset.browser_download_url, '_blank');
            } else {
                window.open('https://github.com/nanumiou/autoflux/releases/latest', '_blank');
            }
        } catch (error) {
            console.error('Download failed:', error);
            window.open('https://github.com/nanumiou/autoflux/releases/latest', '_blank');
        } finally {
            setDownloadLoading(false);
        }
    };

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
                .limit(300);

            if (logError) throw logError;
            // '매매 로직 실행' 로그 필터링
            const filteredLogs = (logData || []).filter(log => !log.message.includes('매매 로직 실행'));
            setLogs(filteredLogs);

            // 실현 손익 조회 (누적용)
            const { data: pnlData, error: pnlError } = await supabase
                .from('coin_dashboard_realized_pnl')
                .select('*')
                .eq('admin_id', ADMIN_UUID);

            if (!pnlError) {
                setRealizedPnl(pnlData || []);
            }

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
                    if (!payload.new.message.includes('매매 로직 실행')) {
                        setLogs(prev => [payload.new, ...prev.slice(0, 299)]);
                    }
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

    // 방문자 카운트 및 통계 조회
    useEffect(() => {
        const handleVisitor = async () => {
            try {
                // 1. 세션 처리를 통해 중복 카운트 방지
                const kstDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' });
                const visitedKey = `visited_${kstDate}`;
                const hasVisited = sessionStorage.getItem(visitedKey);

                if (!hasVisited) {
                    // 카운트 증가 RPC 호출
                    await supabase.rpc('increment_visitor_count');
                    sessionStorage.setItem(visitedKey, 'true');
                }

                // 2. 통계 조회 RPC 호출
                const { data, error } = await supabase.rpc('get_visitor_stats');
                if (!error && data && data.length > 0) {
                    setVisitorStats({
                        today: data[0].today_count,
                        total: data[0].total_count
                    });
                }
            } catch (err) {
                console.error('방문자 통계 오류:', err);
            }
        };

        handleVisitor();
    }, []);

    // 숫자 포맷팅
    const formatNumber = (num, decimals = 0) => {
        if (num === null || num === undefined) return '-';
        return new Intl.NumberFormat('ko-KR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    };

    // 시간 포맷팅 (DB에 이미 한국 시간이 저장되어 있으므로 UTC로 해석하여 그대로 표시)
    const formatTime = (timestamp) => {
        if (!timestamp) return '-';
        const date = new Date(timestamp);
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC'
        });
    };

    // 로그 시간 포맷팅 (DB에 UTC로 저장되어 있으므로 한국 시간으로 변환)
    const formatLogTime = (timestamp) => {
        if (!timestamp) return '-';
        const date = new Date(timestamp);
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Seoul'
        });
    };

    // 툴팁용 시간 포맷팅 ("1.15 23:30" 형식)
    const formatTooltipTime = (timestamp) => {
        if (!timestamp) return '-';
        const date = new Date(timestamp);
        // DB에 저장된 시간이 KST 기준이므로 UTC 메서드를 사용하여 값 그대로 추출
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        return `${month}.${day} ${hours}:${minutes}`;
    };

    // 로그 메시지 정제 (매수/매도 상세 조건 숨김)
    const formatLogMessage = (message) => {
        if (!message) return '';
        // "매수 신호:" 또는 "매도 신호:" 가 포함된 경우 상세 내역 제거
        if (message.includes('매수 신호:') || message.includes('매도 신호:')) {
            return message.split(':')[0];
        }
        return message;
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
    if (error) {
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
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Seoul'
        });
    };

    // 차트 제목 생성
    const getChartTitle = () => {
        if (prices && prices.length > 0 && prices[0].symbol) {
            const symbol = prices[0].symbol.replace('KRW-', '');
            return `${symbol} 매매 차트`;
        }
        return '매매 차트';
    };



    return (
        <div className="dashboard-container">
            {/* 상단 네비게이션 */}
            <div className="top-nav">
                <div className="header-buttons">
                    <button
                        className="btn-download"
                        onClick={handleDownloadClick}
                        disabled={downloadLoading}
                    >
                        {downloadLoading ? '준비 중...' : '앱 다운로드'}
                    </button>
                    <Link to="/user-guide" className="btn-guide">
                        이용 가이드
                    </Link>
                </div>
            </div>

            {/* 헤더 */}
            <header className="dashboard-header">
                <h1>AutoFlux 자동매매 대시보드</h1>
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
                        <h3>누적 실현 손익</h3>
                        <p className={`kpi-value ${realizedPnl.reduce((sum, item) => sum + (item.profit_loss || 0), 0) >= 0 ? 'positive' : 'negative'}`}>
                            {formatNumber(realizedPnl.reduce((sum, item) => sum + (item.profit_loss || 0), 0))}원
                        </p>
                    </div>
                    <div className="kpi-card">
                        <h3>매수거래</h3>
                        <p className="kpi-value">{formatNumber(signals.filter(s => s.action === 'buy').length)} 회</p>
                    </div>
                    <div className="kpi-card">
                        <h3>매도거래</h3>
                        <p className="kpi-value">{formatNumber(signals.filter(s => s.action === 'sell').length)} 회</p>
                    </div>
                    <div className="kpi-card">
                        <h3>{prices.length > 0 ? prices[0].symbol?.replace('KRW-', '') : ''} 현재가</h3>
                        <p className="kpi-value">
                            {chartData.length > 0 ? formatNumber(chartData[chartData.length - 1].price) : '-'}원
                        </p>
                    </div>
                </div>
            </section>

            {/* 매매 차트 */}
            <section className="chart-section">
                <h2>{getChartTitle()}</h2>
                {chartData.length > 0 ? (
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={formatTime}
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
                                    labelFormatter={(label, payload) => {
                                        if (payload && payload.length > 0) {
                                            return formatTooltipTime(payload[0].payload.timestamp);
                                        }
                                        return label;
                                    }}
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
                                    // Price 데이터는 KST 시간이 UTC로 해석되어 차트에 표시됨 (예: 21:00 KST -> timestamp는 21:00 UTC 값)
                                    // Signal 데이터는 실제 UTC이므로 (예: 12:00 UTC), 이를 차트 시간(21:00)과 맞추기 위해 9시간을 더함
                                    const kstOffset = 9 * 60 * 60 * 1000;
                                    const signalTime = new Date(signal.timestamp).getTime() + kstOffset;

                                    const matchingPrice = chartData.find(d =>
                                        Math.abs(d.timestamp - signalTime) < 60000
                                    );
                                    if (!matchingPrice) return null;
                                    return (
                                        <ReferenceDot
                                            key={idx}
                                            x={matchingPrice.timestamp}
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
                                <span className="log-time">{formatLogTime(log.timestamp)}</span>
                                <span className="log-message">{formatLogMessage(log.message)}</span>
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
                <div className="visitor-stats">
                    <span>Total: <strong>{visitorStats.total.toLocaleString()}</strong></span>
                    <span className="divider">|</span>
                    <span>Today: <strong>{visitorStats.today.toLocaleString()}</strong></span>
                </div>
                <div className="footer-links mb-2">
                    <Link to="/terms" className="footer-link-item mx-2">이용약관</Link>
                    <span className="divider op-3">|</span>
                    <Link to="/privacy" className="footer-link-item mx-2">개인정보처리방침</Link>
                </div>
                <p>© {new Date().getFullYear()} AutoFlux. All Rights Reserved.</p>
            </footer>
            {/* 기존 다운로드 모달 (앱 출시 후 복구용)
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>앱 다운로드</h3>
                        <p>AutoFlux Desktop 앱을 다운로드하시겠습니까?</p>
                        <ul className="modal-list">
                            <li>Windows 10/11 지원</li>
                            <li>최신 버전 자동 다운로드</li>
                        </ul>
                        <div className="modal-buttons">
                            <button className="modal-btn confirm" onClick={confirmDownload}>다운로드</button>
                            <button className="modal-btn cancel" onClick={() => setShowModal(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
            */}

            {/* 임시 커밍순 모달 - 고도화된 디자인 */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content prep-modal" onClick={e => e.stopPropagation()}>
                        <h3>AutoFlux 앱 최종 테스트 진행 중</h3>
                        <div className="prep-divider"></div>
                        <div className="prep-info-box">
                            현재 개발이 완료되었고 최종 테스트 중입니다. <br />
                            조만간 앱이 출시될 예정입니다.
                        </div>
                        <div className="modal-buttons centered">
                            <button className="modal-btn confirm" onClick={() => setShowModal(false)}>확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoinDashboard;
