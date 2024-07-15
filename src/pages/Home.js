// src/pages/Home.js
import React from 'react';
import '../assets/styles/Home.css';
import Layout from "../components/Layout";

const Home = () => {
    return (
        <Layout >
            <div className="home-container">
            <div className="home-content">
                <h1>Welcome to DAAVI SPECIAL</h1>
                <p>Experience the best online delivery food <span className="text-purple-600">restaurant</span> </p>
            </div>
            </div>
        </Layout >
    );
};

export default Home;

