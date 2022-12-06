import './App.css';
import './index.css';
import React, { useState, useEffect } from "react";
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";
import { Button, Select, Form, Input } from 'antd';

function Edit_Inventory() {

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
  for (var i = 0; i < itemArr.length; i++){
    newItem.push(itemArr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
  }
  listOfItems = [];
  for (var i = 0; i < newItem.length; i++){
    listOfItems.push(
      {"Name":newItem[i][0],
      "Type":newItem[i][1],
      "Cost":newItem[i][2],
      "Quantity":newItem[i][3],
      "Reorder_Threshold":newItem[i][4]
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
  function SubmitUpdate(){
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



  // initialize();
  return (

    <div id='body'>
      <div class="headerdiv" id="textSize">
        Chick-fil-A!
      </div>
      <header className="SelectRole">
        <div class="flex-container">
          <div class="pageHeader" id="textSize">Edit Inventory</div>
        </div>
      </header>
      <div id="textSize" className="scrollTab">
      <table className="padding-table-columns" id="textSize" cellpadding="2"cellspacing="15">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Reorder Threshold</th>
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
            <label id="textSize">Price:
              <Input id="textSize" type="text"
                className="inputs"
                value={price}
                onChange={handlePrice}/>
            </label>
            
            <label id="textSize">Quantity:
              <Input id="textSize" type="text"
                className="inputs"
                value={quantity}
                onChange={handleQuantity}/>
            </label>
          
            <label id="textSize">Reorder Threshold:
              <Input id="textSize" type="text"
                className="inputs"
                value={reorder_threshold}
                onChange={handleReorder}/>
            </label>
          </Form>
        </div>

      <div class="footerdiv">
        <Button id="textSize" class="returnButton" onClick={ReturnToManager}>Return</Button>
        <Button id="textSize" type="primary" onClick={SubmitUpdate}>Submit</Button>
        <Button type="primary" id="textSize" onClick={zoomIn}>Zoom In</Button >
        <Button type="primary" id="textSize" onClick={zoomOut}>Zoom Out</Button >
      </div>
    </div>




  );
}

export default Edit_Inventory;