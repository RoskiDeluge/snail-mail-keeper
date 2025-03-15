import React, { useReducer } from "react";
import axios from "axios";
import SubscriptionContext from "./subscriptionContext";
import subscriptionReducer from "./subscriptionReducer";
import {
  GET_SUBSCRIPTION,
  UPGRADE_SUBSCRIPTION,
  SUBSCRIPTION_ERROR,
} from "../types";

const SubscriptionState = (props) => {
  const initialState = {
    subscriptionStatus: null,
    message: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(subscriptionReducer, initialState);

  // Get subscription info
  const getSubscription = async () => {
    try {
      const res = await axios.get("/api/subscription");

      dispatch({
        type: GET_SUBSCRIPTION,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SUBSCRIPTION_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Upgrade subscription
  const upgradeSubscription = async () => {
    try {
      const res = await axios.put("/api/subscription/upgrade");

      dispatch({
        type: UPGRADE_SUBSCRIPTION,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: SUBSCRIPTION_ERROR,
        payload: err.response.data.msg,
      });
      throw err;
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptionStatus: state.subscriptionStatus,
        message: state.message,
        loading: state.loading,
        error: state.error,
        getSubscription,
        upgradeSubscription,
      }}
    >
      {props.children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionState;
