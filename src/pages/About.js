// src/pages/About.js
import React from 'react';
import '../assets/styles/About.css';
import Layout from '../components/Layout';
import princeImage from '../assets/images/prince.jpg';
import ifeoluwaImage from '../assets/images/ife.jpg';
import bernardImage from '../assets/images/bernard.jpg';
import danielImage from '../assets/images/danny.jpg';

const About = () => {
    return (
        <Layout title="About DAAVI SPECIAL" description="Learn more about DAAVI SPECIAL, our mission, values, and team.">
            <div className="about-container">
                <section className="about-hero">
                    <h1>About DAAVI SPECIAL</h1>
                    <p>Discover the story behind our culinary journey.</p>
                </section>
                <section className="about-content">
                    <h2>Our Story</h2>
                    <p>
                        DAAVI SPECIAL was founded with a passion for creating unique and delicious dishes that bring people together. Our journey began in a small kitchen with a big dream - to offer an unforgettable dining experience that combines traditional flavors with modern twists.
                    </p>
                    <p>
                        Over the years, we've grown from a humble food stall to a beloved restaurant known for our commitment to quality, fresh ingredients, and exceptional service. Our team of talented chefs is dedicated to crafting meals that not only satisfy your hunger but also delight your taste buds.
                    </p>
                    <h2>Our Mission</h2>
                    <p>
                        At DAAVI SPECIAL, our mission is to provide an outstanding culinary experience that celebrates the richness of our diverse culinary heritage. We strive to create a welcoming atmosphere where customers can enjoy delicious food, excellent service, and a sense of community.
                    </p>
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Quality:</strong> We use only the freshest and finest ingredients in all our dishes.</li>
                        <li><strong>Innovation:</strong> We constantly explore new recipes and culinary techniques to bring exciting flavors to our menu.</li>
                        <li><strong>Community:</strong> We believe in giving back to our community and creating a welcoming environment for all our guests.</li>
                        <li><strong>Sustainability:</strong> We are committed to sustainable practices and source our ingredients responsibly.</li>
                    </ul>
                    <h2>Meet Our Team</h2>
                    <div className="team-container">
                        <div className="team-member">
                            <img src={princeImage} alt="Prince Eugene Ofosu" />
                            <h3>Prince Eugene Ofosu</h3>
                            <p>Project Manager and Backend Engineer</p>
                        </div>
                        <div className="team-member">
                            <img src={ifeoluwaImage} alt="Ifeoluwa Adebayo" />
                            <h3>Ifeoluwa Adebayo</h3>
                            <p>Backend Engineer</p>
                        </div>
                        <div className="team-member">
                            <img src={bernardImage} alt="Bernard Nketia Acheampong" />
                            <h3>Bernard Nketia Acheampong</h3>
                            <p>Full Stack Engineer</p>
                        </div>
                        <div className="team-member">
                            <img src={danielImage} alt="Daniel Asare Ntow" />
                            <h3>Daniel Asare Ntow</h3>
                            <p>Full Stack Manager</p>
                        </div>
                    </div>
                    <h2>Join Us</h2>
                    <p>
                        Whether you're looking for a quick bite, a family dinner, or a place to celebrate special occasions, DAAVI SPECIAL is the perfect choice. Come and experience our passion for food and hospitality. We look forward to serving you!
                    </p>
                </section>
            </div>
        </Layout>
    );
};

export default About;
