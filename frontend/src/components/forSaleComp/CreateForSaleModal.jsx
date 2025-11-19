import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { X, ArrowLeft, Image, UploadCloud, Trash2, XCircle, MapPin, ChevronDown, CheckCircle } from 'lucide-react';
import { useModal } from '../../hooks/useModal';

const BACKEND_URL = 'http://localhost:5000';
const MAX_PHOTOS = 10;
const CATEGORIES = [
  'Furniture', 'Electronics', 'Garden & Tools', 'Clothing & Accessories', 
  'Appliances', 'Baby & Kids', 'Vehicles', 'Toys & Games', 
  'Sports & Outdoors', 'Other', 'Free'
];
const CONDITIONS = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'];

// Data untuk panduan foto, seperti Nextdoor [cite: image_22c3e5.png]
const PHOTO_GUIDES = [
  { title: "Good lighting and background", description: "Use natural light and a clean background." },
  { title: "Multiple angles and scale", description: "Take multiple angles and include a scale reference." },
  { title: "Clean and honest representation", description: "Present the item accurately, flaws included." },
  { title: "Quality over quantity", description: "Choose a few high-quality images." },
];

const CreateForSaleModal = () => {
  const { closeModal } = useModal();
  const [step, setStep] = useState(1); // 1: Photos, 2: Details, 3: Location, 4: Review (Optional)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'Used - Good', // Default condition
    location: '',
  });
  const [isFree, setIsFree] = useState(false);
  const [photos, setPhotos] = useState([]); // { file: File, preview: string }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // --- Drag and Drop Handlers ---
  const [dragging, setDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    dragCounter.current = 0;

    const files = Array.from(e.dataTransfer.files);
    if (photos.length + files.length > MAX_PHOTOS) {
      setError(`Anda hanya dapat mengunggah maksimal ${MAX_PHOTOS} foto.`);
      return;
    }
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
    setError('');
  };

  // --- Photo Management ---
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > MAX_PHOTOS) {
      setError(`Anda hanya dapat mengunggah maksimal ${MAX_PHOTOS} foto.`);
      return;
    }
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
    setError('');
  };

  const removePhoto = (index) => {
    setPhotos(prev => {
      const newPhotos = prev.filter((_, i) => i !== index);
      // Revoke object URL to free up memory
      URL.revokeObjectURL(prev[index].preview); 
      return newPhotos;
    });
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    };
  }, []); // Run once on mount

  // --- Navigation & Validation ---
  const handleNext = () => {
    if (step === 1 && photos.length === 0) {
      setError('Unggah minimal 1 foto untuk melanjutkan.');
      return;
    }
    if (step === 2) {
      if (!formData.title || !formData.category) {
        setError('Judul dan Kategori tidak boleh kosong.');
        return;
      }
      // Pastikan harga bukan negatif jika tidak gratis
      if (!isFree && (isNaN(formData.price) || Number(formData.price) < 0)) {
        setError('Harga tidak valid.');
        return;
      }
    }
    if (step === 3) {
      if (!formData.location) {
        setError('Lokasi tidak boleh kosong.');
        return;
      }
    }
    setError('');
    setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleFree = () => {
    setIsFree(!isFree);
    if (!isFree) {
      setFormData(prev => ({ ...prev, price: '0' }));
    } else {
      setFormData(prev => ({ ...prev, price: '' }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    const data = new FormData();

    photos.forEach(photo => {
      data.append('images', photo.file);
    });

    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', isFree ? 0 : Number(formData.price));
    data.append('isFree', isFree);
    data.append('category', formData.category);
    data.append('condition', formData.condition);
    data.append('location', formData.location);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };
      await axios.post(`${BACKEND_URL}/api/forsale`, data, config);
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat listing.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Konten ---
  const renderHeader = () => (
    <div className="flex items-center justify-between p-4 border-b">
      {step === 1 ? (
        <button onClick={closeModal} className="p-2 rounded-full hover:bg-gray-100 text-gray-600"><X className="h-5 w-5" /></button>
      ) : (
        <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-100 text-gray-600"><ArrowLeft className="h-5 w-5" /></button>
      )}
      <h3 className="text-lg font-semibold text-gray-800">New listing</h3>
      {step < 3 ? ( // Next for steps 1 and 2
        <button 
          onClick={handleNext} 
          className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
            (step === 1 && photos.length === 0) || (step === 2 && (!formData.title || !formData.category || (!isFree && (isNaN(formData.price) || Number(formData.price) < 0)))) || (step === 3 && !formData.location)
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-[#3a9bdc] text-white hover:bg-[#2582c0]'
          }`}
          disabled={(step === 1 && photos.length === 0) || (step === 2 && (!formData.title || !formData.category || (!isFree && (isNaN(formData.price) || Number(formData.price) < 0)))) || (step === 3 && !formData.location)}
        >
          Next
        </button>
      ) : ( // Post for step 3 (last step)
        <button 
          onClick={handleSubmit} 
          disabled={isLoading || !formData.location} 
          className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
            isLoading || !formData.location ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#3a9bdc] text-white hover:bg-[#2582c0]'
          }`}
        >
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      )}
    </div>
  );

  const renderStep1 = () => (
    <div className="flex flex-col p-6">
      {/* Upload Section */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        multiple 
        accept="image/*" 
      />

      <div
        className={`relative flex flex-col items-center justify-center p-8 border-2 ${
          dragging ? 'border-[#3a9bdc] bg-[#e0f2fe]' : 'border-dashed border-gray-300'
        } rounded-lg text-center cursor-pointer hover:border-[#3a9bdc] transition-all`}
        onClick={() => fileInputRef.current.click()}
        onDragIn={handleDragIn}
        onDragOut={handleDragOut}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragOut}
        onDragEnter={handleDragIn}
      >
        <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
        <span className="font-semibold text-gray-700">Add photos</span>
        <span className="text-sm text-gray-500">
          Add up to {MAX_PHOTOS} photos. You can drag and drop.
        </span>

        {dragging && (
          <div className="absolute inset-0 bg-blue-100 bg-opacity-70 flex items-center justify-center pointer-events-none">
            <span className="text-[#3a9bdc] text-lg font-bold">
              Drop your photos here!
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}

      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={photo.preview}
                alt={`preview ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-0.5 hover:bg-opacity-75"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PHOTO GUIDES (now moved to bottom) */}
      <div className="w-full mt-8">
        <h4 className="font-semibold text-gray-800 mb-4 ">
          Listings with good photos are more likely to sell their items.
        </h4>

        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 px-2 w-max">
            {PHOTO_GUIDES.map((guide, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-white border rounded-xl shadow-sm p-4 flex-shrink-0"
              >
                <p className="font-semibold text-gray-800 mb-1">
                  {guide.title}
                </p>
                <p className="text-sm text-gray-600 leading-tight">
                  {guide.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-6 space-y-4">
      <h3 className="text-xl font-semibold mb-2">What are you selling?</h3>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]" placeholder="What are you selling?" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]" placeholder="Describe your item"></textarea>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} disabled={isFree} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc] disabled:bg-gray-100" />
        </div>
        <div className="flex items-center pt-6">
          <button onClick={handleToggleFree} className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${isFree ? 'bg-[#3a9bdc]' : 'bg-gray-300'}`}>
            <span className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform ${isFree ? 'translate-x-6' : ''}`}></span>
          </button>
          <span className="ml-2 font-medium text-gray-700">Free</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]">
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
          <select id="condition" name="condition" value={formData.condition} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]">
            {CONDITIONS.map(con => <option key={con} value={con}>{con}</option>)}
          </select>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );

  const renderStep3 = () => (
    <div className="p-6 space-y-4">
      <h3 className="text-xl font-semibold mb-4">Pickup location</h3>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]" placeholder="e.g. Pleasant and High, Pittsfield" />
          {/* <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3a9bdc] text-sm font-semibold hover:underline">Edit</button> */}
        </div>
      </div>
      <div className="w-full h-48 bg-gray-200 rounded-lg my-4 flex items-center justify-center text-gray-500">
        (Map placeholder)
      </div>
      <div className="flex items-center space-x-2">
        <button className="w-12 h-6 rounded-full flex items-center p-1 transition-colors bg-gray-300">
            <span className="h-4 w-4 bg-white rounded-full shadow-md transform transition-transform"></span>
          </button>
        <span className="text-sm text-gray-700">Show specific location</span>
      </div>
      <p className="text-xs text-gray-500">Showing a specific location can help you reach more buyers.</p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"> {/* Max-width lebih besar */}
        {renderHeader()}
        <div className="overflow-y-auto flex-grow">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default CreateForSaleModal;