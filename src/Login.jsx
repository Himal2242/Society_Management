import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully');
    } catch (err) {
      // Show custom error message for incorrect password
      if (err.message.includes('wrong-password')) {
        setError('Thik se to dal be!');
      } else {
        setError(err.message);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registered successfully');
      setIsRegistering(false); // Switch back to login after successful registration
    } catch (err) {
      // Show error message for registration failures
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-green-500 animate-gradient bg-fixed">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96 transition-transform transform hover:scale-105 hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isRegistering ? 'Create an Account' : 'Welcome Back'}
        </h1>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out transform hover:scale-105"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out transform hover:scale-105"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200 mb-4 shadow-lg transform hover:scale-105"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <button
          onClick={() => setIsRegistering(!isRegistering)} // Toggle between login and register
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200 shadow-md transform hover:scale-105"
        >
          {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
        </button>
        <p className="mt-4 text-center text-gray-600 text-sm">
          By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
