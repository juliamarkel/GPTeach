import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import "./Admin.css";

export const Admin = () => {
	const initialValues = {
		students: [{ name: "Steven", pronouns: "he/him" }],
		personas: [{ text: "this is a sample persona" }],
	};

	function publishData(values) {
		console.log(`const studentPool = ${JSON.stringify(values.students)}`);
		console.log(values.personas);
	}

	function cleanData() {
		// Construct the static sentences
		// Fix pronouns
		// Choose keywords from scenario description
		// Make personas not a dictionary
	}

	return (
		<div className="adminPage">
			<h1>Admin</h1>

			<Formik initialValues={initialValues} onSubmit={publishData}>
				{({ values }) => (
					<Form>
						<button type="submit">Publish</button>
						<button>Download File</button>
						<button>Upload File</button>

						{/* TODO: restrict to > 0 */}
						<label>
							# Students: <input type="number" />
						</label>

						<label>
							# Scenarios: <input type="number" />
						</label>

						<label>
							# Students per Scenario: <input type="number" />
						</label>

						<h2>Students</h2>

						<FieldArray name="students">
							{({ insert, remove, push }) => (
								<div>
									{values.students.length > 0 &&
										values.students.map((student, index) => (
											<div className="row" key={index}>
												<div className="col">
													<button
														type="button"
														className="secondary"
														onClick={() => remove(index)}
													>
														x
													</button>
												</div>

												<div className="col">
													<label htmlFor={`students.${index}.name`}>Name</label>
													<Field
														name={`students.${index}.name`}
														placeholder="Jane Doe"
														type="text"
														value={student.name}
													/>
												</div>

												<div className="col">
													<label htmlFor={`students.${index}.pronouns`}>
														Pronouns
													</label>
													<Field
														name={`students.${index}.pronouns`}
														as="select"
													>
														<option>she/her</option>
														<option>he/him</option>
														<option>they/them</option>
													</Field>
												</div>
											</div>
										))}
									<button
										type="button"
										className="secondary"
										onClick={() => push({ name: "", pronouns: "" })}
									>
										+
									</button>
								</div>
							)}
						</FieldArray>

						<h2>Personas</h2>
						<FieldArray name="personas">
							{({ insert, remove, push }) => (
								<div>
									{values.personas.length > 0 &&
										values.personas.map((persona, index) => (
											<div className="row" key={index}>
												<div className="col">
													<button
														type="button"
														className="secondary"
														onClick={() => remove(index)}
													>
														x
													</button>
												</div>

												<div className="col">
													<Field
														name={`personas.${index}.text`}
														placeholder="here is a long sentence"
														type="text"
														value={persona.text}
													/>
												</div>
											</div>
										))}
									<button
										type="button"
										className="secondary"
										onClick={() => push({ text: "" })}
									>
										+
									</button>
								</div>
							)}
						</FieldArray>

						<h2>Scenarios</h2>
						{/* add shuffle option? */}

						<h2>Learning Goals</h2>
						{/* Text inputs + checkboxes per scenario */}
					</Form>
				)}
			</Formik>
		</div>
	);
};
