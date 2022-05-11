export default function Login ({connect, connecting}) {
  return (
    <div className="login">
      <p>You are ready to connect!</p>
      {connecting ? 'connecting...' : <button onClick={connect}>Connect to MetaMask</button>}
      
    </div>
  )
}