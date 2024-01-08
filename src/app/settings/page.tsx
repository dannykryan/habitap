// import Prompt from "../components/Prompt";
// import ButtonBar from "../components/ButtonBar";
// import Image from "next/image";
// import profilePic from "../../../public/assets/Bumblebee_Man.png"
// import { useAppContext } from '../../../src/app/context';

// export default function Settings() {

//     // const {
//     //     activePage,
//     //     setActivePage,
//     //   } = useAppContext();

//     return (
//         <>
//         <Image
//           src={profilePic}
//           id="profile-pic-large"
//           alt="Profile Picture"
//           width="100"
//         />
//         <h2 id="profile-username">bumblebeeMan89</h2>
//         <div id="profile-info">
//             <p>Bumblebee Man</p>
//             <p>bumblebeeMan@aol.com</p>
//             <button className="signOutBtn" >
//                 Sign Out
//             </button>
//         </div>
//         <ButtonBar />
//         </>
//     );
// }


import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../lib/supabase'
import AccountForm from './account-form'

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <AccountForm session={session} />
}