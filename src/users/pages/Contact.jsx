import React from 'react';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';

function Contact() {
  return (
    <>
    <Header/>
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Contacts</h2>
        <p className="text-center max-w-2xl mx-auto text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ratione, officia delectus
          consequuntur, dicta libero magni omnis architecto voluptas culpa praesentium ipsum
          assumenda quae dolor, nihil rerum fugit expedita corrupti.
        </p>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
          <div className="flex flex-col items-center">
            <div className="bg-gray-300 p-3 rounded-full mb-2">
              <FontAwesomeIcon icon={faLocationCrosshairs} />
            </div>
            <p>
              123 Main Street, Apt 4B,<br /> Anytown, CA 91234
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-300 p-3 rounded-full mb-2">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <p>+91 9874561230</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-300 p-3 rounded-full mb-2">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <p>Bookstore@gmail.com</p>
          </div>
        </div>

        
        <div className="grid md:grid-cols-2 gap-30">
          
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-center">Send me Message</h3>
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-2 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email ID"
                className="px-4 py-2 rounded border  bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                rows="4"
                placeholder="Message"
                className="px-4 py-2 rounded border  bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              <button
                type="submit"
                className="bg-gray-800 text-white py-2 rounded hover:bg-gray-700 flex items-center justify-center gap-2"
              >
                Send
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
            </form>
          </div>

        
          <div className="rounded-md overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps?q=Kakkanad,+Kerala&output=embed"
              className="w-full h-full min-h-[350px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;