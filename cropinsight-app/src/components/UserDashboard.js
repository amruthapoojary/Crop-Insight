import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QueryDropdown from './QueryDropDown';

const UserDashboard = ({ onLogout }) => {
  const [showQueryDropdown, setShowQueryDropdown] = useState(false);
  const navigate = useNavigate();

  const handleViewRecords = () => {
    setShowQueryDropdown(true);
  };

  const handleBack = () => {
    setShowQueryDropdown(false);
  };

  const handleAnalyze = () => {
    navigate('/graph');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-center items-center mt-16">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-12">
          Welcome to Your Crop Insights
        </h1>

        {showQueryDropdown ? (
          <div>
            <QueryDropdown />
            <button
              onClick={handleBack}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
            >
              Back
            </button>
          </div>
        ) : (
          <div className="flex justify-center space-x-24 mb-8">
            <button
              onClick={handleAnalyze}
              className="w-64 h-64 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200 flex flex-col items-center justify-center p-6"
            >
              <h2 className="text-3xl font-bold mb-4">Graph Insights</h2>
              <p className="text-center text-lg">Dive deep into data insights</p>
            </button>

            <button
              onClick={handleViewRecords}
              className="w-64 h-64 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200 flex flex-col items-center justify-center p-6"
            >
              <h2 className="text-3xl font-bold mb-4">Crop Registry</h2>
              <p className="text-center text-lg">Explore detailed crop records</p>
            </button>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200 text-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
