import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pushEvent } from "../../utils/gtm";

const Home = () => {
  // useEffect(() => {
  //   // Track page view when component mounts
  //   pushEvent("page_view", {
  //     page_title: "Home Page",
  //     page_location: window.location.href,
  //     page_path: window.location.pathname,
  //   });
  // }, []);

  const handleTryFreeClick = () => {
    // Track button click
    pushEvent("home_free_trial_cta", {
      event_category: "home-page-cta",
      event_action: "free-trial",
      event_label: "Try us for free.",
    });
  };

  return (
    <>
      <h1>Never Lose Your Snail Mail Addresses</h1>
      <section>
        Snail Mail Keeper is an application that keeps track of your snail mail.
      </section>
      <section>
        Export your contact list from iOS or Android and easily manage your
        contact details between devices.
      </section>
      <Link to="/register">
        <button className="btn btn-success" onClick={handleTryFreeClick}>
          Try us for free.
        </button>
      </Link>
    </>
  );
};

export default Home;
