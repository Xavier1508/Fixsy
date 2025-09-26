// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar.jsx';

// SVG Icons for social logins
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.522-3.441-11.022-8.162l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.01,35.638,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const AppleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19.3,4.24a5.2,5.2,0,0,0-4.36,2.56,4.51,4.51,0,0,0-4.08-2.48,5.34,5.34,0,0,0-4.75,3.2,5.7,5.7,0,0,0,.15,5.52A5,5,0,0,0,8,18.35a4.87,4.87,0,0,0,3.69-1.87,4.45,4.45,0,0,0,3.53,1.82,4.72,4.72,0,0,0,4-2.1,5.3,5.3,0,0,0-2.31-9.28Zm-5.4,1.4a3.14,3.14,0,0,1,2.83,1.63,3,3,0,0,1-2.26,4.65A3.2,3.2,0,0,1,11.52,9a3,3,0,0,1,2.38-3.34ZM7.78,5.82A3.27,3.27,0,0,1,10.92,9a3.14,3.14,0,0,1-2.45,3.1,3.31,3.31,0,0,1-3.23-1.63A3.13,3.13,0,0,1,7.49,6,3.22,3.22,0,0,1,7.78,5.82Z" />
    </svg>
);


function App() {
  return (
    <div className="bg-[#ebf2fa] min-h-screen font-sans">
      <Navbar />

      <main>
        {/* Hero Section */}
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[85vh]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7207?q=80&w=2070&auto=format&fit=crop')" }}
          >
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-xl p-8 md:p-10 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-[#05668d] mb-4">
                  Discover your neighborhood
                </h2>
                
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <GoogleIcon /> Continue with Google
                    </button>
                    <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-800">
                        <AppleIcon /> Continue with Apple
                    </button>
                </div>
                
                <div className="my-6 flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input type="email" id="email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-[#427aa1] focus:border-[#427aa1]" placeholder="Email address" />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">Create a password</label>
                    <input type="password" id="password" required className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-[#427aa1] focus:border-[#427aa1]" placeholder="Create a password" />
                  </div>
                  <p className="text-xs text-gray-500">
                    By continuing, you agree to our <a href="#" className="text-[#427aa1] hover:underline">Terms of Use</a> and <a href="#" className="text-[#427aa1] hover:underline">Privacy Policy</a>.
                  </p>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#679436] hover:bg-[#a5be00] font-bold rounded-md text-sm px-5 py-3 text-center transition-colors"
                  >
                    Continue
                  </button>
                </form>
                 <div className="text-center mt-4">
                    <a href="#" className="text-sm font-semibold text-[#427aa1] hover:underline">Have a business? Get started</a>
                </div>
              </div>
            </div>
             <div className="text-center mt-6">
                <a href="#" className="text-white font-semibold bg-black/20 backdrop-blur-sm px-6 py-3 rounded-md hover:bg-black/40">
                    Have an invite code?
                </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="bg-white -mt-24 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-8">
                    
                    <div className="lg:w-1/3 w-full">
                        <div className="h-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop" alt="Feature 1" className="w-full h-full object-cover"/>
                            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full">
                                <h3 className="text-white text-lg font-semibold">A secure environment where neighbors verify their address to join.</h3>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3 w-full">
                         <div className="h-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7185743?q=80&w=2070&auto=format&fit=crop" alt="Feature 2" className="w-full h-full object-cover"/>
                             <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full">
                                <h3 className="text-white text-lg font-semibold">Stay informed with alerts and local news from trusted sources.</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/3 w-full">
                         <div className="h-full bg-white shadow-lg rounded-lg overflow-hidden relative">
                           <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" alt="Feature 3" className="w-full h-full object-cover"/>
                             <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full">
                                <h3 className="text-white text-lg font-semibold">Discover local favorites recommended by neighbors.</h3>
                            </div>
                        </div>
                    </div>

                </div>
                 <div className="text-center mt-12">
                     <h2 className="text-3xl font-bold text-[#05668d]">Connect with your neighbors</h2>
                     <button className="mt-4 rounded-full bg-[#679436] px-8 py-3 text-md font-semibold text-white shadow-sm hover:bg-[#a5be00] transition-colors">
                        Join Fixsy
                     </button>
                 </div>
            </div>
        </section>

      </main>
    </div>
  );
}

export default App;
