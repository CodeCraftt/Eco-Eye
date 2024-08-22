import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import submit from '../assets/images/submit.png'
import check from '../assets/images/check.png'
import request from '../assets/images/request.png'
import { AuthContext} from '../context/AuthContext';
import toast from 'react-hot-toast';

const Clean = () => {
  const [scrollPosition, setScrollPosition] = useState(20);
  const [task, setTask] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [response, setResponse] = useState(null);
  const [isSendRequestEnabled, setIsSendRequestEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  const { user, setUser } = useContext(AuthContext); // Access user and setUser from AuthContext

  // Redirect to home if already authenticated
 
  const handleTaskFunction=() => {
    if (!user) {
        toast.error("You should Logged in to send request!!")
        navigate("/login");
        return;
      }
    setTask(true);
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

  useEffect(()=>{
  function setLoc(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        toast.error('Geolocation is not supported by this browser.');
      }
  }
  setLoc();
  },[])
   
   

  async function funcemail(){
    try {
        
        const response = await axios.post(
            "http://localhost:5000/api/requests",
            {latitude:location.latitude, longitude:location.longitude},
            {
                headers: {
                    'Authorization': "Bearer " + user.token,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.status === 200) {
            toast.success("Report has been sent !!")
            toast.success("You earned 1 reward point");
            navigate("/profile");
        }
        else if(response.status==201){
            alert("Already have request from this same area..")
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error as per your application's requirements
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result.replace("data:image/jpeg;base64,", ""));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setTask(true);
    if (imageData) {
      setIsLoading(true); // Start loader
      axios({
        method: "POST",
        url: trained_model_deployment_link,
        params: {
          api_key: api_key
        },
        data: imageData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        setIsLoading(false); // Stop loader
        setResponse(response.data);
        console.log(response.data);

        // Check if predictions exist and validate confidence
        const predictions = response.data.predictions || [];
        const confidence = predictions.length > 0 ? predictions[0].confidence : 0;

        if (confidence >= 0.6) {
          setIsSendRequestEnabled(true);
        } 
      })
      .catch(function(error) {
        setIsLoading(false); // Stop loader in case of error
        console.log(error.message);
      });
    }
  };

  return (
    <>
      <Navbar bgg={true}/>

      {!task ? (<div className="mt-32 px-4 md:px-20 suggest-container">
        <div
          className="hidden md:block fixed top-[120px] left-1/2 transform -translate-x-1/2 middle-line max-h-[55vh]"
          style={{ height: `${scrollPosition*0.35}px`, width: '2px', backgroundColor: 'green' }}
        >
          <div className='h-[20px] w-[20px] rounded-full bg-green-800  absolute bottom-0 -left-[8.6px]'></div>
        </div>
        <h1 className="text-5xl font-bold mb-4">How to submit request?</h1>

        <div className="steps-container flex flex-col gap-[25vh]">
          <div className="flex-col gap-20 flex md:flex-row">
            <div className=" hover:scale-95 hover:shadow-none duration-200 shadow-gray-500 shadow-lg border-2 border-black flex justify-center items-center  w-full object-cover rounded-lg h-[45vh] md:w-[35%] order-2 md:order-2">
            <img
            className='h-[100%] w-auto'
              src={submit}
              alt="Step 1"
            />
            </div>

            <div className="order-1 md:w-1/2 w-full text-[1.2rem] flex flex-col items-start justify-center">
              <h2 className="text-3xl font-semibold my-4"> Step 1:</h2>
              <p>Take a photo of the unclean area.</p>
            </div>
          </div>

          <div className="flex-col gap-20 flex md:flex-row">
            <div className='hover:scale-95 hover:shadow-none duration-200 shadow-gray-500 shadow-lg border-2 rounded-lg   border-black flex order-2 md:order-1 justify-center h-[75vh] items-center w-full md:w-[48%]'>
            <img
              src={check}
              alt="Step 2"
            />
            </div>
            <div className="order-1 md:w-1/2 w-full text-[1.2rem] flex flex-col items-start justify-center">
              <h2 className="text-3xl font-semibold my-4"> Step 2:</h2>
              <p>Our system checks whether area has garbage or not.</p>
            </div>
          </div>

          <div className="flex-col gap-20 flex md:flex-row">
            <div className='hover:scale-95 hover:shadow-none duration-200 shadow-gray-500 shadow-lg border-2 flex justify-center items-center border-black w-full rounded-lg h-[75vh] md:w-1/2 order-2 md:order-2'>
        
            <img 
            className='h-[98%]'
              src={request}
              alt="Step 3"
            />
          
            </div>
            <div className="order-1 md:w-1/2 w-full text-[1.2rem] flex flex-col items-start justify-center">
              <h2 className="text-3xl font-semibold my-4"> Step 3:</h2>
              <p>After validating your image you can send request.</p>
            </div>
          </div>
        </div>


        <div className=" my-20 text-center">
                
            <button
              className="btn btn-info text-white"
              onClick={handleTaskFunction}
            >
              Upload Image
            </button>
          </div>
      </div>
      ) : (
        <div className="mt-32 flex flex-col items-center">
          <h1 className="font-bold text-2xl mb-4">Upload an Image for Detection</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-6 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSubmit}
            className="btn btn-primary text-white mb-4"
            disabled={!imageData}
          >
            Submit
          </button>

          {isLoading && (
            <div className="text-center my-4">
              <p className="text-blue-500 font-semibold">Checking...</p>
            </div>
          )}

          {response && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-md h-[40vh] w-full max-w-lg">
              <h2 className="font-semibold text-xl mb-4">Prediction Results:</h2>
              <pre className="text-sm bg-gray-200 h-[30vh] p-4 rounded-lg overflow-x-auto">
                {isSendRequestEnabled ? (
                  <h1 className=' text-green-500 font-bold '>We detected garbage in your uploaded image. Now you can submit it.</h1>
                ) : (
                  <h1 className=" text-red-600">We could not detect garbage in the image. <Link onClick={() => window.location.reload()} className=' underline cursor-pointer'>Please try again</Link>.</h1>
                )}
              </pre>

              <button
                onClick={funcemail}
                className={`btn ${isSendRequestEnabled ? 'btn-success' : 'btn-disabled'} text-white mt-4`}
                disabled={!isSendRequestEnabled}
              >
                Send Request
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Clean;