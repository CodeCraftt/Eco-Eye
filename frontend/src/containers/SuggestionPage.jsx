import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

const Suggestion = () => {
    const [wasteType, setWasteType] = useState('');
    const [wasteDetails, setWasteDetails] = useState(null);
    const [receivedContent, setReceivedContent] = useState(null);

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.content) {
            setReceivedContent(location.state.content);
        }
    }, [location.state]);

    const wasteData = {
        plastic: {
            name: 'Plastic Bottle',
            type: 'Plastic',
            recyclable: true,
            suggestions: ['Recycle at a local center', 'Reuse for storage', 'Avoid single-use plastics'],
        },
        metal: {
            name: 'Aluminum Can',
            type: 'Metal',
            recyclable: true,
            suggestions: ['Recycle at a scrap metal facility', 'Sell to a recycling company'],
        },
        organic: {
            name: 'Food Waste',
            type: 'Organic',
            recyclable: false,
            suggestions: ['Compost in your backyard', 'Dispose of in organic waste bins'],
        },
        paper: {
            name: 'Newspaper',
            type: 'Paper',
            recyclable: true,
            suggestions: ['Recycle at a paper recycling center', 'Use for composting'],
        },
        e_waste: {
            name: 'Old Mobile Phone',
            type: 'Electronic Waste',
            recyclable: false,
            suggestions: ['Dispose at a certified e-waste center', 'Return to manufacturer if a take-back program is available'],
        },
        // Add more waste types as needed
    };

    const handleGetSuggestions = () => {
        const details = wasteData[wasteType.toLowerCase()] || {
            name: 'Unknown',
            type: 'Unknown',
            recyclable: false,
            suggestions: ['No suggestions available for this type of waste'],
        };
        setWasteDetails(details);
    };

    return (
        <>
            <Navbar bgg={true} />
            <div className="mt-32 container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-6 text-center">Waste Suggestion</h1>

                {/* Display received content if any */}
                {receivedContent ? (
                    <div className="mt-6 p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-2xl font-bold mb-2">Instructions for Disposal</h2>
                        <ul className=" ml-6">
                            {receivedContent.split('\n').map((step, index) => (
                                <li key={index} className="mb-2">{step}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter type of waste (e.g., plastic, metal)"
                            value={wasteType}
                            onChange={(e) => setWasteType(e.target.value)}
                            className="border border-gray-300 p-2 rounded mb-4 w-full"
                        />
                        <button
                            onClick={handleGetSuggestions}
                            className="btn btn-primary mt-3"
                        >
                            Get Suggestions
                        </button>

                        {wasteDetails && (
                            <div className="mt-6 p-4 border border-gray-300 rounded-lg">
                                <h2 className="text-2xl font-bold mb-2">Waste Details</h2>
                                <p><strong>Name:</strong> {wasteDetails.name}</p>
                                <p><strong>Type:</strong> {wasteDetails.type}</p>
                                <p><strong>Recyclable:</strong> {wasteDetails.recyclable ? 'Yes' : 'No'}</p>
                                <h3 className="text-xl font-semibold mt-4">Suggestions:</h3>
                                <ul className="list-disc ml-6">
                                    {wasteDetails.suggestions.map((suggestion, index) => (
                                        <li key={index}>{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Suggestion;