import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Trigger the logout logic (clearing authentication state)
    onLogout(); // This will clear the state in the parent component
    navigate('/'); // Redirect to the home page after logging out
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-12">
          Welcome, AgriMaster
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/insert')}
            className="bg-green-500 hover:bg-green-600 text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold mb-2">Plant New Entries!</h2>
            <p>Bring new crop information to expand our details</p>
          </button>
          <button
            onClick={() => navigate('/update')}
            className="bg-green-500 hover:bg-green-600 text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold mb-2">Refresh the Data!</h2>
            <p>Adjust and refine existing crop details..</p>
          </button>
          <button
            onClick={() => navigate('/delete')}
            className="bg-green-500 hover:bg-green-600 text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold mb-2">Vanish the Old!</h2>
            <p>Say goodbye to outdated records..</p>
          </button>
          <button
            onClick={() => navigate('/select')}
            className="bg-green-500 hover:bg-green-600 text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold mb-2">Explore the Green World!</h2>
            <p>Dive into detailed insights about every plant</p>
          </button>
        </div>

        {/* Logout button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
