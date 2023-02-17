import React from "react";
import { useParams } from "react-router-dom";
import { MultVerChatView } from "./MultVerChatView";
import { getStaticData } from "../utils/getStaticData";
import { Constants } from "../utils/constants.js";

export const Scenario = () => {
	const urlParams = useParams();
	const scenarioNum = Number(urlParams["scenarioNum"]);

	let nextLink = "";

	if (scenarioNum >= Constants.NUM_SCENARIOS) {
		nextLink = "/posttest";
	} else {
		nextLink = `/${scenarioNum + 1}`;
	}

	const staticData = getStaticData(scenarioNum);

	return (
		<MultVerChatView
			// Passing the URL as the key ensures the Scenario component re-renders when the URL changes (i.e., clicking next)
			key={window.location.pathname}
			studentBios={staticData.studentBios}
			context={staticData.context}
			title={staticData.title}
			scenario={staticData.scenario}
			learningGoals={staticData.learningGoals}
			startingPrompt={staticData.startingPrompt}
			nextLink={nextLink}
			scenarioNum={scenarioNum}
			studentNames={staticData.studentNames}
		/>
	);
};
