import { Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Head from 'next/head';
import Link from "next/link";
import Header from '@components/header';
import Footer from '@components/footer';
import { HomePagesNavData as navContent } from '@data/navbar';
import ContentWrapper from '@components/wrapper';
import SignupForm from '@components/auth/signup-form';



const SignupPage = () => {
  const logo = "/assets/images/logo/logo_hztl_tr.png"

  return (
    <Fragment>
      <Head>
        <title>Sign Up - Posh and Perfect</title>
      </Head>

      <Header logo={logo} navbar={true} navData={navContent} navbarAlignment="left" />
      <ContentWrapper>
        {/* Breadcrumb */}
        {/* ... */}
        <div className="container-indent">
          <Container>
            <h1 className="tt-title-subpages noborder">CREATE AN ACCOUNT</h1>
            <div className="tt-login-form">
              <Row>
                <Col md={6}>
                  {/* Existing content */}
                  <div className="tt-item">
                    {/* ... */}
                    <h2 className="tt-title">NEW CUSTOMER</h2>
                    <p>
                      By creating an account with our store, you will be able to move through the checkout process
                      faster, store multiple shipping addresses, view and track your orders in your account and more.
                    </p>
                    <div className="form-group">
                      <Link href="/account/signin">
                        <a className="btn btn-top btn-border">SIGN IN</a>
                      </Link>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  {/* Render the SignupForm component */}
                  <div className="tt-item">
                    <h2 className="tt-title">SIGN UP</h2>
                    <p>Please fill in the form below to create an account.</p>
                    <div className="form-default form-top">
                      <SignupForm />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </ContentWrapper>
      {/* Footer */}
      <Footer logo={logo} />
    </Fragment>
  );
};

export default SignupPage;
