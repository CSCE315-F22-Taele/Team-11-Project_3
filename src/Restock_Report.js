import './App.css';
import './index.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";
import { Button } from 'antd';

function Restock_Report() {
  var itemArr;
  var newItem;
  var listOfItems;

  const [data, setdata] = useState({
    QueryResult: "n/a"
  });

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
    if (+newItem[i][3] < +newItem[i][4]) {
      listOfItems.push(
        {"Name":newItem[i][0],
        "Cost":newItem[i][2],
        "Quantity":newItem[i][3],
        "Reorder_Threshold":newItem[i][4]
        }
      )
    }
      
  }


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
          <div class="pageHeader" id="textSize">Reorder Report</div>
        </div>
      </header>
      <div className="scrollTab" id="textSize">
      <p>The following items need to be reordered:</p>
      <table cellpadding="2"cellspacing="15">
          <thead>
            <tr>
              <th>Name</th>
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
                  <td>{item.Cost}</td>
                  <td>{item.Quantity}</td>
                  <td>{item.Reorder_Threshold}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div class="footerdiv">
        <Button id="textSize" class="returnButton" onClick={ReturnToManager}>Return</Button>
        <Button type="primary" id="textSize" onClick={zoomIn}>Zoom In</Button >
        <Button type="primary" id="textSize" onClick={zoomOut}>Zoom Out</Button >
      </div>
     </div>
  );
}

export default Restock_Report;