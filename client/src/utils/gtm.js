/**
 * Pushes an event to the Google Tag Manager data layer
 * @param {string} eventName - The name of the event
 * @param {object} eventParams - Additional parameters for the event
 */

export const pushEvent = (eventName, eventParams = {}) => {
  // Make sure dataLayer exists
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });

    // Log for debugging when in development
    if (process.env.NODE_ENV === "development") {
      console.log("GTM Event:", { event: eventName, ...eventParams });
    }
  } else {
    // Create dataLayer if it doesn't exist (fallback)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("GTM Event (dataLayer initialized):", {
        event: eventName,
        ...eventParams,
      });
    }
  }
};

/**
 * Initializes the data layer with user/page information
 * @param {object} userData - User data to initialize with
 */
export const initializeDataLayer = (userData = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...userData,
  });
};
