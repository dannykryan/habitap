import { useAppContext } from "../context";

export default function Prompt() {

  const {
    isCommitted,
    tenDaysPassed,
    activePage,
    habitData,
    habitLogsArray,
  } = useAppContext();

  let currentScore = habitLogsArray?.length ?? 0;
  let maxScore = habitData?.length ? habitData.length * 10 : 0;
  let percentageDecimal = maxScore ? currentScore / maxScore : 0;

  let promptMessage = "";

  if (!isCommitted && activePage === "list") {
    promptMessage = "Commit to completing up to 5 daily habits below:";
  } else if (!isCommitted) {
    promptMessage = "Welcome back, let's build some great habits!";
  } else if (activePage === "flower" && isCommitted && !tenDaysPassed) {
    if (percentageDecimal === 0) {
      promptMessage = "It's early days! Let's get started on your habits.";
    } else if (percentageDecimal < 0.1) {
      promptMessage = "Keep it up. You'll soon have a flower!";
    } else if (percentageDecimal < 0.2) {
      promptMessage = "What a beautiful little flower. Well done!";
    } else if (percentageDecimal < 0.3) {
      promptMessage = "Look at those two lovely flowers!";
    } else if (percentageDecimal < 0.4) {
      promptMessage = "You're really getting the hang of this!";
    } else if (percentageDecimal < 0.5) {
      promptMessage = "That's quite the little garden!";
    } else if (percentageDecimal < 0.7) {
      promptMessage = "Now that's a garden to be proud of!";
    } else if (percentageDecimal < 0.8) {
      promptMessage = "You got a bee! He's beautiful!";
    } else if (percentageDecimal < 0.9) {
      promptMessage = "Two whole bees! You're doing great!";
    } else if (percentageDecimal < 1) {
      promptMessage = "Three bees? Yes please! You're a pro!";
    } else {
      promptMessage = "Holy moley! You're a habit master";
    }
  } else if (activePage === "hive") {
    promptMessage = "funkapotamus is doing great!";
  } else if (activePage === "settings") {
    promptMessage = "Change your personal details below:";
  } else if (isCommitted && tenDaysPassed) {
    if (percentageDecimal === 1) {
      promptMessage = "Congratulations on a perfect score!";
    } else if (percentageDecimal > 0.7) {
      promptMessage = "Your hard work has pleased the bees!";
    } else if (percentageDecimal > 0.5) {
      promptMessage = "You made significant progress.";
    } else {
      promptMessage = "Come back stronger next time.";
    }
  } else {
    promptMessage = "What do you want to do today?";
  }
  
  return <p id="prompt">{promptMessage}</p>;
}
