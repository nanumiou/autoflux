import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Download, UserPlus, Key, Settings, Bot, Play, ArrowLeft } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserGuide.css';
import { Link } from 'react-router-dom';

function UserGuide() {
  const steps = [
    {
      id: 1,
      icon: <UserPlus size={36} className="text-primary" />,
      title: "앱 설치 및 회원가입",
      description: "",
      details: [
        "자동매매 앱 다운로드 후 설치 (윈도우 10/11)",
        "이메일과 비밀번호로 간편하게 회원가입",
        "비밀번호: 최소 8자, 영문 소문자, 숫자, 특수문자 포함",
        "등록한 이메일 인증 확인 후 자동매매 프로그램 이용 가능"
      ]
    },
    {
      id: 2,
      icon: <Key size={36} className="text-warning" />,
      title: "한국투자증권 API키 발급",
      description: "",
      details: [
        "한국투자증권 계좌 개설 (계좌가 없다면)",
        "로그인 후 우측 상단 검색 버튼 클릭하고 'Open API 서비스 신청' 검색",
        "모의투자 서비스 신청으로 모의투자 계좌 생성",
        "모의투자/실전투자 API키 발급 받기",
        "신청현황 탭에서 APP KEY, APP Secret 복사",
        "자동매매 데스크톱 앱 '매매 설정' 페이지에서 [새 API 키 추가]에 등록",
        "⚠️ 모의투자만 이용하는 회원도 종목 조건검색을 사용하려면 실전투자 API키가 필요함"
      ]
    },
    {
      id: 3,
      icon: <Settings size={36} className="text-info" />,
      title: "매매 조건 설정",
      description: "",
      details: [
        "증권사 API 키 등록 (모의/실전투자 API키 각각 1개씩 등록 가능)",
        "[새 매매 로직 만들기]에서 매매 로직 이름 입력",
        "종목 선정: 종목 조건검색과 수동 종목 입력으로 매매 대상 종목 선정",
        "기본 투자: 미수 사용 여부, 분봉 선택, 종목당 매수 금액 등을 설정",
        "매수 조건: 여러 매수 로직 중 자신에게 맞는 조건 선택 후 입력",
        "매도 조건 1: 종목 기준으로 매도 조건 설정",
        "매도 조건 2: 계좌 기준으로 매도 조건 설정"
      ],
      note: "매매 조건 설정이 가장 까다롭지만 자동매매를 하려면 누구나 넘어야 하는 산입니다. 궁금한 사항은 문의 게시판에 남겨주세요."
    },
    {
      id: 4,
      icon: <Bot size={36} className="text-success" />,
      title: "봇 생성 및 자동매매 시작",
      description: "",
      details: [
        "[새 봇 생성]에서 사용할 API키, 매매 로직 선택",
        "[시작] 버튼으로 자동매매 시작",
        "[예약]은 오늘과 내일 중 설정한 시간에 봇 자동 시작하는 기능"
      ]
    }
  ];

  const importantNotes = [
    "모든 매매 관련 데이터는 설치된 사용자 PC에 저장됩니다.",
    "관리자 서버에는 가입 이메일과 구독 관련 정보만 저장됩니다.",
    "한국투자증권을 이용하는 이유는 데이트레이딩은 수수료가 매우 중요하기 때문입니다.",
    "한투증권: 0.0036396% (신규 고객 평생 우대 수수료 - 25년 7월 28일 기준)",
    "키움증권: 0.015%"
  ];

  return (
    <Container fluid className="user-guide-container py-5">
      {/* Header with Home Button */}
      <div className="text-center mb-5 position-relative">
        <Link to="/" className="home-button">
          <ArrowLeft size={20} className="me-2" />
          홈으로 돌아가기
        </Link>
        {/* <h2 className="fw-bold text-dark mt-3">이용 안내</h2> */}
      </div>

      {/* Main Process Flow */}
      <div className="process-flow mb-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="d-flex align-items-center justify-content-between mb-4 process-overview">
              <div className="text-center process-step">
                <div className="step-circle mb-2 step-1">
                  <Download size={36} className="text-white" />
                </div>
                <small className="fw-bold text-dark">앱 설치</small>
              </div>
              <div className="process-arrow">
                <i className="fas fa-chevron-right text-muted"></i>
              </div>
              <div className="text-center process-step">
                <div className="step-circle mb-2 step-2">
                  <UserPlus size={36} className="text-white" />
                </div>
                <small className="fw-bold text-dark">회원가입</small>
              </div>
              <div className="process-arrow">
                <i className="fas fa-chevron-right text-muted"></i>
              </div>
              <div className="text-center process-step">
                <div className="step-circle mb-2 step-3">
                  <Key size={36} className="text-white" />
                </div>
                <small className="fw-bold text-dark">API키 발급</small>
              </div>
              <div className="process-arrow">
                <i className="fas fa-chevron-right text-muted"></i>
              </div>
              <div className="text-center process-step">
                <div className="step-circle mb-2 step-4">
                  <Settings size={36} className="text-white" />
                </div>
                <small className="fw-bold text-dark">매매 조건 설정</small>
              </div>
              <div className="process-arrow">
                <i className="fas fa-chevron-right text-muted"></i>
              </div>
              <div className="text-center process-step">
                <div className="step-circle mb-2 step-5">
                  <Play size={36} className="text-white" />
                </div>
                <small className="fw-bold text-dark">자동매매 시작</small>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Detailed Steps */}
      <Row className="g-4">
        {steps.map((step) => (
          <Col key={step.id} lg={6}>
            <Card className={`h-100 shadow-sm border-0 step-card step-card-${step.id}`}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className={`step-number me-3 step-${step.id}`}>
                    {step.id}
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold">{step.title}</h5>
                  </div>
                </div>
                
                {step.details && (
                  <ul className="list-unstyled mt-3 step-details">
                    {step.details.map((detail, index) => (
                      <li key={index} className="mb-2 d-flex align-items-start">
                        <span className="bullet-point me-2">•</span>
                        <span className="small text-secondary">{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {step.note && (
                  <div className="alert alert-warning mt-3 p-3">
                    <small className="mb-0">
                      <i className="fas fa-info-circle me-2"></i>
                      {step.note}
                    </small>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Important Notes Section */}
      <div className="mt-5">
        <Card className="border-0 shadow-sm bg-light">
          <Card.Body className="p-4">
            <h5 className="fw-bold mb-3">
              <i className="fas fa-exclamation-triangle text-warning me-2"></i>
              참고 사항
            </h5>
            <ul className="list-unstyled mb-0">
              {importantNotes.map((note, index) => (
                <li key={index} className="mb-2 d-flex align-items-start">
                  <span className="bullet-point me-2 text-primary">•</span>
                  <span className="small">{note}</span>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default UserGuide;