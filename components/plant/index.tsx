import { useState, useEffect } from "react";
import tallFlower from "../../public/plants/flower-bunch-dark.json";
import Lottie from "lottie-react";

interface Plant {
  speed: number;
  loop: boolean | number;
  autoplay: boolean;
  animationData: any;
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

export default function Plant({ score }: any) {
  // State to manage animation options
  const [defaultOptions, setDefaultOptions] = useState<Plant>({
    speed: 2,
    loop: false,
    autoplay: true,
    animationData: tallFlower,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  // Effect to update animation options when the score changes
  useEffect(() => {
    // Initial frame values
    let startFrame = tallFlower.ip; //in-point or first frame of animation
    let endFrame = tallFlower.op;   //out-point or last frame of animation

    // Determine the frame range based on the score
    if (score === 0) {
      endFrame /= 9;
    } else if (score == 1) {
      endFrame /= 1.6;
    } else if (score >= 2) {
      endFrame /= 1;
    }

    // Update the state with the new frame range
    setDefaultOptions((prevOptions) => ({
      ...prevOptions,
      animationData: {
        ...prevOptions.animationData,
        ip: startFrame,
        op: endFrame,
      },
    }));
  }, [score]);

  return (
    <>
      <Lottie
        className={"plant-main"}
        animationData={defaultOptions.animationData}
        loop={defaultOptions.loop}
        autoplay={defaultOptions.autoplay}
        rendererSettings={defaultOptions.rendererSettings}
        height={400}
        width={400}
      />
    </>
  );
}
