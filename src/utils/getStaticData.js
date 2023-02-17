import {
	makeListOfNouns,
	shuffleArray,
	toTitleCase,
} from "./primitiveManipulation";
import { Constants } from "./constants";
import { getCurrentParticipant } from "./database";

/* ###################################### Data ##################################### */

const studentPool = [
	{
		name: "Cody",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Emily",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Mariana",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Jia",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Scott",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Heidi",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Stephanie",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Michael",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Claire",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Rishi",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Ayisha",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "DeAndre",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Lakisha",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Ronny",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Jordy",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Winnie",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Alejandra",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Luca",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Jian",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Steven",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Brenda",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
	{
		name: "Seth",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Hunter",
		subjectPronoun: "he",
		objectPronoun: "him",
		possessivePronoun: "his",
	},
	{
		name: "Riya",
		subjectPronoun: "she",
		objectPronoun: "her",
		possessivePronoun: "her",
	},
];

// This holds the functions for generating the scenario text
// These are ordered (index 0 = scenario 1, etc)
const scenarioGenerators = [
	() => {
		return {
			assignment: `The assignment this week is on for loops.`,
			keywords: ["for loops"],
		};
	},
	() => {
		return {
			assignment: `The students have a question regarding how the following line works: new_string = input_string[:-1]`,
			keywords: ["splice string"],
		};
	},
	() => {
		return {
			assignment: `The assignment this week is on while loops.`,
			keywords: ["while loops"],
		};
	},
	() => {
		return {
			assignment: `They have a question regarding how the following line works: new_string = input_string[:-1]`,
			keywords: ["splice string"],
		};
	},
	() => {
		return {
			assignment: `The students are confused about order of operations in Python.`,
			keywords: ["Python order of operations"],
		};
	},
	() => {
		return {
			assignment: `The lecture this week talked about decomposition and separating functions.`,
			keywords: ["function decomposition"],
		};
	},
	() => {
		return {
			assignment: `The assignment this week involves dictionaries and various different use cases.`,
			keywords: ["Python dictionaries", "use cases"],
		};
	},
];

// This holds all the functions for generating the text for a persona
const personaGenerators = [
	// persona 1
	student => {
		const studentBio =
			student.name +
			" is a first year computer science student at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is currently taking an introductory computer science class, for the second time, since " +
			student.subjectPronoun +
			" failed the first time. " +
			toTitleCase(student.subjectPronoun) +
			" is extremely panicked, worried, and confused about the class given " +
			student.objectPronoun +
			" failure in the previous quarter. " +
			toTitleCase(student.possesivePronoun) +
			" mindset going into office hours is apprehensive and concerned.";

		return { studentBio, keywords: ["worried", "panicked", "apprehensive"] };
	},
	// persona 2
	student => {
		const studentBio =
			student.name +
			" is a second year political science student at Stanford. " +
			student.subjectPronoun +
			" is taking an introductory computer science course for the first time and is super stoked. " +
			toTitleCase(student.subjectPronoun) +
			" is enthusiastic and motivated, but can be a bit over-confident and self-centered sometimes. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is excited, confident, and boisterous.";

		return {
			studentBio,
			keywords: ["enthusiastic", "overconfident", "boisterous"],
		};
	},
	// persona 3
	student => {
		const studentBio =
			student.name +
			" is a first year computer science student at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time, and is very shy about it. " +
			toTitleCase(student.subjectPronoun) +
			" is a hard worker, but is nervous and not much of a talker. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is very timid and reserved. ";

		return {
			studentBio,
			keywords: ["shy", "timid", "reserved", "hard-working"],
		};
	},
	// persona 4
	student => {
		const studentBio =
			student.name +
			" is a freshman undergraduate student studying Computer Science at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time and is motivated to learn but also quite confused by the material. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is optimistic and determined to understand the material.";

		return {
			studentBio,
			keywords: ["motivated", "confused", "determined"],
		};
	},
	// persona 5
	student => {
		const studentBio =
			student.name +
			" is a sophomore undergraduate student studying Computer Science at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time and is apathetic towards the subject. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is helpless and not expecting much help from the TA.";

		return { studentBio, keywords: ["apathetic", "helpless", "pessimistic"] };
	},
	// persona 6
	student => {
		const studentBio =
			student.name +
			" is a junior undergraduate student studying computer science at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time and is enthusiastic about the subject. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is optimistic and excited to get additional help.";

		return { studentBio, keywords: ["enthusiastic", "optimistic", "eager"] };
	},
	// persona 7
	student => {
		const studentBio =
			student.name +
			" is a senior undergraduate student studying philosophy at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time and is angry that " +
			student.subjectPronoun +
			" has not taken it earlier. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is determined to catch up on missed material.";

		return {
			studentBio,
			keyword: ["angry", "catching up", "philosophy major"],
		};
	},
	// persona 8
	student => {
		const studentBio =
			student.name +
			" is a sophomore undergraduate student studying civil engineering at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time. " +
			toTitleCase(student.subjectPronoun) +
			" is very motivated and excited to be taking the class, but also very competitive– always wanting to be right and better than other students. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is to show the TA he knows everything and is better than the other students.";

		return {
			studentBio,
			keyword: ["motivated", "competitive", "wants to be right"],
		};
	},
	// persona 9
	student => {
		const studentBio =
			student.name +
			" is a freshman undergraduate student studying computer science at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time. " +
			toTitleCase(student.subjectPronoun) +
			" is super interested in the content, but has no idea where to begin the first assignment. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is eager to learn more, but worried that the first assignment will be too difficult.";

		return {
			studentBio,
			keywords: ["eager but worried about difficulty", "interested"],
		};
	},
	// persona 10
	student => {
		const studentBio =
			student.name +
			" is a sophomore undergraduate student studying Mechanical Engineering at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time. " +
			toTitleCase(student.subjectPronoun) +
			" is unmotivated, as " +
			student.subjectPronoun +
			" is only taking the class to fulfill a requirement, and is frustrated by the first assignment. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is to finish th assignment as fast as possible.";

		return {
			studentBio,
			keywords: ["unmotivated", "frustrated", "finish assignment fast"],
		};
	},
	// persona 11
	student => {
		const studentBio =
			student.name +
			" is a first year undergraduate student studying Computer Science at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time and is intimidated and skeptical. " +
			toTitleCase(student.subjectPronoun) +
			" doesn’t know if " +
			student.subjectPronoun +
			" is cut out for this major and is a bit afraid and apprehensive of the other students as well as the assignments. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is to resolve some of the uneasy feelings " +
			student.subjectPronoun +
			" has toward the class and the major";

		return { studentBio, keywords: ["intimidated", "skeptical", "uneasy"] };
	},
	// persona 12
	student => {
		const studentBio =
			student.name +
			" is a first year undergraduate student studying Computer Science at Stanford " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time. " +
			toTitleCase(student.subjectPronoun) +
			" is overly enthusiastic and not focused on the scope of the class; " +
			student.subjectPronoun +
			" is excited about artificial intelligence and wants to make an AI startup. " +
			toTitleCase(student.possessivePronoun) +
			"  mindset going into office hours is to avoid the actual assignment and derail the conversation to talk more about AI startups. ";

		return {
			studentBio,
			keywords: [
				"overly enthusiastic",
				"obsessed with AI startups",
				"out of scope",
			],
		};
	},
	// persona 13
	student => {
		const studentBio =
			student.name +
			" is a first year undergraduate student studying Computer Science at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time. " +
			toTitleCase(student.subjectPronoun) +
			" is passionate about using technology to change the world, and takes learning the material very seriously. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is to be conscientious and find thoughtful solutions to the questions at hand. ";

		return {
			studentBio,
			keywords: ["passionate", "serious", "eager to have deep understanding"],
		};
	},
	// persona 14
	student => {
		const studentBio =
			student.name +
			" is a junior undergraduate student studying Mechanical Engineering at Stanford. " +
			toTitleCase(student.subjectPronoun) +
			" is taking an introductory computer science course for the first time, but already knows how to program from prior experiences. " +
			toTitleCase(student.subjectPronoun) +
			" is only taking the course in order to easily boost " +
			student.possessivePronoun +
			" GPA with this course. " +
			toTitleCase(student.possessivePronoun) +
			" mindset going into office hours is to show off " +
			student.possessivePronoun +
			" innovative solutions to the TA.";

		return {
			studentBio,
			keywords: [
				"wants to boost GPA",
				"wants to show off to TA",
				"knows coding",
			],
		};
	},
];

// This holds the baseline options
function getConversationTree(scenarioNum, studentNames) {
	let tempConvoTree;

	switch (scenarioNum) {
		case 1:
			tempConvoTree = {
				"Hi you two, welcome! What brings you to office hours today?": {
					studentResponse1: {
						agent: studentNames[0],
						text: "Hi, I had a question about for loops, I'm a bit confused.",
					},
					studentResponse2: {
						agent: studentNames[1],
						text:
							"Hello! I also had a question about for loops. I'm having some trouble.",
					},
					"For loops are pretty simple! They're used when you want to loop over a sequence of items.": {
						studentResponse1: {
							agent: studentNames[0],
							text: "Okay… that makes sense!",
						},
						studentResponse2: {
							agent: studentNames[1],
							text: "Hm alright, I think I get it.",
						},
						"Any other questions?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Good! Let me know if there’s anything else I can help with.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Great – can you each give me an example of when you’d want to use a for loop?": {
							studentResponse1: {
								agent: studentNames[0],
								text:
									"We could use a for loop to find the sum of all the numbers in a list?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text:
									"We could also use a for loop to print all the squares from 1-10?",
							},
						},
					},
					"No worries! Do you have any specific questions about for loops?": {
						studentResponse1: {
							agent: studentNames[0],
							text: "No, I just wanted to know more.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Same– I didn’t have any specific questions but was just confused.",
						},
						"They’re used when you want to loop over a sequence of items. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay. Like a list?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"For loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
						"For loops are used to iterate over a defined number of items. An example of this is if you wanted to loop through a list of five numbers to find the sum. You could use the for loop to iterate through all five numbers and add them to a sum variable. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks.",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example!",
							},
						},
					},
					"Let’s go through it together– can you tell me what you already know about for loops?": {
						studentResponse1: {
							agent: studentNames[0],
							text:
								"I know they’re used to loop over sequences of items and you can loop through lists.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Yeah, I know the same + I know the syntax for them is something like for i in range(10): and then you write more stuff.",
						},
						"They’re used when you want to loop over a sequence of items. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay. Like a list?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"For loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
						"For loops are used to iterate over a defined number of items. An example of this is if you wanted to loop through a list of five numbers to find the sum. You could use the for loop to iterate through all five numbers and add them to a sum variable. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks.",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example!",
							},
						},
					},
				},
				"Hello!": {
					studentResponse1: {
						agent: studentNames[0],
						text: "Hi, I have a question about this week’s assignment.",
					},
					studentResponse2: {
						agent: studentNames[1],
						text: "Hey, I also have a question about this week’s assignment.",
					},
					"For loops are pretty simple! They’re used when you want to loop over a sequence of items.": {
						studentResponse1: {
							agent: studentNames[0],
							text: "Okay… that makes sense!",
						},
						studentResponse2: {
							agent: studentNames[1],
							text: "Hm alright, I think I get it.",
						},
						"Any other questions?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Good! Let me know if there’s anything else I can help with.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Great– can you each give me an example of when you’d want to use a for loop?": {
							studentResponse1: {
								agent: studentNames[0],
								text:
									"We could use a for loop to find the sum of all the numbers in a list?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text:
									"We could also use a for loop to print all the squares from 1-10?",
							},
						},
					},
					"No worries! Do you have any specific questions about for loops?": {
						studentResponse1: {
							agent: studentNames[0],
							text: "No, I just wanted to know more.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Same– I didn’t have any specific questions but was just confused.",
						},
						"They’re used when you want to loop over a sequence of items.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay. Like a list?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"For loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
						"For loops are used to iterate over a defined number of items. An example of this is if you wanted to loop through a list of five numbers to find the sum. You could use the for loop to iterate through all five numbers and add them to a sum variable. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks.",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example.",
							},
						},
					},
					"Let’s go through it together– can you tell me what you already know about for loops?": {
						studentResponse1: {
							agent: studentNames[0],
							text:
								"I know they’re used to loop over sequences of items and you can loop through lists.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Yeah, I know the same and I know the syntax for them is something like for i in range(10): and then you write more stuff.",
						},
						"They’re used when you want to loop over a sequence of items.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay. Like a list?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"For loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
						"For loops are used to iterate over a defined number of items. An example of this is if you wanted to loop through a list of five numbers to find the sum. You could use the for loop to iterate through all five numbers and add them to a sum variable. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks.",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example.",
							},
						},
					},
				},
				"What do you guys need help with today?": {
					studentResponse1: {
						agent: studentNames[0],
						text: "I’m having trouble with for loops.",
					},
					studentResponse2: {
						agent: studentNames[1],
						text: "I also have some questions about for loops.",
					},
					"For loops are pretty simple! They’re used when you want to loop over a sequence of items.": {
						studentResponse1: {
							agent: studentNames[0],
							text: "Okay… that makes sense!",
						},
						studentResponse2: {
							agent: studentNames[1],
							text: "Hm alright, I think I get it.",
						},
						"Any other questions?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Good! Let me know if there’s anything else I can help with.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Great– can you each give me an example of when you’d want to use a for loop?": {
							studentResponse1: {
								agent: studentNames[0],
								text:
									"We could use a for loop to find the sum of all the numbers in a list?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text:
									"We could also use a for loop to print all the squares from 1-10?",
							},
						},
					},
					"No worries! Do you have any specific questions about for loops?": {
						studentResponse1: {
							agent: studentNames[0],
							text: "No, I just wanted to know more.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Same– I didn’t have any specific questions but was just confused.",
						},
						"They’re used when you want to loop over a sequence of items.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay. Like a list?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"For loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
						"For loops are used to iterate over a defined number of items. An example of this is if you wanted to loop through a list of five numbers to find the sum. You could use the for loop to iterate through all five numbers and add them to a sum variable. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks.",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example.",
							},
						},
					},
					"Let’s go through it together– can you tell me what you already know about for loops?": {
						studentResponse1: {
							agent: studentNames[0],
							text:
								"I know they’re used to loop over sequences of items and you can loop through lists.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Yeah, I know the same and I know the syntax for them is something like for i in range(10): and then you write more stuff.",
						},
						"They’re used when you want to loop over a sequence of items.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay. Like a list?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"For loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
						"For loops are used to iterate over a defined number of items. An example of this is if you wanted to loop through a list of five numbers to find the sum. You could use the for loop to iterate through all five numbers and add them to a sum variable. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks.",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example.",
							},
						},
					},
				},
			};
			break;
		case 2:
		// case 3:
			tempConvoTree = {
				"Hi you two, welcome! What brings you to office hours today?": {
					studentResponse1: {
						agent: studentNames[0],
						text: "Hi, I had a question about string manipulation, I’m a bit confused.",
					},
					studentResponse2: {
						agent: studentNames[1],
						text:
							"Hello! I also had a question about strings. I’m having some trouble.",
					},
					"String manipulations are pretty simple! They can be used to do a lot of things, in this case take off the last letter of the string.": {
						studentResponse1: {
							agent: studentNames[0],
							text: "Okay… that makes sense!",
						},
						studentResponse2: {
							agent: studentNames[1],
							text: "Hm alright, I think I get it.",
						},
						"Any other questions?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Good! Let me know if there’s anything else I can help with.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Great– can you each give me an example of removing the last character of a string?": {
							studentResponse1: {
								agent: studentNames[0],
								text:
									"We could remove the last letter of a string to make a word like ‘hi’ become ‘h’?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text:
									"We could also remove the last letter of a string to make a word like ‘Chris’ become ‘Chri’?",
							},
						},
					},
					"No worries! Do you have any specific questions about string manipulation?": {
						studentResponse1: {
							agent: studentNames[0],
							text: "No, I just wanted to know more.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Same– I didn’t have any specific questions but was just confused.",
						},
						"In this case, the syntax removes the last character of the string. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay, so it takes everything up till the last index?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"There are lots of different things we can do with string manipulation! In this line of code, we’re taking everything up until the last index (-1). Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
						"The line of code is using something called splicing, which is when you take parts of a string apart. An example of this is if you wanted to remove the last character in “hello world” to become “hello worl”. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks.",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example!",
							},
						},
					},
					"Let’s go through it together– can you tell me what you already know about this line of code?": {
						studentResponse1: {
							agent: studentNames[0],
							text:
								"I know that the -1 index accesses the last item in an array.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Yeah, I know the same, so I’m guessing it accesses the last character in a string too?",
						},
						"Exactly! So this line of code takes everything up till the last character. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay. Like “oh” to “o”?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"That’s correct, -1 is the index of the last character in a string or item in a list. This line of code is essentially saying to take everything in the input string except the last character and copy it over into the new string. An example of this is input_string = “Chris” and new_string = “Chri”. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks."
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example!",
							},
						},
						"Yes, the -1 index has lots of uses! In this case it’s being used along with the : notation to say that we want everything from the beginning up until the last index. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
					},
				},
				"Hello!": {
					studentResponse1: {
						agent: studentNames[0],
						text: "Hi, I had a question about string manipulation, I’m a bit confused.",
					},
					studentResponse2: {
						agent: studentNames[1],
						text:
							"Hello! I also had a question about strings. I’m having some trouble.",
					},
					"String manipulations are pretty simple! They can be used to do a lot of things, in this case take off the last letter of the string.": {
						studentResponse1: {
							agent: studentNames[0],
							text: "Okay… that makes sense!",
						},
						studentResponse2: {
							agent: studentNames[1],
							text: "Hm alright, I think I get it.",
						},
						"Any other questions?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Good! Let me know if there’s anything else I can help with.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Great– can you each give me an example of removing the last character of a string?": {
							studentResponse1: {
								agent: studentNames[0],
								text:
									"We could remove the last letter of a string to make a word like ‘hi’ become ‘h’?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text:
									"We could also remove the last letter of a string to make a word like ‘Chris’ become ‘Chri’?",
							},
						},
					},
					"No worries! Do you have any specific questions about string manipulation?": {
						studentResponse1: {
							agent: studentNames[0],
							text: "No, I just wanted to know more.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Same– I didn’t have any specific questions but was just confused.",
						},
						"In this case, the syntax removes the last character of the string. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay, so it takes everything up till the last index?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"There are lots of different things we can do with string manipulation! In this line of code, we’re taking everything up until the last index (-1). Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
						"The line of code is using something called splicing, which is when you take parts of a string apart. An example of this is if you wanted to remove the last character in “hello world” to become “hello worl”. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks.",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example!",
							},
						},
					},
					"Let’s go through it together– can you tell me what you already know about this line of code?": {
						studentResponse1: {
							agent: studentNames[0],
							text:
								"I know that the -1 index accesses the last item in an array.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Yeah, I know the same, so I’m guessing it accesses the last character in a string too?",
						},
						"Exactly! So this line of code takes everything up till the last character. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay. Like “oh” to “o”?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"That’s correct, -1 is the index of the last character in a string or item in a list. This line of code is essentially saying to take everything in the input string except the last character and copy it over into the new string. An example of this is input_string = “Chris” and new_string = “Chri”. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks."
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example!",
							},
						},
						"Yes, the -1 index has lots of uses! In this case it’s being used along with the : notation to say that we want everything from the beginning up until the last index. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
					},
				},
				"What do you guys need help with today?": {
					studentResponse1: {
						agent: studentNames[0],
						text: "Hi, I had a question about string manipulation, I’m a bit confused.",
					},
					studentResponse2: {
						agent: studentNames[1],
						text:
							"Hello! I also had a question about strings. I’m having some trouble.",
					},
					"String manipulations are pretty simple! They can be used to do a lot of things, in this case take off the last letter of the string.": {
						studentResponse1: {
							agent: studentNames[0],
							text: "Okay… that makes sense!",
						},
						studentResponse2: {
							agent: studentNames[1],
							text: "Hm alright, I think I get it.",
						},
						"Any other questions?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Good! Let me know if there’s anything else I can help with.": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Nope, that’s all from me!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That clarifies on my end as well.",
							},
						},
						"Great– can you each give me an example of removing the last character of a string?": {
							studentResponse1: {
								agent: studentNames[0],
								text:
									"We could remove the last letter of a string to make a word like ‘hi’ become ‘h’?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text:
									"We could also remove the last letter of a string to make a word like ‘Chris’ become ‘Chri’?",
							},
						},
					},
					"No worries! Do you have any specific questions about string manipulation?": {
						studentResponse1: {
							agent: studentNames[0],
							text: "No, I just wanted to know more.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Same– I didn’t have any specific questions but was just confused.",
						},
						"In this case, the syntax removes the last character of the string. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay, so it takes everything up till the last index?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"There are lots of different things we can do with string manipulation! In this line of code, we’re taking everything up until the last index (-1). Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
						"The line of code is using something called splicing, which is when you take parts of a string apart. An example of this is if you wanted to remove the last character in “hello world” to become “hello worl”. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks.",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example!",
							},
						},
					},
					"Let’s go through it together– can you tell me what you already know about this line of code?": {
						studentResponse1: {
							agent: studentNames[0],
							text:
								"I know that the -1 index accesses the last item in an array.",
						},
						studentResponse2: {
							agent: studentNames[1],
							text:
								"Yeah, I know the same, so I’m guessing it accesses the last character in a string too?",
						},
						"Exactly! So this line of code takes everything up till the last character. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh… okay. Like “oh” to “o”?",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Yeah, I think so, it makes sense.",
							},
						},
						"That’s correct, -1 is the index of the last character in a string or item in a list. This line of code is essentially saying to take everything in the input string except the last character and copy it over into the new string. An example of this is input_string = “Chris” and new_string = “Chri”. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "That makes sense! Thanks."
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "Thank you for the example!",
							},
						},
						"Yes, the -1 index has lots of uses! In this case it’s being used along with the : notation to say that we want everything from the beginning up until the last index. Does that make sense?": {
							studentResponse1: {
								agent: studentNames[0],
								text: "Oh, thank you! That is very helpful!",
							},
							studentResponse2: {
								agent: studentNames[1],
								text: "That makes way more sense! Thanks.",
							},
						},
					},
				},
			};
			// tempConvoTree = {
			// 	"Hi you two, welcome! What brings you to office hours today?": {
			// 		studentResponse1: {
			// 			agent: studentNames[0],
			// 			text: "I’m having trouble with while loops.",
			// 		},
			// 		studentResponse2: {
			// 			agent: studentNames[1],
			// 			text: "I also have some questions about while loops.",
			// 		},
			// 		"While loops are pretty simple! They’re used when you want to loop over a sequence of items until a certain condition is met.": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "Okay… that makes sense!",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text: "Hm alright, I think I get it.",
			// 			},
			// 			"Any other questions?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That clarifies on my end as well.",
			// 				},
			// 			},
			// 			"Good! Let me know if there’s anything else I can help with.": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That clarifies on my end as well.",
			// 				},
			// 			},
			// 			"Great– can you each give me an example of when you’d want to use a while loop?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text:
			// 						"We could use a while loop to find the sum of all the numbers in a list until a certain value is reached.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Or to keep prompting a user for input until they enter a valid value.",
			// 				},
			// 				"They’re used when you want to loop over a sequence of items until a condition is met. Does that make sense?": {
			// 					studentResponse1: {
			// 						agent: studentNames[0],
			// 						text:
			// 							"Not really. So like a list where you don’t know the end?",
			// 					},
			// 					studentResponse2: {
			// 						agent: studentNames[1],
			// 						text: "Yeah, I think so, it makes sense.",
			// 					},
			// 				},
			// 				"While loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that and we want to do so until the condition is met. Does that make sense?": {
			// 					studentResponse1: {
			// 						agent: studentNames[0],
			// 						text: "Oh, thank you! That is very helpful!",
			// 					},
			// 					studentResponse2: {
			// 						agent: studentNames[1],
			// 						text: "That makes way more sense! Thanks.",
			// 					},
			// 				},
			// 				"While loops are used to iterate over a sequence of items until a condition is met. An example of this is if you wanted to loop through a list of numbers and add them until the sum reached 100. You could use the while loop to iterate through the numbers and keep adding numbers until the sum reached 100. Does that make sense?": {
			// 					studentResponse1: {
			// 						agent: studentNames[0],
			// 						text: "That makes sense! Thanks.",
			// 					},
			// 					studentResponse2: {
			// 						agent: studentNames[1],
			// 						text: "Thank you for the example!",
			// 					},
			// 				},
			// 			},
			// 		},
			// 		"No worries! Do you have any specific questions about while loops?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "Nope! I just need help with how to use them.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text: "I’m just confused.",
			// 			},
			// 			"They’re used when you want to loop over a sequence of items until a condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text:
			// 						"Not really. So like a list where you don’t know the end?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"While loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that and we want to do so until the condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That makes way more sense! Thanks.",
			// 				},
			// 			},
			// 			"While loops are used to iterate over a sequence of items until a condition is met. An example of this is if you wanted to loop through a list of numbers and add them until the sum reached 100. You could use the while loop to iterate through the numbers and keep adding numbers until the sum reached 100. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Thank you for the example!",
			// 				},
			// 			},
			// 		},
			// 		"Let’s go through it together– can you tell me what you already know about while loops?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text:
			// 					"I know they’re used to loop over sequences of items and you can loop through lists.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Yeah, I know the same + I know the syntax for them is something like  “while condition == True”",
			// 			},
			// 			"They’re used when you want to loop over a sequence of items until a condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text:
			// 						"Not really. So like a list where you don’t know the end?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"While loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that and we want to do so until the condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That makes way more sense! Thanks.",
			// 				},
			// 			},
			// 			"While loops are used to iterate over a sequence of items until a condition is met. An example of this is if you wanted to loop through a list of numbers and add them until the sum reached 100. You could use the while loop to iterate through the numbers and keep adding numbers until the sum reached 100. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Thank you for the example!",
			// 				},
			// 			},
			// 		},
			// 	},
			// 	"Hello!": {
			// 		studentResponse1: {
			// 			agent: studentNames[0],
			// 			text: "I have no idea how to start this assignment on while loops.",
			// 		},
			// 		studentResponse2: {
			// 			agent: studentNames[1],
			// 			text: "Same, I have no clue where to start.",
			// 		},
			// 		"While loops are pretty simple! They’re used when you want to loop over a sequence of items until a certain condition is met.": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "Okay… that makes sense!",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text: "Hm alright, I think I get it.",
			// 			},
			// 			"Any other questions?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That clarifies on my end as well.",
			// 				},
			// 			},
			// 			"Good! Let me know if there’s anything else I can help with.": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That clarifies on my end as well.",
			// 				},
			// 			},
			// 			"Great– can you each give me an example of when you’d want to use a while loop?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text:
			// 						"We could use a while loop to find the sum of all the numbers in a list until a certain value is reached?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Or to keep prompting a user for input until they enter a valid value?",
			// 				},
			// 			},
			// 		},
			// 		"No worries! Do you have any specific questions about while loops?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "Nope! I just need help with how to use them.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text: "I’m just confused.",
			// 			},
			// 			"They’re used when you want to loop over a sequence of items until a condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text:
			// 						"Not really. So like a list where you don’t know the end?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"While loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that and we want to do so until the condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That makes way more sense! Thanks.",
			// 				},
			// 			},
			// 			"While loops are used to iterate over a sequence of items until a condition is met. An example of this is if you wanted to loop through a list of numbers and add them until the sum reached 100. You could use the while loop to iterate through the numbers and keep adding numbers until the sum reached 100. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Thank you for the example!",
			// 				},
			// 			},
			// 		},
			// 		"Let’s go through it together– can you tell me what you already know about while loops?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text:
			// 					"I know they’re used to loop over sequences of items and you can loop through lists.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Yeah, I know the same + I know the syntax for them is something like  “while condition == True”",
			// 			},
			// 			"They’re used when you want to loop over a sequence of items until a condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text:
			// 						"Not really. So like a list where you don’t know the end?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"While loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that and we want to do so until the condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That makes way more sense! Thanks.",
			// 				},
			// 			},
			// 			"While loops are used to iterate over a sequence of items until a condition is met. An example of this is if you wanted to loop through a list of numbers and add them until the sum reached 100. You could use the while loop to iterate through the numbers and keep adding numbers until the sum reached 100. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Thank you for the example!",
			// 				},
			// 			},
			// 		},
			// 	},
			// 	"What’s the problem?": {
			// 		studentResponse1: {
			// 			agent: studentNames[0],
			// 			text: "I’m having trouble with while loops.",
			// 		},
			// 		studentResponse2: {
			// 			agent: studentNames[1],
			// 			text: "I also have some questions about while loops.",
			// 		},
			// 		"While loops are pretty simple! They’re used when you want to loop over a sequence of items until a certain condition is met.": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "Okay… that makes sense!",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text: "Hm alright, I think I get it.",
			// 			},
			// 			"Any other questions?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That clarifies on my end as well.",
			// 				},
			// 			},
			// 			"Good! Let me know if there’s anything else I can help with.": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That clarifies on my end as well.",
			// 				},
			// 			},
			// 			"Great– can you each give me an example of when you’d want to use a while loop?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text:
			// 						"We could use a while loop to find the sum of all the numbers in a list until a certain value is reached?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Or to keep prompting a user for input until they enter a valid value?",
			// 				},
			// 			},
			// 		},
			// 		"No worries! Do you have any specific questions about while loops?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "Nope! I just need help with how to use them.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text: "I’m just confused.",
			// 			},
			// 			"They’re used when you want to loop over a sequence of items until a condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text:
			// 						"Not really. So like a list where you don’t know the end?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"While loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that and we want to do so until the condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That makes way more sense! Thanks.",
			// 				},
			// 			},
			// 			"While loops are used to iterate over a sequence of items until a condition is met. An example of this is if you wanted to loop through a list of numbers and add them until the sum reached 100. You could use the while loop to iterate through the numbers and keep adding numbers until the sum reached 100. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Thank you for the example!",
			// 				},
			// 			},
			// 		},
			// 		"Let’s go through it together– can you tell me what you already know about while loops?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text:
			// 					"I know they’re used to loop over sequences of items and you can loop through lists.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Yeah, I know the same + I know the syntax for them is something like  “while condition == True”",
			// 			},
			// 			"They’re used when you want to loop over a sequence of items until a condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text:
			// 						"Not really. So like a list where you don’t know the end?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"While loops have a lot of different uses! Typically they’re used when we want to loop over a sequence of items such as a list, string, a range of numbers, or anything like that and we want to do so until the condition is met. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "That makes way more sense! Thanks.",
			// 				},
			// 			},
			// 			"While loops are used to iterate over a sequence of items until a condition is met. An example of this is if you wanted to loop through a list of numbers and add them until the sum reached 100. You could use the while loop to iterate through the numbers and keep adding numbers until the sum reached 100. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text: "Thank you for the example!",
			// 				},
			// 			},
			// 		},
			// 	},
			// };
			break;
		// case 3:
		// 	tempConvoTree = {
		// 		"Hi you two, welcome! What brings you to office hours today?": {
		// 			studentResponse1: {
		// 				agent: studentNames[0],
		// 				text: "Hi, I had a question about string manipulation, I’m a bit confused.",
		// 			},
		// 			studentResponse2: {
		// 				agent: studentNames[1],
		// 				text:
		// 					"Hello! I also had a question about strings. I’m having some trouble.",
		// 			},
		// 			"String manipulations are pretty simple! They can be used to do a lot of things, in this case take off the last letter of the string.": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "Okay… that makes sense!",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Hm alright, I think I get it.",
		// 				},
		// 				"Any other questions?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Good! Let me know if there’s anything else I can help with.": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Great– can you each give me an example of removing the last character of a string?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text:
		// 							"We could remove the last letter of a string to make a word like ‘hi’ become ‘h’?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text:
		// 							"We could also remove the last letter of a string to make a word like ‘Chris’ become ‘Chri’?",
		// 					},
		// 				},
		// 			},
		// 			"No worries! Do you have any specific questions about string manipulation?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "No, I just wanted to know more.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Same– I didn’t have any specific questions but was just confused.",
		// 				},
		// 				"In this case, the syntax removes the last character of the string. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh… okay, so it takes everything up till the last index?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"There are lots of different things we can do with string manipulation! In this line of code, we’re taking everything up until the last index (-1). Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"The line of code is using something called splicing, which is when you take parts of a string apart. An example of this is if you wanted to remove the last character in “hello world” to become “hello worl”. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 			"Let’s go through it together– can you tell me what you already know about this line of code?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text:
		// 						"I know that the -1 index accesses the last item in an array.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Yeah, I know the same, so I’m guessing it accesses the last character in a string too?",
		// 				},
		// 				"Exactly! So this line of code takes everything up till the last character. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh… okay. Like “oh” to “o”?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"That’s correct, -1 is the index of the last character in a string or item in a list. This line of code is essentially saying to take everything in the input string except the last character and copy it over into the new string. An example of this is input_string = “Chris” and new_string = “Chri”. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks."
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 				"Yes, the -1 index has lots of uses! In this case it’s being used along with the : notation to say that we want everything from the beginning up until the last index. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 			},
		// 		},
		// 		"Hello!": {
		// 			studentResponse1: {
		// 				agent: studentNames[0],
		// 				text: "Hi, I had a question about string manipulation, I’m a bit confused.",
		// 			},
		// 			studentResponse2: {
		// 				agent: studentNames[1],
		// 				text:
		// 					"Hello! I also had a question about strings. I’m having some trouble.",
		// 			},
		// 			"String manipulations are pretty simple! They can be used to do a lot of things, in this case take off the last letter of the string.": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "Okay… that makes sense!",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Hm alright, I think I get it.",
		// 				},
		// 				"Any other questions?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Good! Let me know if there’s anything else I can help with.": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Great– can you each give me an example of removing the last character of a string?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text:
		// 							"We could remove the last letter of a string to make a word like ‘hi’ become ‘h’?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text:
		// 							"We could also remove the last letter of a string to make a word like ‘Chris’ become ‘Chri’?",
		// 					},
		// 				},
		// 			},
		// 			"No worries! Do you have any specific questions about string manipulation?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "No, I just wanted to know more.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Same– I didn’t have any specific questions but was just confused.",
		// 				},
		// 				"In this case, the syntax removes the last character of the string. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh… okay, so it takes everything up till the last index?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"There are lots of different things we can do with string manipulation! In this line of code, we’re taking everything up until the last index (-1). Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"The line of code is using something called splicing, which is when you take parts of a string apart. An example of this is if you wanted to remove the last character in “hello world” to become “hello worl”. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 			"Let’s go through it together– can you tell me what you already know about this line of code?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text:
		// 						"I know that the -1 index accesses the last item in an array.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Yeah, I know the same, so I’m guessing it accesses the last character in a string too?",
		// 				},
		// 				"Exactly! So this line of code takes everything up till the last character. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh… okay. Like “oh” to “o”?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"That’s correct, -1 is the index of the last character in a string or item in a list. This line of code is essentially saying to take everything in the input string except the last character and copy it over into the new string. An example of this is input_string = “Chris” and new_string = “Chri”. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks."
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 				"Yes, the -1 index has lots of uses! In this case it’s being used along with the : notation to say that we want everything from the beginning up until the last index. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 			},
		// 		},
		// 		"What do you guys need help with today?": {
		// 			studentResponse1: {
		// 				agent: studentNames[0],
		// 				text: "Hi, I had a question about string manipulation, I’m a bit confused.",
		// 			},
		// 			studentResponse2: {
		// 				agent: studentNames[1],
		// 				text:
		// 					"Hello! I also had a question about strings. I’m having some trouble.",
		// 			},
		// 			"String manipulations are pretty simple! They can be used to do a lot of things, in this case take off the last letter of the string.": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "Okay… that makes sense!",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Hm alright, I think I get it.",
		// 				},
		// 				"Any other questions?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Good! Let me know if there’s anything else I can help with.": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Great– can you each give me an example of removing the last character of a string?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text:
		// 							"We could remove the last letter of a string to make a word like ‘hi’ become ‘h’?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text:
		// 							"We could also remove the last letter of a string to make a word like ‘Chris’ become ‘Chri’?",
		// 					},
		// 				},
		// 			},
		// 			"No worries! Do you have any specific questions about string manipulation?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "No, I just wanted to know more.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Same– I didn’t have any specific questions but was just confused.",
		// 				},
		// 				"In this case, the syntax removes the last character of the string. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh… okay, so it takes everything up till the last index?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"There are lots of different things we can do with string manipulation! In this line of code, we’re taking everything up until the last index (-1). Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"The line of code is using something called splicing, which is when you take parts of a string apart. An example of this is if you wanted to remove the last character in “hello world” to become “hello worl”. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 			"Let’s go through it together– can you tell me what you already know about this line of code?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text:
		// 						"I know that the -1 index accesses the last item in an array.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Yeah, I know the same, so I’m guessing it accesses the last character in a string too?",
		// 				},
		// 				"Exactly! So this line of code takes everything up till the last character. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh… okay. Like “oh” to “o”?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"That’s correct, -1 is the index of the last character in a string or item in a list. This line of code is essentially saying to take everything in the input string except the last character and copy it over into the new string. An example of this is input_string = “Chris” and new_string = “Chri”. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks."
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 				"Yes, the -1 index has lots of uses! In this case it’s being used along with the : notation to say that we want everything from the beginning up until the last index. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 			},
		// 		},
		// 	};
		// 	break;
		// case 4:
		// 	tempConvoTree = {
		// 		"Hi you two, welcome! What brings you to office hours today?": {
		// 			studentResponse1: {
		// 				agent: studentNames[0],
		// 				text: "Hi, I had a question about order of operations in python, I’m a bit confused.",
		// 			},
		// 			studentResponse2: {
		// 				agent: studentNames[1],
		// 				text:
		// 					"Hello! I also had a question about order of operations in python. I’m having some trouble.",
		// 			},
		// 			"Order of operations in python can be a bit tricky but it’s not too hard to understand. It’s important to remember that parentheses, exponents, multiplication and division, and addition and subtraction are all evaluated in that order.": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "Okay… that makes sense!",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Hm alright, I think I get it.",
		// 				},
		// 				"Any other questions?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Good! Let me know if there’s anything else I can help with.": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Great– can you each give me an example of when you’d need to use order of operations in python?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text:
		// 							"We'd need to use order of operations to calculate the result of (2 + 4) * 3.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text:
		// 							"We’d also need to use order of operations to calculate the result of 4 + 3 * 5.",
		// 					},
		// 				},
		// 			},
		// 			"No worries! Do you have any specific questions about order of operations in python?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "No, I just wanted to know more.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Same– I didn’t have any specific questions but was just confused.",
		// 				},
		// 				"It’s important to remember that parentheses, exponents, multiplication and division, and addition and subtraction are all evaluated in that order. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh… okay, so it's similar to math order of operations?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Order of operations in python has a lot of different uses! Typically you’d use it when you want to guarantee a certain order of evaluation for operations such as multiplication and division, addition and subtraction, by wrapping in parentheses. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"Order of operations in python allows us to control the order in which operations are evaluated. An example of this is if you wanted to calculate the result of (2 + 4) * 3. You could use the order of operations to ensure that the addition is evaluated before the multiplication. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 			"Let’s go through it together– can you tell me what you already know about order of operations in python?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text:
		// 						"I know they’re used to guarantee a certain order of evaluation and you can use parentheses to group operations.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Yeah, I know the same + I know the syntax for it is something like (2 + 4) * 3, and you can use parentheses to group operations.",
		// 				},
		// 				"It’s important to remember that parentheses, exponents, multiplication and division, and addition and subtraction are all evaluated in that order. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, okay. So when in doubt I can use parentheses?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Order of operations in python shows up a lot of times! Typically you’d think of it when you want to guarantee a certain order of evaluation for operations such as multiplication and division, addition and subtraction, and parentheses. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!"
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thank you!",
		// 					},
		// 				},
		// 				"Order of operations in python allows us to know the order in which operations are evaluated. An example of this is if you wanted to calculate the result of 4 + 3 * 5. Knowing the order of operations, you know that the multiplication is evaluated before the addition, so we get 19. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 		},
		// 		"Hello!": {

		// 			studentResponse1: {
		// 				agent: studentNames[0],
		// 				text: "Hi, I had a question about order of operations in python, I’m a bit confused.",
		// 			},
		// 			studentResponse2: {
		// 				agent: studentNames[1],
		// 				text:
		// 					"Hello! I also had a question about order of operations in python. I’m having some trouble.",
		// 			},
		// 			"Order of operations in python can be a bit tricky but it’s not too hard to understand. It’s important to remember that parentheses, exponents, multiplication and division, and addition and subtraction are all evaluated in that order.": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "Okay… that makes sense!",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Hm alright, I think I get it.",
		// 				},
		// 				"Any other questions?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Good! Let me know if there’s anything else I can help with.": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Great– can you each give me an example of when you’d need to use order of operations in python?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text:
		// 							"We'd need to use order of operations to calculate the result of (2 + 4) * 3.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text:
		// 							"We’d also need to use order of operations to calculate the result of 4 + 3 * 5.",
		// 					},
		// 				},
		// 			},
		// 			"No worries! Do you have any specific questions about order of operations in python?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "No, I just wanted to know more.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Same– I didn’t have any specific questions but was just confused.",
		// 				},
		// 				"It’s important to remember that parentheses, exponents, multiplication and division, and addition and subtraction are all evaluated in that order. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh… okay, so it's similar to math order of operations?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Order of operations in python has a lot of different uses! Typically you’d use it when you want to guarantee a certain order of evaluation for operations such as multiplication and division, addition and subtraction, by wrapping in parentheses. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"Order of operations in python allows us to control the order in which operations are evaluated. An example of this is if you wanted to calculate the result of (2 + 4) * 3. You could use the order of operations to ensure that the addition is evaluated before the multiplication. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 			"Let’s go through it together– can you tell me what you already know about order of operations in python?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text:
		// 						"I know they’re used to guarantee a certain order of evaluation and you can use parentheses to group operations.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Yeah, I know the same + I know the syntax for it is something like (2 + 4) * 3, and you can use parentheses to group operations.",
		// 				},
		// 				"It’s important to remember that parentheses, exponents, multiplication and division, and addition and subtraction are all evaluated in that order. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, okay. So when in doubt I can use parentheses?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Order of operations in python shows up a lot of times! Typically you’d think of it when you want to guarantee a certain order of evaluation for operations such as multiplication and division, addition and subtraction, and parentheses. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!"
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thank you!",
		// 					},
		// 				},
		// 				"Order of operations in python allows us to know the order in which operations are evaluated. An example of this is if you wanted to calculate the result of 4 + 3 * 5. Knowing the order of operations, you know that the multiplication is evaluated before the addition, so we get 19. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
				
		// 		},
		// 		"What do you guys need help with today?": {

		// 			studentResponse1: {
		// 				agent: studentNames[0],
		// 				text: "Hi, I had a question about order of operations in python, I’m a bit confused.",
		// 			},
		// 			studentResponse2: {
		// 				agent: studentNames[1],
		// 				text:
		// 					"Hello! I also had a question about order of operations in python. I’m having some trouble.",
		// 			},
		// 			"Order of operations in python can be a bit tricky but it’s not too hard to understand. It’s important to remember that parentheses, exponents, multiplication and division, and addition and subtraction are all evaluated in that order.": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "Okay… that makes sense!",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Hm alright, I think I get it.",
		// 				},
		// 				"Any other questions?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Good! Let me know if there’s anything else I can help with.": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Great– can you each give me an example of when you’d need to use order of operations in python?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text:
		// 							"We'd need to use order of operations to calculate the result of (2 + 4) * 3.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text:
		// 							"We’d also need to use order of operations to calculate the result of 4 + 3 * 5.",
		// 					},
		// 				},
		// 			},
		// 			"No worries! Do you have any specific questions about order of operations in python?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "No, I just wanted to know more.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Same– I didn’t have any specific questions but was just confused.",
		// 				},
		// 				"It’s important to remember that parentheses, exponents, multiplication and division, and addition and subtraction are all evaluated in that order. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh… okay, so it's similar to math order of operations?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Order of operations in python has a lot of different uses! Typically you’d use it when you want to guarantee a certain order of evaluation for operations such as multiplication and division, addition and subtraction, by wrapping in parentheses. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"Order of operations in python allows us to control the order in which operations are evaluated. An example of this is if you wanted to calculate the result of (2 + 4) * 3. You could use the order of operations to ensure that the addition is evaluated before the multiplication. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 			"Let’s go through it together– can you tell me what you already know about order of operations in python?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text:
		// 						"I know they’re used to guarantee a certain order of evaluation and you can use parentheses to group operations.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Yeah, I know the same + I know the syntax for it is something like (2 + 4) * 3, and you can use parentheses to group operations.",
		// 				},
		// 				"It’s important to remember that parentheses, exponents, multiplication and division, and addition and subtraction are all evaluated in that order. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, okay. So when in doubt I can use parentheses?",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Order of operations in python shows up a lot of times! Typically you’d think of it when you want to guarantee a certain order of evaluation for operations such as multiplication and division, addition and subtraction, and parentheses. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!"
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thank you!",
		// 					},
		// 				},
		// 				"Order of operations in python allows us to know the order in which operations are evaluated. An example of this is if you wanted to calculate the result of 4 + 3 * 5. Knowing the order of operations, you know that the multiplication is evaluated before the addition, so we get 19. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 		},
		// 	};
		// 	break;
		// case 5:
		// 	tempConvoTree = {
		// 		"Hi you two, welcome! What brings you to office hours today?": {
		// 			studentResponse1: {
		// 				agent: studentNames[0],
		// 				text: "Hi, I had a question about function decomposition, I’m a bit confused.",
		// 			},
		// 			studentResponse2: {
		// 				agent: studentNames[1],
		// 				text:
		// 					"Hello! I also had a question about function decomposition. I’m having some trouble.",
		// 			},
		// 			"Function decomposition is a great way to break a problem down into smaller, more manageable pieces.": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "Okay… that makes sense!",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Hm alright, I think I get it.",
		// 				},
		// 				"Any other questions?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Good! Let me know if there’s anything else I can help with.": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Great– can you each give me an example of when you’d want to use function decomposition?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text:
		// 							"We could use function decomposition to break a complex problem into simpler tasks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text:
		// 							"We could also use function decomposition to make code easier to read and debug.",
		// 					},
		// 				},
		// 			},
		// 			"No worries! Do you have any specific questions about function decomposition?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "No, I just wanted to know more.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Same– I didn’t have any specific questions but was just confused.",
		// 				},
		// 				"Function decomposition is a great way to break a problem down into smaller, more manageable pieces. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh okay. So building a larger solution with many smaller solutions.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Function decomposition can be used to break a complex problem into smaller tasks, making the code easier to read and debug. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"Function decomposition is used to create functions that can be reused and called from a main function. An example of this is if you wanted to create a function that calculates the sum of two numbers. You could create a function that takes two parameters and returns the sum of those two numbers. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 			"Let’s go through it together– can you tell me what you already know about function decomposition?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text:
		// 						"I know it’s used to break a problem down into simpler tasks and you can create functions that can be reused.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Yeah, I know the same + I know you can use it to make code easier to read and debug."
		// 				},
		// 				"Function decomposition is a great way to break a problem down into smaller, more manageable pieces. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "I see. So we solve a larger solution with a set of smaller solutions.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Function decomposition can be used to break a complex problem into smaller tasks, making the code easier to read and debug. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"Function decomposition is used to create functions that can be reused and called from a main function. An example of this is if you wanted to create a function that calculates the sum of two numbers. You could create a function that takes two parameters and returns the sum of those two numbers. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 		},
		// 		"Hello!": {
		// 			studentResponse1: {
		// 				agent: studentNames[0],
		// 				text: "Hi, I had a question about function decomposition, I’m a bit confused.",
		// 			},
		// 			studentResponse2: {
		// 				agent: studentNames[1],
		// 				text:
		// 					"Hello! I also had a question about function decomposition. I’m having some trouble.",
		// 			},
		// 			"Function decomposition is a great way to break a problem down into smaller, more manageable pieces.": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "Okay… that makes sense!",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Hm alright, I think I get it.",
		// 				},
		// 				"Any other questions?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Good! Let me know if there’s anything else I can help with.": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Great– can you each give me an example of when you’d want to use function decomposition?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text:
		// 							"We could use function decomposition to break a complex problem into simpler tasks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text:
		// 							"We could also use function decomposition to make code easier to read and debug.",
		// 					},
		// 				},
		// 			},
		// 			"No worries! Do you have any specific questions about function decomposition?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "No, I just wanted to know more.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Same– I didn’t have any specific questions but was just confused.",
		// 				},
		// 				"Function decomposition is a great way to break a problem down into smaller, more manageable pieces. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh okay. So building a larger solution with many smaller solutions.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Function decomposition can be used to break a complex problem into smaller tasks, making the code easier to read and debug. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"Function decomposition is used to create functions that can be reused and called from a main function. An example of this is if you wanted to create a function that calculates the sum of two numbers. You could create a function that takes two parameters and returns the sum of those two numbers. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 			"Let’s go through it together– can you tell me what you already know about function decomposition?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text:
		// 						"I know it’s used to break a problem down into simpler tasks and you can create functions that can be reused.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Yeah, I know the same + I know you can use it to make code easier to read and debug."
		// 				},
		// 				"Function decomposition is a great way to break a problem down into smaller, more manageable pieces. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "I see. So we solve a larger solution with a set of smaller solutions.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Function decomposition can be used to break a complex problem into smaller tasks, making the code easier to read and debug. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"Function decomposition is used to create functions that can be reused and called from a main function. An example of this is if you wanted to create a function that calculates the sum of two numbers. You could create a function that takes two parameters and returns the sum of those two numbers. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 		},
		// 		"What do you guys need help with today?": {
		// 			studentResponse1: {
		// 				agent: studentNames[0],
		// 				text: "Hi, I had a question about function decomposition, I’m a bit confused.",
		// 			},
		// 			studentResponse2: {
		// 				agent: studentNames[1],
		// 				text:
		// 					"Hello! I also had a question about function decomposition. I’m having some trouble.",
		// 			},
		// 			"Function decomposition is a great way to break a problem down into smaller, more manageable pieces.": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "Okay… that makes sense!",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Hm alright, I think I get it.",
		// 				},
		// 				"Any other questions?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Good! Let me know if there’s anything else I can help with.": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Nope, that’s all from me!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That clarifies on my end as well.",
		// 					},
		// 				},
		// 				"Great– can you each give me an example of when you’d want to use function decomposition?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text:
		// 							"We could use function decomposition to break a complex problem into simpler tasks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text:
		// 							"We could also use function decomposition to make code easier to read and debug.",
		// 					},
		// 				},
		// 			},
		// 			"No worries! Do you have any specific questions about function decomposition?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text: "No, I just wanted to know more.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text:
		// 						"Same– I didn’t have any specific questions but was just confused.",
		// 				},
		// 				"Function decomposition is a great way to break a problem down into smaller, more manageable pieces. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh okay. So building a larger solution with many smaller solutions.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Function decomposition can be used to break a complex problem into smaller tasks, making the code easier to read and debug. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"Function decomposition is used to create functions that can be reused and called from a main function. An example of this is if you wanted to create a function that calculates the sum of two numbers. You could create a function that takes two parameters and returns the sum of those two numbers. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 			"Let’s go through it together– can you tell me what you already know about function decomposition?": {
		// 				studentResponse1: {
		// 					agent: studentNames[0],
		// 					text:
		// 						"I know it’s used to break a problem down into simpler tasks and you can create functions that can be reused.",
		// 				},
		// 				studentResponse2: {
		// 					agent: studentNames[1],
		// 					text: "Yeah, I know the same + I know you can use it to make code easier to read and debug."
		// 				},
		// 				"Function decomposition is a great way to break a problem down into smaller, more manageable pieces. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "I see. So we solve a larger solution with a set of smaller solutions.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Yeah, I think so, it makes sense.",
		// 					},
		// 				},
		// 				"Function decomposition can be used to break a complex problem into smaller tasks, making the code easier to read and debug. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "Oh, thank you! That is very helpful!",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "That makes way more sense! Thanks.",
		// 					},
		// 				},
		// 				"Function decomposition is used to create functions that can be reused and called from a main function. An example of this is if you wanted to create a function that calculates the sum of two numbers. You could create a function that takes two parameters and returns the sum of those two numbers. Does that make sense?": {
		// 					studentResponse1: {
		// 						agent: studentNames[0],
		// 						text: "That makes sense! Thanks.",
		// 					},
		// 					studentResponse2: {
		// 						agent: studentNames[1],
		// 						text: "Thank you for the example!",
		// 					},
		// 				},
		// 			},
		// 		},
		// 	};
		// 	break;
		// case 6:
			// Each level of the dictionary should have the key "studentResponse", and then as many possible options for the TA to choose as desired
			// student1 and student2 represent the names of the students
			// tempConvoTree = {
			// 	"​​Hi you two, welcome! What brings you to office hours today?": {
			// 		studentResponse1: {
			// 			agent: studentNames[0],
			// 			text: "Hi, I had a question about dictionaries, I’m a bit confused.",
			// 		},
			// 		studentResponse2: {
			// 			agent: studentNames[1],
			// 			text:
			// 				"Hello! I also had a question about dictionaries. I’m having some trouble.",
			// 		},
			// 		"Dictionaries are basically like a list, but the items are stored with a key-value pair.": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "Okay… that makes sense!",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Hm alright, I think I get it.",
			// 			},
			// 			"Any other questions?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That clarifies on my end as well.",
			// 				},
			// 			},
			// 			"Good! Let me know if there’s anything else I can help with.": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That clarifies on my end as well.",
			// 				},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list.",
			// 				},
			// 			},
			// 			},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list?",
			// 				},
			// 			},
						
			// 		},
			// 		"No worries! Do you have any specific questions about dictionaries?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "No, I just wanted to know more.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Same– I didn’t have any specific questions but was just confused.",
			// 			},
			// 			"They’re used when you want to store items in a key-value pair. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, ok. So another data structure like a list.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"Dictionaries have a lot of different uses! Typically they’re used when we want to store items in a key-value pair such as a list of key-value pairs. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That makes way more sense! Thanks",
			// 				},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list.",
			// 				},
			// 			},
			// 			},
			// 			"Dictionaries are used to store information as key-value pairs. An example of this is if you wanted to store information about a person. You could use the dictionary to store the person’s name, age, and address. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Thank you for the example!",
			// 				},
			// 			},
						
			// 		},
			// 		"Let’s go through it together– can you tell me what you already know about dictionaries?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "I know they’re used to store items with a key-value pair and you can store things in a list.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Yeah, I know the same + I know the syntax for them is something like my_dict = {key1: value1, key2: value2} and then you can add more stuff.",
			// 			},
			// 			"They’re used when you want to store items in a key-value pair. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, ok. So another data structure like a list.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"Dictionaries have a lot of different uses! Typically they’re used when we want to store items in a key-value pair such as a list of key-value pairs. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That makes way more sense! Thanks.",
			// 				},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list.",
			// 				},
			// 			},
			// 			},
			// 			"Dictionaries are used to store information as key-value pairs. An example of this is if you wanted to store information about a person. You could use the dictionary to store the person’s name, age, and address. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Thank you for the example!"
			// 				},
			// 			},
						
			// 		},
			// 	},
			// 	"Hello.": {
			// 		studentResponse1: {
			// 			agent: studentNames[0],
			// 			text: "Hi, I had a question about dictionaries, I’m a bit confused.",
			// 		},
			// 		studentResponse2: {
			// 			agent: studentNames[1],
			// 			text:
			// 				"Hello! I also had a question about dictionaries. I’m having some trouble.",
			// 		},
			// 		"Dictionaries are basically like a list, but the items are stored with a key-value pair.": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "Okay… that makes sense!",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Hm alright, I think I get it.",
			// 			},
			// 			"Any other questions?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That clarifies on my end as well.",
			// 				},
			// 			},
			// 			"Good! Let me know if there’s anything else I can help with.": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That clarifies on my end as well.",
			// 				},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list.",
			// 				},
			// 			},
			// 			},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list?",
			// 				},
			// 			},
						
			// 		},
			// 		"No worries! Do you have any specific questions about dictionaries?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "No, I just wanted to know more.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Same– I didn’t have any specific questions but was just confused.",
			// 			},
			// 			"They’re used when you want to store items in a key-value pair. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, ok. So another data structure like a list.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"Dictionaries have a lot of different uses! Typically they’re used when we want to store items in a key-value pair such as a list of key-value pairs. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That makes way more sense! Thanks",
			// 				},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list.",
			// 				},
			// 			},
			// 			},
			// 			"Dictionaries are used to store information as key-value pairs. An example of this is if you wanted to store information about a person. You could use the dictionary to store the person’s name, age, and address. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Thank you for the example!",
			// 				},
			// 			},
						
			// 		},
			// 		"Let’s go through it together– can you tell me what you already know about dictionaries?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "I know they’re used to store items with a key-value pair and you can store things in a list.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Yeah, I know the same + I know the syntax for them is something like my_dict = {key1: value1, key2: value2} and then you can add more stuff.",
			// 			},
			// 			"They’re used when you want to store items in a key-value pair. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, ok. So another data structure like a list.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"Dictionaries have a lot of different uses! Typically they’re used when we want to store items in a key-value pair such as a list of key-value pairs. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That makes way more sense! Thanks.",
			// 				},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list.",
			// 				},
			// 			},
			// 			},
			// 			"Dictionaries are used to store information as key-value pairs. An example of this is if you wanted to store information about a person. You could use the dictionary to store the person’s name, age, and address. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Thank you for the example!"
			// 				},
			// 			},
						
			// 		},
			// 	},
			// 	"Hi, what can I do to help?": {
			// 		studentResponse1: {
			// 			agent: studentNames[0],
			// 			text: "Hi, I had a question about dictionaries, I’m a bit confused.",
			// 		},
			// 		studentResponse2: {
			// 			agent: studentNames[1],
			// 			text:
			// 				"Hello! I also had a question about dictionaries. I’m having some trouble.",
			// 		},
			// 		"Dictionaries are basically like a list, but the items are stored with a key-value pair.": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "Okay… that makes sense!",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Hm alright, I think I get it.",
			// 			},
			// 			"Any other questions?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That clarifies on my end as well.",
			// 				},
			// 			},
			// 			"Good! Let me know if there’s anything else I can help with.": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Nope, that’s all from me!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That clarifies on my end as well.",
			// 				},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list.",
			// 				},
			// 			},
			// 			},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address?",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list?",
			// 				},
			// 			},
						
			// 		},
			// 		"No worries! Do you have any specific questions about dictionaries?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "No, I just wanted to know more.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Same– I didn’t have any specific questions but was just confused.",
			// 			},
			// 			"They’re used when you want to store items in a key-value pair. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, ok. So another data structure like a list.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"Dictionaries have a lot of different uses! Typically they’re used when we want to store items in a key-value pair such as a list of key-value pairs. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That makes way more sense! Thanks",
			// 				},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list.",
			// 				},
			// 			},
			// 			},
			// 			"Dictionaries are used to store information as key-value pairs. An example of this is if you wanted to store information about a person. You could use the dictionary to store the person’s name, age, and address. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Thank you for the example!",
			// 				},
			// 			},
						
			// 		},
			// 		"Let’s go through it together– can you tell me what you already know about dictionaries?": {
			// 			studentResponse1: {
			// 				agent: studentNames[0],
			// 				text: "I know they’re used to store items with a key-value pair and you can store things in a list.",
			// 			},
			// 			studentResponse2: {
			// 				agent: studentNames[1],
			// 				text:
			// 					"Yeah, I know the same + I know the syntax for them is something like my_dict = {key1: value1, key2: value2} and then you can add more stuff.",
			// 			},
			// 			"They’re used when you want to store items in a key-value pair. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, ok. So another data structure like a list.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Yeah, I think so, it makes sense.",
			// 				},
			// 			},
			// 			"Dictionaries have a lot of different uses! Typically they’re used when we want to store items in a key-value pair such as a list of key-value pairs. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "Oh, thank you! That is very helpful!",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"That makes way more sense! Thanks.",
			// 				},
			// 			"Great– can you each give me an example of how you’d use a dictionary?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "We could use a dictionary to store information about a person like their name, age, and address.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"We could also use a dictionary to store the number of items in a grocery list.",
			// 				},
			// 			},
			// 			},
			// 			"Dictionaries are used to store information as key-value pairs. An example of this is if you wanted to store information about a person. You could use the dictionary to store the person’s name, age, and address. Does that make sense?": {
			// 				studentResponse1: {
			// 					agent: studentNames[0],
			// 					text: "That makes sense! Thanks.",
			// 				},
			// 				studentResponse2: {
			// 					agent: studentNames[1],
			// 					text:
			// 						"Thank you for the example!"
			// 				},
			// 			},
						
			// 		},
			// 	},
			// };
		//	break;
		// This really shouldn't happen, but...
		default:
			tempConvoTree = {};
	}

	return tempConvoTree;
}

