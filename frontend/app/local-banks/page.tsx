'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function FindLocalBanks() {
  const [postcode, setPostcode] = useState('');
  const [banks, setBanks] = useState<any[]>([]);
  const [error, setError] = useState('');

  const fetchCoordinates = async (postcode: string) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          postalcode: postcode,
          country: 'Australia',
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
      });

      if (response.data && response.data.length > 0) {
        const location = response.data[0];
        return {
          lat: parseFloat(location.lat),
          lon: parseFloat(location.lon),
        };
      } else {
        throw new Error('Invalid postcode or location not found.');
      }
    } catch (err) {
      throw err;
    }
  };

  const fetchBanks = async (lat: number, lon: number) => {
    try {
      const radius = 5000; // Search within 5 km radius
      const query = `
        [out:json];
        (
          node["amenity"="bank"](around:${radius},${lat},${lon});
          way["amenity"="bank"](around:${radius},${lat},${lon});
          relation["amenity"="bank"](around:${radius},${lat},${lon});
        );
        out center;
      `;

      const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      if (response.data && response.data.elements.length > 0) {
        return response.data.elements;
      } else {
        throw new Error('No banks found in this area.');
      }
    } catch (err) {
      throw err;
    }
  };

  const handleSearch = async () => {
    setError('');
    setBanks([]);

    if (postcode.trim() === '') {
      setError('Please enter a postcode.');
      return;
    }

    try {
      const location = await fetchCoordinates(postcode);
      const bankResults = await fetchBanks(location.lat, location.lon);
      setBanks(bankResults);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-navy text-yellow flex items-center justify-center px-6">
      <div className="max-w-5xl bg-gray-800 rounded-lg p-8 shadow-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Find Local Banks</h1>

        {/* Postcode Input */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Australian Postcode:</label>
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter postcode (e.g., 2000)"
          />
          <button
            onClick={handleSearch}
            className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Search Banks
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Banks Grid */}
        {banks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Banks Near Postcode {postcode}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {banks.map((bank, index) => {
                const addressParts = [];
                if (bank.tags['addr:housenumber']) {
                  addressParts.push(bank.tags['addr:housenumber']);
                }
                if (bank.tags['addr:street']) {
                  addressParts.push(bank.tags['addr:street']);
                }
                if (bank.tags['addr:city']) {
                  addressParts.push(bank.tags['addr:city']);
                }
                if (bank.tags['addr:state']) {
                  addressParts.push(bank.tags['addr:state']);
                }
                if (bank.tags['addr:postcode']) {
                  addressParts.push(bank.tags['addr:postcode']);
                }
                const fullAddress = addressParts.join(', ');

                const chatbotUrl = `/chatbot`;

                return (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-md shadow-md text-center"
                  >
                    <p className="font-bold text-lg mb-2">
                      {bank.tags.name || 'Unnamed Bank'}
                    </p>
                    <p className="text-sm mb-4">{fullAddress || 'Address not available'}</p>
                    <button
                      onClick={() => window.open(chatbotUrl, '_blank')}
                      className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                    >
                      Connect Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
