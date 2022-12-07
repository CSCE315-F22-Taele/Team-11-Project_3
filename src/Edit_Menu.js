import './App.css';
import './index.css'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";
import { Button, Select, Form, Input } from 'antd';
import { Translator, Translate } from 'react-auto-translate';



function Edit_Menu() {

  var itemArr;
  var newItem;
  var listOfItems;
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
  const [data, setdata] = useState({
    QueryResult: "n/a"
  });

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("https://cfa-flask.herokuapp.com/data/menutable").then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        setdata({
          QueryResult: data.QueryResult
        });
      })
    );
  }, []);

  itemArr = data.QueryResult;
  newItem = [];
  for (var i = 0; i < itemArr.length; i++) {
    newItem.push(itemArr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
  }
  listOfItems = [];
  for (var i = 0; i < newItem.length; i++) {
    listOfItems.push(
      {
        "Name": newItem[i][0],
        "Composition": newItem[i][1],
        "Cost": newItem[i][2],
      }
    )
  }

  function SubmitUpdate() {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    var queryToRun = "UPDATE menutable SET cost = '" + price + "' WHERE name = '" + selected + "'";
    fetch("https://cfa-flask.herokuapp.com/result/" + queryToRun);
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Edit_Menu />
      </React.StrictMode>
    );
  }

  const [selected, setSelected] = useState('Chicken Sandwich');
  const [price, setPrice] = useState('$4.29');

  const handleChange = (event) => {
    setSelected(event);
    var currVals = listOfItems.find(element => element.Name == event);
    setPrice(currVals.Cost);
  };

  const handlePrice = event => {
    setPrice(event.target.value);
  };

  function ReturnToManager() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Manager />
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
      googleApiKey="AIzaSyDjxzm3xTJFmVHB3rVDI4N9uNPPPX50MuQ">
      <div id='body'>
        <div class="headerdiv" id="textSize">
          Chick-fil-A!
        </div>
        <header className="SelectRole">
          <div class="flex-container">
            <div class="pageHeader" id="textSize"><Translate>Edit Menu</Translate></div>
          </div>
        </header>
        <div className="scrollTab" id="textSize">
          <table cellpadding="2" cellspacing="15" id="textSize">
            <thead>
              <tr>
                <th><Translate>Name</Translate></th>
                <th><Translate>Cost</Translate></th>
              </tr>
            </thead>
            <tbody>
              {listOfItems.map(item => {
                return (
                  <tr key={item.Name}>
                    <td>{item.Name}</td>
                    <td>{item.Cost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="margin-from-left" id="textSize">
          <Select id="textSize" value={selected} onChange={handleChange}>
            {listOfItems.map((option) => (
              <Select.Option id="textSize" value={option.Name}>{option.Name}</Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <Form className="form">
            <label id="textSize"><Translate>Price:</Translate>
              <Input type="text" id="textSize"
                className="inputs"
                value={price}
                onChange={handlePrice} />
            </label>
          </Form>
        </div>

        <div class="footerdiv">
          <Button class="returnButton" id="textSize" onClick={ReturnToManager}><Translate>Return</Translate></Button>
          <select class="langSelect" value={to} onChange={({ target: { value } }) => setTo(value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          <Button type="primary" id="textSize" onClick={SubmitUpdate}><Translate>Submit</Translate></Button>
          <Button type="primary" id="textSize" onClick={zoomIn}><Translate>Zoom In</Translate></Button >
          <Button type="primary" id="textSize" onClick={zoomOut}><Translate>Zoom Out</Translate></Button >
        </div>
      </div>
    </Translator>
  );
}

export default Edit_Menu;