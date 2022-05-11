export default function AccountData ({userAddress}) {
  return (
    <div className="accountData">
      <div className="balance">
        <h1>{userAddress.balance}</h1><span>ETH</span>
      </div> 
      <p>{userAddress.number.substring(0,5)}...{userAddress.number.substring(userAddress.number.length-4)}</p>
    </div>
  )
}