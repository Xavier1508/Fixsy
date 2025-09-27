import React from 'react';
import {services} from '../constant/index.jsx'
const ServicesSection = () => {
  return (
    <section className="py-20 bg-[#7abbe6]">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800">Popular Services</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">From quick fixes to ongoing support, your neighbors are here to help with all kinds of tasks and services.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {services.map((service, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
                        <div className="text-4xl mb-3">{service.icon}</div>
                        <h3 className="text-lg font-bold">{service.title}</h3>
                    </div>
                ))}
            </div>
            <p className="mt-12 text-gray-700">Don't see what you need? <a href="#" className="font-bold text-green-600 hover:underline">Ask anyway!</a> Our community is full of helpful neighbors.</p>
        </div>
    </section>
  )
}

export default ServicesSection;