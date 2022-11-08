import './App.css';
import React from 'react';
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";

function Sales_Report() {
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
            Welcome To Sales Report Page!
          </p>
          <div className="flex-container">
        <button type="button" onClick={ReturnToManager}>Return</button>
        </div>
        </header>
      </div>

      

      
    );
  }
  
export default Sales_Report;