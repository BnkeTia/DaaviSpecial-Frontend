// src/pages/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../features/daavi/myDaaviSlice';
import Layout from '../components/Layout';
import friendRice from "../assets/images/friendRice.jpg";
import continental from "../assets/images/continental.webp";
import fufu from "../assets/images/fufu.jpg";
import italian from "../assets/images/italian.jpg";
import chinese from "../assets/images/chinese.jpg";
import breakfast from "../assets/images/breakfast.jpg";
import caribbean from "../assets/images/caribbean.webp";

const dishes = [
  {
    image: continental,
    name: 'Continental',
    description: 'Delicious continental cuisine to tantalize your taste buds.'
  },
  {
    image: fufu,
    name: 'Local',
    description: 'Authentic local flavors that bring out the essence of our region.'
  },
  {
    image: chinese,
    name: 'Chinese',
    description: 'Traditional Chinese dishes crafted with care and expertise.'
  },
  {
    image: italian,
    name: 'Italian',
    description: 'Classic Italian recipes prepared with the finest ingredients.'
  },
  {
    image: caribbean,
    name: 'Caribbean',
    description: 'Tropical flavors of the Caribbean for a delightful culinary experience.'
  },
  {
    image: breakfast,
    name: 'Breakfast',
    description: 'Start your day with our hearty breakfast options.'
  }
];

const Home = () => {
  

    return (
        <Layout>
            <main className="bg-gray-100">
                <section className="h-screen bg-center bg-cover" style={{ backgroundImage: `url(${friendRice})` }}>
                    <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                        <div className="px-4 text-center text-white">
                            <h1 className="mb-4 text-4xl font-bold md:text-6xl">Welcome to DAAVI SPECIAL</h1>
                            <p className="mb-6 text-lg md:text-2xl">Satisfy your cravings with our delicious meals</p>
                            <Link to="/menu" className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600">
                                Explore Our Menu
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="container px-4 py-12 mx-auto">
                    <h2 className="mb-8 text-3xl font-bold text-center">Featured Dishes</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {dishes.map((dish, index) => (
                            <Link to={`/category/${dish.name}`} key={index} className="transition-transform transform hover:scale-105">
                                <div className="p-4 bg-white rounded-lg shadow">
                                    <img src={dish.image} alt={dish.name} className="object-cover w-full h-48 rounded-t-lg" />
                                    <h3 className="mt-4 text-xl font-bold">{dish.name}</h3>
                                    <p className="mt-2 text-gray-600">{dish.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="py-12 text-white bg-yellow-500">
                    <div className="container px-4 mx-auto text-center">
                        <h2 className="mb-4 text-3xl font-bold">Order Now!</h2>
                        <p className="mb-6 text-lg">Experience the best meals delivered to your doorstep.</p>
                        <Link to="/menu" className="px-4 py-2 font-bold text-yellow-500 bg-white rounded hover:bg-gray-200">
                            View Menu
                        </Link>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default Home;
