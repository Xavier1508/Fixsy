import React, { useEffect } from 'react';
import GroupCard from '../components/groupsComp/GroupCard.jsx';
import { Plus } from 'lucide-react';
import RightSidebar from '../components/dashboardComp/RightSidebar.jsx';

// Data Dummy
const dummyGroups = [
  { id: 1, name: 'COVID-19 vaccines in the Capital Regi...', members: 1081, image: 'https://placehold.co/80x80/dbeafe/2563eb?text=C19' },
  { id: 2, name: 'Veterans and Military Families of the...', members: 1081, image: 'https://placehold.co/80x80/fee2e2/b91c1c?text=VETS' },
  { id: 3, name: 'Shopping Help for Neighbors - Walma...', members: 2669, image: 'https://placehold.co/80x80/ecfccb/4d7c0f?text=SHOP' },
  { id: 4, name: 'Ashuelot ADUs', members: 7, image: 'https://placehold.co/80x80/ffe4e6/9f1239?text=ADU' },
  { id: 5, name: 'Shopping Help for Neighbors - Walma...', members: 2669, image: 'https://placehold.co/80x80/ecfccb/4d7c0f?text=SHOP' },
  { id: 6, name: 'Ashuelot ADUs', members: 7, image: 'https://placehold.co/80x80/ffe4e6/9f1239?text=ADU' },
];

const GroupsPage = () => {
  return (
    <div className="flex justify-center w-full max-w-5xl mx-auto">
      <main className="flex-1 max-w-2xl">
        <div className="flex items-center justify-between pt-6 mb-5">
          <h1 className="text-xl font-bold text-gray-900">Groups</h1>
          <button className="flex items-center space-x-1.5 bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-900">
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </button>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Groups near you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dummyGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </main>
      <RightSidebar />
    </div>
  );
};

export default GroupsPage;