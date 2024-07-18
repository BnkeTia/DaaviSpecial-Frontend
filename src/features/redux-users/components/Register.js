
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../myUserSlice';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout';
import italian from "../../../assets/images/italian.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone_number: '',
    street_address: '',
    city: '',
    country: '',
    user_type: 'Customer',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, status } = useSelector((state) => state.myuser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    if (status === "succeeded") navigate('/login');
  };

  return (
    <Layout title="Register Page">
      <div className="relative flex items-center justify-center min-h-screen py-12 bg-fixed bg-cover bg-center pt-[80px]" style={{ backgroundImage: `url(${italian})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative p-8 bg-white rounded shadow-lg w-full max-w-4xl max-sm:mx-[20px] ">
          <h2 className="mb-6 text-3xl font-bold text-center text-gradient bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            Daavi Special 
            <p className="text-sm">Register for exclusive benefits</p>
          </h2>
          {error && <p className="mb-4 text-red-500">{error.message}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">{key.replace('_', ' ')}</label>
                  <input
                    type={key === 'password' ? 'password' : 'text'}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="submit" className="px-8 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          <p className="mt-6 text-sm text-center">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
