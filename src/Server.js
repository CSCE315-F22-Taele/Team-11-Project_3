import './App.css';
import './index.css'
import React from 'react';
import App from './App';
import Manager from './Manager';
import Customer from './Customer';
import New_Order from './New_Order';
import ReactDOM from 'react-dom/client';
import { Button } from 'antd';

function Server() {
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
        <New_Order />
      </React.StrictMode>
    );
  }
  function zoomIn(){
    var elements, style;
    elements = document.querySelectorAll('#textSize');
    console.log(elements);
    for(var i = 0; i < elements.length; i++){
      style = getComputedStyle(elements[i]);
      var size = style.fontSize
      console.log(size)
      var newSize = parseInt(size) + 2 
      elements[i].style.fontSize = newSize.toString() + "px";
    }
  }
  function zoomOut(){
    var elements, style;
    elements = document.querySelectorAll('#textSize');
    console.log(elements);
    for(var i = 0; i < elements.length; i++){
      style = getComputedStyle(elements[i]);
      var size = style.fontSize
      console.log(size)
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
          <div class="pageHeader" id="textSize">Server View</div>
        </div>
        <div className="container">
          <Button id="textSize" type="primary" onClick={GoToNewOrder}>New Order</Button>
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

export default Server;