import './App.css';
import './index.css'
import React, { useState } from 'react';
import App from './App';
import Manager from './Manager';
import Server from './Server';
import ReactDOM from 'react-dom/client';
import New_Customer_Order from './New_Customer_Order';
import New_Order from './New_Order';
import { Button } from 'antd';
import { Translator, Translate } from 'react-auto-translate';

function Customer() {
  const [to, setTo] = useState('en');
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
            <div class="pageHeader" id="textSize"><Translate>Welcome to the Customer Page!</Translate></div>
          </div>
          <div className="container">
            <Button type="primary" id="textSize" onClick={GoToNewOrder}><Translate>New Order</Translate></Button>
          </div>
        </header>
        <div class="footerdiv">
          <Button id="textSize" onClick={ReturnToHome}>Return</Button>
          <select class="langSelect" value={to} onChange={({ target: { value } }) => setTo(value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          <Button type="primary" id="textSize" onClick={zoomIn}><Translate>Zoom In</Translate></Button >
          <Button type="primary" id="textSize" onClick={zoomOut}><Translate>Zoom Out</Translate></Button >
        </div>
      </div>
    </Translator>
  );
}

export default Customer;