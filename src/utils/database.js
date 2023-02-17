import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, setDoc } from "firebase/firestore";
import { uuidv4 } from "lib0/random";
import { selectPersonas, selectStudents } from "./getStaticData";
import { Constants } from "./constants";

// This is the CIP key
firebase.initializeApp({
	apiKey: process.env.REACT_APP_FB_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const DATABASE = firebase.firestore();
const TOP_LEVEL_DB_NAME = "teacher_training_deployment";

// sessionStorage is similar to localStorage; the difference is that while data in localStorage doesn't expire, data in sessionStorage is cleared when the page session ends.

// Generate new uuid, choose all the names and personas for the entire trial, and save to Storage and Firebase
export function setUpNewParticipant() {
	const uuid = uuidv4();

	// TODO: remove baseline stuff
	// Assign randomly to baseline or experimental tool
	//const isBaseline = Math.random() > 0.5;
	const isBaseline = false;
	// Print for development purposes
	console.log(`isBaseline: ${isBaseline}`);

	const students = selectStudents(
		Constants.NUM_STUDENTS * Constants.NUM_SCENARIOS
	);
	const personas = selectPersonas(
		Constants.NUM_STUDENTS * Constants.NUM_SCENARIOS,
		students
	);

	const Participant = { uuid, studentNames: students, personas, isBaseline };

	// Save the Participant to Storage
	sessionStorage.setItem("Participant", JSON.stringify(Participant));

	// Save Participant to Firebase
	setDoc(doc(DATABASE, TOP_LEVEL_DB_NAME, Participant.uuid), {
		studentNames: Participant.studentNames,
		personas: personas,
		isBaseline: isBaseline,
	});

	console.log("Participant created!");
	console.log("uuid: " + uuid);

	return Participant;
}

// Check if we have it in Storage, otherwise get from Firebase
export function getCurrentParticipant() {
	const fromStorage = JSON.parse(sessionStorage.getItem("Participant"));

	if (fromStorage) {
		// console.log("Participant retrieved from Storage!");
		return fromStorage;
	} else {
		// TODO: get from DB
		console.log("Participant NOT retrieved from database...");
		return {};
	}
}

// Save every message from the chat
export function saveChat(Participant, scenarioNum, history) {
	// Store history
	for (let i = 0; i < history.length; i++) {
		setDoc(
			doc(
				DATABASE,
				TOP_LEVEL_DB_NAME,
				Participant.uuid,
				"scenario" + scenarioNum,
				// Add leading 0 so alphabetical order is also numerical
				"message" + i.toString().padStart(5, "0")
			),
			{ ...history[i], timestamp: new Date().valueOf() }
		);
	}
	console.log("Chat saved to database!");
}
