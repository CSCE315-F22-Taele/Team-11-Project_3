import './App.css';
import React from 'react';
import App from './App';
import Manager from './Manager';
import Server from './Server';
import ReactDOM from 'react-dom/client';
import New_Customer_Order from './New_Customer_Order';
import New_Order from './New_Order';

function Customer() {
  function ReturnToHome() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
  function GoToNewOrder() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <New_Customer_Order />
      </React.StrictMode>
    );
  }
  return (
    <div>
      <header className="SelectRole">
        <div class="flex-container">
          <div class="returnDiv"><button type="button" class="returnButton" onClick={ReturnToHome}>Return</button></div><div class="pageHeader">Welcome To Customer Page!</div>
        </div>
        <div className="container">
          <button type="button" onClick={ReturnToHome}>Return</button>
          <button type="button" onClick={GoToNewOrder}>New Order</button>
        </div>
      </header>
    </div>

  );
}

export default Customer;