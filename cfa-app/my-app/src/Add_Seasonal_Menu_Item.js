import './App.css';
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";
import React, { useState, useEffect } from 'react';

function Add_Seasonal_Menu_Item() {

  var itemArr;
  var newItem;
  var listOfItems;
  var newItemIngredientList = "";


  const [data, setdata] = useState({
    QueryResult: "n/a"
  });

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/data/itemtable").then((res) =>
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

  function handleChange() {

  }

  function submitNewMenuItem(){
    var queryToRun = "INSERT INTO menutable (name, composition, cost) VALUES ('SI: " + newMenuItemName + "', '" + inputItems + "', '$" + newMenuItemPrice + "')";
    fetch("/result/" + queryToRun);

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Manager />
      </React.StrictMode>
    );
  }

  

  

  const [first, setFirst] = useState(true);


  function addMenuItemIngredient(){
    if (first){
      setFirst(false);
      setInputItems(inputItems + dropdownInput);
    } else {
      setInputItems(inputItems + "|" + dropdownInput);
    }

  }
  function addMenuItemNewIngredient(){
    if (first){
      setFirst(false);
      setInputItems(inputItems + newItemInput);
    } else {
      setInputItems(inputItems + "|" + newItemInput);
    }

    var queryToRun = "INSERT INTO itemtable (name, type, cost, quantity, reorder_threshold) VALUES ('" + newItemInput + "', 'Ingredient', '$0.10', '0', '0')";
    fetch("/result/" + queryToRun);
  }

  const [selected, setSelected] = useState('Chicken Sandwich');

  const [inputItems, setInputItems] = useState('');

  const [testVal, setTest] = useState(0);

  const [dropdownInput, setDropdownInput] = useState('American Cheese');

  const [newItemInput, setNewItemInput] = useState('');

  const [newMenuItemName, setNewMenuItemName] = useState('');

  const [newMenuItemPrice, setNewMenuItemPrice] = useState('');

  const handleNewMenuItemName = event => {
    setNewMenuItemName(event.target.value);
  }

  const handleNewMenuItemPrice = event => {
    setNewMenuItemPrice(event.target.value);
  }

  const handleNewDropdownSelection = event => {
    setDropdownInput(event.target.value);
  }

  const handleNewItemInput = event => {
    setNewItemInput(event.target.value);
  }


  function ReturnToManager() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Manager />
      </React.StrictMode>
    );
  }

  
    return (

      <div>
        <header className="SelectRole">
          <div className="flex-container">
        <button type="button" onClick={ReturnToManager}>Return</button>
        </div>
        </header>

        <div>
        <table>
        <tr>
            <td>New Menu Item Name:</td>
            <td><input type="text" value={newMenuItemName} onChange={handleNewMenuItemName}/></td>
          </tr>
          <tr>
            <td>New Menu Item Price:</td>
            <td>$<input type="text" value={newMenuItemPrice} onChange={handleNewMenuItemPrice}/></td>
          </tr>
          <tr>
            <td><select value={dropdownInput} onChange={handleNewDropdownSelection}>
        {listOfItems.map((option) => (
          <option value={option.Name}>{option.Name}</option>
        ))}</select></td>
        <td>       <button type="button" onClick={addMenuItemIngredient}>Add Ingredient</button></td>
          </tr>
          <tr>
            <td><input type="text" value={newItemInput} onChange={handleNewItemInput}/></td>
            <td><button type="button" onClick={addMenuItemNewIngredient}>Add New Ingredient</button></td>
          </tr>
          <tr>
            <td>Menu Item Contents:</td>
            <td>{inputItems}</td>
          </tr>

        </table>
        <button type="button" onClick={submitNewMenuItem}>Submit Seasonal Item</button>
      </div>
        

       
      </div>

      


      

      
    );
  }
  
export default Add_Seasonal_Menu_Item;