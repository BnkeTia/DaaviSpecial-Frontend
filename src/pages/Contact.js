import React from 'react';
import Layout from '../components/Layout';

const Contact = () => {
  return (
    <Layout>
    <div className="min-h-screen p-6 lg:p-12 mt-[80px]">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">Feel free to reach out to us using the form below or through our contact information. We look forward to hearing from you!</p>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
                <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
              </div>

              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Send Message</button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Details</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18M4 8h16m-7 4h7m-7 4h7m-7 4h7m-7 4h7" /></svg>
                <p className="text-gray-600">1234 Main Street, Ejisu, Kumasi, Ghana</p>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21l-4-4-4 4V5h8v16z" /></svg>
                <p className="text-gray-600">+233 (020) 3719358</p>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a4 4 0 004 4h12a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" /></svg>
                <p className="text-gray-600">dasarentow@gmail.com</p>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.293 14.293a1 1 0 010-1.414l1.4-1.4a1 1 0 00-1.414-1.414l-1.4 1.4a1 1 0 01-1.414 0l-4.6-4.6a1 1 0 00-1.414 1.414l4.6 4.6a1 1 0 011.414 0l1.4 1.4a1 1 0 001.414-1.414l-1.4-1.4a1 1 0 00-1.414 1.414l1.4 1.4a1 1 0 001.414 0l1.4-1.4a1 1 0 000-1.414z" /></svg>
                <a href="https://www.facebook.com" className="text-blue-600 hover:underline">Facebook</a>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 15.172a4 4 0 00-5.656-5.656A6.96 6.96 0 0112 6a6.96 6.96 0 011.828.516 4 4 0 00-5.656 5.656A6.96 6.96 0 016 12a6.96 6.96 0 01.516-1.828 4 4 0 00-5.656 5.656A6.96 6.96 0 012 12a6.96 6.96 0 01.516-1.828 4 4 0 00-5.656 5.656A6.96 6.96 0 010 12a6.96 6.96 0 01.516-1.828A4 4 0 00-5.656 15.172z" /></svg>
                <a href="https://twitter.com" className="text-blue-600 hover:underline">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5">Find Us</h2>
          <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg">
          <iframe
  title="Google Maps"
  className="w-full h-full"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20070.062454906226!2d-1.6235073776648547!3d6.6744687281964185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf7b04f6eb8d47%3A0x3c5b9dbe95e440f1!2sEjisu%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1626808233773!5m2!1sen!2sgh"
  style={{ border: 0 }}
  allowFullScreen
></iframe>

          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Contact;
