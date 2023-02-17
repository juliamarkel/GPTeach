import React from "react";
import { useState } from "react";
import { ChatView } from "./ChatView";
import { callGPT3 } from "../utils/gpt3.js";
import { Link } from "react-router-dom";
import SplitPane from "react-split-pane";
import "./style/ChatView.css";
import { progressConversation } from "../utils/getStaticData.js";
import { Constants } from "../utils/constants";
import { getCurrentParticipant, saveChat } from "../utils/database";

// Constants
const DEFAULT_HISTORY = [];

export const MultVerChatView = ({
	studentBios,
	context,
	title,
	scenario,
	learningGoals,
	startingPrompt,
	nextLink,
	scenarioNum,
	studentNames,
}) => {
	const Participant = getCurrentParticipant();
	const isBaseline = Participant.isBaseline;

	const [history, setHistory] = useState(DEFAULT_HISTORY);
	const [isQuerying, setIsQuerying] = useState(false);

	const [convoOptions, setConvoOptions] = useState(
		getOptions(progressConversation(scenarioNum, history))
	);

	// compose prompt-- clean up prompt
	const composePrompt = newHistory => {
		let myPrompt = startingPrompt.join("") + "\n";

		newHistory.forEach(
			msg =>
				(myPrompt = myPrompt
					.concat("\n")
					.concat(msg.agent, ": ")
					.concat(msg.text.replace(/[\n]/gm, ""))
					.concat(" <EOM>")
					.concat("\n\n"))
		);

		console.log(myPrompt);

		return myPrompt;
	};

	// add messages / adjust history
	const addWrittenResponse = msgText => {
		// deep copy and push
		let newHistory = [...history];
		newHistory.push({
			agent: "TA",
			text: msgText,
		});

		// compose prompt, clean up and stuff
		const prompt = composePrompt(newHistory);

		// set history to new one, set querying to true because we start
		setHistory(newHistory);
		setIsQuerying(true);

		// GPT3 response
		/*let gpt3Response =*/ callGPT3(prompt, fakeResponse => {
			let responseArray = fakeResponse.split("<EOM>");
			responseArray.forEach((element, i) => {
				element = element.trim(); // this isn't changing the response array
				responseArray[i] = element;
			});

			let fakeAgent = "";
			let studentResponse = "";
			// let hmmAgent = "";
			// Tempfix until I refactor this bit
			/* eslint-disable no-unused-expressions */
			/*let hmmResponse =*/ responseArray.forEach(element => {
				element
					? ((fakeAgent = element
							.substring(0, element.indexOf(":"))
							.replace(/[\n]/gm, "")),
					  fakeAgent.trim(),
					  console.log("fake agent: ", fakeAgent),
					  console.log("element ", element),
					  fakeAgent
							? ((studentResponse = element.replace(
									fakeAgent.concat(": "),
									""
							  )),
							  console.log("hi"),
							  console.log("student response: ", studentResponse),
							  newHistory.push({
									agent: fakeAgent,
									text: studentResponse,
							  }))
							: console.log("no fake agent"))
					: //,
					  // (element == "hmmm") ? (console.log("amazing"), hmmAgent = history.pop()["agent"], newHistory.push({
					  //   agent: hmmAgent,
					  //   text: "Hmmm",
					  // }))
					  // :
					  // console.log("less amazing")
					  // )
					  // ,
					  // (element == "hmmm") ? (hmmAgent = history.pop()["agent"], hmmResponse = callGPT3(prompt + "\n" + hmmAgent +": "), console.log("this is it, we're here", hmmResponse))
					  //   :
					  //   console.log("less amazing")
					  //   )
					  console.log("nothing to see here buddy");
			});
			setHistory(newHistory);
			setIsQuerying(false);
		});
	};

	// in baseline: add the selected response to the history
	const addSelectedResponse = response => {
		// Store updated history
		let newHistory = [...history];
		newHistory.push({
			agent: "TA",
			text: response,
		});
		setHistory(newHistory);

		// Get student response
		setIsQuerying(true);
		const newConvoState = progressConversation(scenarioNum, newHistory);
		setConvoOptions(getOptions(newConvoState));

		// Wait for a bit to match GPT thinking
		setTimeout(() => {
			setIsQuerying(false);
			newHistory.push(newConvoState["studentResponse1"]);
			newHistory.push(newConvoState["studentResponse2"]);
			setHistory(newHistory);
		}, 3 * 1000);
	};

	// undo !! pop pop
	const undoMessage = () => {
		let newHistory = [...history]; // deep copy
		newHistory.pop(); // pop student response
		//newHistory.pop(); // pop teacher response
		setHistory(newHistory);
	};

	// Baseline: set the options the participant can choose from (displayed in random order)
	function getOptions(tree) {
		if (!isBaseline) {
			return;
		}

		return (
			Object.keys(tree)
				.filter(val => {
					return val !== "studentResponse1" && val !== "studentResponse2";
				})
				// Shuffle the order randomly
				.sort(() => {
					return Math.random() - 0.5;
				})
		);
	}

	function canMoveToNextScenario() {
		// Can't advance while waiting for a response
		if (isQuerying) {
			return false;
		}

		if (isBaseline) {
			// There is no more to the conversation
			return convoOptions.length === 0;
		} else {
			// Has sent at least one message
			return history.length !== 0;
		}
	}

	return (
		<>
			<SplitPane split="vertical" defaultSize={550}>
				<div className="square border-end">
					<ContextView
						studentBios={studentBios}
						context={context}
						title={title}
						scenario={scenario}
						learninggoal={learningGoals}
						scenarioNum={scenarioNum}
						nextLink={nextLink}
						clickFunction={() => saveChat(Participant, scenarioNum, history)}
						canMoveToNextScenario={canMoveToNextScenario()}
					/>
				</div>

				<div className="d-flex">
					<div
						className="d-flex flex-column"
						style={{
							height: "100vh",
							maxWidth: "800px",
							width: "100%",
							padding: "15px",
							borderRight: "1px solid lightgray",
							borderLeft: "1px solid lightgray",
						}}
					>
						<h1
							style={{
								paddingTop: "15px",
								textAlign: "center",
							}}
						>
							<span role="img" aria-label="chat bubble">
								💬
							</span>{" "}
							{title}
						</h1>
						<h2
							style={{
								textAlign: "center",
								fontSize: "18px",
								color: "grey",
								fontStyle: "italic",
								margin: "0px",
								padding: "0px",
							}}
						>
							<span style={{ fontWeight: "bold" }}>
								{Constants.NUM_STUDENTS}
							</span>{" "}
							student(s) present: {studentNames.join(", ")}
						</h2>
						<hr />

						<ChatView
							history={history}
							isWaitingOnStudent={isQuerying}
							isBaseline={isBaseline}
							onMessageSend={
								isBaseline ? addSelectedResponse : addWrittenResponse
							}
							undoMessage={undoMessage}
							convoOptions={convoOptions}
						/>
					</div>
				</div>
			</SplitPane>
		</>
	);
};

