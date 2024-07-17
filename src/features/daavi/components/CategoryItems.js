// src/features/daavi/components/CategoryItems.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategories, getCategoryItems } from '../myDaaviSlice';
import Layout from '../../../components/Layout';
import continental from "../../../assets/images/continental.webp";
import fufu from "../../../assets/images/fufu.jpg";
import italian from "../../../assets/images/italian.jpg";
import chinese from "../../../assets/images/chinese.jpg";
import breakfast from "../../../assets/images/breakfast.jpg";
import caribbean from "../../../assets/images/caribbean.webp";

const CategoryItems = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { categories, categoryItems, status } = useSelector((store) => store.mydaavi);

    const images = {
        continental,
        local: fufu,
        chinese,
        italian,
        caribbean,
        breakfast
    };

    useEffect(() => {
        if (slug) {
            dispatch(getCategories());
            if (categories?.length > 0) {
                const category = categories.find(item => item.name.toLowerCase() === slug.toLowerCase());
                if (category) {
                    dispatch(getCategoryItems(category.id));
                }
            }
        }
    }, [dispatch, slug, categories]);

    const handleOrderClick = (item) => {
        // Implement order functionality here
        console.log('Order clicked for item:', item);
    };

    const currentDate = new Date().toLocaleDateString();

    return (
        <Layout>
            <div className="container px-4 py-12 mx-auto">
                {/* Hero Section */}
                <section className="mb-12">
                    <div className="relative h-64 bg-center bg-cover" style={{ backgroundImage: `url(${images[slug.toLowerCase()]})` }}>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <h1 className="text-4xl font-bold text-white">Dishes in {slug} Category</h1>
                        </div>
                    </div>
                </section>

                {/* Category Description */}
                <section className="mb-12 text-center">
                    <p className="text-lg text-gray-700">
                        Explore our wide range of {slug} dishes. Each dish is carefully crafted with the finest ingredients to provide an unforgettable culinary experience.
                    </p>
                </section>

                {/* Dishes Grid */}
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Failed to load category items.</p>}
                <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {categoryItems?.map((item) => (
                        <div key={item.id} className="p-4 transition-transform transform bg-white rounded-lg shadow hover:scale-105">
                            <img src={item.image_url} alt={item.name} className="object-cover w-full h-48 rounded-t-lg" />
                            <h3 className="mt-4 text-xl font-bold">{item.name}</h3>
                            <p className="mt-2 text-gray-600">{item.description}</p>
                            <p className="mt-2 font-bold text-gray-800">${item.price}</p>
                            <button onClick={() => handleOrderClick(item)} className="px-4 py-2 mt-4 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                                Select
                            </button>
                        </div>
                    ))}
                </section>

                {/* Customer Reviews */}
                <section className="mt-12">
                    <h2 className="mb-6 text-3xl font-bold text-center">Customer Reviews</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Example Review */}
                        <div className="p-6 rounded-lg shadow-lg bg-orange-50">
                            <p className="mb-4 text-gray-700">
                                "Amazing {slug} dishes! The flavors were incredible and the presentation was beautiful. Highly recommend!"
                            </p>
                            <div className="flex items-center">
                                <img src="https://via.placeholder.com/50" alt="Customer" className="w-12 h-12 mr-4 rounded-full" />
                                <div>
                                    <p className="font-bold text-gray-900">Happy Customer</p>
                                    <p className="text-sm text-gray-600">{currentDate}</p>
                                </div>
                            </div>
                        </div>
                        {/* connect this section section to backend to get real live reviews */}
                        <div className="p-6 rounded-lg shadow-lg bg-orange-50">
                            <p className="mb-4 text-gray-700">
                                "I loved the {slug} dishes! The taste was out of this world and the service was excellent."
                            </p>
                            <div className="flex items-center">
                                <img src="https://via.placeholder.com/50" alt="Customer" className="w-12 h-12 mr-4 rounded-full" />
                                <div>
                                    <p className="font-bold text-gray-900">Satisfied Diner</p>
                                    <p className="text-sm text-gray-600">{currentDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 rounded-lg shadow-lg bg-orange-50">
                            <p className="mb-4 text-gray-700">
                                "Fantastic experience with {slug} dishes. Every bite was a delight!"
                            </p>
                            <div className="flex items-center">
                                <img src="https://via.placeholder.com/50" alt="Customer" className="w-12 h-12 mr-4 rounded-full" />
                                <div>
                                    <p className="font-bold text-gray-900">Food Enthusiast</p>
                                    <p className="text-sm text-gray-600">{currentDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default CategoryItems;
