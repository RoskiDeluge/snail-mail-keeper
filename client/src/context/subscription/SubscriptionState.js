import React, { useReducer } from "react";
import axios from "axios";
import SubscriptionContextOne from "./SubscriptionContextOne";
import SubscriptionReducerOne from "./SubscriptionReducerOne";
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

  const [state, dispatch] = useReducer(SubscriptionReducerOne, initialState);

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
    <SubscriptionContextOne.Provider
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
    </SubscriptionContextOne.Provider>
  );
};

export default SubscriptionState;
