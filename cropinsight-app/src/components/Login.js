import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css'; // Path to the new Login.css file

function Login({ onLoginSuccess }) { // Add onLoginSuccess prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!role) {
            alert("Please select a role.");
            return;
        }

        const data = { email, password, role };

        try {
            const response = await fetch('http://localhost:5000/login', { // Updated port to 3000
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                onLoginSuccess(role); // Call the onLoginSuccess function with the role
                alert("Login successful");
                
                // Navigate based on role
                if (role === 'admin') {
                    navigate('/admin'); // Navigate to admin dashboard
                } else {
                    navigate('/user-dashboard'); // Navigate to user dashboard
                }
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error logging in');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center login-container" style={{ height: '100vh' }}>
            <div className="login-form p-4">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4 text-white">Login</h2>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="text-white">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="text-white">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="role" className="text-white">Select Role</label>
                        <select
                            id="role"
                            className="form-control"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <button className="btn btn-success w-100" type="submit">
                        LOGIN
                    </button>
                    <p className="text-center mt-3 text-white">
                        Don't have an account? <Link to="/signup" className="text-white">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
