import React, { component } from "react";
import { Link } from "react-router-dom";

const ContactForm = ({ contact, handleChange, handleSubmit, buttonText }) => {
  return (
    <div className="container d-flex flex-column align-items-center mt-4">
      <div className="card p-4 w-100" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={contact.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={contact.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            {buttonText}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/" className="text-muted">
            Go back to contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
