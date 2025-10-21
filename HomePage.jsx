import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from '../logo2.png'; // 로고 이미지 경로

const HomePage = () => {

  useEffect(() => {
    // 컴포넌트가 마운트될 때 body에 클래스 추가
    document.body.classList.add('landing-page-body');

    // 컴포넌트가 언마운트될 때 body에서 클래스 제거 (정리 함수)
    return () => {
      document.body.classList.remove('landing-page-body');
    };
  }, []); // 빈 의존성 배열을 전달하여 마운트/언마운트 시에만 실행

  const [loading, setLoading] = useState(false);

  // GitHub Releases API를 통한 다운로드
  const handleDownloadClick = async () => {
    // 다운로드 확인 창 표시
    const isConfirmed = window.confirm(
      'AutoFlux Desktop 앱을 다운로드하시겠습니까?\n\n' +
      // '• 파일 크기: 약 80MB\n' +
      '• Windows 10/11 지원'
    );

    if (!isConfirmed) {
      return; // 사용자가 취소한 경우 다운로드하지 않음
    }

    setLoading(true);
    try {
      // AutoFlux GitHub 저장소의 실제 릴리즈 API
      const response = await fetch('https://api.github.com/repos/nanumiou/autoflux/releases/latest');
      const data = await response.json();
      
      // Windows 설치 파일 찾기
      const asset = data.assets.find(asset => 
        asset.name.includes('win') || asset.name.endsWith('.exe') || asset.name.endsWith('.msi')
      );
      
      if (asset) {
        window.open(asset.browser_download_url, '_blank');
      } else {
        // 대체 방법: 릴리즈 페이지로 이동
        window.open('https://github.com/nanumiou/autoflux/releases/latest', '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
      // 에러 시 릴리즈 페이지로 이동
      window.open('https://github.com/nanumiou/autoflux/releases/latest', '_blank');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <img src={logo} alt="Auto Trading 로고" style={{ height: '90px', marginBottom: '1rem' }} />
        <p className="tagline">"Trade less. Live more."</p>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <h2>감정은 배제하고, 데이터로 투자하세요</h2>
          <p className="subtitle">
            AutoFlux는 복잡한 시장 분석과 반복적인 매매 주문에서 <br />
            당신을 해방시켜 줄 강력한 자동 매매 플랫폼입니다.
          </p>
          <div className="cta-buttons">
            <button className="cta-button" onClick={handleDownloadClick} disabled={loading}>
              {loading ? '다운로드 준비 중...' : '앱 다운로드'}
            </button>
            <Link to="/user-guide" className="guide-link">
              이용 가이드
            </Link>
          </div>
        </section>

        <section className="features-section">
          <h2>─────</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>📈 커스텀 매매로직</h3>
              <p>AI를 활용해 사용자가 원하는 매매로직을 자동 생성해서 자동매매에 쉽게 적용할 수 있습니다.</p>
            </div>
            <div className="feature-item">
              <h3>📊 로직 백테스트</h3>
              <p>백테스트를 통해 자신이 생성한 매매로직이 얼마나 효과적인지 검증하여 최적의 전략을 빠르게 찾을 수 있습니다.</p>
            </div>
            <div className="feature-item">
              <h3>🔒 데이터 보안</h3>
              <p>모든 데이터는 사용자의 PC에 저장되어 외부에 노출되지 않고 안전하게 이용 가능합니다.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} 프랜홀딩스. All Rights Reserved.</p>
        <p className="footer-note">회원가입 및 로그인은 데스크톱 앱에서 진행하세요.</p>
        <p className="footer-contact">문의사항: autoflux.master@gmail.com</p>
      </footer>
    </div>
  );
};

export default HomePage;
