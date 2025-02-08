import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = ({name, email, phone, address, contactId}) => {
    const { actions } = useContext(Context);
    
    const handleDelete = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name.toUpperCase()} from you contact list?`);
        if(confirmDelete) {
            actions.deleteContact(contactId);
        }
    };
    
    return (
    <li className="list-group-item d-flex align-items-center">
      {/* Contact Image */}
      {/* <img
        src="https://via.placeholder.com/50"
        alt="Contact"
        className="rounded-circle ms-5 me-5"
        width="50"
        height="50"
      /> */}

      {/* Contact Info */}
      <div className="flex-grow-1">
        <h6 className="mb-1">{name}</h6>
        <small className="text-muted d-block">
            <i className="fa-solid fa-location-pin"></i> {address}
        </small>
        <small className="text-muted d-block">
            <i className="fa-solid fa-phone"></i> {phone}
        </small>
        <small className="text-muted d-block">
            <i className="fa-solid fa-envelope"></i> {email}
        </small>
      </div>

      {/* Action Icons */}
      <div className="ms-auto">
        <Link to={`/updateContact/${contactId}`}>
            <i className="text-muted fa-solid fa-pen-to-square me-3" role="button"></i>
        </Link>
        <i 
            className="text-muted fa-solid fa-trash" 
            role="button"
            onClick={handleDelete}
        >
        </i>
      </div>
    </li>
    )
};