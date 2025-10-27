import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

const neighbors = [
  { id: 1, name: 'Glenna Beonoff', location: 'Pleasant and High', avatar: 'G' },
  { id: 2, name: 'Glenna Renzi', location: 'Pleasant and High', avatar: 'G' },
  { id: 3, name: 'Gregory Berry', location: 'Pleasant and High', avatar: 'G' },
];

const CreateChatModal = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);

  const toggleSelection = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Create a chat</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input 
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7abbe6]"
            />
          </div>
        </div>

        {/* Daftar Tetangga */}
        <div className="p-4 h-64 overflow-y-auto">
          {neighbors
            .filter(n => n.name.toLowerCase().includes(search.toLowerCase()))
            .map(neighbor => (
              <div key={neighbor.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600">
                    {neighbor.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{neighbor.name}</h4>
                    <p className="text-sm text-gray-500">{neighbor.location}</p>
                  </div>
                </div>
                <input 
                  type="checkbox"
                  checked={selected.includes(neighbor.id)}
                  onChange={() => toggleSelection(neighbor.id)}
                  className="h-5 w-5 rounded text-[#3a9bdc] focus:ring-[#3a9bdc]"
                />
              </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 bg-gray-50 border-t rounded-b-lg">
          <button 
            disabled={selected.length === 0}
            className="px-6 py-2 rounded-full bg-[#3a9bdc] text-white font-semibold hover:bg-[#2582c0] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;