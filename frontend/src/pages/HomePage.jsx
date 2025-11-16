// frontend/src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useHeader } from '../hooks/useHeader.jsx';

import MainFeed from '../components/homeComp/MainFeed.jsx';
import HomeRightSidebar from '../components/homeComp/HomeRightsidebar.jsx';
import RightSidebar from '../components/dashboardComp/RightSidebar.jsx';

const HomePage = () => {
  const { onOpenCreatePost } = useOutletContext();
  const { setHeaderContent } = useHeader();
  useEffect(() => {
    setHeaderContent(null);
    return () => setHeaderContent(null);
  }, [setHeaderContent]);

  return (
    <div className="flex justify-center w-full max-w-5xl mx-auto">
      <main className="flex-1 max-w-2xl">
        {/* 3. Melewati 'onOpenCreatePost' ke MainFeed baru */}
        <MainFeed onOpenCreatePost={onOpenCreatePost} />
      </main>
      
      <RightSidebar content={<HomeRightSidebar />} />
    </div>
  );
};

export default HomePage;