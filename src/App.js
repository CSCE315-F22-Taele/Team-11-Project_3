import './App.css';
import './index.css'
import React, { useState } from 'react';
import Manager from './Manager';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import MapPage from './MapPage';
import { Button } from 'antd';
import Auth_Signin from './Auth_Signin';
import { Translator, Translate } from 'react-auto-translate';

function RolePage() {
  //cache provider for local language storage
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
  function GoToManager() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Auth_Signin />
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
        <div>
          <header className="SelectRole">
            <div class="appHeader" id="textSize">
              <Translate>Please Select A Role:</Translate>
            </div>
          </header>
          <div className="container">
            <Button type="primary" id="textSize" onClick={GoToManager}><Translate>Manager</Translate></Button >
            <Button type="primary" id="textSize" onClick={GoToServer}><Translate>Server</Translate></Button >
            <Button type="primary" id="textSize" onClick={GoToCustomer}><Translate>Customer</Translate></Button >
            <Button type="primary" id="textSize" onClick={GoToMap}><Translate>Get Map</Translate></Button >
          </div>
          <div className='footerdiv'>
            <select class="langSelect" value={to} onChange={({ target: { value } }) => setTo(value)}>
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
            <Button type="primary" id="textSize" onClick={zoomIn}><Translate>Zoom In</Translate></Button >
            <Button type="primary" id="textSize" onClick={zoomOut}><Translate>Zoom Out</Translate></Button >
          </div>
        </div>
      </div>
    </Translator>
  );
}

export default RolePage;
