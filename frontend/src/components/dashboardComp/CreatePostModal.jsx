import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X, Globe, Image, MapPin, AtSign, ShoppingBag, Calendar, BarChart, XCircle } from 'lucide-react';
import { GiPumpkin } from "react-icons/gi";

const CreatePost = ({ onClose }) => {
  const [postType, setPostType] = useState('text');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- STATE TAMBAHAN UNTUK FITUR BARU ---
  const [imageFile, setImageFile] = useState(null); // Untuk file aslinya
  const [imagePreview, setImagePreview] = useState(null); // Untuk URL preview gambar
  const [location, setLocation] = useState(''); // Untuk teks lokasi
  const [isLocationInputOpen, setIsLocationInputOpen] = useState(false); // Untuk toggle input lokasi
  
  // Ref untuk input file yang tersembunyi
  const fileInputRef = useRef(null);
  // --- AKHIR STATE TAMBAHAN ---

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'User Name';
  const userInitial = userInfo ? userInfo.firstName.charAt(0).toUpperCase() : '?';

  // --- FUNGSI BARU: Untuk menangani pemilihan file ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Buat preview gambar
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
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Bersihkan input file
    }
  };
  // --- AKHIR FUNGSI BARU ---

  // --- FUNGSI UTAMA: Di-upgrade untuk FormData ---
  const handlePostSubmit = async () => {
    // Validasi baru: harus ada konten ATAU gambar
    if (!content.trim() && !imageFile) {
      setError('Postingan tidak boleh kosong.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    const token = userInfo ? userInfo.token : null;
    if (!token) {
      setError('Anda harus login untuk memposting.');
      setIsLoading(false);
      return;
    }

    // 1. Buat FormData
    const formData = new FormData();
    formData.append('content', content);
    formData.append('postType', postType);
    formData.append('location', location);
    
    // 2. Tambahkan file media jika ada
    if (imageFile) {
      formData.append('media', imageFile);
    }

    try {
      // 3. Kirim FormData
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          // 'Content-Type' JANGAN di-set. Browser akan otomatis mengaturnya
          // ke 'multipart/form-data' saat mengirim FormData
          'Authorization': `Bearer ${token}`
        },
        body: formData // Kirim objek FormData
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Gagal memposting.');
      }

      // Bersihkan semua state
      setContent('');
      setLocation('');
      setImageFile(null);
      setImagePreview(null);
      setIsLocationInputOpen(false);
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const PostTypeButton = ({ icon: Icon, label, type }) => (
    <button 
      onClick={() => setPostType(type)}
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
        
        {/* === KOLOM KIRI === */}
        {/* PENYEBAB ERROR ANDA DI SINI:
          Tag <div> di bawah ini (md:col-span-2) HARUS membungkus
          SEMUANYA sampai tombol "Post".
        */}
        <div className="md:col-span-2 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600">
                {userInitial}
              </div>
              <div>
                <h4 className="font-semibold">{userName}</h4>
                <button className="flex items-center text-sm text-gray-500 border rounded-full px-2 py-0.5 hover:bg-gray-100">
                  <Globe className="h-4 w-4 mr-1" /> Anyone
                </button>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Text Area */}
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
                onClick={() => fileInputRef.current.click()} // Membuka pemilih file
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
            <PostTypeButton icon={ShoppingBag} label="Sell or give away" type="sell" />
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