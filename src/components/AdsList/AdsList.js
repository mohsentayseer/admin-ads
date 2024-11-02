// AdsList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAd } from '../../features/adsSlice';
import './AdsList.css';
import EditAdForm from '../EditAdForm/EditAdForm';
import AddAdForm from '../AddAdForm/AddAdForm';
import Modal from '../Modal/Modal';

const AdsList = () => {
  const { adsList, status, error } = useSelector((state) => state.ads);
  const dispatch = useDispatch();
  const [selectedAd, setSelectedAd] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddingAd, setIsAddingAd] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteAd(id));
  };

  const handleEdit = (ad) => {
    setSelectedAd(ad);
    setModalOpen(true);
    setIsAddingAd(false); // Make sure we're in edit mode
  };

  const handleAddAd = () => {
    setSelectedAd(null);
    setModalOpen(true);
    setIsAddingAd(true); // Set to adding mode
  };

  const handleCloseModal = () => {
    setSelectedAd(null);
    setModalOpen(false);
    setIsAddingAd(false);
  };

  if (status === 'loading') return <p>Loading ads...</p>;
  if (status === 'failed') return <p>Error loading ads: {error}</p>;

  return (
    <div className="ads-container">
      <button onClick={handleAddAd} className="add-ad-button">Add New Ad</button>
      <ul className="ads-list">
        {Array.isArray(adsList) ? (
          adsList.map((ad) => (
            <li key={ad.id} className="ad-item">
              <div className="ad-content">
                <h3 className="ad-type">{ad.video ? "Video Ad" : "Image Ad"}</h3>
                {ad.video && <video src={ad.video} controls className="ad-media" />}
                {ad.image && <img src={ad.image} alt="Img Ad" className="ad-media" />}
              </div>
              <div className="ad-actions">
                <p className="ad-time">Start Time: {ad.from_time}</p>
                <p className="ad-time">End Time: {ad.to_time}</p>
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(ad)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(ad.id)}>Delete</button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No ads available</p>
        )}
      </ul>

      {/* Modal for Add/Edit Ad */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isAddingAd ? (
          <AddAdForm onClose={handleCloseModal} />
        ) : (
          selectedAd && <EditAdForm ad={selectedAd} onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};

export default AdsList;
