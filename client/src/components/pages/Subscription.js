import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";

const Subscription = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const history = useHistory();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSubscriptionInfo();
  }, []);

  const getSubscriptionInfo = async () => {
    try {
      const res = await axios.get("/api/subscription");
      setSubscription(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load subscription information");
      setLoading(false);
    }
  };

  /* Commented out upgradeSubscription function
  const upgradeSubscription = async () => {
    try {
      setUpgrading(true);
      const res = await axios.put("/api/subscription/upgrade");
      setSubscription({
        ...subscription,
        subscriptionStatus: res.data.subscriptionStatus,
      });
      setUpgrading(false);

      // Use history.push instead of navigate
      history.push("/");
    } catch (err) {
      setError("Failed to upgrade subscription");
      setUpgrading(false);
    }
  };
  */

  if (loading) return <Spinner />;

  return (
    <div className="card bg-light">
      <div className="card-header">
        <h2 className="text-primary">Subscription Information</h2>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <h3>
          Current Plan:{" "}
          <span
            className={
              subscription?.subscriptionStatus === "paid"
                ? "text-success"
                : "text-primary"
            }
          >
            {subscription?.subscriptionStatus === "paid" ? "Premium" : "Free"}
          </span>
        </h3>

        <p className="my-2">{subscription?.message}</p>

        {subscription?.subscriptionStatus !== "paid" && (
          <div className="my-3">
            <h4>Upgrade to Premium</h4>
            <p>Get unlimited contacts with our premium plan!</p>
            <p>
              To upgrade, please contact us at:{" "}
              <a href="mailto:subscriptions@snailmailkeeper.com">
                subscriptions@snailmailkeeper.com
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
