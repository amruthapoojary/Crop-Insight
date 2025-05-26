import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QueryDropdown = () => {
  const [selectedQuery, setSelectedQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState('Crop');
  const [isQueryResult, setIsQueryResult] = useState(false); // Track data type
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedQuery(event.target.value);
  };

  const handleBrowse = async () => {
    if (!selectedQuery) {
      alert('Please select a query');
      return;
    }

    setLoading(true);
    setIsQueryResult(true);
    try {
      // Changed this line to use the full URL
      const response = await axios.get(`http://localhost:5000/api/query/${selectedQuery}`);
      console.log('Response:', response.data); // Add this to debug
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async () => {
    setIsQueryResult(false); // Data is for table view
    try {
      const response = await fetch(`http://localhost:5000/api/${table}`);
      if (!response.ok) {
        throw new Error('Failed to fetch records');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching records:', error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [table]);

  const renderTable = () => {
    if (data.length === 0) {
      return <div className="text-gray-500 mt-4">No records available.</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase">{key}</th> 
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((record, idx) => (
              <tr key={idx}>
                {Object.values(record).map((value, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dive Into Data with Your Curiosity</h2>

      {/* Query Section */}
      <label htmlFor="querySelect" className="text-lg font-medium">Choose a Query, Unlock Insights </label>
      <select id="querySelect" value={selectedQuery} onChange={handleChange} className="w-full p-2 mb-4 border rounded" style={{ position: 'relative', zIndex: 1000 }}>
        <option value="">Select a query</option>
        <option value="1">Crops grown in a specific region (e.g., Bellary)</option>
        <option value="2">List of distinct crop types</option>
        <option value="3">Crops that thrive at a specific optimal temperature (e.g., 20-25°C)</option>
        <option value="4">Crops that grow in a specific season (e.g., Winter)</option>
        <option value="5">Soil types suitable for a specific crop (e.g., Paddy)</option>
        <option value="6">Irrigation methods used for a specific crop (e.g., Groundnut)</option>
        <option value="7">Irrigation methods used for a specific season (e.g., Monsoon)</option>
        <option value="8">Weather conditions matching a specific temperature range (e.g., 18-30°C)</option>
        <option value="9">Crops that fall under a specific crop type (e.g., Vegetable)</option>
        <option value="10">Soil types with a specific pH range (e.g., 6.0-7.0)</option>
        <option value="11">Crops and soil types suitable for a specific region (e.g., Kudligi)</option>
        <option value="12">Crops and the irrigation methods used for a specific crop type (e.g., Cereal)</option>
        <option value="13">Crops and weather conditions matching a specific season (e.g., Winter)</option>
        <option value="14">Crops, soil types, and irrigation methods for a specific region (e.g., Hospet)</option>
        <option value="15">Crops, weather conditions, and irrigation methods for a specific crop type (e.g., Vegetable)</option>
        <option value="16">Count of crops and the soil types they are associated with</option>
        <option value="17">Count of crops and their associated weather conditions</option>
        <option value="18">Count of crops and the irrigation methods they use</option>
        <option value="19">Crops, soil types, and weather conditions matching a specific condition (e.g., Rainy)</option>
        <option value="20">Count of crops across different regions</option>
      </select>
      <button
        onClick={handleBrowse}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
      >
        Browse Data
      </button>

      {loading && <p>Loading...</p>}

      {/* Query Results */}
      {isQueryResult && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Creative Query Results:</h3>
          {renderTable()}
        </div>
      )}

      {/* Table Selection Section */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Unlock Data from the Table</h2>
      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setTable(e.target.value)}
        value={table}
      >
        {['Crop', 'SoilType', 'IrrigationMethod', 'Seasontype', 'WeatherCondition'].map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {/* Table Data */}
      {!isQueryResult && (
        <div className="mt-6">
          {renderTable()}
        </div>
      )}
    </div>
  );
};

export default QueryDropdown;
