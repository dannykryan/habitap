'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '../../../lib/supabase';
import BeeWithShadow from '../../../public/assets/bee-with-shadow.png';
import Image from 'next/image';
import ButtonBar from '../components/ButtonBar';
import { useAppContext } from "../context";


export default function Login() {

  const {
    currentDate,
    isCommitted,
    setIsCommitted,
    habitData,
    setHabitData,
    habitLogsArray,
    setHabitLogsArray,
    tenDaysPassed,
    toggleTenDaysPassed,
    currentScore,
    maxScore,
    percentageDecimal,
    toggleIsCommitted,
    activePage,
    setActivePage,
    goodLuck,
    toggleGoodLuck,
    user,
    setUser,
    email,
    setEmail,
    password,
    setPassword,
    handleSignUp,
    handleSignIn,
    handleSignOut
  } = useAppContext();
  
  return (
    <>
      <h1>Welcome Back!</h1>
      <Image
          src={BeeWithShadow}
          id="bee-with-shadow"
          alt="Habitap Bee Mascot"
          width="100"
        />
      <h2 id="profile-username">Sign In</h2>
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
          <ButtonBar />
    </>
  )
}