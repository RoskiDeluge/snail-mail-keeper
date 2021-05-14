import React from "react";
import Contacts from "../contacts/Contacts";
import ContactFilter from "../contacts/ContactFilter";

const Home = () => {
  return (
    <div>
      {/* <div>
        <ContactForm />
      </div> */}
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
