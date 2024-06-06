import { CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";

function Loading() {
  const override: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return <BounceLoader color={"#29b6f6"} cssOverride={override} size={50} />;
}

export default Loading;
