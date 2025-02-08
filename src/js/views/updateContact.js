import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactForm from "../component/contactForm";

export const UpdateContact = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate(); // To redirect after saving
  const { contactId } = useParams(); // Get the contactId from the URL params

  // State to store contact data
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    id: contactId
  });

  // Fetch the contact data when the component mounts or contactId changes
  useEffect(() => {
    const contactData = actions.getContactById(contactId); // Get contact from store synchronously
    setContact(contactData); // Set the contact data to state
  }, [contactId, actions]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.updateContact(contact); // Update the contact
    console.log("Contact successfully updated!");
    navigate("/"); // Navigate back to the contacts list
  };

  return (
    <div>
      <h2 className="text-center mb-4">Update Contact</h2>
      <ContactForm
        contact={contact}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Update Contact"
      />
    </div>
  );
};