const ContextView = props => {
	// Create the circles for the progress bar
	let progressDots = [];
	for (let i = 1; i <= Constants.NUM_SCENARIOS; i++) {
		if (i < props.scenarioNum) {
			progressDots.push(
				<div className={"progressDot doneDot"} key={i}>
					<span role="img" aria-label="check">
						✔
					</span>
				</div>
			);
		} else if (i === props.scenarioNum) {
			progressDots.push(
				<div className={"progressDot inProgressDot"} key={i}>
					{i}
				</div>
			);
		} else {
			progressDots.push(
				<div className={"progressDot"} key={i}>
					{i}
				</div>
			);
		}
	}

	return (
		<>
			<div className="d-flex contextView">
				<div
					className="d-flex flex-column"
					style={{
						height: "100vh",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<div style={{ margin: "15px" }}>
						<h2>Session Description</h2>
						<p>
							You're a TA for an introductory computer science course at
							Stanford. You're hosting online office hours.
						</p>
						<p style={{ color: "navy" }}>{props.scenario}</p>

						<h2>Learning Goals</h2>
						<ul style={{ color: "navy" }}>
							{props.learninggoal.map(function(goal, i) {
								return <li key={i}> {goal} </li>;
							})}
						</ul>

						<p className="instructionText">
							When you feel you've achieved the learning goals, move on to the
							next session.
						</p>
						<Link to={props.nextLink}>
							<button
								onClick={props.clickFunction}
								disabled={!props.canMoveToNextScenario}
							>
								{props.scenarioNum >= Constants.NUM_SCENARIOS
									? "Take Post-Test"
									: "Next Session"}
							</button>
						</Link>
					</div>

					{/* Progress Bar */}
					<div>
						<h2 className="text-center">Study Progress</h2>
						<div
							className="d-flex flex-row"
							style={{ justifyContent: "space-around", margin: "20px" }}
						>
							{progressDots.map(dot => {
								return dot;
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
