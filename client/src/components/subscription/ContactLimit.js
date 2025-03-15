import React from "react";
import { Link } from "react-router-dom";

const ContactLimitAlert = () => {
  return (
    <div className="alert alert-warning">
      <h4>Contact Limit Reached</h4>
      <p>You've reached the maximum of 10 contacts on the free plan.</p>
      <Link to="/subscription" className="btn btn-primary">
        Upgrade Now
      </Link>
    </div>
  );
};

export default ContactLimitAlert;
