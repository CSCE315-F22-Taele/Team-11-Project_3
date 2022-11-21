import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";

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
    fetch("/result/" + queryToRun);
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Edit_Menu />
      </React.StrictMode>
    );
  }

const [selected, setSelected] = useState('Chicken Sandwich');
const [price, setPrice] = useState('$4.29');

const handleChange = event => {
  setSelected(event.target.value);
  var currVals = listOfItems.find(element => element.Name == event.target.value);
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

  return (
    <div>
      <header className="SelectRole">
        <div class="flex-container">
          <div class="returnDiv"><button type="button" class="returnButton" onClick={ReturnToManager}>Return</button></div><div class="pageHeader">Edit Menu</div>
        </div>
      </header>
      <div className="scrollTable">
      <table cellpadding="2"cellspacing="15">
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
        <div>
        <select value={selected} onChange={handleChange}>
        {listOfItems.map((option) => (
          <option value={option.Name}>{option.Name}</option>
        ))}

       </select>

       <form>
        <label>Price:
          <input type="text"
          value={price}
          onChange={handlePrice}/>
        </label>
        </form>
        <button onClick={SubmitUpdate}>Submit</button>
        </div>
    </div>

  );
}

export default Edit_Menu;