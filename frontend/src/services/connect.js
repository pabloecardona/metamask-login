import getBalance from "./getBalance";
import saveAccountData from "./saveAccountData";

export default async function connect (setConnectedAcount,setConnecting) {
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