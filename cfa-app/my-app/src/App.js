import './App.css';
import './index.css'
import React from 'react';
import Manager from './Manager';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import { Button } from 'antd';

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
    <div id='body'>
      <div class="headerdiv">
        Chick-fil-A!
      </div>
      <div>
        <header className="SelectRole">
          <div class="appHeader">
            Please Select A Role:
          </div>
        </header>
        <div className="container">
          <Button type="primary" onClick={GoToManager}>Manager</Button >
          <Button type="primary" onClick={GoToServer}>Server</Button >
          <Button type="primary" onClick={GoToCustomer}>Customer</Button >
        </div>
      </div>
    </div>

  );
}

export default RolePage;
