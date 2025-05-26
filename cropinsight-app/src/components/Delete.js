// src/components/Delete.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Delete = () => {
  const [records, setRecords] = useState([]);
  const [table, setTable] = useState('Crop');
  const navigate = useNavigate();

  const fetchRecords = async () => {
    const response = await fetch(`http://localhost:5000/api/${table}`);
    const data = await response.json();
    setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, [table]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/${table}/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Record deleted successfully');
          fetchRecords();
        }
      } catch (error) {
        alert('Error deleting record');
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Vanish the old</h2> {/* Heading changed */}

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
                  className={`px-6 py-3 text-left text-xs font-medium ${key.includes('ID') ? 'text-gray-500' : 'text-green-500'} uppercase`} 
                  // This adds green color to column names (except IDs)
                >
                  {key}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.map((record, idx) => (
              <tr key={idx}>
                {Object.values(record).map((value, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap">{value}</td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(record[`${table}ID`])}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button 
        onClick={() => navigate('/')}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default Delete;
