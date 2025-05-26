import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Graph = () => {
  const [graphData, setGraphData] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState('21');
  const navigate = useNavigate();

  useEffect(() => {
    fetchGraphData(selectedGraph); // Fetch data whenever selectedGraph changes
  }, [selectedGraph]);

  const fetchGraphData = async (queryId) => {
    try {
      const response = await fetch(`http://localhost:5000/graph/${queryId}`);
      const data = await response.json();

      if (!data || data.error) throw new Error("No data received or error");

      switch (queryId) {
        case '21': // Crop Count by Region (Bar Chart)
          setGraphData({
            labels: data.results.map((item) => item.Region),
            datasets: [
              {
                label: 'Crop Count by Region',
                data: data.results.map((item) => item.CropCount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
          break;

        case '22': // Crops by Season (Pie Chart)
          setGraphData({
            labels: data.results.map((item) => item.SeasonName),
            datasets: [
              {
                label: 'Crops by Season',
                data: data.results.map((item) => item.CropCount),
                backgroundColor: ['#FF6384', '#9966FF', '#FFCE56', '#4BC0C0'],
              },
            ],
          });
          break;

        case '23': // Irrigation Methods by Crop Type (Line Chart)
          setGraphData({
            labels: data.results.map((item) => item.CropType),
            datasets: [
              {
                label: 'Drip Irrigation',
                data: data.results
                  .filter((item) => item.MethodName === 'Drip Irrigation')
                  .map((item) => item.MethodCount),
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
              },
              {
                label: 'Sprinkler',
                data: data.results
                  .filter((item) => item.MethodName === 'Sprinkler')
                  .map((item) => item.MethodCount),
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
              },
              {
                label: 'Canal Irrigation',
                data: data.results
                  .filter((item) => item.MethodName === 'Canal Irrigation')
                  .map((item) => item.MethodCount),
                borderColor: 'rgba(255, 159, 64, 1)',
                fill: false,
              },
            ],
          });
          break;

        case '24': // Crop Distribution by Crop Type (Pie Chart)
          setGraphData({
            labels: data.results.map((item) => item.CropType),
            datasets: [
              {
                label: 'Crop Distribution by Crop Type',
                data: data.results.map((item) => item.CropCount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              },
            ],
          });
          break;

        case '25': // Weather Conditions by Season (Bar Chart)
          setGraphData({
            labels: data.results.map((item) => item.SeasonName),
            datasets: [
              {
                label: 'Weather Conditions by Season',
                data: data.results.map((item) => item.ConditionCount),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
          });
          break;

        case '26': // Temperature Ranges by Crop (Line Chart)
          setGraphData({
            labels: data.results.map((item) => item.CropName),
            datasets: [
              {
                label: 'Optimal Temperature by Crop',
                data: data.results.map((item) => item.OptimalTemperature),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
              },
            ],
          });
          break;

        case '27': // Rainfall Distribution by Season (Bar Chart)
          setGraphData({
            labels: data.results.map((item) => item.SeasonName),
            datasets: [
              {
                label: 'Rainfall Distribution by Season',
                data: data.results.map((item) => item.RainfallRange),
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
              },
            ],
          });
          break;

        case '28': // Crops by Region and Season (Pie Chart)
          setGraphData({
            labels: data.results.map((item) => `${item.Region} - ${item.SeasonName}`),
            datasets: [
              {
                label: 'Crops by Region and Season',
                data: data.results.map((item) => item.CropCount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              },
            ],
          });
          break;

        case '29': // Water Requirement vs. Crop Type (Line Chart)
          setGraphData({
            labels: data.results.map((item) => item.CropType),
            datasets: [
              {
                label: 'Water Requirement by Crop Type',
                data: data.results.map((item) => item.WaterRequirement),
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
              },
            ],
          });
          break;

        case '30': // Average Yield per Crop (Bar Chart)
          setGraphData({
            labels: data.results.map((item) => item.CropName),
            datasets: [
              {
                label: 'Average Yield per Crop',
                data: data.results.map((item) => item.AverageYield),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
          break;

        default:
          console.error('Invalid Query ID');
          break;
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedGraph(e.target.value);
  };

  const handleBack = () => {
    navigate('/user-dashboard');
  };

  // Render the selected graph based on queryId
  const renderGraph = () => {
    if (!graphData) return null;

    switch (selectedGraph) {
      case '21':
      case '25':
      case '30':
        return <Bar data={graphData} />;
      case '22':
      case '24':
      case '28':
        return  <div style={{ width: '400px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pie data={graphData} options={{ maintainAspectRatio: false }} />
      </div>;
      case '23':
      case '26':
      case '29':
        return <Line data={graphData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
          Crop Analysis - Graphs
        </h1>

        <div className="space-y-8">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Analysis Dashboard
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-4">
                {/* <h4 className="text-xl font-medium text-gray-700 mb-4">
                  Crop Analysis
                </h4> */}
                {renderGraph()}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Analysis Type
                </label>
                <select
                  onChange={handleDropdownChange}
                  value={selectedGraph}
                  className="block w-full px-4 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="21">Crop Count by Region</option>
                  <option value="22">Crops by Season</option>
                  <option value="23">Irrigation Methods by Crop Type</option>
                  <option value="24">Crop Distribution by Crop Type</option>
                  <option value="25">Weather Conditions by Season</option>
                  
                  
                  <option value="28">Crops by Region and Season</option>
                 
                  
                </select>
              </div>
              <div className="w-full md:w-auto">
                <button
                  onClick={handleBack}
                  className="w-full md:w-auto py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                >
                  Back 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
