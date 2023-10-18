"use client"

import { GettingStartedBtn } from "@/components";
import Image from "next/image";

const Home = () => {
  return (
    <section className="w-full h-screen overflow-hidden max-md:overflow-clip relative">
      <Image
        src='/bg.jpg'
        fill
        alt="bg"
        className=""
      />

      <div className="">
        <h1 className="relative z-20 p-20 text-center w-full  text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-normal md:leading-relaxed">Discover, Save and Share the Photos you love with the World</h1>
        <div className="relative z-20 flex justify-center items-center">
          <GettingStartedBtn />
        </div>
      </div>
    </section>
  );
};

export default Home;


