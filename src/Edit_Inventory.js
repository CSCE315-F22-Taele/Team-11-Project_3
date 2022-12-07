import './App.css';
import './index.css';
import React, { useState, useEffect } from "react";
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";
import { Button, Select, Form, Input } from 'antd';
import { Translator, Translate } from 'react-auto-translate';


function Edit_Inventory() {
  const [to, setTo] = useState('en');
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

  const [data, setdata] = useState({
    QueryResult: "n/a"
  });

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("https://cfa-flask.herokuapp.com/data/itemtable").then((res) =>
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
        "Type": newItem[i][1],
        "Cost": newItem[i][2],
        "Quantity": newItem[i][3],
        "Reorder_Threshold": newItem[i][4]
      }
    )
  }
  function ReturnToManager() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Manager />
      </React.StrictMode>
    );
  }
  function SubmitUpdate() {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    var queryToRun = "UPDATE itemtable SET cost = '" + price + "', quantity = '" + quantity + "', reorder_threshold = '" + reorder_threshold + "' WHERE name = '" + selected + "'";
    var status;
    fetch("https://cfa-flask.herokuapp.com/result/" + queryToRun);
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Edit_Inventory />
      </React.StrictMode>
    );


  }


  const [selected, setSelected] = useState('Peach');
  const [price, setPrice] = useState('$0.05');
  const [quantity, setQuantity] = useState('100');
  const [reorder_threshold, setReorder_threshold] = useState('100');


  const handleChange = (event) => {
    console.log(event)
    setSelected(event);
    var currVals = listOfItems.find(element => element.Name == event);
    setPrice(currVals.Cost);
    setQuantity(currVals.Quantity);
    setReorder_threshold(currVals.Reorder_Threshold);
  };

  const handlePrice = event => {
    setPrice(event.target.value);
  };

  const handleQuantity = event => {
    setQuantity(event.target.value);
  }

  const handleReorder = event => {
    setReorder_threshold(event.target.value);
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



  // initialize();
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
            <div class="pageHeader" id="textSize"><Translate>Edit Inventory</Translate></div>
          </div>
        </header>
        <div id="textSize" className="scrollTab">
          <table className="padding-table-columns" id="textSize" cellpadding="2" cellspacing="15">
            <thead>
              <tr>
                <th><Translate>Name</Translate></th>
                <th><Translate>Type</Translate></th>
                <th><Translate>Cost</Translate></th>
                <th><Translate>Quantity</Translate></th>
                <th><Translate>Reorder Threshold</Translate></th>
              </tr>
            </thead>
            <tbody>
              {listOfItems.map(item => {
                return (
                  <tr key={item.Name}>
                    <td>{item.Name}</td>
                    <td>{item.Type}</td>
                    <td>{item.Cost}</td>
                    <td>{item.Quantity}</td>
                    <td>{item.Reorder_Threshold}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div id="textSize" className="margin-from-left">
          <Select id="textSize" value={selected} onChange={handleChange}>
            {listOfItems.map((option) => (

              <Select.Option id="textSize" value={option.Name}>{option.Name}</Select.Option>

            ))}
          </Select>
        </div>

        <div>
          <Form className="form">
            <label id="textSize"><Translate>Price:</Translate>
              <Input id="textSize" type="text"
                className="inputs"
                value={price}
                onChange={handlePrice} />
            </label>

            <label id="textSize"><Translate>Quantity:</Translate>
              <Input id="textSize" type="text"
                className="inputs"
                value={quantity}
                onChange={handleQuantity} />
            </label>

            <label id="textSize"><Translate>Reorder Threshold:</Translate>
              <Input id="textSize" type="text"
                className="inputs"
                value={reorder_threshold}
                onChange={handleReorder} />
            </label>
          </Form>
        </div>

        <div class="footerdiv">
          <Button id="textSize" class="returnButton" onClick={ReturnToManager}><Translate>Return</Translate></Button>
          <select class="langSelect" value={to} onChange={({ target: { value } }) => setTo(value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          <Button id="textSize" type="primary" onClick={SubmitUpdate}><Translate>Submit</Translate></Button>
          <Button type="primary" id="textSize" onClick={zoomIn}><Translate>Zoom In</Translate></Button >
          <Button type="primary" id="textSize" onClick={zoomOut}><Translate>Zoom Out</Translate></Button >
        </div>
      </div>
    </Translator>



  );
}

export default Edit_Inventory;