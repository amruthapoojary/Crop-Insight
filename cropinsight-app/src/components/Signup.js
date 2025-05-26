import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Signup.css'; // Path to the Signup.css file

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!role) {
            alert("Please select a role.");
            return;
        }

        const data = { email, password, role };

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Sign-up successful");
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error signing up');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center signup-container" style={{ height: '100vh' }}>
            <div className="signup-form p-4">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4 text-white">Sign Up</h2>
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
                        SIGN UP
                    </button>
                    <p className="text-center mt-3 text-white">
                        Already have an account? <Link to="/login" className="text-white">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
