import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([
    { id: 1, url: 'https://via.placeholder.com/150', title: 'Image 1' },
    { id: 2, url: 'https://via.placeholder.com/150', title: 'Image 2' },
    { id: 3, url: 'https://via.placeholder.com/150', title: 'Image 3' },
    { id: 4, url: 'https://via.placeholder.com/150', title: 'Image 4' },
    { id: 5, url: 'https://via.placeholder.com/150', title: 'Image 5' },
  ]);
  const [newImage, setNewImage] = useState({
    id: null,
    url: '',
    title: '',
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    setNewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  const handleAddImage = () => {
    if (newImage.url && newImage.title) {
      // Resize image to 150x150
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = newImage.url;
      img.onload = () => {
        canvas.width = 150;
        canvas.height = 150;
        ctx.drawImage(img, 0, 0, 150, 150);
        const resizedUrl = canvas.toDataURL('image/jpeg');
        
        // Add resized image to gallery
        setImages([...images, { id: Date.now(), url: resizedUrl, title: newImage.title }]);
        setNewImage({ id: null, url: '', title: '' });
      };
    }
  };

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search images..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-box"
      />
      <div className="gallery">
        {filteredImages.map((image) => (
          <div key={image.id} className="gallery-item">
            <img src={image.url} alt={image.title} />
            <p>{image.title}</p>
          </div>
        ))}
      </div>
      <div className="upload-form">
        <input
          type="text"
          placeholder="Image URL"
          name="url"
          value={newImage.url}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Image Title"
          name="title"
          value={newImage.title}
          onChange={handleInputChange}
        />
        <button onClick={handleAddImage}>Add Image</button>
      </div>
    </div>
  );
};

export default ImageGallery;