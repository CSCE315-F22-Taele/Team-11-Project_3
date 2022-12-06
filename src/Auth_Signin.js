import './App.css';
import './index.css'
import React from 'react';
import Manager from './Manager';
import Server from './Server';
import Customer from './Customer';
import App from './App';
import ReactDOM from 'react-dom/client';
import MapPage from './MapPage';
import { Button } from 'antd';
import { GoogleLogin } from 'react-google-login'
import { gapi } from "gapi-script";
// Google api key
//AIzaSyD-5SlaVjpKarOG19ixO-c9v-0Q7oH3jnw

//client id
const clientID = '741259151635-g7v95ds2buolo7tu7ha7lnpr5549nli8.apps.googleusercontent.com'

//client secret
//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
gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

function Auth_Signin() {
    function zoomIn(){
        var elements, style;
        elements = document.querySelectorAll('#textSize');
        console.log(elements);
        for(var i = 0; i < elements.length; i++){
          style = getComputedStyle(elements[i]);
          var size = style.fontSize
          console.log(size)
          var newSize = parseInt(size) + 2 
          elements[i].style.fontSize = newSize.toString() + "px";
        }
      }
      function zoomOut(){
        var elements, style;
        elements = document.querySelectorAll('#textSize');
        console.log(elements);
        for(var i = 0; i < elements.length; i++){
          style = getComputedStyle(elements[i]);
          var size = style.fontSize
          console.log(size)
          var newSize = parseInt(size) - 2 
          elements[i].style.fontSize = newSize.toString() + "px";
        }
      }
    
    function ReturnToHome() {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
      }
    function onSuccess(res){
        console.log("success login", res)
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
          <React.StrictMode>
            <Manager />
          </React.StrictMode>
        );
    }

    function onFailure(res){
        console.log("Login Failure", res)
    }
  
  return (
    <div id='body'>
        
      <div class="headerdiv">
        Chick-fil-A!
      </div>
      <div>
        <header className="SelectRole">
          <div class="appHeader">
            Sign in with Google:
          </div>
        </header>
        <div className="container">
            <GoogleLogin
                clientId = {clientID}
                buttonText = "Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
             
            />

        </div>
      </div>
      <div class="footerdiv">
      <Button id="textSize" onClick={ReturnToHome}>Return</Button>
        <Button type="primary" id="textSize" onClick={zoomIn}>Zoom In</Button >
        <Button type="primary" id="textSize" onClick={zoomOut}>Zoom Out</Button >
        
      </div>
    </div>

  );
}

export default Auth_Signin;
