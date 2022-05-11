//import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Message from './components/Message';
import AccountData from './components/AccountData';

import { useEffect, useState } from "react";

async function getBalance (address) {
  const balance = await window.ethereum.request({
    method: "eth_getBalance",
    params: [address,"latest"]
  });
  console.log(`balance en wei:${balance}`);
  const balanceEth = parseInt(balance,16) * Math.pow(10,(-18));
  console.log(`balance en eth:${balanceEth}`);
  return balanceEth
}

async function connect (setConnectedAcount,setConnecting) {
  setConnecting(true);
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    const accountAddress = accounts[0]
    const balance = await getBalance(accountAddress)
    const account = {
      number: accountAddress,
      balance: balance
    } 
  
    setConnectedAcount(account);
  
    //post data to API
    saveAccountData(account);
    
  } catch (error) {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log('Please connect to MetaMask.');
    } else {
      console.error(error);
    }
  }
  setConnecting(false);
  
}

async function checkWalletConnected (setConnectedAcount,setLoading) {
  if(window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts"
    });

    if (accounts.length > 0) {
      const accountAddress = accounts[0];
      const balance = await getBalance(accountAddress);
      const account = {
        number: accountAddress,
        balance: balance
      } 
      
      setConnectedAcount(account);
      
      //post data to API
      saveAccountData(account);

      
    } 
    setLoading(false);
  }
}

async function saveAccountData (account) {
  const response = await fetch("http://localhost:3001/api/accounts",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(account)
  }); 
  const res = await response.json()
  console.log(res); 
}

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
        loading ? 'loading...' : (
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