import React from 'react';
import { features } from '../constant/index.jsx'

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Why Choose Fixsy?</h2>
          <p className="mt-4 text-lg text-gray-600">We've designed Fixsy to make getting help from your neighbors as safe, reliable, and convenient as possible.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="inline-block p-3.5 bg-[#7abbe6] text-white rounded-full mb-4 text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;