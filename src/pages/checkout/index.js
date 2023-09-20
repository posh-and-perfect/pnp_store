import Head from "next/head";
import { Fragment } from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import CheckoutPageContent from "@components/checkout";
import Header from "@components/header";
import Footer from "@components/footer";
import { HomePagesNavData as navContent } from "@data/navbar";
import ContentWrapper from "@components/wrapper";

const CheckoutPage = () => {
  const logo = "/assets/images/logo/logo_hztl_tr.png"

  return (
    <Fragment>
      <Head>
        <title>
          Checkout - Wokiee :: React Next JS Multipurpose eCommerce Template
        </title>
      </Head>

      <Header
        logo={logo}
        navbar={true}
        navData={navContent}
        navbarAlignment="left"
      />
      <ContentWrapper>
        <Breadcrumb />

        <div className="checkout-page-content content-indent">
          <CheckoutPageContent />
        </div>
      </ContentWrapper>
      <Footer logo={logo} />
    </Fragment>
  );
};

export default CheckoutPage;
