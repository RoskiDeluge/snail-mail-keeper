import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import SubscriptionContext from "../../context/subscription/SubscriptionContextOne";

const SubscriptionBadge = () => {
  const subscriptionContext = useContext(SubscriptionContext);
  const { subscriptionStatus, getSubscription } = subscriptionContext;

  useEffect(() => {
    getSubscription();
    // eslint-disable-next-line
  }, []);

  return (
    <Link to="/subscription" className="nav-link">
      <span
        className={`badge ${
          subscriptionStatus === "paid" ? "bg-success" : "bg-free"
        }`}
      >
        {subscriptionStatus === "paid" ? "Premium" : "Free"}
      </span>
    </Link>
  );
};

export default SubscriptionBadge;
