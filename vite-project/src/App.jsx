// src/App.js
import React from 'react';
import './App.css';
import ImageGallery from './components/ImageGallery';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Gallery</h1>
      </header>
      <main>
        <ImageGallery />
      </main>
    </div>
  );
}

export default App;
