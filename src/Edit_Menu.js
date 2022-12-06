import './App.css';
import './index.css'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";
import { Button, Select, Form, Input } from 'antd';

function Edit_Menu() {
  var itemArr;
  var newItem;
  var listOfItems;

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
  for (var i = 0; i < itemArr.length; i++){
    newItem.push(itemArr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
  }
  listOfItems = [];
  for (var i = 0; i < newItem.length; i++){
    listOfItems.push(
      {"Name":newItem[i][0],
      "Composition":newItem[i][1],
      "Cost":newItem[i][2],
    }
    )
  }

  function SubmitUpdate(){
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
          <div class="pageHeader" id="textSize">Edit Menu</div>
        </div>
      </header>
      <div className="scrollTab" id="textSize">
      <table cellpadding="2"cellspacing="15" id="textSize">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cost</th>
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
          <Select  id="textSize"value={selected} onChange={handleChange}>
            {listOfItems.map((option) => (
              <Select.Option id="textSize" value={option.Name}>{option.Name}</Select.Option>
            ))}
          </Select>
        </div>
        <div>
       <Form className="form">
        <label id="textSize">Price:
          <Input type="text" id="textSize"
          className="inputs"
          value={price}
          onChange={handlePrice}/>
        </label>
        </Form>
      </div>

      <div class="footerdiv">
        <Button class="returnButton" id="textSize" onClick={ReturnToManager}>Return</Button>
        <Button type="primary" id="textSize" onClick={SubmitUpdate}>Submit</Button>
        <Button type="primary" id="textSize" onClick={zoomIn}>Zoom In</Button >
        <Button type="primary" id="textSize" onClick={zoomOut}>Zoom Out</Button >
      </div>
    </div>

  );
}

export default Edit_Menu;