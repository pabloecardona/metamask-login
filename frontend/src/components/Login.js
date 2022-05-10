import { useEffect, useState } from "react";

const Login = () => {
  const [userAddress, setUserAddress] = useState("")

  useEffect(() => {

  },[])


  return (
    <div className="login">
      <h1>Welcome!</h1>
      <p>You can access using Metamask</p>
    </div>
  )
}

export default Login