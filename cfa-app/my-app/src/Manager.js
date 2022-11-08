import './App.css';
import React from 'react';
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Edit_Inventory from './Edit_Inventory';
import Edit_Menu from './Edit_Menu';
import Sales_Report from './Sales_Report';
import Excess_Report from './Excess_Report';
import Restock_Report from './Restock_Report';
import Add_Seasonal_Menu_Item from './Add_Seasonal_Menu_Item';

function Manager() {
  function ReturnToHome() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
  function GoToEditInventory() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Edit_Inventory />
      </React.StrictMode>
    );
  }
  function GoToEditMenu() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Edit_Menu />
      </React.StrictMode>
    );
  }
  function GoToSalesReport() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Sales_Report />
      </React.StrictMode>
    );
  }
  function GoToExcessReport() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Excess_Report />
      </React.StrictMode>
    );
  }
  function GoToRestockReport() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Restock_Report />
      </React.StrictMode>
    );
  }
  function GoToAddSeasonalMenuItem() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Add_Seasonal_Menu_Item />
      </React.StrictMode>
    );
  }
    return (

      <div>
        <header className="SelectRole">
          <p>
            Welcome To Manager Page!
          </p>
          <div className="flex-container">
        <button type="button" onClick={GoToEditInventory}> Edit Inventory</button>
        <button type="button" onClick={GoToEditMenu}> Edit Menu</button>
        <button type="button" onClick={GoToSalesReport}> Sales Report</button>
        <button type="button" onClick={GoToExcessReport}> Excess Report</button>
        <button type="button" onClick={GoToRestockReport}> Restock Report</button>
        <button type="button" onClick={GoToAddSeasonalMenuItem}> Add Seasonal Menu Item</button>
        <button type="button" onClick={ReturnToHome}>Return</button>
        </div>
        </header>
      </div>

      

      
    );
  }
  
export default Manager;