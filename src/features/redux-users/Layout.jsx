import React from "react";

// import { Helmet } from 'react-helmet'
import { Helmet } from "react-helmet-async";
// import UserNavBar from "./UserNavBar";
import Navbar from "features/medInfoApp/components/Navbar";

// const Layout = (props) => (

const Layout = ({ children, title, content, type, name, description }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
      {/* own */}
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>

    <Navbar />
    <div className="container max-w-5xl px-2 mx-auto md:pt-24">{children}</div>
  </>
);

export default Layout;
