// frontend/src/pages/ForSaleDetailPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Bookmark, MessageSquare, Send, ThumbsUp, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { useHeader } from '../../hooks/useHeader.jsx';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../../hooks/useAuthContext.jsx'; // Import hook untuk mendapatkan user login

const BACKEND_URL = 'http://localhost:5000';

// --- Komponen Modal Konfirmasi Delete ---
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold text-red-600 mb-3 flex items-center">
          <Trash2 className="h-6 w-6 mr-2" />
          Confirm Deletion
        </h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the item **"{itemTitle}"**? 
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition"
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Komponen ForSaleDetailPage ---
const ForSaleDetailPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { setHeaderContent } = useHeader();
  const { user: authUser } = useAuthContext(); // Dapatkan user login
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  // Cek apakah item ini milik user yang sedang login
  const isOwner = item && authUser && item.user?._id === authUser._id;

  useEffect(() => {
    setHeaderContent(null);
    return () => setHeaderContent(null);
  }, [setHeaderContent]);

  useEffect(() => {
    const fetchItem = async () => {
      const token = authUser?.token;
      try {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const { data } = await axios.get(`${BACKEND_URL}/api/forsale/${itemId}`, config);
        setItem(data);
      } catch (error) {
        console.error("Gagal mengambil detail item:", error);
        setError(
            error.response?.data?.message ||
            'Gagal mengambil detail item.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId, authUser]); // Tambahkan authUser sebagai dependency

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  // Logika untuk menghapus item
  const handleDelete = async () => {
    setIsModalOpen(false); // Tutup modal
    if (!authUser || !isOwner) {
      setError("Unauthorized action.");
      return;
    }

    const token = authUser.token;
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${BACKEND_URL}/api/forsale/${itemId}`, config);
      
      // Berhasil dihapus, navigasi ke halaman listing user atau dashboard
      alert(`Item "${item.title}" successfully deleted.`);
      navigate('/dashboard/forsale'); // Navigasi ke halaman utama For Sale
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      setError(
          error.response?.data?.message ||
          'Failed to delete item.'
      );
      setLoading(false);
    }
  };


  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!item) return <div className="text-center p-10">Item not found.</div>;

  const user = item.user || {};
  const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });

  return (
    <>
      <DeleteConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        itemTitle={item.title}
      />
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Kolom Kiri: Gambar */}
        <div className="flex-1 md:flex-none md:w-3/5">
          <div className="bg-black rounded-lg overflow-hidden relative aspect-square">
            {/* ... (bagian gambar yang ada) ... */}
            <img 
              src={`${BACKEND_URL}${item.images[currentImageIndex]}`} 
              alt={item.title} 
              className="w-full h-full object-contain"
            />
            {item.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white bg-opacity-70 rounded-full shadow-md hover:bg-opacity-100">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white bg-opacity-70 rounded-full shadow-md hover:bg-opacity-100">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Info */}
        <div className="flex-1 md:w-2/5 p-4 md:p-0">
          <div className="bg-white rounded-lg shadow-sm border p-5 sticky top-24">
            <div className="flex justify-between items-start">
              <div>
                <h1 className={`text-3xl font-bold ${item.isFree ? 'text-green-600' : 'text-gray-800'}`}>
                  {item.isFree ? 'FREE' : `$${item.price}`}
                </h1>
                <h2 className="text-xl font-semibold text-gray-800 mt-1">{item.title}</h2>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                <Bookmark className="h-6 w-6" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">{timeAgo} · {item.condition}</p>
            
            {/* Tombol Delete hanya muncul jika user adalah pemilik item */}
            {isOwner ? (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-4 py-2.5 flex items-center justify-center bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete This Sale
              </button>
            ) : (
              // Tombol "Send Message" untuk non-pemilik
              <button className="w-full mt-4 py-2.5 bg-[#3a9bdc] text-white font-semibold rounded-full hover:bg-[#2582c0]">
                Send message
              </button>
            )}
            
            <div className="mt-5 pt-5 border-t">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700 text-sm">{item.description || 'No description provided.'}</p>
            </div>

            <div className="mt-5 pt-5 border-t">
              <h3 className="font-semibold mb-3">Seller</h3>
              <Link to={`/dashboard/profile/${user._id}`} className="flex items-center space-x-3 group">
                {user.profilePicture ? (
                  <img src={`${BACKEND_URL}${user.profilePicture}`} alt={user.firstName} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600">
                    {user.firstName ? user.firstName.charAt(0) : 'U'}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-800 group-hover:underline">{user.firstName} {user.lastName}</h4>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForSaleDetailPage;