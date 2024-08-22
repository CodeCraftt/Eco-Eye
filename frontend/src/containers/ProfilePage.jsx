import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import Table from '../components/Table';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      toast.error("Please Log in first");
      navigate("/login");
    } else {
      console.log(user);
      
      fetchRequests();
    }
  }, [user, navigate]);

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/requests', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setRequests(data);
    } catch (error) {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bgg={true} />
      <div className='mt-28 w-full flex flex-col items-center gap-5'>
        
        <img className='w-40 h-40 rounded-full border-2 border-black shadow-lg' alt="User Avatar" src={"https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e53523cf3aa4b6f462b2ec0_peep-17.svg"} />
        {user &&  <div>
          
          <p className='mb-2 text-center text-3xl leading-loose'>{user.name}</p>
          <p className='mb-2 text-center'>{user.email}</p>
          <p className=' text-center'>Earned Rewards: {user.earnedReward}</p>
        </div>}
        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length > 0 ? (
          <Table requests={requests} userRole={user.role} token={user.token} />
        ) : (
          <p>No requests yet.</p>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
