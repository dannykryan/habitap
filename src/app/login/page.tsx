import BeeWithShadow from '../../../public/assets/bee-with-shadow.png';
import Image from 'next/image';
import ButtonBar from '../../../components/ButtonBar';
import { useAppContext } from '../../../src/app/context';

export default async function Login() {

    // const {
    //     activePage,
    //     setActivePage,
    //   } = useAppContext();
  
  return <>
    <h1>Welcome Back!</h1>
    <Image
          src={BeeWithShadow}
          id="bee-with-shadow"
          alt="Habitap Bee Mascot"
          width="100"
        />
        <h2 id="profile-username">Sign In</h2>
        <div id="signin-form">
            <p>Username: </p><input type="text" />
            <p>Password:</p><input type="password" />
            <div className="btn-container">
            <button className="signInBtn" >
                Sign In
            </button>
            <button className="registerBtn" >
                Register
            </button>
            </div>
        </div>
        <ButtonBar />
  </>
}
