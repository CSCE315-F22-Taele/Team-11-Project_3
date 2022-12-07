import './App.css';
import './index.css'
import React, { useState, useEffect } from 'react';
import Server from './Server';
import { costArr } from './Server';
import ReactDOM from 'react-dom/client';
import Customer from './Customer';
import { Button } from 'antd';
import { Translator, Translate } from 'react-auto-translate';

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
function New_Order() {
  var listOfMenuItems;
  var costArr = [];
  var itemArr;
  var newItem;
  var totalCost = 0.0;
  var newOrderNumber;
  listOfMenuItems = [];
  var lastOrderQuery = 'SELECT * FROM ordertable ORDER BY order_id DESC LIMIT 1;';
  var inventoryDict = {}

  var seasonalItemStatus = false;
  // const [seasonalItemStatus, setSeasonalItemStatus] = useState(false);
  //const [seasonalItem, setSeasonalItem] = useState('');
  var seasonalItemName = '';

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

  const [orderNumber, setOrderNumber] = useState({
    orderNum: 0
  });

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

    fetch("https://cfa-flask.herokuapp.com/data/" + lastOrderQuery).then((res) =>
      res.json().then((orderNumber) => {
        // Setting a data from api
        setOrderNumber({
          orderNum: String(orderNumber.QueryResult[0]).replaceAll("'", "").replaceAll("(", "").split(',')[0]
        });
      })
    );
  }, []);

  itemArr = data.QueryResult;
  newItem = [];
  for (var i = 0; i < itemArr.length; i++) {
    newItem.push(itemArr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
  }
  costArr = {};
  for (var i = 0; i < newItem.length; i++) {
    if (newItem[i][0].slice(0, 3) == "SI:") {
      seasonalItemStatus = true;
      seasonalItemName = newItem[i][0];
    }
    //setSeasonalItemStatus(true);
    costArr[newItem[i][0]] = newItem[i][2];
  }

  newOrderNumber = parseInt(orderNumber.orderNum) + 1;


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
        <Customer />
      </React.StrictMode>
    );
  }
  function runQueryAndReturnToServerPage() {
    //TODO: Run a query
    var orderComposition = "";
    for (var i = 0; i < listOfMenuItems.length; i++) {
      if (i != listOfMenuItems.length - 1) {
        orderComposition += listOfMenuItems[i]
        orderComposition += "|";
      } else {
        orderComposition += listOfMenuItems[i]
      }
    }
    const dateObj = new Date();

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
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
    var queryToRun = "INSERT INTO ordertable (order_id, contents, total_cost, time) VALUES('" + newOrderNumber + "', '" + orderComposition + "', '" + totalCost + "', '" + time + "');";
    fetch("https://cfa-flask.herokuapp.com/result/" + queryToRun);



    var i = 0;
    // TODO: create dictionary of inventory item and number of times used in order


    //parse the composition of all menu items
    var menu_ingredients_arr = data.QueryResult
    var new_menu_arr = []
    for (var i = 0; i < menu_ingredients_arr.length; i++) {
      new_menu_arr.push(menu_ingredients_arr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
    }

    var menu_composition = {}
    for (var i = 0; i < new_menu_arr.length; ++i) {
      new_menu_arr[i][1] = new_menu_arr[i][1].split('|')
      menu_composition[new_menu_arr[i][0]] = new_menu_arr[i][1]
    }



    for (i = 0; i < listOfMenuItems.length; ++i) {
      let contents = menu_composition[listOfMenuItems[i]]

      for (var j = 0; j < contents.length; ++j) {
        if (contents[j] in inventoryDict) {
          inventoryDict[contents[j]] = inventoryDict[contents[j]] + 1
        }
        else {
          inventoryDict[contents[j]] = 1;
        }
      }
    }



    // TODO: update item tables with decreased inventory
    const items = Object.keys(inventoryDict);

    for (var item in inventoryDict) {


      queryToRun = "UPDATE itemtable SET quantity = quantity - " + inventoryDict[item] + " where name = '" + item.trim() + "';"
      console.log(queryToRun)
      fetch("https://cfa-flask.herokuapp.com/result/" + queryToRun)
    }

    // TODO: update item tables with decreased inventory



    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Customer />
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
            <div id="textSize" class="pageHeader"><Translate>Place your order below!</Translate></div>
          </div>
          <div id="textSize">
            <div id="total" ><Translate>Total: $0.00</Translate></div>
          </div>
          <div id="textSize" className="flex-container">
            <div id="receipt" class="box"><Translate>Order Receipt: </Translate><br></br><br></br>
            </div>
            <div className="flex-container-order-buttons">
              <Button type="primary" onClick={() => addToOrder('8 ct Chick-fil-A Nuggets')}><Translate>8 ct Chick-fil-A Nuggets</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('12 ct Chick-fil-A Nuggets')}><Translate>12 ct Chick-fil-A Nuggets</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('3 ct Chick-fil-A Chick-n-Strips')}><Translate>3 ct Chick-fil-A Chick-n-Strips</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('4 ct Chick-fil-A Chick-n-Strips')}><Translate>4 ct Chick-fil-A Chick-n-Strips</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Chicken Sandwich')}><Translate>Chicken Sandwich</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Deluxe Sandwich')}><Translate>Deluxe Sandwich</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Grilled Chicken Sandwich')}><Translate>Grilled Chicken Sandwich</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Grilled Chicken Club Sandwich')}><Translate>Grilled Chicken Club Sandwich</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Small Fries')}><Translate>Small Fries</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Medium Fries')}><Translate>Medium Fries</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Large Fries')}><Translate>Large Fries</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('3 ct Spicy Chick-fil-A Chick-n-Strips')}><Translate>3 ct Spicy Chick-fil-A Chick-n-Strips</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('4 ct Spicy Chick-fil-A Chick-n-Strips')}><Translate>4 ct Spicy Chick-fil-A Chick-n-Strips</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('8 ct Chick-fil-A Grilled Nuggets')}><Translate>8 ct Chick-fil-A Grilled Nuggets</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('12 ct Chick-fil-A Grilled Nuggets')}><Translate>12 ct Chick-fil-A Grilled Nuggets</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Spicy Chicken Sandwich')}><Translate>Spicy Chicken Sandwich</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Spicy Deluxe Sandwich')}><Translate>Spicy Deluxe Sandwich</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Sweet Tea')}><Translate>Sweet Tea</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Fountain Drink')}><Translate>Fountain Drink</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Chocolate Milkshake')}><Translate>Chocolate Milkshake</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Vanilla Milkshake')}><Translate>Vanilla Milkshake</Translate></Button>
              <Button type="primary" onClick={() => addToOrder('Strawberry Milkshake')}><Translate>Strawberry Milkshake</Translate></Button>
              {seasonalItemStatus && <Button type="primary" onClick={() => addToOrder(seasonalItemName)}><Translate>{seasonalItemName}</Translate></Button>}
            </div>
          </div>
        </header>
        <div class="footerdiv">
          <Button id="textSize" onClick={returnToServerPage}><Translate>Cancel</Translate></Button>
          <select class="langSelect" value={to} onChange={({ target: { value } }) => setTo(value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          <Button type="primary" id="textSize" onClick={runQueryAndReturnToServerPage}><Translate>Submit</Translate></Button>
          <Button type="primary" id="textSize" onClick={zoomIn}><Translate>Zoom In</Translate></Button >
          <Button type="primary" id="textSize" onClick={zoomOut}><Translate>Zoom Out</Translate></Button >
        </div>
      </div>
    </Translator>
  );
}

export default New_Order;