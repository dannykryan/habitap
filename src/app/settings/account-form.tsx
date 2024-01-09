'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../../../lib/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useAppContext } from '../context'
import AccountRendered from './account-rendered'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [firstname, setFirstname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [lastname, setLastName] = useState<string | null>(null)
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const userOne = session?.user

  const {
    handleSignOut,
    user,
  } = useAppContext();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
  
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name, profile_pic_url`)
        .eq('id', userOne?.id)
        .single();
  
      if (error && status !== 406) {
        throw error;
      }
  
      if (data) {
        setFirstname(data.first_name);
        setUsername(data.username);
        setLastName(data.last_name);
        setProfilePicUrl(data.profile_pic_url); // Set the profilePicUrl state
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }, [userOne, supabase]);


  useEffect(() => {
    getProfile()
  }, [userOne, getProfile])

  async function updateProfile({
  username,
  lastname,
  firstname,
  profilePicUrl,
}: {
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  profilePicUrl: string | null;
}) {
  try {
    setLoading(true);

    const { error } = await supabase.from('profiles').upsert({
      id: userOne?.id as string,
      first_name: firstname,
      username,
      last_name: lastname,
      profile_pic_url: profilePicUrl, // Include profile_pic_url in the upsert
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    alert('Profile updated!');
  } catch (error) {
    alert('Error updating the data!');
  } finally {
    setLoading(false);
  }
}

const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <>
      {isEditMode ? (
        <div className="form-widget">
          <div>
            <h1>Account</h1>
            <p>Update your account information.</p>
          </div>
          <div id="settings-profile-pic"></div>

          <div className="form-row">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="account-input"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label htmlFor="FirstName">First Name</label>
            <input
              id="FirstName"
              className="account-input"
              type="text"
              value={firstname || ''}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label htmlFor="LastName">Last Name</label>
            <input
              id="LastName"
              className="account-input"
              type="text"
              value={lastname || ''}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label htmlFor="Profile-picture">Profile Pic URL</label>
            <input
              id="Profile-picture"
              className="account-input"
              type="text"
              value={profilePicUrl || ''}
              onChange={(e) => setProfilePicUrl(e.target.value)}
            />
          </div>

          <div>
            <form action="/auth/signout" method="post">
            <Link href="/login">
              <button
                className="signInBtn"
                onClick={(e) => {
                  e.preventDefault();
                  updateProfile({ firstname, username, lastname, profilePicUrl });
                  toggleEditMode();
                }}
              >
                Update
              </button>

              <button
                className="edit-link"
                onClick={(e) => {
                  e.preventDefault();
                  toggleEditMode();
                }}
              >
                Cancel
              </button>
            </Link>
            </form>
          </div>
        </div>
      ) : (
        <AccountRendered
          firstname={firstname}
          lastname={lastname}
          username={username}
          profilePicUrl={profilePicUrl}
        />
      )}

      {!isEditMode && (
      <button onClick={toggleEditMode} className="edit-link">
        Edit
      </button>
    )}
    </>
  );
}