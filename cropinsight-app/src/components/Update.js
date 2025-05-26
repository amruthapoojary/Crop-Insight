import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const [formData, setFormData] = useState({});
  const [primaryKeyField, setPrimaryKeyField] = useState('');
  const [table, setTable] = useState('Crop');
  
  const navigate = useNavigate(); // Defining navigate
  const tables = {
    Crop: ['CropName', 'CropType', 'Region', 'OptimalSeason', 'OptimalTemperature'],
    SoilType: ['SoilTypeID', 'SoilName', 'pHRange', 'Cropid'],
    IrrigationMethod: ['MethodName', 'WaterRequirement', 'Cropid', 'Seasonid'],
    Seasontype: ['SeasonName', 'StartMonth', 'EndMonth', 'Cropid'],
    WeatherCondition: ['TemperatureRange', 'RainfallRange', 'HumidityRange', 'Seasonid']
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!primaryKeyField) {
      alert('Please enter the primary key');
      return;
    }

    const missingFields = tables[table].filter(field => !formData[field]);
    if (missingFields.length > 0) {
      alert(`Please fill all fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/${table}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryKeyField, ...formData })
      });
      
      if (response.ok) {
        alert('Record updated successfully');
        setFormData({});
        setPrimaryKeyField('');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Error updating record');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="p-4 bg-white rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Enhance Crop Records
        </h2>

        <select
          className="w-full p-2 mb-4 border rounded-md shadow-md"
          onChange={(e) => setTable(e.target.value)}
          value={table}
        >
          {Object.keys(tables).map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Primary Key"
          value={primaryKeyField}
          onChange={(e) => setPrimaryKeyField(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md shadow-md bg-gray-200"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          {tables[table].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{field}</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-200"
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                value={formData[field] || ''}
              />
            </div>
          ))}

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md transform hover:bg-green-600 hover:scale-105 transition duration-200"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-md transform hover:bg-gray-600 hover:scale-105 transition duration-200"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
