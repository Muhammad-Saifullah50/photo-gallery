import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <section className="w-full h-screen overflow-hidden relative -z-10">
      <video autoPlay muted loop className="w-full h-full object-cover md:object-fill ">
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="overlay absolute z-10 w-full h-screen top-0 flex flex-col justify-center items-center px-10 text-center bg-opacity-30 bg-black">
        <div>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-normal md:leading-relaxed">Discover, Save and Share the Photos you love with the World</h1>
        </div>
        
      </div>
      

    </section>
  );
};

export default Home;

 
