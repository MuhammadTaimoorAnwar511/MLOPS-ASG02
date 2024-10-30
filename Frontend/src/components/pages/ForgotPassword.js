import React, { useState } from 'react';
import Input from '../Input';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      if (response.data.success) {
        setShowModal(true); // Show the modal if email exists
        setErrorMessage(''); // Clear any previous error messages
      } else {
        setErrorMessage('No account found with that email address.');
      }
    } catch (error) {
      console.error('Error occurred while checking email:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', { email, password: newPassword });
      if (response.data.success) {
        alert('Password reset successfully!'); // You can use a modal or a toast instead
        setShowModal(false); // Hide the modal after successful reset
      } else {
        setErrorMessage('Failed to reset password.');
      }
    } catch (error) {
      console.error('Error occurred during password reset:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Display error message */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Reset Password</button>
      </form>

      {/* Modal for resetting password */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Set New Password</h3>
            <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Display error message */}
            <button onClick={handlePasswordReset} className="w-full bg-blue-500 text-white p-2 rounded mt-4">Confirm</button>
            <button onClick={() => setShowModal(false)} className="w-full bg-gray-300 text-black p-2 rounded mt-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
