import React, { useEffect, useState } from 'react';

import './homepage.css';
import dotsImage from '../images/21077233-removebg-preview.png';

const useLocalStorageList = (key, defaultValue) => {
  const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key)) || defaultValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

const Homepage = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [items, setItems] = useLocalStorageList('items', []);

  const handleSendClick = () => {
    if (title && priority) {
      const newItem = {
        title: title,
        priority: priority,
      };

      setItems([...items, newItem]);
      setTitle('');
      setPriority('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== '' && value.length <= 2) {
      setPriority(value);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title-card">Shopping List</h1>

        <div className='send-data-box'>
          <input
            size="16"
            type="text"
            placeholder="Title..."
            value={title}
            className='input-in-box'
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <input
            size="3"
            type="text"
            placeholder="14"
            value={priority}
            className='input-in-box'
            onChange={handlePriorityChange}
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleSendClick} className='buttom-in-box'>Add</button>
        </div>

        <div className="items-container">
          {items.map((item, index) => (
            <div key={index} className="div-new-item">
              <span className="item-priority"><p>{item.priority}</p></span>
              <span className="item-title"><p>{item.title}</p></span>

              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" onClick={() => handleRemoveItem(index)}>
                <path d="M22.1312 9.63125L20.3687 7.86875L15 13.2375L9.63124 7.86875L7.86874 9.63125L13.2375 15L7.86874 20.3688L9.63124 22.1313L15 16.7625L20.3687 22.1313L22.1312 20.3688L16.7625 15L22.1312 9.63125Z" fill="#FFD700"/>
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div className="image-container">
        <img src={dotsImage} alt="dots" className="right-preview" />
      </div>
    </div>
  );
};

export { Homepage };
