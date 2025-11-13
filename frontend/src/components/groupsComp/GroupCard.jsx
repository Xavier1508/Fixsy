import React from 'react';

// Buat folder baru: src/components/groupsComp/
const GroupCard = ({ group }) => {
  return (
    // Desain clean: border, shadow ringan, rounded-lg
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex flex-col items-center text-center">
        <img 
          src={group.image} 
          alt={group.name}
          className="h-20 w-20 rounded-full mb-3"
        />
        <h3 className="font-semibold text-gray-800 text-sm truncate w-full" title={group.name}>
          {group.name}
        </h3>
        <p className="text-xs text-gray-500 mb-4">{group.members} members</p>
        <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Join
        </button>
      </div>
    </div>
  );
};

export default GroupCard;