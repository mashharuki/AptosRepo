import 
  React, { 
    useState, 
    useEffect, 
    createRef 
  } 
from 'react';
import { 
  Types, 
  AptosClient 
} from 'aptos';
import './css/App.css';

// Create an AptosClient to interact with devnet.
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

/**
 * App Component
 */
function App() {
  // state variable
  const [address, setAddress] = useState<string | null>(null);
  const [account, setAccount] = useState<Types.AccountData | null>(null);
  const [modules, setModules] = useState<Types.MoveModule[] | any>([]);
  const [isSaving, setIsSaving] = useState(false);

  // check the account has modules
  const hasModule = modules.some((m: any) => m.abi?.name === 'Message');
  const ref = createRef<HTMLTextAreaElement>();

  const publishInstructions = (
    <pre>
      Run this command to publish the module:
      <br />
      aptos move publish --package-dir /path/to/hello_blockchain/
      --named-addresses HelloBlockchain={address}
    </pre>
  );

  /**
   * string to hex function
   * @param text tx info
   * @returns 
   */
  function stringToHex(text: string) {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return Array.from(encoded, (i) => i.toString(16).padStart(2, "0")).join("");
  }

  /**
   * handleSubmit function
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!ref.current) return;
    // get value
    const message = ref.current.value;

    // tx data
    const transaction = {
      type: "entry_function_payload",
      function: `${address}::message::set_message`,
      arguments: [stringToHex(message)],
      type_arguments: [],
    };

    try {
      setIsSaving(true);
      // call signAndSubmitTransaction function
      await window.aptos.signAndSubmitTransaction(transaction);
    } finally {
      setIsSaving(false);
    }
  }

  // hook
  useEffect(() => {
    /**
     * init function
     */
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
    client.getAccountModules(address).then(setModules);
  }, [address]);

  return (
    <div className="App">
      <p><code>{ address }</code></p>
      <p><code>{ account?.sequence_number }</code></p>
      {!hasModule ? (
        <form onSubmit={handleSubmit}>
          <textarea ref={ref} />
          <input 
            disabled={isSaving} 
            type="submit" 
          />
        </form>
      ) : publishInstructions}
    </div>
  );
}

export default App;
