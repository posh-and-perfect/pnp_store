import Head from "next/head";
import {Fragment, useContext} from "react";
import Footer from "@components/footer";
import Header from "@components/header";
import {ProductsContext} from "@global/ProductsContext";
import {HomePagesNavData as navContent} from "@data/navbar";
import CategoryPromo from "@components/promo";
import {CategoryTypeWiseOne as Products} from "@components/products";
import ContentWrapper from "@components/wrapper";



const Home = () => {
    const {products} = useContext(ProductsContext);
    const logo = "/assets/images/logo/logo_hztl_tr.png"

    return (
        <Fragment>
            <Head>
                <title>Posh and Perfect - Best Zambian Online Store for Authentic Fashion Brands</title>
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
                <CategoryPromo
                    btn={true}
                    containerFluid={true}
                    className="nomargin"
                    btnLink="/product/category/women"
                    subtitle="<strong><span class='tt-base-color'>Women’s</span></strong>"
                    title="<span class='tt-white-color'>Sales<br>70% Off</span>"
                    thumb="/assets/images/promo/promo-1.png"
                />
                <Products
                    category="women"
                    containerFluid={true}
                    products={products}
                />

                <CategoryPromo
                    btn={true}
                    containerFluid={true}
                    btnLink="/product/category/men"
                    subtitle="<span class='tt-base-color'>Men’s</span>"
                    title="New<br>Arrival"
                    thumb="/assets/images/promo/promo-2.png"
                />
                <Products
                    category="men"
                    containerFluid={true}
                    products={products}
                />
            </ContentWrapper>

            <Footer
                logo={logo}
                newsletter={true}
            />
        </Fragment>
    )
}

export default Home;