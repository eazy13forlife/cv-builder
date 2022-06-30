import React from "react";

import { TextInput } from "../Inputs/TextInput.js";
import "./PersonalInfo.scss";

const PersonalInfo = ({
  onInputChange,
  formValues,
  onInputChange2,
  errorCheck,
  errors,
  submitted,
}) => {
  //destructure formValues and errors at the start
  const {
    firstName,
    email,
    lastName,
    phoneNumber,
    streetAddress: { street, city, state, zipCode },
  } = formValues.personal[0];

  const {
    firstName: firstNameError,
    email: emailError,
    lastName: lastNameError,
    phoneNumber: phoneNumberError,
    streetAddress: {
      city: cityError,
      state: stateError,
      street: streetError,
      zipCode: zipCodeError,
    },
  } = errors.personal[0];

  return (
    <div className="PersonalInfo">
      <h2 className="heading-primary">Personal Information</h2>
      <div className="container">
        <div className="Form__row">
          <div className="Form__column">
            <TextInput
              type="text"
              id="first_name"
              label="First Name"
              className="Form__group"
              submitted={submitted}
              value={firstName}
              error={firstNameError}
              onChange={(e) => {
                onInputChange(e, "personal", 0, "firstName");
              }}
              onBlur={() => {
                errorCheck(firstName, 0, "personal", "firstName", undefined);
              }}
            />
          </div>
          <div className="Form__column">
            <TextInput
              type="text"
              id="last_name"
              label="Last Name"
              className="Form__group"
              submitted={submitted}
              error={lastNameError}
              value={lastName}
              onChange={(e) => {
                onInputChange(e, "personal", 0, "lastName");
              }}
              onBlur={() => {
                errorCheck(lastName, 0, "personal", "lastName", undefined);
              }}
            />
          </div>
        </div>

        <div className="Form__row">
          <div className="Form__column">
            <TextInput
              type="text"
              id="email"
              label="Email Address"
              submitted={submitted}
              error={emailError}
              className="Form__group"
              value={email}
              onChange={(e) => {
                onInputChange(e, "personal", 0, "email");
              }}
              onBlur={() => {
                errorCheck(email, 0, "personal", "email", undefined);
              }}
            />
          </div>
          <div className="Form__column">
            <TextInput
              type="text"
              id="phone_number"
              label="Phone Number"
              submitted={submitted}
              className="Form__group"
              error={phoneNumberError}
              value={phoneNumber}
              onChange={(e) => {
                onInputChange(e, "personal", 0, "phoneNumber");
              }}
              onBlur={() => {
                errorCheck(
                  phoneNumber,
                  0,
                  "personal",
                  "phoneNumber",
                  undefined
                );
              }}
            />
          </div>
        </div>

        <div className="Form__row">
          <div className="Form__column">
            <TextInput
              type="text"
              id="street"
              error={streetError}
              label="Street Address"
              className="Form__group"
              submitted={submitted}
              value={street}
              onChange={(e) => {
                onInputChange2(e, "personal", 0, "streetAddress", "street");
              }}
              onBlur={() => {
                errorCheck(street, 0, "personal", "streetAddress", "street");
              }}
            />
          </div>
          <div className="Form__column Form__column--space-between">
            {" "}
            <TextInput
              type="text"
              id="city"
              label="City"
              submitted={submitted}
              error={cityError}
              value={city}
              className="Form__small-group"
              onChange={(e) => {
                onInputChange2(e, "personal", 0, "streetAddress", "city");
              }}
              onBlur={() => {
                errorCheck(city, 0, "personal", "streetAddress", "city");
              }}
            />{" "}
            <TextInput
              type="text"
              id="state"
              label="State"
              submitted={submitted}
              error={stateError}
              value={state}
              className="Form__small-group"
              onChange={(e) => {
                onInputChange2(e, "personal", 0, "streetAddress", "state");
              }}
              onBlur={() => {
                errorCheck(state, 0, "personal", "streetAddress", "state");
              }}
            />{" "}
            <TextInput
              type="text"
              id="zip_code"
              label="zip code"
              submitted={submitted}
              error={zipCodeError}
              value={zipCode}
              className="Form__small-group"
              onChange={(e) => {
                onInputChange2(e, "personal", 0, "streetAddress", "zipCode");
              }}
              onBlur={() => {
                errorCheck(zipCode, 0, "personal", "streetAddress", "zipCode");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
