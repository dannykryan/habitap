"use client"
import { createContext, useState, useContext, useEffect } from 'react';
import supabase from '../../../lib/initSupabase';
import { HabitLog, Data } from "../../../types/types";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Database } from '../../../lib/supabase';

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children } : {
    children: React.ReactNode;
}) {
    const currentDate = new Date();
    const [isCommitted, setIsCommitted] = useState<boolean>(false);
    const [habitData, setHabitData] = useState<Data[] | null>(null);
    const [habitLogsArray, setHabitLogsArray] = useState<HabitLog[] | null>(null);
    const [activePage, setActivePage] = useState<string>("flower");
    const [goodLuck, setGoodLuck] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const supabase = createClientComponentClient<Database>();
    const [showGrowth, setShowGrowth] = useState<string>("normal");

    // Calculate the current score, max score, and percentage completion
    let [tenDaysPassed, setTenDaysPassed] = useState<boolean>(false);
    let currentScore = habitLogsArray?.length ?? 0;
    let maxScore = habitData?.length ? habitData.length * 10 : 0;
    let percentageDecimal = maxScore ? currentScore / maxScore : 0;


  useEffect(() => {
    async function getUser() {
      const { data: user, error } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser();
  }, [supabase.auth])

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/auth/callback`,
      },
    })
    setUser(res.data.user)
    router.refresh()
    setEmail('')
    setPassword('')
  }

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    const userInfo = {
      id: res.data.user!.id,
      email: res.data.user!.email
    }
    console.log("This is the userInfo:", userInfo)
    // setUser(res.data.user)
    setUser({...userInfo})
    router.refresh()
    setEmail('')
    setPassword('')
    router.push('/')
    console.log(`This is the user data: `, res.data.user)
  }

      // Assuming you are using React functional components
    useEffect(() => {
      // Log the user information when setUser has completed
      console.log(`This is effect user: `, user);
    }, [user]); // This will run the useEffect whenever the 'user' state changes

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    setUser(null)
  }

  console.log({ user})

    function toggleGoodLuck() {
      setGoodLuck(!goodLuck);
    }

    useEffect(() => {
        const getData = async () => {
          const { data, error } = await supabase
            .from("habit_table")
            .select("*")
            .eq("user_id", "1");
          setHabitData(data);
        };
        getData();
      }, [supabase]);

      useEffect(() => {
        // Update isCommitted when habitData changes
        if (habitData !== null) {
          setIsCommitted(habitData.length > 0);
        }
      }, [habitData]);

      useEffect(() => {
        const getHabitLogs = async () => {
          const { data: habitLogs, error: habitLogsError } = await supabase
            .from("habit_log")
            .select("*");
          setHabitLogsArray(habitLogs);
        };
        getHabitLogs();
      }, [supabase]);

      if (habitData) {
        const startDate = new Date(habitData[0]?.created_at);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 10);
        tenDaysPassed = currentDate >= endDate;
      }

    // Function to toggle commitment status
    function toggleIsCommitted() {
        setIsCommitted(!isCommitted);
    };

    function toggleTenDaysPassed() {
      setTenDaysPassed(!tenDaysPassed);
  };

    return (
        <AppContext.Provider value={{
          isCommitted,
          setIsCommitted,
          habitData,
          setHabitData,
          habitLogsArray,
          setHabitLogsArray,
          tenDaysPassed,
          toggleTenDaysPassed,
          toggleIsCommitted,
          activePage,
          setActivePage,
          goodLuck,
          toggleGoodLuck,
          useAppContext,
          showGrowth,
          setShowGrowth,
          email,
          setEmail,
          password,
          setPassword,
          handleSignUp,
          handleSignIn,
          handleSignOut,
          user,
          setUser,
      }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}