import React from "react";
import { Hero } from "../../components/home/Hero";
import { Stats } from "../../components/home/Stats";
import { Features } from "../../components/home/Features";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Stats />
        <Features />
      </main>
    </>
  );
};

export default Home;
