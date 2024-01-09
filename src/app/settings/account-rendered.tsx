import React from 'react';
import Image from 'next/image';
import ButtonBar from '../components/ButtonBar';
import { useAppContext } from '../../../src/app/context';

interface AccountRenderedProps {
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  profilePicUrl: string | null;
}

const AccountRendered: React.FC<AccountRenderedProps> = ({ firstname, lastname, username, profilePicUrl }) => {
  const { user } = useAppContext();

  const profilePicAttributes = {
    backgroundImage: `url(${profilePicUrl})`, // Set the background image URL
  };

  return (
    <>
        <div id="profile-pic-large" style={profilePicAttributes}></div>
      <h2 id="profile-username">{username}</h2>
      <div id="profile-info">
        <p>{firstname} {lastname}</p>
        <button className="signOutBtn">Sign Out</button>
      </div>
      <ButtonBar />
    </>
  );
};

export default AccountRendered;
