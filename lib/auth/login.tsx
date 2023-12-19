// import "./index.css";
// import { useState, useEffect } from "react";
// import { Session } from "@supabase/supabase-js";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import supabase from "../initSupabase";

// //const supabase: SupabaseClient = createClient('https://<project>.supabase.co', '<your-anon-key>')

// export default function Login() {
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   if (!session) {
//     return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
//   } else {
//     return <div>Logged in!</div>;
//   }
// }

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import MainPage from "./MainPage";

const App = () => {
  return (
    <BrowserRouter initialEntries={["/authentication"]}>
      <Switch>
        <Route path="/authentication" component={AuthenticationPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
