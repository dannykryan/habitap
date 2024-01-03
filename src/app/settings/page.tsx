import Prompt from "../../../components/prompt";
import ButtonBar from "../../../components/ButtonBar";
import { useAppContext } from "../context";
import Image from "next/image";
import profilePic from "../../../public/assets/Bumblebee_Man.png"

export default function Settings() {

    // const {
    //     isCommitted,
    //     tenDaysPassed,
    //     currentScore,
    //     maxScore,
    //     percentageDecimal,
    //     activePage,
    //   } = useAppContext();

    return (
        <>
        <Image
          src={profilePic}
          id="profile-pic-large"
          alt="Profile Picture"
          width="100"
        />
        <h2 id="profile-username">bumblebeeMan89</h2>
        <div id="profile-info">
            <p>Bumblebee Man</p>
            <p>bumblebeeMan@aol.com</p>
            <button className="signOutBtn" >
                Sign Out
            </button>
        </div>
        <ButtonBar />
        </>
    );
}