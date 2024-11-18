import { useState } from "react";

export default function PopupApp() {
  const [status, setStatus] = useState<string>("");

  return (
    <div>
      <button onClick={handleClick}>
        Perform Action
      </button>
      <div>{status}</div>
    </div>
  );
}
