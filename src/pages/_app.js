import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import { getSession, SessionProvider } from "next-auth/react"; // Fix the import here
import CartContextProvider from "@global/CartContext";
import CompareContextProvider from "@global/CompareContext";
import ProductsContextProvider from "@global/ProductsContext";
import WishlistContextProvider from "@global/WishlistContext";
import 'react-tippy/dist/tippy.css';
import "@assets/scss/style.scss";

const client = new MongoClient(process.env.MONGODB_URI);

const Posh = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}> {/* Use SessionProvider here */}
      <Fragment>
        <Head>
        </Head>
        <Head>
          <title>Posh and Perfect - Best online store in Zambia</title>
        </Head>


        <CartContextProvider>
          <CompareContextProvider>
            <WishlistContextProvider>
              <ProductsContextProvider>
                <Component {...pageProps} />
              </ProductsContextProvider>
            </WishlistContextProvider>
          </CompareContextProvider>
        </CartContextProvider>
      </Fragment>
    </SessionProvider>
  );
};

export async function getServerSideProps(context) {
  // Connect to MongoDB
  await client.connect();

  // Retrieve session data
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Posh;