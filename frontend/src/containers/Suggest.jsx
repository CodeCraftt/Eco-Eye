import React, { useState, useEffect, useRef, useContext } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Webcam from 'react-webcam';
import imag1 from '../assets/images/imag1.png'
import imag2 from '../assets/images/imag2.png'
import imag3 from '../assets/images/imag3.png'
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Suggest = () => {
  const [scrollPosition, setScrollPosition] = useState(20);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [recyclingSteps, setRecyclingSteps] = useState("");
  const webcamRef = useRef(null);
  const navigate = useNavigate();


  const { user, setUser } = useContext(AuthContext); // Access user and setUser from AuthContext

 
  const handleTaskFunction=() => {
    
    
    if (!user) {
        toast.error("You should Logged in to access EcoGuide!!")
        navigate("/login");
        return;
      }
      setIsWebcamOpen(true);
    }


  const handleScroll = () => {
    // Calculate scroll position from the top of the document
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const getRecyclingSteps = async (cls) => {
    const sending = { trashClass: cls };
    axios({
      method: "POST",
      url: "http://localhost:5000/api/requests/scan",
      data: sending,
      headers: {
        'Authorization': "Bearer " + user.token,
      }
    })
    .then((response) => {
      let content = response.data.recyclingInfo;
      // Redirect to the Suggestion component and pass the content as state
      // console.log(content);
      user.earnedReward+=1;
      toast.success("You have earned 1 reward point.")
      navigate('/suggestion', { state: { content } });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      axios({
        method: "POST",
        url: trained_model_deployment_link,
        params: {
          api_key: api_key
        },
        data: imageSrc,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        let cls = response.data.predictions ? response.data.predictions[0].class : "";
        console.log(cls);
        
        getRecyclingSteps(cls); // Fetch recycling steps using the class
      })
      .catch(function(error) {
        console.log(error.message);
      });
    }
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({

          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          imageSrc,
        });
      });
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <>
      <Navbar bgg={true} />
      <div className="mt-32 px-4 md:px-20 suggest-container">
        <div
          className="hidden md:block fixed top-[120px] left-1/2 transform -translate-x-1/2 middle-line max-h-[48vh]"
          style={{ height: `${scrollPosition*0.45}px`, width: '2px', backgroundColor: 'green' }}
        >
          <div className='h-[20px] w-[20px] rounded-full bg-green-800  absolute bottom-0 -left-[8.6px]'></div>
        </div>
        <h1 className="text-5xl font-bold mb-4">How to use EcoGuide ?</h1>

        <div className="steps-container flex flex-col gap-[25vh]">
          <div className="flex-col gap-20 flex md:flex-row">
            <img
              className="hover:scale-95 hover:shadow-none duration-200 shadow-gray-500 shadow-lg border-2 border-black  w-full object-cover rounded-lg h-[45vh] md:w-1/2 order-2 md:order-2"
              src={imag1}
              alt="Step 1"
            />

            <div className="order-1 md:w-1/2 w-full text-[1.2rem] flex flex-col items-start justify-center">
              <h2 className="text-3xl font-semibold my-4"> Step 1:</h2>
              <p>Take a photo of the garbage</p>
            </div>
          </div>

          <div className="flex-col gap-20 flex md:flex-row">
            <img
              className="hover:scale-95 hover:shadow-none duration-200 shadow-gray-500 shadow-lg border-2 border-black w-full object-cover rounded-lg h-[75vh] md:w-1/2 order-2 md:order-1"
              src={imag2}
              alt="Step 2"
            />
            <div className="order-1 md:w-1/2 w-full text-[1.2rem] flex flex-col items-start justify-center">
              <h2 className="text-3xl font-semibold my-4"> Step 2:</h2>
              <p>Submit to our smart guide</p>
            </div>
          </div>

          <div className="flex-col gap-20 flex md:flex-row">
          <div className='hover:scale-95 hover:shadow-none duration-200 shadow-gray-500 shadow-lg border-2 flex justify-center items-center border-black w-full rounded-lg h-[75vh] md:w-1/2 order-2 md:order-2'>
            <img className='h-[98%]'
              src={imag3}
              alt="Step 3"

              
            />
            </div>
            <div className="order-1 md:w-1/2 w-full text-[1.2rem] flex flex-col items-start justify-center">
              <h2 className="text-3xl font-semibold my-4"> Step 3:</h2>
              <p>Get proper suggestions to recycle that trash</p>
            </div>
          </div>
        </div>
      </div>

      
<button
className="my-28 block mx-auto btn btn-info text-white"
onClick={handleTaskFunction}
>
Scan
</button>
{isWebcamOpen && (
<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
  <div className="bg-white p-5 rounded-lg">
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      className="w-full md:w-[45vw] h-[45vh] rounded-lg"
    />
   <div className='mt-3 flex justify-around '>
   <button className="btn btn-primary " onClick={handleCapture}>
      Capture Image
    </button>
    <button
      className="btn btn-secondary  "
      onClick={() => setIsWebcamOpen(false)}
    >
      Close
    </button>
   </div>
    {location && (
      <div className="mt-3 flex flex-col items-center justify-center">
        <p>Wait for few minutes...</p>
    
        <img
          src={location.imageSrc}
          alt="Captured"
          className="mt-3 w-[300px] h-[200px]"
        />
      </div>
    )}
    {recyclingSteps && (
      <div className="mt-3">
        <h2 className="text-xl font-bold">Recycling Steps:</h2>
        <p>{recyclingSteps}</p>
      </div>
    )}
  </div>
</div>
)}
    </>
  );
};

export default Suggest;

