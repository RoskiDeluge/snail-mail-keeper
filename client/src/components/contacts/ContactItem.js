import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact, props }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, street, city, state, zipcode, type } = contact;

  const history = useHistory();

  const onDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}'s address?`)) {
      deleteContact(_id);
      clearCurrent();
    } else {
      history.push("/");
    }
  };

  const onEdit = () => {
    setCurrent(contact);
    history.push("/addcontact");
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        <p>{street && <span>{street}</span>}</p>
        <p>
          {city && <span>{city}</span>} {state && <span>{state}</span>}{" "}
          {zipcode && <span>{zipcode}</span>}
        </p>
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
