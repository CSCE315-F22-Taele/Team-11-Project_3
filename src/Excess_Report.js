import './App.css';
import './index.css';
import React, { useState, useEffect } from 'react';
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";
import { Button, Select, Form, Input } from 'antd';
import { Translator, Translate } from 'react-auto-translate';



function Excess_Report() {
  var itemArr;
  var newItem;
  var isData = false

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
    QueryResult: ""
  });
  const [menu_ingredients, set_menu_ingredients] = useState({
    QueryResult: ""
  });

  const [ingredients_onhand, set_ingredients_onhand] = useState({
    QueryResult: ""
  });

  const [date, setPrice] = useState('');

  const handlePrice = event => {
    setPrice(event.target.value);
    get_ingredients();
  };


  useEffect(() => {

    var queryString2 = "https://cfa-flask.herokuapp.com/data/menutable"
    fetch(queryString2).then((res) =>
      res.json().then((menu_ingredients) => {
        // Setting a data from api
        set_menu_ingredients({
          QueryResult: menu_ingredients.QueryResult
        });

      })
    );

  }, []);

  function get_ingredients() {
    var queryString3 = "https://cfa-flask.herokuapp.com/data/itemtable"
    fetch(queryString3).then((res) =>
      res.json().then((ingredients_onhand) => {
        // Setting a data from api
        set_ingredients_onhand({
          QueryResult: ingredients_onhand.QueryResult
        });

      })
    );
  }
  function getData() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todayDate = yyyy + '-' + mm + '-' + dd;

    var queryString = "https://cfa-flask.herokuapp.com/data/SELECT * FROM ordertable WHERE time BETWEEN '" + date + "' AND '" + todayDate + "'"
    fetch(queryString).then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        setdata({
          QueryResult: data.QueryResult
        });
        console.log(data.QueryResult)
      })
    );

  }


  itemArr = data.QueryResult;
  newItem = [];
  for (var i = 0; i < itemArr.length; i++) {
    newItem.push(itemArr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
  }
  var mapOfItems = {}
  for (var i = 0; i < newItem.length; i++) {
    newItem[i][1] = newItem[i][1].split('|')
    for (var j = 0; j < newItem[i][1].length; ++j) {
      newItem[i][1][j] = newItem[i][1][j].trim()
      if (newItem[i][1][j] in mapOfItems) {
        mapOfItems[newItem[i][1][j]] += 1
      }
      else {
        mapOfItems[newItem[i][1][j]] = 1
      }

    }
  }


  var menu_ingredients_arr = menu_ingredients.QueryResult
  var new_menu_arr = []
  for (var i = 0; i < menu_ingredients_arr.length; i++) {
    new_menu_arr.push(menu_ingredients_arr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
  }

  var menu_composition = {}
  for (var i = 0; i < new_menu_arr.length; ++i) {
    new_menu_arr[i][1] = new_menu_arr[i][1].split('|')
    menu_composition[new_menu_arr[i][0]] = new_menu_arr[i][1]
  }
  var total_items_used = {}
  console.log(mapOfItems)
  for (var menu_item_used in mapOfItems) {
    if (menu_item_used in menu_composition) {
      for (var i = 0; i < menu_composition[menu_item_used].length; ++i) {
        console.log(parseInt(mapOfItems[menu_item_used]))
        if (menu_composition[menu_item_used][i].trim() in total_items_used) {
          total_items_used[menu_composition[menu_item_used][i].trim()] += parseInt(mapOfItems[menu_item_used]);
        }
        else {
          total_items_used[menu_composition[menu_item_used][i].trim()] = parseInt(mapOfItems[menu_item_used])
        }
      }
    }
    else {
      console.log(menu_item_used)
    }

  }
  console.log(total_items_used)
  var ingredients = ingredients_onhand.QueryResult

  var ingredient_map = {}
  for (var i = 0; i < ingredients.length; i++) {
    try {
      ingredients[i] = ingredients[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(',');
    }
    catch (TypeError) {

    }

  }

  for (var i = 0; i < ingredients.length; ++i) {
    ingredient_map[ingredients[i][0].trim()] = ingredients[i][3]
  }

  var itemList = []

  for (var key in ingredient_map) {


    if (!(key in total_items_used)) {
      total_items_used[key] = 0
    }
    if (total_items_used[key] * 10 < ingredient_map[key]) {

      itemList.push(
        {
          "Name": key,
          "Used": total_items_used[key],
          "On Hand": ingredient_map[key]
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
            <div class="pageHeader" id="textSize"><Translate>Excess Report</Translate></div>
          </div>
        </header>
        <div className="scrollTab" id="textSize">
          <p id="textSize"><Translate>The following items have an excess:</Translate></p>
          <table cellpadding="2" cellspacing="15" id="textSize">
            <thead>
              <tr>
                <th><Translate>Item Name</Translate></th>
                <th><Translate>Quantity Sold</Translate></th>
                <th><Translate>Quantity on Hand</Translate></th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item) => {
                return (
                  <tr key={item.Name}>
                    <td>{item.Name}</td>
                    <td>{item.Used}</td>
                    <td>{item["On Hand"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>

        </div>
        <Form className="form" id="textSize">
          <label id="textSize"><Translate>Date</Translate> (yyyy-mm-dd):
            <Input className="inputs" id="textSize" type="text"
              value={date}
              onChange={handlePrice} />
          </label>
        </Form>

        <div class="footerdiv">
          <Button class="returnButton" id="textSize" onClick={ReturnToManager}><Translate>Return</Translate></Button>
          <select class="langSelect" value={to} onChange={({ target: { value } }) => setTo(value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          <Button type="primary" id="textSize" onClick={getData}><Translate>Submit</Translate></Button>
          <Button type="primary" id="textSize" onClick={zoomIn}><Translate>Zoom In</Translate></Button >
          <Button type="primary" id="textSize" onClick={zoomOut}><Translate>Zoom Out</Translate></Button >
        </div>

      </div>
    </Translator>




  );
}

export default Excess_Report;