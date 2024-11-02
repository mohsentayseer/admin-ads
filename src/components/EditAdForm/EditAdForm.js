import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAd } from '../../features/adsSlice';
import './EditAdForm.css';

const EditAdForm = ({ ad, onClose }) => {
  const initialMediaType = ad.video ? 'video' : 'image';
  const initialMediaUrl = ad.video || ad.image || '';

  const [formData, setFormData] = useState({
    ...ad,
    mediaType: initialMediaType,
    mediaUrl: initialMediaUrl,
    from_time: new Date(ad.from_time).toISOString().slice(0, -1),
    to_time: new Date(ad.to_time).toISOString().slice(0, -1),
  });
  const [error, setError] = useState('');
  

  const dispatch = useDispatch();

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === 'mediaType' ? { mediaUrl: '' } : {}),
    }));
    setError(''); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateUrl(formData.mediaUrl)) {
      setError("Invalid media URL");
      return;
    }
    if (new Date(formData.from_time) >= new Date(formData.to_time)) {
      setError("End time must be after start time");
      return;
    }
    setError('');

    const updatedAd = {
      ...formData,
      video: formData.mediaType === 'video' ? formData.mediaUrl : '',
      image: formData.mediaType === 'image' ? formData.mediaUrl : '',
    };

    dispatch(updateAd(updatedAd));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-ad-form">
      <h3 className="form-title">Edit Ad</h3>
      {error && <p className="error-message">{error}</p>}


      <label className="form-label">
        Media Type:
        <select
          name="mediaType"
          value={formData.mediaType}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="video">Video</option>
          <option value="image">Image</option>
        </select>
      </label>
      <label className="form-label">
        Media URL:
        <input
          type="text"
          name="mediaUrl"
          value={formData.mediaUrl}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>
      <label className="form-label">
        Start Time:
        <input
          type="datetime-local"
          name="from_time"
          value={formData.from_time}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>
      <label className="form-label">
        End Time:
        <input
          type="datetime-local"
          name="to_time"
          value={formData.to_time}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>
      <button type="submit" className="form-button save-button">Save</button>
    </form>
  );
};

export default EditAdForm;
