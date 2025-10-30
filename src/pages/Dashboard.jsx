import React, { useState, useEffect } from 'react';
import api from '../api'; // Import our API helper

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const baseUrl = 'http://localhost:5002'; 

 
  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/urls/my-links');
      setLinks(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching links:', err);
      setError('Could not load links.');
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLinks();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // This is a POST request to our protected route
      const res = await api.post('/urls/shorten', { originalUrl });
      // Add the new link to the top of the list
      setLinks([res.data, ...links]);
      setOriginalUrl(''); // Clear the input
    } catch (err) {
      console.error('Error creating link:', err);
      setError('Failed to shorten link. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        Your Dashboard
      </h1>

      {/* --- Shorten Form --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-xl mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Create a new short link</h2>
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            placeholder="Enter your long URL (e.g., https://...)"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Shorten
          </button>
        </div>
      </form>

      {/* --- Link List --- */}
      <h2 className="text-2xl font-semibold mb-4">Your Links</h2>
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        {loading && <p className="p-4 text-center">Loading links...</p>}
        {!loading && links.length === 0 && (
          <p className="p-4 text-center text-gray-400">
            You haven't created any links yet.
          </p>
        )}
        <ul className="divide-y divide-gray-700">
          {links.map((link) => (
            <li
              key={link._id}
              className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="text-sm text-gray-400 truncate">
                  {link.originalUrl}
                </p>
                <a
                  href={`${baseUrl}/${link.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-400 hover:underline"
                >
                  {`${baseUrl}/${link.shortCode}`}
                </a>
              </div>
              <div className="text-gray-400">
                <span className="font-semibold text-white">{link.clickCount}</span> Clicks
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
