import React from 'react'
import { useEffect, useRef, useState } from "react";

export const InputField = ({ disabled, onSend, undoMessage }) => {
  const [myMsg, setMyMsg] = useState("");

  const inputRef = useRef(null);

  // submit TA message
  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(myMsg);
    setMyMsg("");
    inputRef.current.focus();
  };

  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleKeypress = (event) => {
    setMyMsg(event.target.value);

    // Enter submits the form
    if (event.nativeEvent.inputType === "insertLineBreak") {
      handleSubmit(event);
    }
  };

  return (
    <>
      <div className="d-flex">
        <button disabled={disabled} onClick={undoMessage}>
          Undo
        </button>

        <form
          id="msg-form"
          style={{ display: "flex", width: "100%" }}
          onSubmit={handleSubmit}
        >
          <textarea
            disabled={disabled}
            value={myMsg}
            style={{ flexGrow: "2" }}
            onChange={handleKeypress}
            autoFocus={true}
            ref={inputRef}
          />

          <input disabled={disabled} type="submit" value="Send" />
        </form>
      </div>
    </>
  );
};
