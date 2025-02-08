import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	return (
		<div className="jumbotron">
			{/* <h1 className="display-4">This will show the demo element: {store.demo[params.theid].title}</h1> */}
			<h1>This is the Add Contact page/view</h1>
		</div>
	);
};


