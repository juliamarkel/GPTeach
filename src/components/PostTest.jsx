import React from "react";
import { getCurrentParticipant } from "../utils/database";
import "./style/TextPage.css";

export const PostTest = () => {
	const uuid = getCurrentParticipant()["uuid"];
	return (
		<>
			<div
				style={{
					backgroundColor: "#f0ebf8",
					height: "100%",
					width: "100%",
					overflow: "scroll",
				}}
			>
				<div style={{ margin: "auto" }}>
					<iframe
						style={{ width: "100%", height: "95vh", overflow: "scroll" }}
						src={`https://docs.google.com/forms/d/e/1FAIpQLSfIZaA4MCqrsBAidCLH9k-ew5a99hfKcEzqbchYpejvoCXiQg/viewform?embedded=true&usp=pp_url&entry.592566889=${uuid}`}
						title="Google Form"
					>
						Loading…
					</iframe>
				</div>
			</div>
		</>
	);
};
