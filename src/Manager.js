import './App.css';
import './index.css'
import React, { useState } from 'react';
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
import { Button } from 'antd';
import { Translator, Translate } from 'react-auto-translate';


function Manager() {
  const cacheProvider = {
    get: (language, key) =>
      ((JSON.parse(localStorage.getItem('translations')) || {})[key] || {})[
      language
      ],
    set: (language, key, value) => {
      const existing = JSON.parse(localStorage.getItem('translations')) || {
        [key]: {},
      };
      existing[key] = { ...existing[key], [language]: value };
      localStorage.setItem('translations', JSON.stringify(existing));
    },
  };
  const [to, setTo] = useState('en');
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
  function setSmallText() {
    var elements = document.querySelectorAll("[id='textMed']");
    if (elements.length === 0) {
      elements = document.querySelectorAll("[id='textSmall']");
      if (elements.length === 0) {
        elements = document.querySelectorAll("[id='textLarge']");
      }
    }
    for (var i = 0; i < elements.length; i++) {
      elements[i].id = 'textSmall';
    }
    return false;
  }
  function setMedText() {
    var elements = document.querySelectorAll("[id='textMed']");
    if (elements.length === 0) {
      elements = document.querySelectorAll("[id='textSmall']");
      if (elements.length === 0) {
        elements = document.querySelectorAll("[id='textLarge']");
      }
    }
    for (var i = 0; i < elements.length; i++) {
      elements[i].id = 'textMed';
    }
    return false;
  }
  function setLargeText() {
    var elements = document.querySelectorAll("[id='textMed']");
    if (elements.length === 0) {
      elements = document.querySelectorAll("[id='textSmall']");
      if (elements.length === 0) {
        elements = document.querySelectorAll("[id='textLarge']");
      }
    }
    for (var i = 0; i < elements.length; i++) {
      elements[i].id = 'textLarge';
    }
    return false;
  }
  function zoomIn() {
    var elements, style;
    elements = document.querySelectorAll('#textSize');
    for (var i = 0; i < elements.length; i++) {
      style = getComputedStyle(elements[i]);
      var size = style.fontSize
      var newSize = parseInt(size) + 2
      elements[i].style.fontSize = newSize.toString() + "px";
    }
  }
  function zoomOut() {
    var elements, style;
    elements = document.querySelectorAll('#textSize');
    for (var i = 0; i < elements.length; i++) {
      style = getComputedStyle(elements[i]);
      var size = style.fontSize
      var newSize = parseInt(size) - 2
      elements[i].style.fontSize = newSize.toString() + "px";
    }
  }
  return (
    <Translator
      cacheProvider={cacheProvider}
      from='en'
      to={to}
      googleApiKey="AIzaSyDjxzm3xTJFmVHB3rVDI4N9uNPPPX50MuQ"
    >
      <div id='body'>
        <div class="headerdiv" id="textSize">
          Chick-fil-A!
        </div>
        <header className="SelectRole">
          <div class="flex-container">
            <div class="pageHeader" id="textSize"> <Translate>Welcome To Manager Page!</Translate></div>
          </div>
          <div className="container">
            <Button type="primary" id="textSize" onClick={GoToEditInventory}> <Translate> Edit Inventory</Translate></Button>
            <Button type="primary" id="textSize" onClick={GoToEditMenu}> <Translate> Edit Menu</Translate></Button>
            <Button type="primary" id="textSize" onClick={GoToSalesReport}> <Translate> Sales Report</Translate></Button>
            <Button type="primary" id="textSize" onClick={GoToExcessReport}> <Translate> Excess Report</Translate></Button>
            <Button type="primary" id="textSize" onClick={GoToRestockReport}> <Translate> Restock Report</Translate></Button>
            <Button type="primary" id="textSize" onClick={GoToAddSeasonalMenuItem}> <Translate> Add Seasonal Menu Item</Translate></Button>
          </div>
        </header>
        <div class="footerdiv">
          <Button class="returnButton" id="textSize" onClick={ReturnToHome}> <Translate>Return</Translate></Button>
          <select class="langSelect" value={to} onChange={({ target: { value } }) => setTo(value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          <Button type="primary" id="textSize" onClick={zoomIn}> <Translate>Zoom In</Translate></Button >
          <Button type="primary" id="textSize" onClick={zoomOut}> <Translate>Zoom Out</Translate></Button >
        </div>
      </div>




    </Translator>
  );
}

export default Manager;