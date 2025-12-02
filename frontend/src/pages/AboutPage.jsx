import React from "react";
// PENTING: Import icon ini harus ada agar tidak error
import { FaHandHoldingHeart, FaUsers } from "react-icons/fa"; 
import background from "../assets/images/bakgron-about.jpg";
import Navbar from '../components/Navbar.jsx';

const AboutPage = () => {
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      
      {/* --- BAGIAN 1: HERO SECTION --- */}
      <div className="relative w-full h-[500px]">
        {/* Background Image */}
        <img src={background} alt="Community" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Teks di tengah */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
            What's happening in your neighborhood,
            <br />
            <span className="text-blue-400">it's on Fixsy.</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl">
            Solusi lokal untuk kebutuhan sehari-hari Anda.
          </p>
          
          <div className="mt-8 flex gap-4">
             <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition">
                Join Community
             </button>
             <button className="bg-white hover:bg-gray-100 text-blue-900 px-6 py-3 rounded-full font-semibold transition">
                Learn More
             </button>
          </div>
        </div>
      </div>


      {/* --- BAGIAN 2: ABOUT SECTION (YANG TEKS "About Fixsy") --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Kolom Kiri: Ilustrasi/Gambar Kecil */}
            <div className="relative">
              <div className="bg-blue-100 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-200 opacity-50"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-blue-300 opacity-50"></div>
                <h3 className="text-blue-600 font-bold text-2xl z-10 text-center">
                  "Menghubungkan Tetangga, <br/>Saling Membantu"
                </h3>
              </div>
            </div>

            {/* Kolom Kanan: Teks Penjelasan */}
            <div>
              <h4 className="text-blue-500 font-bold uppercase tracking-wide text-sm mb-2">
                Tentang Kami
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Fixsy
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Fixsy adalah platform yang menghubungkan warga sekitar untuk saling membantu melalui keahlian mereka. Kami percaya bahwa setiap orang memiliki keterampilan berharga yang dapat memberi manfaat bagi komunitas.
              </p>

              {/* Fitur / Poin Penting */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-700">Menghubungkan keahlian warga lokal.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-700">Solusi perbaikan rumah hingga layanan harian.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-gray-700">Menciptakan lingkungan yang saling mendukung.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- BAGIAN 3: MISSION & DISCOVER (BARU) --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* --- KARTU KIRI: OUR MISSION --- */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                <FaHandHoldingHeart size={24} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              
              <p className="text-gray-800 font-medium text-lg mb-4">
                Our mission is to make every neighborhood feel like home.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                We do this by connecting neighbors to the local gems around them – people, places, and information. These local connections improve our lives by fostering a sense of community and belonging no matter where we live.
              </p>
            </div>

            {/* --- KARTU KANAN: DISCOVER COMMUNITY --- */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                 <FaUsers size={24} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Discover Community
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We all want to know what’s happening around us...and be a part of it. Which is why we built <strong>Fixsy</strong>.
                </p>
                <p>
                  It’s where you can get a recommendation for a favorite handyman, find out what’s next for that vacant corner lot, or get a timely alert when a storm is drawing near. 
                </p>
                <p>
                  We know that when neighbors start talking, communities get stronger. These connections are what help turn a location into a place you love to be.
                </p>
              </div>
            </div>

          </div>

          {/* Quote Penutup kecil */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
             <p className="text-xl text-gray-500 italic font-serif">
               "This is how we help ensure that for our neighbors, here... becomes home."
             </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;