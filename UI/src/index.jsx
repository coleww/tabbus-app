import React from 'react';
import ReactDOM from 'react-dom/client';
import { EditorScreen } from './editor';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div className="title">
      <h1>tabbus demo</h1> a note taking app for fretted instruments
    </div>

    <EditorScreen />
  </React.StrictMode>
);
