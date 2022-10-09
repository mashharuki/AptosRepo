import React, { useState, useEffect } from 'react';
import logo from './assets/img/logo.svg';
import './css/App.css';

/**
 * App Component
 */
function App() {
  // state variable
  const [address, setAddress] = useState<string | null>(null);

  // hook
  useEffect(() => {
    console.log("window:", window.aptos)
    window.aptos.account().then((data : {address: string}) => setAddress(data.address));
  }, []);

  return (
    <div className="App">
      <p><code>{ address }</code></p>
    </div>
  );
}

export default App;
