import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contact = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	return (
		<div>
            <h1>This is the contact view.</h1>
		</div>
	);
};