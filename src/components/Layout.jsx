
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "./Header.js";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer.js";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



const Layout = ({ children, title = 'Daavi Special', content, type, name, description }) => {

    const username = Cookies.get('username')
    const isAuthenticated = Cookies.get('isAuthenticated')
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
                    {children}
        
            </div>
        
            
            <Footer />
          
            
        </>
    );
};

export default Layout;