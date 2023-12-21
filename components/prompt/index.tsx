import { PromptProps } from "../../types/types";

export default function Prompt({ tenDaysPassed, isCommitted, maxScore, currentScore, percentageDecimal }: PromptProps)
{

  let promptMessage = "";

  if (!isCommitted) {
    promptMessage = "Hey John, let's build some great habits!";
  } else if (isCommitted && !tenDaysPassed) {
    if (percentageDecimal === 0) {
      promptMessage = "Welcome back! Let's get started on your habits.";
    } else if (percentageDecimal < 0.1) {
      promptMessage = "Keep it up. You'll soon have a flower!";
    } else if (percentageDecimal < 0.2) {
      promptMessage = "What a beautiful little flower. Well done!";
    } else if (percentageDecimal < 0.3) {
      promptMessage = "Look at those two lovely flowers!";
    } else if (percentageDecimal < 0.4) {
      promptMessage = "You're really getting the hang of this!";
    } else if (percentageDecimal < 0.5) {
      promptMessage = "You've managed to grow quite the little garden!";
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
  } else if (isCommitted && tenDaysPassed) {
    if (percentageDecimal === 1) {
      promptMessage = "Congratulations on a perfect score! What a busy bee you are!";
    } else if (percentageDecimal <= 0.7) {
      promptMessage = "Fantastic job! Your hard work has pleased the bees!";
    } else if (percentageDecimal > 0.5) {
      promptMessage = "Fantastic job! You made significant progress. Keep pushing!";
    } else {
      promptMessage = "Game over! Reflect on your progress and come back stronger.";
    }
  } else {
    promptMessage = "What do you want to do today?";
  }

  return <p id="prompt">{promptMessage}</p>;
}