import {
  GET_SUBSCRIPTION,
  UPGRADE_SUBSCRIPTION,
  SUBSCRIPTION_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTION:
      return {
        ...state,
        subscriptionStatus: action.payload.subscriptionStatus,
        message: action.payload.message,
        loading: false,
      };
    case UPGRADE_SUBSCRIPTION:
      return {
        ...state,
        subscriptionStatus: action.payload.subscriptionStatus || "paid",
        loading: false,
      };
    case SUBSCRIPTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
