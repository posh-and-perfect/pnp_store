import { Fragment } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";

const SigninForm = ({ csrfToken }) => {
  return (
    <Fragment>
      <h1 className="tt-title-subpages noborder">ALREADY REGISTERED?</h1>
      <div className="tt-login-form">
        <Row>
          <Col md={6}>
            <div className="tt-item">
              <h2 className="tt-title">NEW CUSTOMER</h2>
              <p>
                By creating an account with our store, you will be able to move
                through the checkout process faster, store multiple shipping
                addresses, view and track your orders in your account and more.
              </p>
              <div className="form-group">
                <Link href="/account/register">
                  <a className="btn btn-top btn-border">CREATE AN ACCOUNT</a>
                </Link>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="tt-item">
              <h2 className="tt-title">LOGIN</h2>
              <p>If you have an account with us, please log in.</p>
              <div className="form-default form-top">
                <form
                  id="customer_login"
                  method="post"
                  action="/api/auth/callback/credentials"
                  noValidate="novalidate"
                >
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
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
                    />
                  </div>
                  <Row>
                    <Col xs="auto" className="mr-auto">
                      <div className="form-group">
                        <button className="btn btn-border" type="submit">
                          LOGIN
                        </button>
                      </div>
                    </Col>
                    <Col xs="auto" className="align-self-center">
                      <div className="form-group">
                        <ul className="additional-links">
                          <li>
                            <Link href="/account/register">
                              Lost your password?
                            </Link>
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
    </Fragment>
  );
};

export default SigninForm;
