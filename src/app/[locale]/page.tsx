
import ShopByCategory from "../componenets/category/ShopByCategory";
import OfferBanner from "../componenets/discoutSecton/OfferBanner";
import Header from "../componenets/header/Header";
import Navbar from "../componenets/header/Navbar";
import Banner from "../componenets/heroSection/Banner";
import Features from "../componenets/heroSection/Features";
import TopNewArrival from "../componenets/topNewArival/TopNewArival";
import TrendingProducts from "../componenets/trandingSection/TrandingProduct";

function page() {

 
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <ShopByCategory></ShopByCategory>
      <TopNewArrival></TopNewArrival>
      <OfferBanner></OfferBanner>
      <TrendingProducts></TrendingProducts>
    </div>
  );
}

export default page;
