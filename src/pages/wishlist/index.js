import Head from "next/head";
import {Fragment, useContext} from "react";
import Breadcrumb from "@components/ui/breadcrumb";
import Header from "@components/header";
import Footer from "@components/footer";
import {WishlistContext} from "@global/WishlistContext";
import {HomePagesNavData as navContent} from "@data/navbar";
import EmptyWishlist from "@components/wishlist/EmptyWishlist";
import WishlistProducts from "@components/wishlist/WishlistProducts";
import ContentWrapper from "@components/wrapper";
import {useMount} from "@hooks"


const WishlistPage = () => {
    const {wishlist} = useContext(WishlistContext);
    const logo = "/assets/images/logo/logo_hztl_tr.png"
    const mounted = useMount();

    if(!mounted) return null;

    return (
        <Fragment>
            <Head>
                <title>Wishlist - Wokiee :: React Next JS Multipurpose eCommerce Template</title>
            </Head>

            <Header
                logo={logo}
                navbar={true}
                navData={navContent}
                navbarAlignment="left"
            />
            <ContentWrapper>
                <Breadcrumb/>

                <div className="wishlist-page-content content-indent">
                    {wishlist.length > 0 && <WishlistProducts/>}
                </div>

                {wishlist.length === 0 && (
                    <div className="empty-wishlist-wrapper">
                        <EmptyWishlist/>
                    </div>
                )}
            </ContentWrapper>
            <Footer logo={logo}/>
        </Fragment>
    );
};

export default WishlistPage;