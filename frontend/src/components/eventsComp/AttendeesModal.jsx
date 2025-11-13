import React, { useState } from 'react';
import { X } from 'lucide-react';

const AttendeesModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('Going');
  const dummyGoing = [{ id: 1, name: 'Ivan Kruh', location: 'Main St', avatar: 'https://placehold.co/40x40/dbeafe/2563eb?text=I' }];
  const dummyInterested = [
    { id: 2, name: 'Amy Leat', location: 'Spencertown', avatar: 'https://placehold.co/40x40/fecdd3/b91c1c?text=A' },
    { id: 3, name: 'John Doe', location: 'Dalton', avatar: 'https://placehold.co/40x40/ccfbf1/065f46?text=J' }
  ];

  const renderTab = (label) => (
    <button
      onClick={() => setActiveTab(label)}
      className={`pb-2 px-3 text-sm font-medium ${
        activeTab === label
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Attendees</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="px-4 pt-2 border-b">
          <nav className="flex space-x-2">
            {renderTab('Going')}
            {renderTab('Interested')}
          </nav>
        </div>

        {/* Invite */}
        <div className="p-4 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="font-medium text-gray-800">Invite more people</h3>
            <p className="text-sm text-gray-600">Spread the word about this event</p>
          </div>
          <button className="bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-900">
            Invite
          </button>
        </div>
        
        {/* List */}
        <div className="p-4 max-h-60 overflow-y-auto">
          {activeTab === 'Going' && dummyGoing.map(user => (
            <div key={user.id} className="flex items-center space-x-3 py-2">
              <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
              <div>
                <span className="font-medium text-gray-800 text-sm">{user.name}</span>
                <span className="text-xs text-gray-500 block">{user.location}</span>
              </div>
            </div>
          ))}
          {activeTab === 'Interested' && dummyInterested.map(user => (
            <div key={user.id} className="flex items-center space-x-3 py-2">
              <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
              <div>
                <span className="font-medium text-gray-800 text-sm">{user.name}</span>
                <span className="text-xs text-gray-500 block">{user.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendeesModal;