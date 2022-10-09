import React, { useState, useEffect } from 'react';
import { Types, AptosClient } from 'aptos';
import './css/App.css';

// Create an AptosClient to interact with devnet.
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

/**
 * App Component
 */
function App() {
  // state variable
  const [address, setAddress] = useState<string | null>(null);
  const [account, setAccount] = React.useState<Types.AccountData | null>(null);

  // hook
  useEffect(() => {
    const init = async() => {
      // connect
      await window.aptos.connect();
      const data = await window.aptos.account(); 
      // set address
      setAddress(data.address);
    }
    init();
  }, []);

  useEffect(() => {
    if (!address) return;
    client.getAccount(address).then(setAccount);
  }, [address]);

  return (
    <div className="App">
      <p><code>{ address }</code></p>
      <p><code>{ account?.sequence_number }</code></p>
    </div>
  );
}

export default App;
