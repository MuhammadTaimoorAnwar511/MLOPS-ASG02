import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Input from '../Input';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error message on input change
    setSuccessMessage(''); // Clear success message on input change
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData); // Log form data
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log(response.data); // Handle successful login (e.g., store token)
      setSuccessMessage('Login successful!'); // Set success message
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      // Handle the error and set a specific message based on the error response
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage('User not found'); // Specific error message for 404
        } else {
          setErrorMessage('An error occurred, please try again later.'); // General error message
        }
      } else {
        // Handle network or unexpected errors
        setErrorMessage('Network error, please check your connection.');
      }
      console.error('Login error:', error.response ? error.response.data : error); // Log the error response
    }
  };
  
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>
        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>} {/* Display success message */}
        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>} {/* Display error message */}
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="rememberMe" className="ml-2 text-gray-700">Remember Me</label>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded mt-6 hover:bg-blue-600 transition duration-300">Log In</button>

        <p className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500 underline">
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
