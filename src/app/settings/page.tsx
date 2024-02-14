import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../lib/supabase'
import AccountForm from './account-form'
import ButtonBar from '../components/ButtonBar'

// The settings page is where the user can view and edit their account information.
export default async function Settings() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies : () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  

  return (
    <>
        <AccountForm session={session} />
        <ButtonBar />
    </>
  )
}