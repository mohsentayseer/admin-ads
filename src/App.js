import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAds } from './features/adsSlice';
import AdsList from './components/AdsList/AdsList';

function App() {
  const dispatch = useDispatch();
  const adsStatus = useSelector((state) => state.ads.status);
  const [isModalOpen, setIsModalOpen] = useState(false);



  useEffect(() => {
    if (adsStatus === 'idle') {
      dispatch(fetchAds());
    }
  }, [adsStatus, dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="App">
      <h1>Admin Ads Dashboard</h1>
      <AdsList />
    </div>
  );
}

export default App;