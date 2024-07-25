import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './Header.js';
import Footer from './Footer.js';
import Spinner from './Spinner.js';
import { useSelector } from 'react-redux';

const Layout = ({ children, title = 'Daavi Special', content, type, name, description }) => {
   
    
    const { loading } = useSelector(store => store.mydaavi);

    //   console.log('Loading state:', loading);  // Debugging

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={content} />
                    <meta name="description" content={description} />
                    <meta property="og:type" content={type} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta name="twitter:creator" content={name} />
                    <meta name="twitter:card" content={type} />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                </Helmet>
            </HelmetProvider>
            
            <Header />
            <div className="grid min-h-screen gap-0 bg-blue-5">
                {loading ? <Spinner /> : children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;
