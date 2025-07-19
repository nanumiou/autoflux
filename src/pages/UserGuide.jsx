import React, { useState } from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import { Rocket, KeyRound, Bot, BarChart3, Settings, HelpCircle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserGuide.css'; // Custom CSS for enhanced styling
import { Link } from 'react-router-dom';

function UserGuide() {
  const [activeSection, setActiveSection] = useState(null);

  const guideSections = [
    {
      eventKey: '0',
      icon: <Rocket size={24} className="me-3" />,
      title: '시작하기',
      content: [
        {
          subtitle: '1-1. 회원가입 및 로그인',
          text: (
            <ul className="list-styled">
              <li>이메일과 비밀번호로 간편하게 회원가입 가능</li>
              <li>비밀번호: 최소 8자, 영문 소문자, 숫자, 특수문자(@$!%*?&#) 포함</li>
              <li>가입 후 로그인 페이지에서 서비스 접속</li>
            </ul>
          ),
        },
        {
          subtitle: '1-2. 증권사 API 키 발급',
          text: (
            <>
              <p>자동매매를 위해 증권사 API Key와 Secret Key가 필요합니다. 현재 <strong>한국투자증권</strong> API 지원.</p>
              <p className="fw-bold">발급 방법:</p>
              <ol className="list-styled">
                <li>한국투자증권 HTS 또는 홈페이지 접속</li>
                <li>[서비스 신청] &gt; [모의투자/실전투자 API] 메뉴에서 API 신청</li>
                <li>Key와 Secret 발급</li>
              </ol>
              <p className="text-warning"><strong>중요:</strong> 조건 검색 기능 사용 시 HTS 사용자 ID 등록 필수</p>
            </>
          ),
        },
        {
          subtitle: '1-3. API 키 등록',
          text: (
            <ol className="list-styled">
              <li>[설정] &gt; [증권사 API 키 관리] 메뉴에서 API 키 등록</li>
              <li>[+ 새 API 키 추가] 버튼 클릭</li>
              <li>'모의 투자(VTS)' 또는 '실전 투자(REAL)' 선택 후 정보 입력</li>
              <li>등록된 키는 암호화되어 안전하게 보관</li>
            </ol>
          ),
        },
      ],
    },
    {
      eventKey: '1',
      icon: <KeyRound size={24} className="me-3" />,
      title: '핵심 개념 이해',
      content: [
        {
          subtitle: '2-1. 매매 로직이란?',
          text: (
            <p>
              매매 로직은 투자 전략을 정의하는 설명서입니다. [설정] &gt; [매매 로직 관리]에서 종목 선정, 매수/매도 조건, 계좌 관리 전략 등을 설정할 수 있습니다.
            </p>
          ),
        },
        {
          subtitle: '2-2. 봇이란?',
          text: (
            <p>
              봇은 매매 로직을 실행하는 자동매매 로봇입니다. [봇 관리] 페이지에서 매매 로직과 API 키를 연결하여 생성합니다.
            </p>
          ),
        },
        {
          subtitle: '2-3. 스케줄이란?',
          text: (
            <p>
              자동 실행 스케줄은 지정된 시간에 봇을 자동 시작하도록 예약합니다. 평일에만 작동하며, 공휴일과 주말은 제외됩니다.
            </p>
          ),
        },
      ],
    },
    {
      eventKey: '2',
      icon: <Bot size={24} className="me-3" />,
      title: '자동매매 시작',
      content: [
        {
          subtitle: '3-1. 매매 로직 생성',
          text: (
            <>
              <p>[설정] &gt; [매매 로직 관리] &gt; [+ 새 매매 로직 만들기]에서 투자 전략 설정</p>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <h5>종목 선정</h5>
                  <ul className="list-styled text-secondary">
                    <li><strong>조건 검색 사용</strong>: HTS/MTS 조건 검색식으로 종목 선정</li>
                    <li><strong>API 키</strong>: 실전 투자(REAL) 모드 API 키 사용</li>
                    <li><strong>SEQ 번호</strong>: 조건 검색식의 고유 번호 입력</li>
                    <li><strong>최대 저장 종목</strong>: 검색 결과 종목 수 제한</li>
                    <li><strong>최대 실행 종목</strong>: 과열 시 봇 실행 중단</li>
                    <li><strong>수동 종목</strong>: 직접 종목 코드 입력</li>
                  </ul>
                </Card.Body>
              </Card>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <h5>기본 투자</h5>
                  <ul className="list-styled text-secondary">
                    <li><strong>미수 사용</strong>: 공격적 투자 여부</li>
                    <li><strong>캔들 설정</strong>: 1분, 3분, 5분 등 데이터 단위</li>
                    <li><strong>최대 보유</strong>: 보유 종목 수 제한</li>
                    <li><strong>최대 매수</strong>: 매수 주문 횟수 제한</li>
                    <li><strong>고정 매수 금액</strong>: 종목당 투자 금액</li>
                  </ul>
                </Card.Body>
              </Card>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <h5>매수/매도 조건</h5>
                  <p>거래량, 가격 변동 등으로 매수 타이밍 설정</p>
                  <ul className="list-styled text-secondary">
                    <li><strong>익절/손절</strong>: 매수가 대비 비율 설정</li>
                    <li><strong>장 마감 매도</strong>: 지정 시간에 시장가 매도</li>
                  </ul>
                </Card.Body>
              </Card>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <h5>계좌 관리</h5>
                  <ul className="list-styled text-secondary">
                    <li><strong>수익 관리</strong>: 목표 수익 시 익절</li>
                    <li><strong>손실 관리</strong>: 손실 제한 시 매도 및 종료</li>
                  </ul>
                </Card.Body>
              </Card>
            </>
          ),
        },
        {
          subtitle: '3-2. 첫 번째 봇 생성',
          text: (
            <ol className="list-styled">
              <li>[봇 관리] &gt; [+ 새 봇 생성] 클릭</li>
              <li>봇 이름, 매매 로직, API 키 선택</li>
              <li>자동 실행 스케줄 설정 후 생성</li>
            </ol>
          ),
        },
        {
          subtitle: '3-3. 봇 실행 및 중지',
          text: (
            <ul className="list-styled">
              <li><strong>시작</strong>: [시작] 버튼으로 봇 실행 (STARTING → RUNNING)</li>
              <li><strong>중지</strong>: [중지] 버튼으로 안전 종료 (STOPPED)</li>
              <li><strong>중요</strong>: 한 번에 하나의 봇만 실행 가능</li>
            </ul>
          ),
        },
      ],
    },
    {
      eventKey: '3',
      icon: <BarChart3 size={24} className="me-3" />,
      title: '성과 분석',
      content: [
        {
          subtitle: '4-1. 대시보드 활용',
          text: (
            <p>
              대시보드는 실행 중인 봇의 실시간 상태를 보여줍니다. KPI 카드, 손익 그래프, 이벤트 로그로 현황 파악 가능.
            </p>
          ),
        },
        {
          subtitle: '4-2. 성과 분석 페이지',
          text: (
            <p>
              [성과 분석] 페이지에서 기간별 총 손익, 승률, 손익비 등 확인. 상세 거래 내역 테이블로 개별 매매 검토.
            </p>
          ),
        },
      ],
    },
    {
      eventKey: '4',
      icon: <Settings size={24} className="me-3" />,
      title: '고급 기능',
      content: [
        {
          subtitle: '5-1. 계정 관리',
          text: (
            <p>
              [계정 관리]에서 구독 상태, 비밀번호 변경, 데이터 다운로드, 계정 삭제 등 관리 가능.
            </p>
          ),
        },
        {
          subtitle: '5-2. 관리자 기능',
          text: (
            <p>
              슈퍼유저는 [관리자 페이지]에서 사용자 목록, 구독 상태, 권한 수정 가능.
            </p>
          ),
        },
      ],
    },
    {
      eventKey: '5',
      icon: <HelpCircle size={24} className="me-3" />,
      title: '자주 묻는 질문 (FAQ)',
      content: [
        {
          subtitle: 'Q1: "조건 검색 종목 수가 너무 많다" 오류',
          text: (
            <p>
              최대 실행 종목 수 초과 시 리스크 관리로 봇 실행 중단. [매매 로직 설정]에서 제한 조정.
            </p>
          ),
        },
        {
          subtitle: 'Q2: "동시에 두 개 이상의 봇 실행 불가" 메시지',
          text: (
            <p>
              API 호출 한도와 서버 자원 보호를 위해 한 번에 하나의 봇만 실행 가능. 기존 봇 중지 후 실행.
            </p>
          ),
        },
        {
          subtitle: 'Q3: 봇이 "error" 상태에서 멈춤',
          text: (
            <p>
              API 키 오류, 증권사 서버 문제 등으로 발생. [대시보드] &gt; 이벤트 로그 확인 후 봇 리셋.
            </p>
          ),
        },
      ],
    },
  ];

  return (
    <Container fluid className="user-guide-container my-5">
      <div className="text-center mb-4">
        <Link to="/" className="home-link">← 홈으로 돌아가기</Link>
        <h4 className="fw-bold">이용 안내</h4>
      </div>
      <Accordion activeKey={activeSection} onSelect={(eventKey) => setActiveSection(eventKey)}>
        {guideSections.map((section) => (
          <Accordion.Item eventKey={section.eventKey} key={section.eventKey} className="mb-3 shadow-sm">
            <Accordion.Header className="accordion-header">
              <div className="d-flex align-items-center">
                {section.icon}
                <h5 className="mb-0">{section.title}</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              {section.content.map((item, index) => (
                <Card key={index} className="mb-4 border-0 shadow-sm">
                  <Card.Body>
                    <h5 className="mb-3">{item.subtitle}</h5>
                    <div className="text-secondary">{item.text}</div>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default UserGuide;