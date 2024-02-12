'use client'
import BeeWithShadow from '../../../public/assets/bee-with-shadow.png';
import Image from 'next/image';
import { useAppContext } from "../context";
import { usePathname } from 'next/navigation'


export default function Login() {

  const currentPage = usePathname();

  console.log(`currentPage is: ${currentPage}`)

  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSignUp,
    handleSignIn
  } = useAppContext();
  
  return (
    <>
      <h1 className='hidden'>Habitap</h1>
      <h2>Login below to  enter:</h2>
      <Image
          src={BeeWithShadow}
          id="bee-with-shadow"
          alt="Habitap Bee Mascot"
          width="100"
        />
      <div id="signin-form">
        <p>Email: </p>
        <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <p>Password:</p>
        <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
        <div className="btn-container">
          <button className="signInBtn" onClick={handleSignIn}>Sign In</button>
          <button className="registerBtn" onClick={handleSignUp}>Register</button>
          </div>
          </div>
          {/* <ButtonBar /> */}
    </>
  )
}