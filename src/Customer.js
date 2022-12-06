import './App.css';
import './index.css'
import React from 'react';
import App from './App';
import Manager from './Manager';
import Server from './Server';
import ReactDOM from 'react-dom/client';
import New_Customer_Order from './New_Customer_Order';
import New_Order from './New_Order';
import { Button } from 'antd';

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
          <div class="pageHeader" id="textSize">Welcome to the Customer Page!</div>
        </div>
        <div className="container">
          <Button type="primary" id="textSize" onClick={GoToNewOrder}>New Order</Button>
        </div>
      </header>
      <div class="footerdiv">
        <Button id="textSize" onClick={ReturnToHome}>Return</Button>
        <Button type="primary" id="textSize" onClick={zoomIn}>Zoom In</Button >
        <Button type="primary" id="textSize" onClick={zoomOut}>Zoom Out</Button >
      </div>
    </div>

  );
}

export default Customer;