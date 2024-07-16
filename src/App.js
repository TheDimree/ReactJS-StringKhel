//import logo from "./logo.svg";
import "./App.css";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import About from "./components/About";
import TextForm from './components/TextForm'
import React, { useState } from "react";
import {BrowserRouter, Route, Routes,} from "react-router-dom";


function App() {

  //mode is a state varialbe and setMode is a function to chage state variable.
  const [mode, setMode] = useState ('light'); //By default light mode.

  //Function to update state variable mode by using setMode() function.
  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark Mode has been enabled", "success");      
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode has been enabled", "success");      

    }
  }

  const [alert, setAlert] = useState(null); 
  
  //Function to update stat variable alert by using setAlert() function.
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    
    // 1.5 second baad alert adrishya
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>

      {/* //!Routing */}
      <BrowserRouter>
      
        {/* this Navbar is passing a property (as arguement) named title, which is called props.  */}
        <Navbar title = "StringKhel" mode = {mode} toggleMode = {toggleMode}/>
        
        {/* //*Passing state variable named alert in alert props of Alert component. */}
        <Alert alert = {alert}/> 
  
        <Routes>

          <Route exact path="/" element={<TextForm heading = "Enter your text below" mode = {mode} showAlert = {showAlert}/>}/>

          <Route exact path="/about" element={<About mode = {mode} />}/>
        
        </Routes>
      
      </BrowserRouter>
    
    </>
  );
}

export default App;