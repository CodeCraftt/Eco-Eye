import React from "react";
import Navbar from "../components/Navbar.jsx";
import back from "../assets/images/back.png";
import green from "../assets/images/green.jpg";
import { useEffect } from "react";
import gasp from 'gsap';
import { Link } from "react-router-dom";


const LandingPage = () => {
  

  useEffect(() => {
   const functionsLod=()=>{
    const headd=document.querySelector('#title');
    gsap.from(headd,{
      x:-60,
      opacity:0,
      delay:0.5,
      duration:0.9,
      stagger:0.2,
    })


    gsap.from(document.querySelector('#heading p'),{
      x:-60,
      opacity:0,
      delay:0.8,
      duration:0.9,
      stagger:0.2,
    })

   }

  functionsLod();
 }, []);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-[100vh] ">


        <div
          id="heading"
          className="px-[5vw] py-[27vh] w-full h-[100vh]  text-white bg-left md:bg-center"
          style={{ backgroundImage: `url(${back})`, backgroundSize: "cover" }}
        >
          {/* Your content here */}

          <h1 id="title" className="text-[3rem] my-3"
          style={{ lineHeight: "8vh",
            textTransform: "uppercase"}}>
            Take care <br /> of <span className="text-[4.5rem]">our</span>{" "}
            <br /> <span className="text-[4.5rem]">Planet</span>
          </h1>
          <p className="w-full md:w-[27vw] leading-loose my-5 text-[0.8rem] opacity-65 font-[500]">
            Pollution doesn't just harm the environment, it endangers our
            future. Let's act now to protect our planet and ensure a cleaner,
            healthier world for generations to come.
            <br /><br />
           <Link to={"/suggest"}> <button className="btn btn-outline btn-success block">See More</button></Link>
          </p>
        
        </div>


      </div>
    </>
  );
};

export default LandingPage;