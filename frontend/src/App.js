//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

import Login from './components/Login';
import Message from './components/Message';
import AccountData from './components/AccountData';

import connect from './services/connect';
import checkWalletConnected from './services/checkWalletConnected';

function App() {
  const [userAddress, setUserAddress] = useState({})
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    setLoading(true)
    checkWalletConnected(setUserAddress,setLoading);
  },[])

  return (
    <div className="App">
    {
      !window.ethereum ?
        <Message />
      :
      (
        loading ? 'loading...' : 
        (
          userAddress.number ?
            <AccountData userAddress={userAddress}/>
          : 
            <Login connect={()=>connect(setUserAddress,setConnecting)} connecting={connecting} />
        )
      )
    }
    </div>
  );
}

export default App;