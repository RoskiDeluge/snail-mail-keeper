import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContextOne";
import ContactLimitAlert from "../subscription/ContactLimit";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  // Add state for showing limit alert
  const [showLimitAlert, setShowLimitAlert] = useState(false);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    type: "personal",
  });

  const { name, street, city, state, zipcode, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (current === null) {
      try {
        await addContact(contact);
        clearAll();
      } catch (err) {
        // Check if error is due to contact limit
        if (err.response && err.response.status === 403) {
          setShowLimitAlert(true);
        }
      }
    } else {
      updateContact(contact);
      clearAll();
    }
  };

  const clearAll = () => {
    clearCurrent();
    // Reset the limit alert when clearing the form
    setShowLimitAlert(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Street"
        name="street"
        value={street}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="City"
        name="city"
        value={city}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="State"
        name="state"
        value={state}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Zipcode"
        name="zipcode"
        value={zipcode}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
      {showLimitAlert && <ContactLimitAlert />}
    </form>
  );
};

export default ContactForm;
