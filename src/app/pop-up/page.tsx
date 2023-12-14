import { useRouter } from "next/router";

function PopUp() {
  function routeToMain() {
    setTimeout(() => {
      let route = useRouter();
      route.push("/");
    }, 3000);
  }
  return <h1 onChange={routeToMain()}>Displaying Data</h1>;
}
