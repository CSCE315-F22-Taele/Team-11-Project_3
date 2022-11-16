import './App.css';
import React from 'react';
import App from './App';
import Manager from './Manager';
import Server from './Server';
import ReactDOM from 'react-dom/client';

function New_Order() {
  function addToOrder(item) {
    const markupParagraph = document.getElementById("receipt");
    markupParagraph.innerText += item + '\n';
  }
  function returnToServerPage() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Server />
      </React.StrictMode>
    );
  }
  function runQueryAndReturnToServerPage() {
    //TODO: Run a query
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
        <div className="flex-container">
          <div id="receipt" class="box">Order Receipt <br></br><br></br>
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