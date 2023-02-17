import React from "react";

export const HistoryView = ({ history, shouldShowTempBubble }) => {
	console.log("history: ", history);

	return (
		<>
			<div className="d-flex flex-column">
				{history.map((msg, i) => {
					return <MessageView i={i} msg={msg} key={i} />;
				})}

				{shouldShowTempBubble && (
					<div className="chatBubbleContainer">
						<div
							className="chatBubble chatBubbleOther"
							style={{ maxWidth: "10vw", textAlign: "center" }}
						>
							{/* Source: https://tenor.com/view/discord-loading-dots-discord-loading-loading-dots-gif-23479300 */}
							<img
								src="https://media.tenor.com/NqKNFHSmbssAAAAi/discord-loading-dots-discord-loading.gif"
								style={{ width: "20%" }}
								alt="loading..."
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

const MessageView = ({ i, msg }) => {
	let className = "chatBubble";
	const isOther = msg.agent !== "TA";

	if (isOther) {
		className += " chatBubbleOther";
	} else {
		className += " chatBubbleUser";
	}

	return (
		<div className="chatBubbleContainer">
			{isOther ? (
				<div className="chatBubbleSenderLabel">{msg.agent}</div>
			) : null}
			<div className={className} key={(i += "t")}>
				{msg.text}
			</div>
		</div>
	);
};
