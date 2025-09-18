"use client"
import { createContext, useState, useContext, useEffect } from 'react';
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
    const [showGrowth, setShowGrowth] = useState<string>("normal");
    const [supabaseClient, setSupabaseClient] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);

    console.log('Environment URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Environment Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...');

    // Calculate the current score, max score, and percentage completion
    let [tenDaysPassed, setTenDaysPassed] = useState<boolean>(false);
    let currentScore = habitLogsArray?.length ?? 0;
    let maxScore = habitData?.length ? habitData.length * 10 : 0;
    let percentageDecimal = maxScore ? currentScore / maxScore : 0;

    // Initialize client-side only
    useEffect(() => {
      setIsClient(true);
    }, []);

    // Initialize Supabase client only after we're sure we're on the client
    useEffect(() => {
      if (!isClient) return;
      
      const client = createClientComponentClient<Database>();
      setSupabaseClient(client);
    }, [isClient]);

  useEffect(() => {
    if (!supabaseClient || !isClient) return;
    
    async function getUser() {
      const { data: user, error } = await supabaseClient.auth.getUser()
      setUser(user)
    }
    getUser();
  }, [supabaseClient, isClient])

  const handleSignUp = async () => {
    if (!supabaseClient || !isClient) return;
    
    const res = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/auth/callback`,
      },
    })

    console.log('SignUp response:', res);
    if (res.error) {
      console.error('SignUp error:', res.error);
    }


    setUser(res.data.user)
    router.refresh()
    setEmail('')
    setPassword('')
  }

  const handleSignIn = async () => {
    if (!supabaseClient || !isClient) return;
    
    const res = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })
    const userInfo = {
      id: res.data.user?.id,
      email: res.data.user?.email
    }
    console.log("This is the userInfo:", userInfo)
    setUser({...userInfo})
    router.refresh()
    setEmail('')
    setPassword('')
    router.push('/list')
    console.log(`This is the user data: `, res.data.user)
  }

    useEffect(() => {
      console.log(`This is effect user: `, user);
    }, [user]);

  const handleSignOut = async () => {
    if (!supabaseClient || !isClient) return;
    
    await supabaseClient.auth.signOut()
    router.refresh()
    setUser(null)
  }

  console.log({ user})

    function toggleGoodLuck() {
      setGoodLuck(!goodLuck);
    }

    useEffect(() => {
        if (!supabaseClient || !user?.id || !isClient) return;
        
        const getData = async () => {
          const { data, error } = await supabaseClient
            .from("habit_table")
            .select("*")
            .eq("user_id", user?.id);
          setHabitData(data);
        };
        getData();
      }, [supabaseClient, user, isClient]);

      useEffect(() => {
        if (habitData !== null) {
          setIsCommitted(habitData.length > 0);
        }
      }, [habitData]);

      useEffect(() => {
        if (!supabaseClient || !user?.id || !isClient) return;
        
        const getHabitLogs = async () => {
          const { data: habitLogs, error: habitLogsError } = await supabaseClient
            .from("habit_log")
            .select("*")
            .eq("user_id", user?.id);
          setHabitLogsArray(habitLogs);
        };
        getHabitLogs();
      }, [supabaseClient, user, isClient]);

      if (habitData) {
        const startDate = new Date(habitData[0]?.created_at);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 10);
        tenDaysPassed = currentDate >= endDate;
      }

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