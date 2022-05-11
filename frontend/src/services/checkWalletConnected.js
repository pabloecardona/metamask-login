import getBalance from "./getBalance";
import saveAccountData from "./saveAccountData";

export default async function checkWalletConnected (setConnectedAcount,setLoading) {
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