import React, { Component } from "react";

export const ContactCard = ({name, email, phone, address}) => {
    // const {name, phone, email, address} = props.contact;
    return (
    <li className="list-group-item d-flex align-items-center">
      {/* Contact Image */}
      <img
        src="https://via.placeholder.com/50"
        alt="Contact"
        className="rounded-circle ms-5 me-5"
        width="50"
        height="50"
      />

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
        <i className="text-muted fa-solid fa-pen-to-square me-3" role="button"></i>
        <i className="text-muted fa-solid fa-trash" role="button"></i>
      </div>
    </li>
    )
};