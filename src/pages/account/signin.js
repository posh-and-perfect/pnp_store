// pages/account/signin.js
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@components/header";
import Footer from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";
import ContentWrapper from "@components/wrapper";
import { signIn } from "next-auth/react";



const SigninPage = () => {
  const logo = "/assets/images/logo/logo_hztl_tr.png"
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    // Perform form validation if needed
    if (!credentials.username || !credentials.password) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      // Call the NextAuth.js signin function
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false, // Do not redirect, handle the response manually
      });

      if (result.error) {
        // Sign-in failed
        setError("Failed to sign in. Please check your credentials.");
      } else {
        // Sign-in was successful
        router.push("/"); // Redirect to the dashboard or any other page as needed
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("An error occurred during form submission.");
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Signin - Posh and Perfect</title>
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={navContent}
        navbarAlignment="left"
      />
      <ContentWrapper>
        <Breadcrumb />

        <div className="container-indent">
          <Container>
            <h1 className="tt-title-subpages noborder">ALREADY REGISTERED?</h1>
            <div className="tt-login-form">
              <Row>
                <Col md={6}>
                  <div className="tt-item">
                    <h2 className="tt-title">NEW CUSTOMER</h2>
                    <p>By creating an account with our store, you will be able to move through the
                      checkout process faster, store multiple shipping addresses, view and track
                      your orders in your account and more.
                    </p>
                    <div className="form-group">
                      <Link href="/account/signup" className="btn btn-top btn-border">
                        CREATE AN ACCOUNT
                      </Link>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="tt-item">
                    <h2 className="tt-title">SIGN IN</h2>
                    <p>If you have an account with us, please sign in.</p>
                    <div className="form-default form-top">
                      <form id="customer_login" onSubmit={handleSubmit} noValidate="novalidate">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="form-group">
                          <label htmlFor="loginUserName">USERNAME OR E-MAIL *</label>
                          <div className="tt-required">* Required Fields</div>
                          <input
                            type="text"
                            name="username"
                            id="loginUserName"
                            className="form-control"
                            placeholder="Enter Username or E-mail"
                            required
                            value={credentials.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="loginPassword">PASSWORD *</label>
                          <input
                            type="password"
                            name="password"
                            id="loginPassword"
                            className="form-control"
                            placeholder="Enter Password"
                            required
                            value={credentials.password}
                            onChange={handleChange}
                          />
                        </div>
                        <Row>
                          <Col xs="auto" className="mr-auto">
                            <div className="form-group">
                              <button className="btn btn-border" type="submit">
                                SIGN IN
                              </button>
                            </div>
                          </Col>
                          <Col xs="auto" className="align-self-center">
                            <div className="form-group">
                              <ul className="additional-links">
                                <li>
                                  <Link href="/account/reset">Lost your password?</Link>
                                </li>
                              </ul>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </ContentWrapper>
      <Footer logo={logo} />
    </Fragment>
  );
};

export default SigninPage;
