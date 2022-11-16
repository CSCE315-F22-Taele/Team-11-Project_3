import './App.css';
import React from 'react';
import Manager from './Manager';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';

function RolePage() {
  function GoToManager() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Manager />
      </React.StrictMode>
    );
  }
  function GoToServer() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Server />
      </React.StrictMode>
    );
  }
  function GoToCustomer() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Customer />
      </React.StrictMode>
    );
  }
  return (
    <div>
      <header className="SelectRole">
        <div class="appHeader">
          Please Select A Role:
        </div>
      </header>
      <div className="container">
        <button type="button" onClick={GoToManager}>Manager</button>
        <button type="button" onClick={GoToServer}>Server</button>
        <button type="button" onClick={GoToCustomer}>Customer</button>
      </div>

    </div>

  );
}

export default RolePage;
