import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowLeft, Bot, Download, Key, Play, Settings, UserPlus } from 'lucide-react';
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './UserGuide.css';

function UserGuide() {
  const commonSteps = [
    {
      id: 0,
      icon: <UserPlus size={36} className="text-primary" />,
      title: "앱 설치 및 회원가입",
      description: "",
      details: [
        "자동매매 앱 다운로드 후 설치 (윈도우 10/11)",
        "구글 계정으로 간편하게 회원가입"
      ]
    }
  ];

  /* const stockSteps = [
    {
      id: 1,
      icon: <Key size={36} className="text-warning" />,
      title: "한국투자증권 API키 발급",
      description: "",
      details: [
        "한국투자증권 계좌 개설 (계좌가 없다면)",
        "한투 앱 우측 상단 검색 버튼에서 'Open API 서비스 신청' 검색",
        "모의투자 서비스 신청으로 모의투자 계좌 생성",
        "모의투자/실전투자 API키 발급 받기",
        "신청현황 탭에서 APP KEY, APP Secret 복사",
      ]
    },
    {
      id: 2,
      icon: <Settings size={36} className="text-info" />,
      title: "매매 로직 설정",
      description: "",
      details: [
        "증권사 API 키 등록 (모의/실전투자 API키 각각 1개씩 등록 가능)",
        "[새 매매 로직 만들기]에서 매매 로직 이름 입력",
        "종목 선정: 종목 조건검색과 수동 종목 입력으로 매매 대상 종목 선정",
        "기본 투자: 캔들 주기 선택, 종목당 매수 금액 등 설정",
        "매수 조건: 매수 로직 선택 후 입력 (커스텀 로직 활용 가능)",
        "매도 조건 : 매도 로직 선택 후 입력 (커스텀 로직 활용 가능)"
      ]
    },
    {
      id: 3,
      icon: <Bot size={36} className="text-success" />,
      title: "봇 생성 및 자동매매 시작",
      description: "",
      details: [
        "[새 봇 생성]에서 사용할 API키, 매매 로직 선택",
        "[시작] 버튼으로 자동매매 시작",
        "[예약]은 오늘과 내일 중 설정한 시간에 봇 자동 시작하는 기능"
      ]
    }
  ]; */

  const coinSteps = [
    {
      id: 1,
      icon: <Key size={36} className="text-warning" />,
      title: "업비트 API키 발급",
      description: "",
      details: [
        "업비트 로그인 -> 마이페이지 -> Open API 관리",
        "Open API Key 관리에서 자산조회, 주문조회, 주문하기 선택",
        "IP 주소 등록 및 이용 동의 클릭",
        "Open API Key 발급받기"
      ]
    },
    {
      id: 2,
      icon: <Settings size={36} className="text-info" />,
      title: "매매 로직 설정",
      description: "",
      details: [
        "거래소 API 키 등록",
        "커스텀 로직 관리에서 AI를 활용해 매매 로직 생성",
        "매매 로직 관리에서 [+ 로직 추가] 클릭",
        "기본 설정에서 로직 이름과 매매 코인, 매수 금액, 캔들 간격 선택",
        "매수 설정, 매도 설정에서 생성한 커스텀 로직 선택"
      ]
    },
    {
      id: 3,
      icon: <Bot size={36} className="text-success" />,
      title: "백테스트",
      description: "",
      details: [
        "백테스트 설정에서 종목 및 기간 선택",
        "생성한 커스텀 로직 선택",
        "백테스트 실행 및 결과 확인"
      ]
    },
    {
      id: 4,
      icon: <Bot size={36} className="text-success" />,
      title: "검증 후 실전매매 시작",
      description: "",
      details: [
        "대시보드에서 새 봇 생성",
        "사용할 API키, 매매 로직 선택",
        "[시작] 버튼으로 자동매매 시작"
      ]
    }
  ];

  const faqItems = [
    {
      question: "오토플럭스(AutoFlux) 자동매매 앱은 무엇인가요?",
      answer: "윈도우 PC에 설치해서 사용하는 코인 자동매매 프로그램입니다. "
    },
    {
      question: "오토플럭스 자동매매 앱의 주요 기능은 어떤 것이 있나요?",
      answer: "코인 자동매매 및 백테스트를 제공하고, 사용자가 원하는 매매 전략을 쉽게 생성해서 활용할 수 있습니다."
    },
    {
      question: "내가 원하는 매매 전략을 어떻게 생성하나요?",
      answer: "'매매 설정' 메뉴의 커스텀 로직 추가에서 '음봉 연속 3개 생성 및 RSI가 30 이하일 때 매수'와 같이 자연어로 설명하면 자동으로 전략 코드를 생성할 수 있습니다. 생성한 로직은 백테스트와 실전매매에 바로 적용할 수 있습니다."
    },
    {
      question: "백테스트는 비용이 발생하나요?",
      answer: "아니요, 백테스트 기능은 모든 회원에게 무료로 무제한 제공됩니다. 과거 데이터를 기반으로 전략의 수익성을 충분히 검증한 후 실전에 투입하세요."
    },
    {
      question: "크레딧은 반드시 구매해야 하나요?",
      answer: "아니요, 'AI를 이용한 전략 및 코드 자동 생성' 기능을 사용할 때만 1회당 1 크레딧이 차감됩니다. 다른 기능은 크레딧이 필요하지 않습니다."
    },
    {
      question: "나의 자동매매 데이터는 어디에 어떻게 보관되나요? 외부에서 누군가가 볼 수도 있나요?",
      answer: "자동매매 데이터는 프로그램이 설치된 사용자 PC에 저장됩니다. '문서' 폴더에 생성된 'Autoflux_Desktop' 폴더에서 DB 및 로그 파일을 확인할 수 있습니다. 외부에서 자신의 자동매매 데이터에 접근할 수 없습니다."
    }
  ];

  // 초기 로드 시 배경색 적용을 위한 클래스 추가
  useEffect(() => {
    document.body.classList.add('dashboard-page-body');
    return () => {
      document.body.classList.remove('dashboard-page-body');
    };
  }, []);

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

      {/* FAQ Section */}
      <div className="mt-5 mb-5 pb-5">
        <div className="text-center mb-5">
          {/* <HelpCircle size={48} className="text-primary mb-3" /> */}
          <h2 className="fw-bold">자주 묻는 질문 (FAQ)</h2>
        </div>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="faq-container">
              {faqItems.map((item, idx) => (
                <div key={idx} className="faq-item mb-4 p-4 rounded-4 shadow-sm bg-white border">
                  <div className="d-flex align-items-start mb-3">
                    <div className="faq-q-badge me-3">Q</div>
                    <h5 className="fw-bold mb-0">{item.question}</h5>
                  </div>
                  <div className="d-flex align-items-start">
                    <div className="faq-a-badge me-3">A</div>
                    <p className="text-secondary mb-0 small">{item.answer}</p>
                  </div>
                </div>


              ))}
            </div>
          </Col>
        </Row>
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
                <small className="fw-bold text-dark">API키 발급</small>
              </div>
              <div className="process-arrow">
                <i className="fas fa-chevron-right text-muted"></i>
              </div>
              <div className="text-center process-step">
                <div className="step-circle mb-2 step-3">
                  <Key size={36} className="text-white" />
                </div>
                <small className="fw-bold text-dark">매매 로직 설정</small>
              </div>
              <div className="process-arrow">
                <i className="fas fa-chevron-right text-muted"></i>
              </div>
              <div className="text-center process-step">
                <div className="step-circle mb-2 step-4">
                  <Settings size={36} className="text-white" />
                </div>
                <small className="fw-bold text-dark">백테스트</small>
              </div>
              <div className="process-arrow">
                <i className="fas fa-chevron-right text-muted"></i>
              </div>
              <div className="text-center process-step">
                <div className="step-circle mb-2 step-5">
                  <Play size={36} className="text-white" />
                </div>
                <small className="fw-bold text-dark">실전매매 시작</small>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Common Steps */}
      <Row className="g-4 mb-5 justify-content-center">
        {commonSteps.map((step) => (
          <Col key={step.id} lg={10}>
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

      {/* Stock and Coin Sections */}
      <Row className="g-4 justify-content-center">
        {/* Coin Section */}
        <Col lg={10}>
          <h3 className="text-center mb-4 fw-bold text-primary">코인</h3>
          {coinSteps.map((step) => (
            <Card key={`coin-${step.id}`} className={`mb-3 shadow-sm border-0 step-card step-card-${step.id + 1}`}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className={`step-number me-3 step-${step.id + 1}`}>
                    {step.id}
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold">{step.title}</h5>
                  </div>
                </div>

                {step.details && step.details.length > 0 ? (
                  <ul className="list-unstyled mt-3 step-details">
                    {step.details.map((detail, index) => (
                      <li key={index} className="mb-2 d-flex align-items-start">
                        <span className="bullet-point me-2">•</span>
                        <span className="small text-secondary">{detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted small mt-3">내용 준비 중...</p>
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
          ))}
        </Col>

        {/* Stock Section */}
        {/* <Col lg={6}>
          <h3 className="text-center mb-4 fw-bold text-primary">주식</h3>
          {stockSteps.map((step) => (
            <Card key={`stock-${step.id}`} className={`mb-3 shadow-sm border-0 step-card step-card-${step.id + 1}`}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className={`step-number me-3 step-${step.id + 1}`}>
                    {step.id}
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold">{step.title}</h6>
                  </div>
                </div>

                {step.details && step.details.length > 0 ? (
                  <ul className="list-unstyled mt-3 step-details">
                    {step.details.map((detail, index) => (
                      <li key={index} className="mb-2 d-flex align-items-start">
                        <span className="bullet-point me-2">•</span>
                        <span className="small text-secondary">{detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted small mt-3">내용 준비 중...</p>
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
          ))}
        </Col> */}
      </Row>

    </Container>
  );
}

export default UserGuide;