// Maps scenarioNum to learning goals
function getLearningGoals(scenarioNum) {
	switch (scenarioNum) {
		case 1: return ["Understand student misconceptions and hidden blockers",
		"Create a safe, inclusive learning environment",];
		case 2: return ["Facilitate students helping each other"];
		// case 3:
		// 	return [
		// 		"Understand student misconceptions and hidden blockers",
		// 		"Create a safe, inclusive learning environment",
		// 	];
		// case 4:
		// case 5:
		// case 6:
		// 	return ["Facilitate students helping each other"];
		// This really shouldn't happen, but...
		default:
			return ["Help the students understand"];
	}
}

/* ################################ Exported Functions ############################## */

export function selectStudents(num) {
	// Randomly pick n students by shuffling and picking the first n
	return shuffleArray(studentPool).slice(0, num);
}

export function selectPersonas(num, students) {
	// Randomly pick n students by shuffling and picking the first n
	return shuffleArray(personaGenerators)
		.slice(0, num)
		.map((generator, i) => {
			return generator(students[i]);
		});
}

// Get the data for ONE scenario
export function getStaticData(scenarioNum) {
	const Participant = getCurrentParticipant();

	if (scenarioNum > Constants.NUM_SCENARIOS) {
		return;
	}

	// Map scenarioNum to index such that 1-> 0,1, 2->2,3
	const students = [
		Participant.studentNames[2 * (scenarioNum - 1)],
		Participant.studentNames[2 * (scenarioNum - 1) + 1],
	];
	const personas = [
		Participant.personas[2 * (scenarioNum - 1)],
		Participant.personas[2 * (scenarioNum - 1) + 1],
	];

	const studentNames = students.map(student => {
		return student.name;
	});

	const scenario = scenarioGenerators[scenarioNum - 1]();
	const assignmentDescription = scenario["assignment"];
	const assignmentKeywords = scenario["keywords"];

	const context = `${makeListOfNouns(
		studentNames
	)} go to office hours with their very kind TA. ${assignmentDescription}`;

	const htmlTags = `<span ${personas
		.map((persona, i) => {
			return `className='${students[i].name}-${persona["keywords"]}'`;
		})
		.join(" ")} style="${assignmentKeywords.join(
		"-"
	)}" context="intro-cs-class-python" ${students
		.map(student => {
			return "id='" + student.name + "-goes-to-office-hours'";
		})
		.join(" ")}></span>`;

	// Put the scenario info in the format GPT expects
	let gptPrompt = personas
		.map((persona, i) => {
			return `Student Persona:\n${persona.studentBio}\n`;
		})
		.concat("Context: \n")
		.concat(
			context +
				" The students are discreet about their personalities, but still act in character. Send <EOM> tag at end of each student message. \n"
		)
		.concat(htmlTags);

	return {
		studentBios: personas.map(persona => persona.studentBio),
		context: context,
		title: `Online Office Hours`,
		// scenarioNum is 1-indexed but scenarioGenerators is 0-indexed
		scenario: assignmentDescription,
		learningGoals: getLearningGoals(scenarioNum),
		startingPrompt: gptPrompt,
		gptRecap: htmlTags,
		studentNames: studentNames,
	};
}

// Given the conversation thus far, give the response and next options (baseline)
export function progressConversation(scenarioNum, history) {
	const Participant = getCurrentParticipant();
	if (!Participant.isBaseline) {
		return;
	}

	let currConvoTree = getConversationTree(
		scenarioNum,
		getStaticData(scenarioNum).studentNames
	);

	history.forEach(message => {
		if (message.agent === "TA") {
			currConvoTree = currConvoTree[message.text];
		}
	});

	return currConvoTree;
}
