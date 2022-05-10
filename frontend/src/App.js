import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
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

async function connect (setConnectedAcount) {

  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const account = accounts[0]
  const balance = await getBalance(account)
  
  setConnectedAcount({
    number: account,
    balance: balance});
}

async function checkWalletConnected (setConnectedAcount) {
  if(window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts"
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      const balance = await getBalance(account)

       const data = {
        number: account,
        balance: balance
      } 
      
      setConnectedAcount({
          number: account,
          balance: balance});
      
          //Acá se envía la info al server:
       const response = await fetch("http://localhost:3001/api/accounts",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      }); 
      const res = await response.json()
      console.log(res); 
    } 
  }
}

function App() {
  const [userAddress, setUserAddress] = useState({})

  useEffect(() => {
    checkWalletConnected(setUserAddress);
  },[])

  return (
    <div className="App">
      <h1>Welcome!</h1>
      {userAddress.number ?
      <>
        <p>User connected with address: {userAddress.number}</p>
        <p>Your balance is: {userAddress.balance} Eth</p>
      </>
      :
      <>
        <p>You can access using MetaMask</p>
        <button onClick={()=>connect(setUserAddress)}>Connect</button>
      </>
      }
    </div>
  );
}

export default App;
