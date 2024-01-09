import React from 'react';
import Image from 'next/image';
import ButtonBar from '../components/ButtonBar';
import { useAppContext } from '../../../src/app/context';
import Link from 'next/link';

interface AccountRenderedProps {
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  profilePicUrl: string | null;
}

const AccountRendered: React.FC<AccountRenderedProps> = ({ firstname, lastname, username, profilePicUrl }) => {
  const { user, handleSignOut } = useAppContext();

  const profilePicAttributes = {
    backgroundImage: `url(${profilePicUrl})`, // Set the background image URL
  };

  return (
    <>
        <div id="profile-pic-large" style={profilePicAttributes}></div>
      <h2 id="profile-username">{username}</h2>
      <div id="profile-info">
        <p>{firstname} {lastname}</p>
        <Link href="/login">
            <button className="signOutBtn" onClick={handleSignOut}>Sign Out</button>
        </Link>
      </div>
      <ButtonBar />
    </>
  );
};

export default AccountRendered;
