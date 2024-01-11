'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../../../lib/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useAppContext } from '../context'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const userOne = session?.user

  const {
    handleSignOut,
    user,
    email,
    setEmail,
    password,
    setPassword,
    handleSignUp,
  } = useAppContext();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
  
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, full_name, profile_pic_url`)
        .eq('id', userOne?.id)
        .single();
  
      if (error && status !== 406) {
        throw error;
      }
  
      if (data) {
        setUsername(data.username);
        setFullname(data.full_name);
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
  fullname,
  profilePicUrl,
}: {
  fullname: string | null;
  username: string | null;
  profilePicUrl: string | null;
}) {
  try {
    setLoading(true);

    const { error } = await supabase.from('profiles').upsert({
      id: userOne?.id as string,
      full_name: fullname,
      username,
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

  return (
    <>       
        <div className="form-widget">
          <div>
            <h1>Account</h1>
            <p>Update your account information.</p>
          </div>
          <div id="settings-profile-pic"></div>

          <div className="form-row">
            <label htmlFor="email">Email: </label>
            <input 
              name="email" 
              className="account-input"
              onChange={(e) => setEmail(e.target.value)} 
              value={email || ""} />
          </div>

          <div className="form-row">
          <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="account-input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

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
            <label htmlFor="FirstName">Full Name</label>
            <input
              id="FirstName"
              className="account-input"
              type="text"
              value={fullname || ''}
              onChange={(e) => setFullname(e.target.value)}
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
                  updateProfile({ fullname, username, profilePicUrl });
                  handleSignUp();
                }}
              >
                Register
              </button>
            </Link>
            </form>
          </div>
        </div>
    </>
  );
}