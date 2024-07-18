// src/features/redux-users/components/Login.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../myUserSlice';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout';
import italian from "../../../assets/images/italian.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.myuser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
        navigate('/');
  };

  return (
    <Layout title="Login Page">
      <div className="relative flex items-center justify-center min-h-24 py-12 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${italian})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative p-8 bg-white rounded shadow-lg w-full max-w-md max-md:mx-[20px]">
          <h2 className="mb-6 text-3xl font-bold text-center text-gradient bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            Daavi Special 
            <p className="text-sm">Login for exclusive benefits</p>
          </h2>
          {error && <p className="mb-4 text-red-500">{error.message}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="px-8 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
