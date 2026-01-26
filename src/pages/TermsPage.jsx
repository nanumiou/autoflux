import { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

function TermsPage() {
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
                    서비스 이용 약관
                </Card.Header>
                <Card.Body className="p-4 p-md-5 text-light">
                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">제1조 (목적)</h4>
                        <p className="op-8">
                            이 약관은 프랜홀딩스 (이하 "회사"라 합니다)가 제공하는 자동매매 관련 제반 서비스(이하 "서비스"라 합니다)의 이용과 관련하여, 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">제2조 (용어의 정의)</h4>
                        <ul className="list-group list-group-flush bg-transparent">
                            <li className="list-group-item bg-transparent text-light border-secondary py-3 px-0 op-8">
                                <strong>1. "서비스"</strong>: 회원이 직접 설정한 "매매 로직"에 따라 자동매매 주문을 실행할 수 있도록 회사가 제공하는 모든 플랫폼 및 관련 기능을 의미합니다.
                            </li>
                            <li className="list-group-item bg-transparent text-light border-secondary py-3 px-0 op-8">
                                <strong>2. "회원"</strong>: 본 약관에 동의하고 서비스 이용계약을 체결한 자를 의미합니다.
                            </li>
                            <li className="list-group-item bg-transparent text-light border-secondary py-3 px-0 op-8">
                                <strong>3. "API 키"</strong>: 거래소 계좌 접근 및 매매 주문 실행을 위해 발급받은 고유 식별 정보를 의미합니다.
                            </li>
                            <li className="list-group-item bg-transparent text-light border-0 py-3 px-0 op-8">
                                <strong>4. "매매 로직"</strong>: 회원이 설정하는 투자 전략에 대한 파라미터 값의 집합을 의미합니다.
                            </li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">제6조 (구독 및 크레딧, 환불 정책)</h4>
                        <div className="bg-dark-soft p-4 rounded-3 border border-secondary">
                            <ul className="list-unstyled mb-0 op-8">
                                <li className="mb-2">• 서비스를 '구독'과 '크레딧' 방식의 유료 서비스로 제공합니다.</li>
                                <li className="mb-2">• 'Premium 구독' 시 실전 매매 권한 및 정기 크레딧이 제공됩니다.</li>
                                <li className="mb-2">• '크레딧'은 AI 전략 생성 등 특정 기능 이용 시 차감되는 소모성 포인트입니다.</li>
                                <li className="mb-2">• 모든 결제는 Whop(결제 대행 플랫폼)을 통해 투명하게 처리됩니다.</li>
                                <li className="mb-0">• 디지털 콘텐츠 특성상 이미 사용된 크레딧의 환불은 제한될 수 있습니다.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">제9조 (면책 조항 및 위험 고지)</h4>
                        <div className="bg-danger bg-opacity-10 p-4 rounded-3 border border-danger border-opacity-25">
                            <p className="mb-2 op-9"><strong>오토플럭스는 사용자의 투자 판단을 돕는 '도구'이며, 어떠한 경우에도 투자 자문을 제공하지 않습니다.</strong></p>
                            <p className="mb-0 op-8 small">
                                모든 투자의 최종 결정과 그 결과(수익 및 손실)에 대한 책임은 전적으로 회원 본인에게 있습니다. 회사는 회원의 투자 손실에 대해 어떠한 법적 책임도 지지 않습니다.
                            </p>
                        </div>
                    </section>

                    <section className="mb-5">
                        <h4 className="border-start border-primary border-4 ps-3 mb-4 text-white">제11조 (부칙)</h4>
                        <p className="op-8">이 약관은 2025년 10월 10일부터 적용됩니다.</p>
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

export default TermsPage;
