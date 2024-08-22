import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">ABOUT US</h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <p className="mb-4">
            <span className="font-semibold text-olive-600">Demountable Sales and Hire</span> have been operating in the Northern
            Territory for more than 25 years. We offer a turnkey service in way of
            the design, manufacture, delivery, commissioning, asset services
            support and complete facilities management services.
          </p>
          <p className="mb-4">
            Support is offered across small to large contracts with the ability to
            build and maintain a camp facility of up to 1000 personnel. Custom
            made buildings are available across all aspects of Industry including,
            schools, public services, immigration and quarantine services,
            emergency situations and general accommodation.
          </p>
          <p>
            <span className="text-olive-600">Temporary accommodation</span> available for outstations and communities.
          </p>
        </div>
        <div className="md:w-1/2">
          <img 
            src="/images/welding.png" 
            alt="Worker welding" 
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="mt-12 bg-blue-800 text-white p-6 rounded-lg flex justify-between items-center">
        <h2 className="text-2xl font-bold">Find out more TODAY!</h2>
        <Link to="/contact" className="bg-olive-500 hover:bg-olive-600 text-white font-bold py-2 px-4 rounded">
          CONTACT US
        </Link>
      </div>
    </div>
  );
}

export default About;