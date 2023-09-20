import Head from "next/head";
import {Fragment} from "react";
import products from '@data/products';
import Breadcrumb from "@components/ui/breadcrumb";
import SocialShare from "@components/social-share";
import {RelatedProducts} from "@components/products";
import Footer from "@components/footer";
import Header from "@components/header";
import ProductDetails from "@components/product-details";
import {HomePagesNavData as navContent} from "@data/navbar";
import ContentWrapper from "@components/wrapper";


const PageProductDetails = ({product}) => {
    const {categories, excerpt, name, tags} = product;
    const slug = `/product/${name.toLowerCase().split(' ').join('-')}`;

    const logo = "/assets/images/logo/logo_hztl_tr.png"

    return (
        <Fragment>
            <Head>
                <title>{name + ' - Wokiee :: React Next JS Multipurpose eCommerce Template'}</title>
                <meta name="description" content={excerpt}/>
            </Head>

            <Header
                logo={logo}
                navbar={true}
                navData={navContent}
                navbarAlignment="left"
            />
            <ContentWrapper>
                <Breadcrumb/>

                <ProductDetails
                    product={product}
                />
                <SocialShare url={slug} content={name}/>
                <RelatedProducts categories={categories} tags={tags}/>
            </ContentWrapper>
            <Footer logo={logo}/>
        </Fragment>
    );
};

export const getStaticProps = async ({params}) => {
    const product = products.find(product => product.name.toLowerCase().split(' ').join('-') === params.slug);
    return {
        props: {
            product
        }
    }
}

export const getStaticPaths = async () => {
    return {
        paths: products.map(product => {
            return {
                params: {
                    slug: product.name.toLowerCase().split(' ').join('-')
                }
            }
        }),
        fallback: false
    }
}

export default PageProductDetails;