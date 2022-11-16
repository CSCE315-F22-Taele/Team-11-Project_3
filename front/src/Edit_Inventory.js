import './App.css';
import React, { useState, useEffect } from "react";
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";

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
  

  

  function ReturnToManager() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Manager />
      </React.StrictMode>
    );
  }

  // function initialize() {
  //   const [data, setdata] = useState({
  //     QueryResult: "n/a"
  //   });

  //   // Using useEffect for single rendering
  //   useEffect(() => {
  //       // Using fetch to fetch the api from 
  //       // flask server it will be redirected to proxy
  //       fetch("/data/itemtable").then((res) =>
  //           res.json().then((data) => {
  //               // Setting a data from api
  //               setdata({
  //                   QueryResult: data.QueryResult
  //               });
  //           })
  //       );
  //   }, []);

    



  //   itemArr = data.QueryResult;
  //   newItem = [];
  //   for (var i = 0; i < itemArr.length; i++){
  //     newItem.push(itemArr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
  //   }
  //   listOfItems = [];
  //   for (var i = 0; i < newItem.length; i++){
  //     listOfItems.push(
  //       {"Name":newItem[i][0],
  //       "Type":newItem[i][1],
  //       "Cost":newItem[i][2],
  //       "Quantity":newItem[i][3],
  //       "Reorder_Threshold":newItem[i][4]
  //     }
  //     )
  //   }


    // setPrice('55');

  //}


  function SubmitUpdate(){
      // Using fetch to fetch the api from 
      // flask server it will be redirected to proxy
    var queryToRun = "UPDATE itemtable SET cost = '" + price + "', quantity = '" + quantity + "', reorder_threshold = '" + reorder_threshold + "' WHERE name = '" + selected + "'";
    var status;
    fetch("/result/" + queryToRun);
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
  
  
  const handleChange = event => {
    setSelected(event.target.value);
    var currVals = listOfItems.find(element => element.Name == event.target.value);
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



  // initialize();
  return (

    <div>
      <header className="SelectRole">
        <div class="flex-container">
          <div class="returnDiv"><button type="button" class="returnButton" onClick={ReturnToManager}>Return</button></div><div class="pageHeader">Edit Inventory</div>
        </div>
      </header>
      <div className="scrollTable">
      <table>
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
        <label>Quantity:
          <input type="text"
          value={quantity}
          onChange={handleQuantity}/>
        </label>
        <label>Reorder Threshold:
          <input type="text"
          value={reorder_threshold}
          onChange={handleReorder}/>
        </label>
        </form>
        <button onClick={SubmitUpdate}>Submit</button>



        </div>
    </div>




  );
}

export default Edit_Inventory;