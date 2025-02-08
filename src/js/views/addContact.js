import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactForm from "../component/contactForm";

export const AddContact = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate(); // To redirect after saving

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.createContact(contact); // Create a new contact
      console.log("Contact successfully added!");
      navigate("/"); // Optionally navigate back to contacts list after saving
    } catch (error) {
      console.error("Failed to add contact:", error);
    }
  };

  return (
    <div>
		<ContactForm
		contact={contact}
		handleChange={handleChange}
		handleSubmit={handleSubmit}
		buttonText="Add Contact" // Button will say "Add Contact"
		/>
	</div>
  );
};
