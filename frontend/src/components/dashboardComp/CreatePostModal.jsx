import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X, Globe, Image, MapPin, AtSign, ShoppingBag, Calendar, BarChart, XCircle } from 'lucide-react';
import { GiPumpkin } from "react-icons/gi";
import { useModal } from '../../hooks/useModal'; // Menggunakan hook baru

const BACKEND_URL = 'http://localhost:5000';

// Component ini TIDAK LAGI menerima onClose, melainkan menggunakan useModal
const CreatePost = () => { 
  const { closeModal, switchToForSaleModal } = useModal(); // Ambil fungsi dari hook
  
  const [postType, setPostType] = useState('text');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- STATE TAMBAHAN UNTUK FITUR BARU ---
  const [imageFile, setImageFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); 
  const [location, setLocation] = useState(''); 
  const [isLocationInputOpen, setIsLocationInputOpen] = useState(false); 
  const fileInputRef = useRef(null);
  // --- AKHIR STATE TAMBAHAN ---

  // --- LOGIKA FOTO PROFIL DINAMIS ---
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'User Name';
  const userInitial = userInfo ? userInfo.firstName.charAt(0).toUpperCase() : '?';
  const userAvatar = userInfo?.profilePicture; // Mengambil URL foto profil
  // --- END LOGIKA FOTO PROFIL DINAMIS ---

  // --- LOGIKA PENGALIHAN MODAL ---
  const handleSellOrGiveAwayClick = () => {
    // Memanggil fungsi dari Context untuk menutup modal ini dan membuka ForSaleModal
    switchToForSaleModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handlePostSubmit = async () => {
    if (!content.trim() && !imageFile) {
      setError('Postingan tidak boleh kosong.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // --- LOGIKA POSTING DI SINI ---
    // PENTING: PANGGILAN closeModal() YANG REDUNDAN DI SINI TELAH DIHAPUS
    console.log('Posting:', { content, location, hasImage: !!imageFile });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    closeModal(); // Menggunakan closeModal dari hook, hanya dipanggil setelah loading selesai
  };

  // Komponen pembantu (Tampilan DUA KOLOM TETAP SAMA)
  const PostTypeButton = ({ icon: Icon, label, type, onClick }) => (
    <button 
      onClick={onClick || (() => setPostType(type))}
      className={`flex flex-col items-center justify-center p-4 w-full rounded-lg transition-colors ${
        postType === type ? 'bg-[#e0f2fe] text-[#3a9bdc]' : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      <Icon className="h-8 w-8 mb-2" />
      <span className="font-semibold text-sm text-center">{label}</span>
    </button>
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-3">
        
        {/* === KOLOM KIRI (UTAMA) === */}
        <div className="md:col-span-2 p-6"> 
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              
              {/* --- AVATAR DINAMIS --- (Struktur HTML TIDAK BERUBAH) */}
              {userAvatar ? (
                <img 
                  src={`${BACKEND_URL}${userAvatar}`} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full object-cover" 
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600">
                  {userInitial}
                </div>
              )}
              {/* --- AKHIR AVATAR DINAMIS --- */}
              
              <div>
                <h4 className="font-semibold">{userName}</h4>
                <button className="flex items-center text-sm text-gray-500 border rounded-full px-2 py-0.5 hover:bg-gray-100">
                  <Globe className="h-4 w-4 mr-1" /> Anyone
                </button>
              </div>
            </div>
            <button onClick={closeModal} className="p-2 rounded-full hover:bg-gray-100">
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Text Area (TETAP SAMA) */}
          <textarea 
            placeholder="What's on your mind, neighbor?"
            className="w-full h-40 p-2 bg-gray-200 text-gray-800 rounded-2xl border-none focus:ring-0 focus:outline-blue-600 resize-none text-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {isLocationInputOpen && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Tambahkan lokasi..."
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7abbe6]"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
          )}

          {imagePreview && (
              <div className="mt-4 relative">
                <img src={imagePreview} alt="Preview" className="w-full rounded-lg max-h-80 object-contain" />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            )}
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button 
                onClick={() => fileInputRef.current.click()} 
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-green-500"
              >
                <Image className="h-6 w-6" />
              </button>

              <button 
                onClick={() => setIsLocationInputOpen(!isLocationInputOpen)}
                className={`p-2 rounded-full hover:bg-gray-100 ${
                  isLocationInputOpen ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <MapPin className="h-6 w-6" />
              </button>

              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#3a9bdc]">
                <AtSign className="h-6 w-6" />
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />

            <button 
              onClick={handlePostSubmit}
              disabled={isLoading || (!content.trim() && !imageFile)}
              className="py-2 px-6 rounded-full bg-[#3a9bdc] text-white font-bold hover:bg-[#2582c0] disabled:bg-gray-800 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>

        {/* === KOLOM KANAN === */}
        <div className="bg-gray-50 p-6 rounded-r-lg border-l">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Create something</h3>
          <div className="space-y-3">
            <PostTypeButton icon={GiPumpkin} label="Add to the Treat Map" type="treat" />
            
            {/* TOMBOL PENGALIH MODAL */}
            <PostTypeButton 
              icon={ShoppingBag} 
              label="Sell or give away" 
              type="sell" 
              onClick={handleSellOrGiveAwayClick} // MENGHUBUNGKAN KE SWITCH MODAL
            />
            
            <PostTypeButton icon={Calendar} label="Create an event" type="event" />
            <PostTypeButton icon={BarChart} label="Poll your neighbors" type="poll" />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default CreatePost;