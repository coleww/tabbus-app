import React from 'react';
import ReactDOM from 'react-dom/client';
import { EditorScreen } from './editor';
const root = ReactDOM.createRoot(document.getElementById('root'));

// ... PORTALS?!?!?!?!

// react router
root.render(
  <React.StrictMode>
    <EditorScreen />
  </React.StrictMode>
);
