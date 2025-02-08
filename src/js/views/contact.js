import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";

export const Contact = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const contacts = store.contacts;
	return (
		<div>
			<div className="d-flex justify-content-between mb-3">
				<h2>Contacts</h2>
				<Link to="/addContact" className="ml-auto">
					<button className="btn btn-success">+ Add Contact</button>
				</Link>
			</div>
			<ul className="list-group">
				{contacts.map((contact) => {
					return (
						<ContactCard
							key={contact.id}
							name={contact.name}
							phone={contact.phone}
							email={contact.email}
							address={contact.address}
						/>
					);
				})}
			</ul>
		</div>
	);
};