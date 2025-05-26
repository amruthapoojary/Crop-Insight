// src/components/Select.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Select = () => {
  const [records, setRecords] = useState([]);
  const [table, setTable] = useState('Crop');
  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/${table}`);
      if (!response.ok) {
        throw new Error('Failed to fetch records');
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
      setRecords([]);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [table]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Browse Records</h2> {/* Heading changed */}
      <select 
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setTable(e.target.value)}
        value={table}
      >
        {['Crop', 'SoilType', 'IrrigationMethod', 'Seasontype', 'WeatherCondition'].map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {records[0] && Object.keys(records[0]).map(key => (
                <th 
                  key={key} 
                  className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase" 
                  // Column name color changed to green
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.map((record, idx) => (
              <tr key={idx}>
                {Object.values(record).map((value, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 && (
          <div className="text-gray-500 mt-4">No records available for the selected table.</div>
        )}
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Select;
