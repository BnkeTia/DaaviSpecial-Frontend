import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getMenus, createOrder, addItemToOrder, getOrders } from '../features/daavi/myDaaviSlice';
import Layout from '../components/Layout';
import continental from "../assets/images/continental.webp";
import friendRice from "../assets/images/friendRice.jpg";
import fufu from "../assets/images/fufu.jpg";
import italian from "../assets/images/italian.jpg";
import chinese from "../assets/images/chinese.jpg";
import breakfast from "../assets/images/breakfast.jpg";
import caribbean from "../assets/images/caribbean.webp";
import Cookies from "js-cookie";
import Spinner from '../components/Spinner';

const images = {
    continental,
    local: fufu,
    chinese,
    italian,
    caribbean,
    breakfast
};

const Menu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories, menus, status, orders, loading } = useSelector((store) => store.mydaavi);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getMenus());
    }, [dispatch]);

    const customer = Cookies.get("username");

    const handleAddToCart = async (item) => {
        const orderPayload = {
            customer: customer,
            status: "Processing",
            delivery_method: "Pickup"
        };

        let order = orders.find(o => o.status === 'Processing');
        if (!order) {
            order = await dispatch(createOrder(orderPayload)).unwrap();
        }

        const itemPayload = {
            order: order.id,
            quantity: 1,
            price: item.price,
            menu: item.id
        };

        dispatch(addItemToOrder({ orderId: order.id, payload: itemPayload }));
        dispatch(getOrders());
        navigate('/my-order');
    };

    return (
        <Layout>
            <main className="pt-24 md:pt-24">
                <div className="container px-4 mx-auto">
                    {/* Introduction Section */}
                    <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover -y-4 md:px-8 md:py-2" style={{ backgroundImage: `url(${friendRice})` }}>
                        <div className="text-center">
                            <h1 className="mb-4 text-2xl font-bold text-white md:text-5xl">Discover Our Delicious Menu</h1>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-10">
                        {/* Menu Items Section */}
                        <section className="md:col-span-8">
                            <h2 className="mb-8 text-2xl font-bold text-center">Our Menu</h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {loading === 'false' && <Spinner />}
                                {status === 'failed' && <p>Failed to load menu items.</p>}
                                {menus?.map((item) => (
                                    <div key={item.id} className="flex flex-col p-4 transition-transform transform bg-gray-100 rounded-lg shadow hover:scale-105">
                                        <img src={item.image_url} alt={item.name} className="object-cover w-full h-48 rounded-t-lg" />
                                        <div className="flex flex-col flex-grow p-4">
                                            <h3 className="mb-2 text-xl font-bold">{item.name}</h3>
                                            <p className="text-gray-600">{item.description}</p>
                                            <p className="mb-4 font-bold text-gray-800">${item.price}</p>
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="mt-auto px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Categories Section */}
                        <aside className="md:col-span-2 max-md:hidden">
                            <h2 className="mb-8 text-2xl font-bold text-center">Categories</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {categories.map((category) => (
                                    <Link key={category.id} to={`/category/${category.name}`} className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
                                        <img src={images[category.name.toLowerCase()]} alt={category.name} className="object-cover w-full h-48" />
                                        <div className="p-4">
                                            <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
                                            <p className="text-gray-600">Explore {category.name} dishes</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </aside>
                    </div>

                    {/* Shortcut to Categories on Mobile */}
                    <div className="container block px-4 mx-auto md:hidden">
                        <h2 className="my-6 text-2xl font-bold text-center">Categories</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {categories.map((category) => (
                                <Link key={category.id} to={`/category/${category.name}`} className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
                                    <img src={images[category.name.toLowerCase()]} alt={category.name} className="object-cover w-full h-48" />
                                    <div className="p-4">
                                        <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
                                        <p className="text-gray-600">Explore {category.name} dishes</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Menu;


// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCategories, getMenus, createOrder, addItemToOrder, getOrders } from '../features/daavi/myDaaviSlice';
// import Layout from '../components/Layout';
// import continental from "../assets/images/continental.webp";
// import friendRice from "../assets/images/friendRice.jpg";
// import fufu from "../assets/images/fufu.jpg";
// import italian from "../assets/images/italian.jpg";
// import chinese from "../assets/images/chinese.jpg";
// import breakfast from "../assets/images/breakfast.jpg";
// import caribbean from "../assets/images/caribbean.webp";
// import Cookies from "js-cookie";
// import Spinner from '../components/Spinner';


// const images = {
//     continental,
//     local: fufu,
//     chinese,
//     italian,
//     caribbean,
//     breakfast
// };

// const Menu = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate()
//     const { categories, menus, status, orders, loading } = useSelector((store) => store.mydaavi);

//     useEffect(() => {
//         dispatch(getCategories());
//         dispatch(getMenus());
//     }, [dispatch]);

//     const customer = Cookies.get("username")
 


//     const handleAddToCarts = async (item) => {
//         const orderPayload = {
//             customer: customer, 
//             status: "Processing",
//             delivery_method: "Pickup" 
//         };

//         let order = orders.find(o => o.status === 'Processing');
//         if (!order) {
//             order = await dispatch(createOrder(orderPayload)).unwrap();
//         }

//         const itemPayload = {
//             order: order.id,
//             quantity: 1,
//             price: item.price,
//             menu: item.id
//         };

//         dispatch(addItemToOrder({ orderId: order.id, payload: itemPayload }));
//     };
//     const handleAddToCart = async (item) => {
//         console.log('my items', item, item.id)
    
//         const customer = Cookies.get("username");
//         const delivery_method = "Pickup";
        
//         const itemPayloads = [{
//             menu: item.id,
//             price: item.price,
//             quantity: 1,
//         }];
    
//         const orderPayload = {
//             customer: customer, 
//             status: "Processing",
//             delivery_method: "Pickup",
//             items: itemPayloads  // Ensure items is an array
//         };
    
//         let order = orders.find(o => o.status === 'Processing');
//         if (!order) {
//             console.log('am here')
//             order = await dispatch(createOrder(orderPayload)).unwrap();
//             navigate('/my-order')
//         } else {
//             // If order exists, add item to existing order
//             console.log('am not here')
//             const itemPayload = [{
//                 customer: customer,
//                 order: order.id,
//                 quantity: 1,
//                 price: item.price,
//                 menu: item.id,
//                 delivery_method: "Pickup",
//                 items: itemPayloads
//             }];
//             // dispatch(addItemToOrder({ orderId: order.id, payload: itemPayload }));
//             dispatch(createOrder(itemPayload));
//         }
//         dispatch(getOrders());
//         navigate('/my-order');
//     };
    

   

//     return (
//         <Layout>
//             <main className="pt-24 md:pt-24">
//                 <div className="container px-4 mx-auto">
//                     {/* Introduction Section */}
//                     <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover -y-4 md:px-8 md:py-2" style={{ backgroundImage: `url(${friendRice})` }}>
//                         <div className="text-center">
//                             <h1 className="mb-4 text-2xl font-bold text-white md:text-5xl">Discover Our Delicious Menu</h1>
//                         </div>
//                     </section>

//                     <div className="grid grid-cols-1 gap-8 md:grid-cols-10">
//                         {/* Menu Items Section */}
//                         <section className="md:col-span-8">
//                             <h2 className="mb-8 text-2xl font-bold text-center">Our Menu</h2>
//                             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                                 {loading === 'false' && <Spinner/>}
//                                 {status === 'failed' && <p>Failed to load menu items.</p>}
//                                 {menus?.map((item) => (
//                                     <div key={item.id} className="relative p-4 transition-transform transform bg-gray-100 rounded-lg shadow hover:scale-105">
//                                         <img src={item.image_url} alt={item.name} className="object-cover w-full h-48 rounded-t-lg" />
//                                         <div className="p-4">
//                                             <h3 className="mb-2 text-xl font-bold">{item.name}</h3>
//                                             <p className="text-gray-600">{item.description}</p>
//                                             <p className="font-bold text-gray-800">${item.price}</p>
//                                             <div className="absolutes bottom-0 pb-3 mt-4">
//                                                 <button
//                                                     onClick={() => handleAddToCart(item)}
//                                                     className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600"
//                                                 >
//                                                     Add to Cart
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                         {/* Categories Section */}
//                         <aside className="md:col-span-2 max-md:hidden">
//                             <h2 className="mb-8 text-2xl font-bold text-center">Categories</h2>
//                             <div className="grid grid-cols-1 gap-4">
//                                 {categories.map((category) => (
//                                     <Link key={category.id} to={`/category/${category.name}`} className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
//                                         <img src={images[category.name.toLowerCase()]} alt={category.name} className="object-cover w-full h-48" />
//                                         <div className="p-4">
//                                             <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
//                                             <p className="text-gray-600">Explore {category.name} dishes</p>
//                                         </div>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </aside>
//                     </div>

//                     {/* Shortcut to Categories on Mobile */}
//                     <div className="container block px-4 mx-auto md:hidden">
//                         <h2 className="my-6 text-2xl font-bold text-center">Categories</h2>
//                         <div className="grid grid-cols-1 gap-4">
//                             {categories.map((category) => (
//                                 <Link key={category.id} to={`/category/${category.name}`} className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
//                                     <img src={images[category.name.toLowerCase()]} alt={category.name} className="object-cover w-full h-48" />
//                                     <div className="p-4">
//                                         <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
//                                         <p className="text-gray-600">Explore {category.name} dishes</p>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </Layout>
//     );
// }

// export default Menu;




