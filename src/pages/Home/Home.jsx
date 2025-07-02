import React from "react";
import HomeBoxes from "../../components/HomeBoxes/HomeBoxes";
import HomeActions from "../../components/HomeAction/HomeAction";
import Faq from "../../components/FAQ/Faq";

import Layout from "../../components/Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="home-container flex flex-col gap-[80px]">
        <HomeBoxes />
        <HomeActions />
        <Faq />
      </div>
    </Layout>
  );
};

export default Home;
