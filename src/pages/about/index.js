import Head from "next/head";
import {Fragment} from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import {Col, Container, Row} from "react-bootstrap";
import Header from "@components/header";
import Footer from "@components/footer";
import {HomePagesNavData as navContent} from "@data/navbar";
import ContentWrapper from "@components/wrapper";

const PageAbout = () => {
    const logo = "/assets/images/logo/logo_hztl_tr.png"

    return (
        <Fragment>
            <Head>
                <title>Posh and Perfct - About us</title>
                <meta name="description" content="Best online store in zambia"/>
            </Head>

            <Header
                logo={logo}
                navbar={true}
                navData={navContent}
                navbarAlignment="left"
            />
            <ContentWrapper>
                <Breadcrumb/>
                <div className="content-indent">
                    <Container className="container-fluid-custom-mobile-padding">
                        <Row>
                            <Col md={11} lg={9}>
                                <div className="tt-about-box-02">
                                    <h2 className="tt-title our-intro">Posh and Perfect is your premier online fashion boutique in Zambia, catering to both men and women who appreciate style and quality. Our carefully curated collection showcases the latest trends in clothing and high-quality sneakers, making us your go-to destination for fashion-forward individuals. Discover the perfect blend of sophistication and comfort as you explore our diverse range of apparel and footwear. Elevate your wardrobe with Posh and Perfect, where fashion meets perfection for the trendsetting fashion enthusiast in Zambia.</h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <div className="container-fluid-custom mt-5">
                        <div className="tt-col-img">
                            <Row>
                                <Col md={6}>
                                    <img src="/assets/images/custom/about2-img-01.jpg" alt="wokiee"/>
                                </Col>
                                <Col md={3}>
                                    <img src="/assets/images/custom/about2-img-02.jpg" alt="wokiee"/>
                                </Col>
                                <Col md={3}>
                                    <img src="/assets/images/custom/about2-img-03.jpg" alt="wokiee"/>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <Container className="container-fluid-custom-mobile-padding mt-5">
                        <div className="tt-about02-col-list">
                            <Row>
                                <Col md={6}>
                                    <h5 className="tt-title">OUR STORES</h5>
                                    <div className="width-90">
                                        <p className="mt-0">Lorem ipsum dolor sit amet conse ctetur adipisicing elit,
                                            sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse. Lorem ipsum
                                            dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor.</p>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <h5 className="tt-title">CONTACTS</h5>
                                    <div className="tt-box-info">
                                        <p>
                                            <span className="tt-base-dark-color">Address: </span>
                                            2548 Broaddus Maple Court Avenue, Madisonville KY 4783,<br/> United States
                                            of America
                                        </p>
                                        <p><span className="tt-base-dark-color">Phone:</span> +777 2345 7885: +777 2345
                                            7886</p>
                                        <p><span className="tt-base-dark-color">Hours:</span> 7 Days a week from 10 am
                                            to 6 pm</p>
                                        <p><span className="tt-base-dark-color">E-mail:</span> info@mydomain.com</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </ContentWrapper>
            <Footer
                logo={logo}
                newsletter={true}
            />
        </Fragment>
    );
};

export default PageAbout;