import { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

function PrivacyPage() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        document.body.classList.add('dashboard-page-body');
        return () => {
            document.body.classList.remove('dashboard-page-body');
        };
    }, []);

    return (
        <Container className="legal-container py-5">
            <Card className="legal-card shadow-lg border-0">
                <Card.Header as="h2" className="text-center py-4 border-bottom border-secondary bg-transparent text-white">
                    개인정보 처리방침
                </Card.Header>
                <Card.Body className="p-4 p-md-5 text-light">
                    <p className="mb-4 text-justify op-8">
                        프랜홀딩스 (이하 '회사' 또는 '서비스')는 이용자의 개인정보를 중요시하며, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 및 「개인정보보호법」 등 관련 법규를 준수하고 있습니다. 본 개인정보 수집 및 이용 동의서는 이용자 여러분께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                    </p>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">1. 총칙</h4>
                        <p className="mb-3">
                            <strong className="text-primary">● 정의</strong>: 본 동의서에서 사용하는 용어의 정의는 「개인정보보호법」 및 관련 법령이 정하는 바에 따릅니다.<br />
                            <strong className="text-primary">● 목적</strong>: 회사는 이용자의 개인정보를 보호하고, 관련 법령에 의거하여 적법하게 개인정보를 처리합니다.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">2. 수집하는 개인정보의 항목 및 수집방법</h4>
                        <p className="mb-3">
                            회사는 서비스 제공을 위해 최소한의 개인정보만을 수집하며, 이용자의 동의 없이는 개인정보를 수집하지 않습니다.
                        </p>
                        <div className="bg-dark-soft p-4 rounded-3 mb-4">
                            <h5 className="text-primary mb-3">가. 수집하는 개인정보 항목</h5>
                            <p className="mb-1">회사는 회원가입, 원활한 고객상담, 각종 서비스의 제공을 위해 최초 회원가입 당시 아래와 같은 개인정보를 수집하고 있습니다.</p>
                            <ul className="list-unstyled ms-3">
                                <li className="mb-2">• <strong>이메일 회원가입 시</strong>: [필수] 이메일 주소, 비밀번호</li>
                                <li className="mb-2">• <strong>소셜 로그인(Google) 이용 시</strong>: [필수] 이메일 주소, 이름, 프로필 사진, 소셜 계정 고유 식별자</li>
                                <li className="mb-0">• <strong>서비스 이용 과정에서</strong>: 서비스 이용 기록, 접속 로그, 결제 기록, 불량 이용 기록, 기기 정보 등</li>
                            </ul>
                        </div>

                        <div className="bg-dark-soft p-4 rounded-3">
                            <h5 className="text-primary mb-3">나. 개인정보 수집방법</h5>
                            <p className="mb-1">회사는 다음과 같은 방법으로 개인정보를 수집합니다.</p>
                            <ul className="list-unstyled ms-3">
                                <li className="mb-2">• 데스크톱 앱 회원가입 및 소셜 로그인(Google) 연동</li>
                                <li className="mb-0">• 생성 정보 수집 도구를 통한 자동 수집</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">3. 개인정보의 수집 및 이용목적</h4>
                        <p className="mb-4">
                            회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                        </p>
                        <ul className="list-group list-group-flush bg-transparent">
                            <li className="list-group-item bg-transparent text-light border-secondary py-3 px-0">
                                <strong className="text-primary d-block mb-1">서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산</strong>
                                <span className="op-8">콘텐츠 제공, 구매 및 요금 결제, 본인 인증</span>
                            </li>
                            <li className="list-group-item bg-transparent text-light border-secondary py-3 px-0">
                                <strong className="text-primary d-block mb-1">회원 관리</strong>
                                <span className="op-8">회원제 서비스 이용에 따른 본인 확인, 개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 불만 처리 등 민원 처리, 고지사항 전달</span>
                            </li>
                            <li className="list-group-item bg-transparent text-light border-secondary py-3 px-0">
                                <strong className="text-primary d-block mb-1">고객 서비스 및 통계</strong>
                                <span className="op-8">서비스 이용에 대한 통계 분석, 서비스 개선 및 신규 서비스 개발</span>
                            </li>
                            <li className="list-group-item bg-transparent text-light border-0 py-3 px-0">
                                <strong className="text-primary d-block mb-1">법령상 의무 이행</strong>
                                <span className="op-8">관련 법령 및 규정 준수</span>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">4. 개인정보의 보유 및 이용 기간</h4>
                        <p className="mb-4">
                            이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
                        </p>

                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="bg-dark-soft h-100 p-4 rounded-3 border border-secondary">
                                    <h5 className="text-primary mb-3">회사 내부 방침</h5>
                                    <p className="mb-0 small op-8"><strong>부정 이용 기록</strong>: 부정 이용 방지 및 수사 협조를 위해 1년 보관</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="bg-dark-soft h-100 p-4 rounded-3 border border-secondary">
                                    <h5 className="text-primary mb-3">관련 법령</h5>
                                    <ul className="list-unstyled mb-0 small op-8">
                                        <li className="mb-2">• 계약 또는 청약철회 기록: 5년</li>
                                        <li className="mb-2">• 대금결제 및 재화 공급 기록: 5년</li>
                                        <li className="mb-2">• 소비자 불만/분쟁 처리 기록: 3년</li>
                                        <li className="mb-2">• 표시/광고 기록: 6개월</li>
                                        <li className="mb-0">• 서비스 이용 기록: 3개월</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">5. 개인정보 처리 위탁</h4>
                        <p className="mb-4 op-8">
                            회사는 서비스 향상을 위해 아래와 같이 개인정보 처리 업무를 외부 전문기관에 위탁하여 운영하고 있습니다.
                        </p>
                        <div className="bg-dark-soft p-4 rounded-3 border border-secondary">
                            <p className="mb-1"><strong className="text-primary">수탁업체:</strong> Whop (Whop Inc.)</p>
                            <p className="mb-0"><strong className="text-primary">위탁업무:</strong> 유료 서비스 결제 처리, 구독 및 크레딧 관리</p>
                        </div>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">6. 이용자 권리 및 행사 방법</h4>
                        <p className="mb-3 op-8">
                            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 가입 해지를 요청할 수도 있습니다.
                        </p>
                        <ul className="list-unstyled ms-2 op-8">
                            <li className="mb-2">○ <strong>조회/수정:</strong> AutoFlux 데스크톱 앱 [계정 관리] 메뉴</li>
                            <li className="mb-2">○ <strong>회원 탈퇴:</strong> AutoFlux 데스크톱 앱 [계정 관리] 메뉴</li>
                            <li className="mb-0">○ 정정 요청 시 완료 전까지 해당 정보 이용/제공을 중단합니다.</li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">7. 개인정보보호 책임자</h4>
                        <div className="bg-primary bg-opacity-10 p-4 rounded-3 border border-primary border-opacity-25">
                            <p className="mb-1"><strong>책임자:</strong> 김재현 (프랜홀딩스)</p>
                            <p className="mb-0"><strong>이메일:</strong> <a href="mailto:autoflux.master@gmail.com" className="text-primary text-decoration-none">autoflux.master@gmail.com</a></p>
                        </div>
                    </section>

                    <div className="text-center mt-5 pt-4 border-top border-secondary">
                        <button
                            type="button"
                            className="btn btn-outline-primary px-5 py-2"
                            onClick={handleGoBack}
                        >
                            이전으로 돌아가기
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PrivacyPage;
