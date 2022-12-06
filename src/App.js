import './App.css';
import './index.css'
import React from 'react';
import Manager from './Manager';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import MapPage from './MapPage';
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
  function GoToMap() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <MapPage />
      </React.StrictMode>
    );
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
      <div>
        <header className="SelectRole">
          <div class="appHeader" id="textSize">
            Please Select A Role:
          </div>
        </header>
        <div className="container">
          <Button type="primary" id="textSize" onClick={GoToManager}>Manager</Button >
          <Button type="primary" id="textSize" onClick={GoToServer}>Server</Button >
          <Button type="primary" id="textSize" onClick={GoToCustomer}>Customer</Button >
          <Button type="primary" id="textSize" onClick={GoToMap}>Get Map</Button >
        </div>
        <div className='footerdiv'>
          <Button type="primary" id="textSize" onClick={zoomIn}>Zoom In</Button >
          <Button type="primary" id="textSize" onClick={zoomOut}>Zoom Out</Button >
        </div>
      </div>
    </div>

  );
}

export default RolePage;
