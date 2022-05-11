export default async function saveAccountData (account) {
  const response = await fetch("http://localhost:3001/api/accounts",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(account)
  }); 
  const res = await response.json()
  console.log(res); 
}