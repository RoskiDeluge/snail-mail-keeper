import React, { useContext, useEffect, useState } from "react";
import SubscriptionContext from "../../context/subscription/SubscriptionContext";
import Spinner from "../layout/Spinner";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const subscriptionContext = useContext(SubscriptionContext);
  const {
    subscriptionStatus,
    message,
    loading,
    error,
    getSubscription,
    upgradeSubscription,
  } = subscriptionContext;

  const [upgrading, setUpgrading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSubscription();
    // eslint-disable-next-line
  }, []);

  const onUpgrade = async () => {
    try {
      setUpgrading(true);
      await upgradeSubscription();
      setUpgrading(false);
      // Redirect to contacts after successful upgrade
      navigate("/");
    } catch (err) {
      setUpgrading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="card bg-light">
      <div className="card-header">
        <h3 className="text-primary">Subscription Status</h3>
      </div>
      <div className="card-body">
        <h4>
          Current Plan:{" "}
          <span
            className={
              subscriptionStatus === "paid" ? "text-success" : "text-primary"
            }
          >
            {subscriptionStatus === "paid" ? "Premium" : "Free"}
          </span>
        </h4>

        <p>{message}</p>

        {subscriptionStatus !== "paid" && (
          <div className="my-3">
            <h4>Upgrade to Premium</h4>
            <p>Unlimited contacts and more features!</p>
            <button
              className="btn btn-primary"
              onClick={onUpgrade}
              disabled={upgrading}
            >
              {upgrading ? "Processing..." : "Upgrade Now"}
            </button>
          </div>
        )}

        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default Subscription;
