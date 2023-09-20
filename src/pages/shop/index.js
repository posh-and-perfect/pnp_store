import Head from "next/head";
import {Fragment, useContext} from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import ShopGrid from "@components/shop/ShopGrid";
import Header from "@components/header";
import Footer from "@components/footer";
import {ProductsContext} from "@global/ProductsContext";
import {HomePagesNavData as navContent} from "@data/navbar";
import ContentWrapper from "@components/wrapper";



const PageShop = () => {
    const {products} = useContext(ProductsContext);
    const logo = "/assets/images/logo/logo_hztl_tr.png"

    return (
        <Fragment>
            <Head>
                <title>Shop - Men & Women</title>
                <meta name="description" content="Best Zambian Online Store for Authentic Fasion Brands"/>
            </Head>

            <Header
                logo={logo}
                dark={false}
                navData={navContent}
                navbarAlignment="center"
                showNotificationBar={false}
            />

            <ContentWrapper>
                <Breadcrumb/>

                <ShopGrid
                    products={products}
                    sidebar={true}
                    sidebarPosition="left"
                    containerFluid={false}
                />
            </ContentWrapper>

            <Footer
                logo={logo}
            />
        </Fragment>
    )
};

export default PageShop;