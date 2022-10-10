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
  const [text, setText] = useState<string>("");
  const [account, setAccount] = useState<Types.AccountData | null>(null);
  const [modules, setModules] = useState<Types.MoveModule[] | any>([]);
  const [resources, setResources] = useState<Types.MoveResource[] | any>([]);
  const [isSaving, setIsSaving] = useState(false);

  // check the account has modules
  const hasModule = modules.some((m: any) => m.abi?.name === 'Message');

  const ref = createRef<HTMLTextAreaElement>();
  const resourceType = `${address}::message::MessageHolder`;
  const resource = resources.find((r: any) => r.type === resourceType);

  const data = resource?.data as {message: string} | undefined;
  console.log("data:", data)
  const message = data?.message
  const urlAddress = window.location.pathname.slice(1);
  const isEditable = !urlAddress;

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
    // const message = ref.current.value;

    // tx data
    const transaction = {
      type: "entry_function_payload",
      function: `${address}::message::set_message`,
      arguments: [stringToHex(text)],
      type_arguments: [],
    };

    try {
      setIsSaving(true);
      // call signAndSubmitTransaction function
      await window.aptos.signAndSubmitTransaction(transaction);
      alert('send success')
    } catch(e) {
      alert('send fail...');
    } finally {
      setIsSaving(false);
    }
  }

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

  // hook
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!address) return;
    client.getAccount(address).then(setAccount);
    client.getAccountModules(address).then(setModules);
    client.getAccountResources(address).then(setResources);
  }, [address]);

  useEffect(() => {
    if (urlAddress) {
      setAddress(urlAddress);
    } else {
      init();
    }
  }, [urlAddress]);

  return (
    <div className="App">
      <p><code>{ address }</code></p>
      <p><code>{ account?.sequence_number }</code></p>
      {!hasModule ? (
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder={message} 
            onChange={(e) => setText(e.target.value)}
            id="message" 
          />
          <textarea 
            ref={ref} 
            value={message}
            readOnly={!isEditable}
          />
          {isEditable && (
            <input 
              disabled={isSaving} 
              type="submit" 
            />
          )}
          {isEditable && (
            <a href={address!}>Get public URL</a>
          )}
        </form>
      ) : publishInstructions}
    </div>
  );
}

export default App;
