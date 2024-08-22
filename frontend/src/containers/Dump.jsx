import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';


const Dump = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [dumpyards, setDumpyards] = useState([]);

  useEffect(() => {
    // Load the Google Maps script dynamically
    const script = document.createElement('script');
    script.src = google_map_link;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 14,
          });

          setMap(map);
        },
        () => {
          toast.error('Failed to get your location');
        }
      );
    }
  };

  const handleGoClick = () => {
    // Fetch or generate nearby dumpyards (using a mock array here)
    const nearbyDumpyards = [
      { lat: userLocation.lat + 0.01, lng: userLocation.lng + 0.01 },
      { lat: userLocation.lat - 0.01, lng: userLocation.lng - 0.01 },
    ];

    setDumpyards(nearbyDumpyards);

    // Place markers on the map
    nearbyDumpyards.forEach((location) => {
      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: 'Dumpyard',
      });

      // Add a click event to show directions
      marker.addListener('click', () => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        directionsService.route(
          {
            origin: userLocation,
            destination: location,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          }
        );
      });
    });
  };

  return (
    <>
      <Navbar bgg={true} />
      <div className=" mt-32 flex flex-col md:flex-row  px-4 md:px-20 justify-center items-center"
      >
        <div className="w-full flex flex-col gap-10 md:w-[40vw] p-10 ">
          <h1 className="text-5xl font-bold mb-4">How to use ?</h1>
          <p>We provide you with a list of the nearest dumpyard locations where you can easily and responsibly dispose of your trash. By clicking the button below, you'll be able to view and select one of these nearby dumpyards, making it convenient to contribute to a cleaner environment. Choose a location, and help keep your surroundings tidy and waste-free.</p>
          <button className="btn btn-success" onClick={handleGoClick}>Go</button>
        </div>
        <div className="w-full mb-9 md:w-[60vw] h-[65vh] rounded-lg shadow-lg overflow-hidden" id="map" ></div>
      </div>
    </>
  );
};

export default Dump;


