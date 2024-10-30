import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error message on input change
    setSuccessMessage(''); // Clear success message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData); // Change URL based on your backend
      console.log(response.data);
      setSuccessMessage('Signup successful!'); // Set success message
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      // Handle the error and set a specific message based on the error response
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage('Username or email already exists'); // Display specific error message
        } else {
          setErrorMessage('An error occurred, please try again later.'); // General error message
        }
      } else {
        // Handle network or unexpected errors
        setErrorMessage('Network error, please check your connection.');
      }
      console.error('There was an error!', error); // Log the error for debugging
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded mt-6 hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
