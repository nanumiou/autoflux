import {
    BookOpen,
    Cpu,
    Download,
    ShieldCheck,
    TrendingUp
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png';
import './HomeLanding.css';

const HomeLanding = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);

    useEffect(() => {
        document.body.classList.add('home-landing-body');
        return () => {
            document.body.classList.remove('home-landing-body');
        };
    }, []);

    // Download Handler logic
    const handleDownloadClick = () => {
        setShowModal(true);
    };

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

    return (
        <div className="landing-container">
            {/* Header */}
            <header className="landing-header">
                <img src={logo} alt="AutoFlux Logo" />
                <p className="tagline">"Trade less. Live more."</p>
            </header>

            {/* Main Content */}
            <main className="landing-main">
                <section className="hero-section">
                    <h2>감정은 배제하고 데이터로 투자하세요</h2>
                    <p className="subtitle">
                        AutoFlux는 복잡한 시장 분석과 반복적인 매매 주문에서 <br />
                        당신을 해방시켜 줄 강력한 자동 매매 플랫폼입니다.
                    </p>

                    <div className="button-group">
                        {/* 1. App Download */}
                        <button className="cta-button download-btn" onClick={handleDownloadClick}>
                            <Download className="me-2" size={20} style={{ marginRight: '8px' }} />
                            {downloadLoading ? '준비 중...' : '앱 다운로드'}
                        </button>

                        {/* 2. Go to Dashboard */}
                        {/* <button className="cta-button dashboard-btn" onClick={() => navigate('/dashboard')}>
                            <LayoutDashboard className="me-2" size={20} style={{ marginRight: '8px' }} />
                            대시보드 이동
                        </button> */}

                        {/* 3. User Guide */}
                        <button className="cta-button guide-btn" onClick={() => navigate('/user-guide')}>
                            <BookOpen className="me-2" size={20} style={{ marginRight: '8px' }} />
                            이용 가이드
                        </button>
                    </div>
                </section>

                <section className="features-section">
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon-wrapper logic">
                                <Cpu size={32} />
                            </div>
                            <h3>커스텀 매매로직</h3>
                            <p>AI를 활용해 사용자가 원하는 매매로직을 자동 생성해서 자동매매에 쉽게 적용할 수 있습니다.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon-wrapper backtest">
                                <TrendingUp size={32} />
                            </div>
                            <h3>로직 백테스트</h3>
                            <p>백테스트를 통해 자신의 매매로직이 얼마나 효과적인지 검증하여 최적의 전략을 빠르게 찾을 수 있습니다.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon-wrapper security">
                                <ShieldCheck size={32} />
                            </div>
                            <h3>데이터 보안</h3>
                            <p>모든 자동매매 데이터는 사용자의 PC에 저장되어 외부에 노출되지 않고 안전하게 이용 가능합니다.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-links">
                    <Link to="/terms" className="footer-link-item mx-2">이용약관</Link>
                    <span className="divider op-3">|</span>
                    <Link to="/privacy" className="footer-link-item mx-2">개인정보처리방침</Link>
                </div>
                <p>© {new Date().getFullYear()} 프랜홀딩스. All Rights Reserved.</p>
            </footer>

            {/* Download Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>앱 다운로드</h3>
                        <p>AutoFlux 앱을 다운로드하시겠습니까?</p>
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
        </div>
    );
};

export default HomeLanding;
