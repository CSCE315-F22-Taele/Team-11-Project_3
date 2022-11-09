import './App.css';
import React from 'react';
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";

function Edit_Inventory() {
  function ReturnToManager() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Manager />
      </React.StrictMode>
    );
  }
  return (

    <div>
      <header className="SelectRole">
        <div class="flex-container">
          <div class="returnDiv"><button type="button" class="returnButton" onClick={ReturnToManager}>Return</button></div><div class="pageHeader">Edit Inventory</div>
        </div>
        <div className="container">
          <button type="button" onClick={ReturnToManager}>Return</button>
        </div>
      </header>
    </div>




  );
}

export default Edit_Inventory;