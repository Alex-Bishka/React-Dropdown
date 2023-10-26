import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import Dropdown from './components/Dropdown'; 

const options = ["George Constanza", "Jerry Seinfeld", "Elaine Benes", "Cosmo Kramer"]

function App() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: 500}}>
      <div style={{ marginRight: 10}}>
        <Dropdown
          options={options}
          isMultiSelect={true}
        />
      </div>
      <div>
        <Dropdown
          options={options}
          isMultiSelect={false}
        />
      </div>
    </div>
  );
}

export default App;