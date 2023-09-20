import Head from "next/head";
import {useRouter} from 'next/router';
import {Fragment, useContext} from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import ShopGrid from "@components/shop/ShopGrid";
import Header from "@components/header";
import Footer from "@components/footer";
import {ProductsContext} from "@global/ProductsContext";
import {HomePagesNavData as navContent} from "@data/navbar";
import ContentWrapper from "@components/wrapper";

const SearchPage = () => {
    const {products} = useContext(ProductsContext);
    const logo = "/assets/images/logo/logo_hztl_tr.png"
    const router = useRouter();
    const {q} = router.query;
    const filteredProducts = products.filter((val) => {
        if (q === "") {
            return val;
        } else if (val.name.toLowerCase().includes(q?.toLowerCase())) {
            return val;
        }
    })

    return (
        <Fragment>
            <Head>
                <title>{`Search: ${filteredProducts?.length} results found for "${q}" - Wokiee :: React Next JS Multipurpose eCommerce Template`}</title>
                <meta name="description" content="React Next JS Multipurpose eCommerce Template"/>
            </Head>

            <Header
                logo={logo}
                navbar={true}
                navData={navContent}
                navbarAlignment="left"
            />
            <ContentWrapper>
                <Breadcrumb/>

                <ShopGrid
                    sidebar={false}
                    containerFluid={false}
                    products={filteredProducts}
                />
            </ContentWrapper>
            <Footer
                logo={logo}
                newsletter={true}
            />
        </Fragment>
    );
};

export default SearchPage;