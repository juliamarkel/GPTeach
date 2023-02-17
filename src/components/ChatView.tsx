import React, { useEffect } from "react";
import { HistoryView } from "./HistoryView.js";
import { InputField } from "./InputField.js";

interface HistoryItem {
  agent: string;
  text: string;
}

type History = Array<HistoryItem>;

interface Props {
  history: History;
  isWaitingOnStudent: boolean;
  isBaseline: boolean;
  convoOptions: Array<string>;
  onMessageSend: (msg: string) => void;
  undoMessage: () => void;
}

export const ChatView = ({
  history,
  isWaitingOnStudent,
  isBaseline,
  onMessageSend,
  undoMessage,
  convoOptions
}: Props) => {
  const messagesEndRef = React.createRef<HTMLDivElement>();

  // Scroll to the bottom on every render
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <>
      <div
        style={{
          flexGrow: "2",
          overflow: "auto",
          scrollSnapAlign: "end",
          marginBottom: "1em"
        }}
      >
        <HistoryView
          history={history}
          shouldShowTempBubble={isWaitingOnStudent}
        />
        {/* Dummy div at end that we scroll to */}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{ alignSelf: "center", width: "100%", paddingBottom: "10px" }}
      >
        {isBaseline ? (
          <div
            className="d-flex flex-row"
            style={{ justifyContent: "space-between", marginBottom: "1em" }}
          >
            {!isWaitingOnStudent && (
              <>
                {convoOptions.map((text, i) => {
                  return (
                    <ChatOptionBubble
                      onClick={onMessageSend}
                      text={text}
                      key={i}
                    />
                  );
                })}
              </>
            )}
          </div>
        ) : (
          <InputField
            onSend={onMessageSend}
            undoMessage={undoMessage}
            disabled={isWaitingOnStudent}
          />
        )}
      </div>
    </>
  );
};

function ChatOptionBubble(props) {
  return (
    <div className="chatOptionBubble" onClick={() => props.onClick(props.text)}>
      {props["text"]}
    </div>
  );
}
