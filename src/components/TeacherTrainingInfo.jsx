import React from "react";
import { Link } from "react-router-dom";
import "./style/TextPage.css";
import { setUpNewParticipant } from "../utils/database";

export const TeacherTrainingInfo = () => {
	setUpNewParticipant();

	return (
		<>
			<div className="d-flex flex-column">
				<div className="textPage">
					<h1 style={{textAlign:"center"}}>Welcome to our Teacher Training Study!</h1>
					<p>Your task is to go through this interactive TA training tool, responding to the best of your abilities. This isn’t a test but rather a chance for you to get practice teaching. <b>You will go through 2 teaching sessions, with 2 students in each, where you will assume the role of a TA in office hours. Your job is to interact with the students + make notice of the learning goals.</b> Once you feel you’ve reached the end of a session, you may move on to the next.  Please note: you may not go back to any previous ones. </p>
					<p><i> By pressing next and moving onto the study you are consenting to having your anonymous interaction transcript recorded for confidential research purposes. </i></p>
					<Link to="/1">
						<button style={{ marginTop: "50px" }}>Next</button>
					</Link>
				</div>
			</div>
		</>
	);
};
