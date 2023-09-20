import Head from "next/head";


const SiteHead = ({ title="", pageDesc="Verified Authentic", description="The Best Zambian Store For Authentic Fashion"}) => {

    const siteName = "Posh and Perfect";

    <Head>
        <title>{title ? title : siteName}{pageDesc}</title>
        <meta name="description" content={description} />
    </Head>
}


export default SiteHead;