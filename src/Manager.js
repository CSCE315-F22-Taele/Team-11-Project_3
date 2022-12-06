import './App.css';
import './index.css'
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
import { Button } from 'antd';

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
  function setSmallText() {
    var elements = document.querySelectorAll("[id='textMed']");
    if(elements.length === 0){
      elements = document.querySelectorAll("[id='textSmall']");
      if(elements.length === 0){
        elements = document.querySelectorAll("[id='textLarge']");
      }
    }
    for(var i = 0; i < elements.length; i++) {
      elements[i].id='textSmall';
    }
    return false;
  }
  function setMedText() {
    var elements = document.querySelectorAll("[id='textMed']");
    if(elements.length === 0){
      elements = document.querySelectorAll("[id='textSmall']");
      if(elements.length === 0){
        elements = document.querySelectorAll("[id='textLarge']");
      }
    }
    for(var i = 0; i < elements.length; i++) {
      elements[i].id='textMed';
    }
    return false;
  }
  function setLargeText() {
    var elements = document.querySelectorAll("[id='textMed']");
    if(elements.length === 0){
      elements = document.querySelectorAll("[id='textSmall']");
      if(elements.length === 0){
        elements = document.querySelectorAll("[id='textLarge']");
      }
    }
    for(var i = 0; i < elements.length; i++) {
      elements[i].id='textLarge';
    }
    return false;
  }
  function zoomIn(){
    var elements, style;
    elements = document.querySelectorAll('#textSize');
    for(var i = 0; i < elements.length; i++){
      style = getComputedStyle(elements[i]);
      var size = style.fontSize
      var newSize = parseInt(size) + 2 
      elements[i].style.fontSize = newSize.toString() + "px";
    }
  }
  function zoomOut(){
    var elements, style;
    elements = document.querySelectorAll('#textSize');
    for(var i = 0; i < elements.length; i++){
      style = getComputedStyle(elements[i]);
      var size = style.fontSize
      var newSize = parseInt(size) - 2 
      elements[i].style.fontSize = newSize.toString() + "px";
    }
  }
  return (

    <div id='body'>
      <div class="headerdiv" id="textSize">
        Chick-fil-A!
      </div>
      <header className="SelectRole">
        <div class="flex-container">
          <div class="pageHeader" id="textSize">Welcome To Manager Page!</div>
        </div>
        <div className="container">
          <Button type="primary" id="textSize" onClick={GoToEditInventory}> Edit Inventory</Button>
          <Button type="primary" id="textSize" onClick={GoToEditMenu}> Edit Menu</Button>
          <Button type="primary" id="textSize" onClick={GoToSalesReport}> Sales Report</Button>
          <Button type="primary" id="textSize" onClick={GoToExcessReport}> Excess Report</Button>
          <Button type="primary" id="textSize" onClick={GoToRestockReport}> Restock Report</Button>
          <Button type="primary" id="textSize" onClick={GoToAddSeasonalMenuItem}> Add Seasonal Menu Item</Button>
        </div>
      </header>
      <div class="footerdiv">
        <Button class="returnButton" id="textSize" onClick={ReturnToHome}>Return</Button>
        <Button type="primary" id="textSize" onClick={zoomIn}>Zoom In</Button >
        <Button type="primary" id="textSize" onClick={zoomOut}>Zoom Out</Button >
      </div>
    </div>
    




  );
}

export default Manager;