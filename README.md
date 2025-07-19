# AutoFlux 홈페이지

AutoFlux 국내주식 자동매매 데스크톱 앱의 공식 홈페이지입니다.

## 주요 기능

- 📱 데스크톱 앱 다운로드
- 📚 사용자 가이드
- 🔍 SEO 최적화
- 📱 반응형 디자인

## 기술 스택

- React 18
- React Router
- React Bootstrap
- Lucide React Icons

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start

# 프로덕션 빌드
npm run build
```

## 배포

### Vercel (추천)
1. GitHub 저장소에 코드 푸시
2. [Vercel](https://vercel.com)에 로그인
3. "New Project" → GitHub 저장소 선택
4. 자동 배포 완료

### Netlify
1. GitHub 저장소에 코드 푸시
2. [Netlify](https://netlify.com)에 로그인
3. "New site from Git" → GitHub 저장소 선택
4. 자동 배포 완료

## 설정 변경 필요사항

### GitHub Releases 연동
`src/pages/HomePage.jsx` 파일의 26번째 라인에서 다음 부분을 실제 저장소 정보로 변경:

```javascript
// 변경 전
const response = await fetch('https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/releases/latest');

// 변경 후 (예시)
const response = await fetch('https://api.github.com/repos/username/autotrader-desktop/releases/latest');
```

### 도메인 설정
`public/index.html` 파일의 Open Graph 태그에서 도메인을 실제 배포 도메인으로 변경:

```html
<!-- 변경 전 -->
<meta property="og:url" content="https://autoflux-homepage.vercel.app" />

<!-- 변경 후 (예시) -->
<meta property="og:url" content="https://autoflux.com" />
```

## 폴더 구조

```
src/
├── pages/
│   ├── HomePage.jsx     # 메인 랜딩페이지
│   ├── HomePage.css
│   ├── UserGuide.jsx    # 사용자 가이드
│   └── UserGuide.css
├── App.js               # 메인 앱 컴포넌트
└── logo2.png           # 로고 이미지
```

## 라이선스

이 프로젝트는 AutoFlux의 소유입니다.