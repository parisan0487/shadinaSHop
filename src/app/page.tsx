import BodyComp from "../components/layout/body/bodyComp";
import HeaderComp from "../components/layout/header/headerComp";
import Footer from "../components/layout/footer/footerComp";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>shadinaShop</title>
        <meta name="description" content="پوشاک بچه گانه شادینا" />
      </Head>
      <div>
        <HeaderComp />
        <BodyComp />
        <Footer />
      </div>
    </>
  );
}
