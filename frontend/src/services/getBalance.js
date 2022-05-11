export default async function getBalance (address) {
  const balance = await window.ethereum.request({
    method: "eth_getBalance",
    params: [address,"latest"]
  });
  const balanceEth = parseInt(balance,16) * Math.pow(10,(-18));
  return balanceEth
}