import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import map from '../assets/images/map.png'
import { useNavigate } from 'react-router-dom';


const Table = ({ requests, userRole,token }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;
  const navigat=useNavigate();
  // Pagination calculations
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  const totalPages = Math.ceil(requests.length / requestsPerPage);

  const handleResolve = async (requestId) => {
    try {  
      await axios.put(`http://localhost:5000/api/requests/${requestId}/resolve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Request resolved');
      // Refresh the request list after resolving
      navigat("/");
    } catch (error) {
      toast.error('Failed to resolve request');
    }
  };

  return (
    <div className="w-[88%] md:w-[85%]">
      <div className=' overflow-x-auto'>
      <table className="w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">RequestID</th>
            <th className="py-2 px-4 border">Location</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Requested Date</th>
            <th className="py-2 px-4 border">Resolved Date</th>
            {userRole === 'officer' && <th className="py-2 px-4 border">Resolve</th>}
          </tr>
        </thead>
        <tbody>
          {currentRequests.map(request => (
            <tr key={request._id}>
              <td className="py-2 px-4 border">{request._id}</td>
              <td className="py-2 px-4 border">
                <a  href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`} target="_blank" rel="noopener noreferrer">
                  <img className='block mx-auto w-8 h-8' src={map} alt="Location Icon" />
                </a>
              </td>
              <td className="py-2 px-4 border">{request.status}</td>
              <td className="py-2 px-4 border">{new Date(request.requestedTime).toLocaleString()}</td>
              <td className="py-2 px-4 border">
                {request.status === 'resolved' ? new Date(request.resolvedTime).toLocaleString() : '-'}
              </td>
              {userRole === 'officer' && (
                <td className="py-2 px-4 border">
                  {request.status !== 'resolved' && (
                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleResolve(request._id)}>
                      Resolve
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='text-[16px] self-center'>{currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
