import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { TeacherTrainingInfo } from "./components/TeacherTrainingInfo.jsx";
import { Scenario } from "./components/Scenario.jsx";
import { PostTest } from "./components/PostTest.jsx";
import { Admin } from "./components/Admin/Admin";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/admin" element={<Admin />} />

				<Route path="/posttest" element={<PostTest />} />

				<Route path="/:scenarioNum" element={<Scenario />} />

				<Route path="/" element={<TeacherTrainingInfo />} />
			</Routes>
		</BrowserRouter>
	);
};
