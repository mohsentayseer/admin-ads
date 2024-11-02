import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAd } from '../../features/adsSlice';
import './AddAdForm.css';

const AddAdForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [mediaType, setMediaType] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [error, setError] = useState('');

  // Validate media URL format
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUrl(mediaUrl)) {
      setError("Invalid media URL");
      return;
    }
    if (new Date(fromTime) >= new Date(toTime)) {
      setError("End time must be after start time");
      return;
    }
    setError("");

    const newAd = {
      id: Date.now(),
      video: mediaType === 'video' ? mediaUrl : null,
      image: mediaType === 'image' ? mediaUrl : null,
      from_time: fromTime,
      to_time: toTime,
    };

    dispatch(addAd(newAd)); // Dispatch action to add the ad
    onClose(); // Close the form after submission
  };

  return (
    <form className="add-ad-form" onSubmit={handleSubmit}>
      <h2>Create New Ad</h2>
      {error && <p className="error-message">{error}</p>}
      {/* Form fields for media type, URL, start time, and end time */}
      <label>
        Media Type:
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </label>
      <label>
        Media URL:
        <input
          type="text"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          onInput={() => setError('')}
          placeholder="Enter media URL"
          required
        />
      </label>
      <label>
        Start Time:
        <input
          type="datetime-local"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          onInput={() => setError('')}
          required
        />
      </label>
      <label>
        End Time:
        <input
          type="datetime-local"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          onInput={() => setError('')}
          required
        />
      </label>
      <button type="submit">Add Ad</button>
    </form>
  );
};

export default AddAdForm;
