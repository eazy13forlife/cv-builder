import React from "react";

const PdfPersonal = ({ formValues }) => {
  //destructure form values
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    streetAddress: { city, state, street, zipCode },
  } = formValues.personal[0];

  return (
    <header className="Pdf__header">
      <h1 className="pdf-primary-heading text-align-center">{`${firstName}   ${lastName}`}</h1>
      <div className="Pdf__personal-info">
        <div className="Pdf__address">
          <p className="Pdf__street">{street}</p>
          <p className="Pdf__city">{city}</p>
          <p className="Pdf__state">{state}</p>
          <p className="Pdf__zip-code">{zipCode}</p>
        </div>
        <p className="Pdf__email">{email}</p>
        <p className="Pdf__phone-number">{phoneNumber}</p>
      </div>
    </header>
  );
};

export default PdfPersonal;
