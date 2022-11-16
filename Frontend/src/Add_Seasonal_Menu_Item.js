import './App.css';
import React from 'react';
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";

function Add_Seasonal_Menu_Item() {
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
          <p>
            Adding a seasonal menu item: COMING SOON!
          </p>
          <div className="flex-container">
        <button type="button" onClick={ReturnToManager}>Return</button>
        </div>
        </header>
      </div>

      

      
    );
  }
  
export default Add_Seasonal_Menu_Item;