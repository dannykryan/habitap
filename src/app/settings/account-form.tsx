'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../../../lib/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useAppContext } from '../context'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [firstname, setFirstname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [lastname, setLastName] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const userOne = session?.user

  const {
    handleSignOut
  } = useAppContext();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name`)
        .eq('id', userOne?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFirstname(data.first_name)
        setUsername(data.username)
        setLastName(data.last_name)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }, [userOne, supabase])

  useEffect(() => {
    getProfile()
  }, [userOne, getProfile])

  async function updateProfile({
    username,
    lastname,
    firstname,
  }: {
    username: string | null
    firstname: string | null
    lastname: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: userOne?.id as string,
        first_name: firstname,
        username,
        last_name: lastname,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <h1>Account</h1>
        <p>Update your account information.</p>
      </div>
      <div>
        <label htmlFor="FirstName">First Name</label>
        <input
          id="FirstName"
          type="text"
          value={firstname || ''}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="LastName">Last Name</label>
        <input
          id="LastName"
          type="text"
          value={lastname || ''}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ firstname, username, lastname })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
        <Link href="/login">
        <button className="signInBtn" onClick={handleSignOut}> Sign Out </button>
          </Link>
        </form>
      </div>
    </div>
  )
}