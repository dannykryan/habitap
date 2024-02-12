'use client'
import BeeWithShadow from '../../../public/assets/bee-with-shadow.png';
import Image from 'next/image';
import { useAppContext } from "../context";
import { usePathname } from 'next/navigation'
import { useState } from 'react';
import RegisterPopup from '../components/popups/RegisterPopup';
import { Database } from '../../../lib/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'


export default function Login() {
  const supabase = createClientComponentClient<Database>()
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null)

    function closePopup() {
        setShowPopup(false);
      }

  const currentPage = usePathname();

  async function updateProfile({
    username,
    fullname,
    profilePicUrl,
  }: {
    username: string | null;
    fullname: string | null;
    profilePicUrl: string | null;
  }) {
    try {
      setLoading(true);
  
      // Perform the upsert operation
      const { error } = await supabase.from('profiles').upsert({
        username,
        full_name: fullname,
        profile_pic_url: profilePicUrl,
        updated_at: new Date().toISOString(),
      });
  
      // Check if there's an error
      if (error) {
        throw error;
      }
  
      // Optionally, you can perform additional actions upon successful upsert
      console.log('Profile updated successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error updating profile:', error);
      // You can perform additional error handling, such as showing a message to the user
    } finally {
      // Set loading state to false after the operation completes (whether successful or not)
      setLoading(false);
    }
  }
  

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
      <header>
        <h1 className='hidden'>Habitap</h1>
        <h2>Login below to  enter:</h2>
      </header>
      <Image
          src={BeeWithShadow}
          id="bee-with-shadow"
          alt="Habitap Bee Mascot"
          width="100"
        />
      <form id="signin-form">
        <label htmlFor="email">Email:</label>
        <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="account-input"
            type="text"
            value={username || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
          <label htmlFor="fullname">Full Name</label>
          <input
            id="fullname"
            className="account-input"
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
          <label htmlFor="profilePicUrl">Profile Picture URL</label>
          <input
            id="profilePicUrl"
            className="account-input"
            type="text"
            value={profilePicUrl || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
        <div className="btn-container">
          <button 
            className="registerBtn" 
            onClick={(e) => {
              handleSignUp
              e.preventDefault();
              updateProfile({ fullname, username, profilePicUrl });
            }}
          >Register</button>
        </div>
          </form>
          {/* <ButtonBar /> */}
          {/* Conditionally render the RegisterPopup component */}
          {showPopup && <RegisterPopup closePopup={closePopup} />}
    </>
  )
}