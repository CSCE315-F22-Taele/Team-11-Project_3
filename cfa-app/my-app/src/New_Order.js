import './App.css';
import React, { useState, useEffect } from 'react';
import Server from './Server';
import { costArr } from './Server';
import ReactDOM from 'react-dom/client';

function New_Order() {
  var listOfMenuItems;
  var costArr = [];
  var itemArr;
  var newItem;
  var totalCost = 0.0;
  listOfMenuItems = [];

  const [data, setdata] = useState({
    QueryResult: "n/a"
  });

  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/data/menutable").then((res) =>
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
  costArr = {};
  for (var i = 0; i < newItem.length; i++){
    costArr[newItem[i][0]] = newItem[i][2];
  } 

  
  function addToOrder(item) {
    const markupParagraph = document.getElementById("receipt");
    markupParagraph.innerText += item + costArr[item] + '\n' + '\n';
    totalCost += +(costArr[item].slice(2));
    const totalParagraph = document.getElementById("total");
    totalParagraph.innerText = "Total: $" + String(totalCost.toFixed(2));
    listOfMenuItems.push(item);
  }
  function returnToServerPage() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Server />
      </React.StrictMode>
    );
  }
  function Submit_Order(contents, cost) {
    const dateObj = new Date();
    
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    month = ('0' + month).slice(-2);
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);
    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);
    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);
  
    const time = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    //var queryToRun = "INSERT INTO ordertable (order_id, contents, total_cost, time) VALUES(" + currentOrderNumber + ", " + contents + ", " + cost + ", " + time;
    //fetch("/result/" + queryToRun);
    window.alert("Got to down all here");
  }


  function runQueryAndReturnToServerPage() {
    //TODO: Run a query
    var orderComposition = "";
    for (var i = 0; i < listOfMenuItems.length; i++){ 
      if (i != listOfMenuItems.length - 1) {
        orderComposition += listOfMenuItems[i]
        orderComposition += "|";
      } else {
        orderComposition += listOfMenuItems[i]
      }
    }
    window.alert(orderComposition);

    Submit_Order(orderComposition, totalCost);
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Server />
      </React.StrictMode>
    );
    
  }
  return (
    <div>
      <header className="SelectRole">
        <div class="flex-container">
          <div class="returnDiv"><button type="button" class="returnButton" onClick={returnToServerPage}>Return</button></div><div class="pageHeader">New Order</div>
        </div>
        <div id="total" >Total: $0.00</div>
        <div className="flex-container">
          <div id="receipt" class="box">Order Receipt: <br></br><br></br>
          </div>
          <div className="flex-container-order-buttons">
            <button type="button" onClick={() => addToOrder('8 ct Chick-fil-A Nuggets')}>8 ct Chick-fil-A Nuggets</button>
            <button type="button" onClick={() => addToOrder('12 ct Chick-fil-A Nuggets')}>12 ct Chick-fil-A Nuggets</button>
            <button type="button" onClick={() => addToOrder('3 ct Chick-fil-A Chick-n-Strips')}>3 ct Chick-fil-A Chick-n-Strips</button>
            <button type="button" onClick={() => addToOrder('4 ct Chick-fil-A Chick-n-Strips')}>4 ct Chick-fil-A Chick-n-Strips</button>
            <button type="button" onClick={() => addToOrder('Chicken Sandwich')}>Chicken Sandwich</button>
            <button type="button" onClick={() => addToOrder('Deluxe Sandwich')}>Deluxe Sandwich</button>
            <button type="button" onClick={() => addToOrder('Grilled Chicken Sandwich')}>Grilled Chicken Sandwich</button>
            <button type="button" onClick={() => addToOrder('Grilled Chicken Club Sandwich')}>Grilled Chicken Club Sandwich</button>
            <button type="button" onClick={() => addToOrder('Small Fries')}>Small Fries</button>
            <button type="button" onClick={() => addToOrder('Medium Fries')}>Medium Fries</button>
            <button type="button" onClick={() => addToOrder('Large Fries')}>Large Fries</button>
            <button type="button" onClick={() => addToOrder('3 ct Spicy Chick-fil-A Chick-n-Strips')}>3 ct Spicy Chick-fil-A Chick-n-Strips</button>
            <button type="button" onClick={() => addToOrder('4 ct Spicy Chick-fil-A Chick-n-Strips')}>4 ct Spicy Chick-fil-A Chick-n-Strips</button>
            <button type="button" onClick={() => addToOrder('8 ct Chick-fil-A Grilled Nuggets')}>8 ct Chick-fil-A Grilled Nuggets</button>
            <button type="button" onClick={() => addToOrder('12 ct Chick-fil-A Grilled Nuggets')}>12 ct Chick-fil-A Grilled Nuggets</button>
            <button type="button" onClick={() => addToOrder('Spicy Chicken Sandwich')}>Spicy Chicken Sandwich</button>
            <button type="button" onClick={() => addToOrder('Spicy Deluxe Sandwich')}>Spicy Deluxe Sandwich</button>
            <button type="button" onClick={() => addToOrder('Sweet Tea')}>Sweet Tea</button>
            <button type="button" onClick={() => addToOrder('Fountain Drink')}>Fountain Drink</button>
            <button type="button" onClick={() => addToOrder('Chocolate Milkshake')}>Chocolate Milkshake</button>
            <button type="button" onClick={() => addToOrder('Vanilla Milkshake')}>Vanilla Milkshake</button>
            <button type="button" onClick={() => addToOrder('Strawberry Milkshake')}>Strawberry Milkshake</button>
          </div>
          <div className="flex-container-order-buttons">
            <button type="button" onClick={returnToServerPage}>Cancel</button>
            <button type="button" onClick={runQueryAndReturnToServerPage}>Submit</button>
          </div>
        </div>

      </header>
    </div>

  );
}

export default New_Order;