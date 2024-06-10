import { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";

function Loading() {
  const override: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    zIndex: 600,
  };

  return (
    <div style={override}>
      <SyncLoader
        color={"#29b6f6"}
        size={10}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </div>
  );
}

export default Loading;
