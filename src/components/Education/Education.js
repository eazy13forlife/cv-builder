import React from "react";
import { IoTrashOutline } from "react-icons/io5";

import { TextInput, SliderButton } from "../Inputs/TextInput.js";

import "./Education.scss";

const Education = ({
  onInputChange,
  formValues,
  onInputChange2,
  errors,
  errorCheck,
  onAddEducation,
  onSliderClick,
  submitted,
  remove,
  clickedOngoing,
  setClickedOngoing,
}) => {
  const renderedItems = formValues.education.map((object, index) => {
    //destructure formValues and errors for each object from the getgo
    const {
      degree,
      endDate,
      field,
      startDate,
      ongoing,
      school: { name, city, state, zipCode },
    } = object;

    const {
      degree: degreeError,
      endDate: endDateError,
      field: fieldError,

      startDate: startDateError,
      school: {
        name: nameError,
        city: cityError,
        state: stateError,
        zipCode: zipCodeError,
      },
    } = errors.education[index];

    return (
      <div className="container container--education" key={index}>
        {index !== 0 ? (
          <button
            onClick={() => {
              remove("education", index);
            }}
            className="Form__remove-button Form__remove-button--education"
            type="button"
          >
            <IoTrashOutline className="Form__trash-icon" />
          </button>
        ) : null}

        {/*start of first form row*/}
        <div className="Form__row">
          <div className="Form__column">
            <TextInput
              type="text"
              id="school_name"
              label="school name"
              value={name}
              error={nameError}
              submitted={submitted}
              onChange={(e) => {
                onInputChange2(e, "education", index, "school", "name");
              }}
              onBlur={(e) => {
                errorCheck(name, index, "education", "school", "name");
              }}
              className="Form__group"
            />
          </div>
          <div className="Form__column Form__column--space-between">
            <TextInput
              type="text"
              id="school_city"
              label="city"
              value={city}
              error={cityError}
              submitted={submitted}
              onChange={(e) => {
                onInputChange2(e, "education", index, "school", "city");
              }}
              onBlur={(e) => {
                errorCheck(city, index, "education", "school", "city");
              }}
              className="Form__small-group"
            />
            <TextInput
              type="text"
              id="school_state"
              label="state"
              value={state}
              submitted={submitted}
              error={stateError}
              onChange={(e) => {
                onInputChange2(e, "education", index, "school", "state");
              }}
              onBlur={(e) => {
                errorCheck(state, index, "education", "school", "state");
              }}
              className="Form__small-group"
            />
            <TextInput
              type="text"
              id="school_zip_code"
              label="zip code"
              value={zipCode}
              submitted={submitted}
              error={zipCodeError}
              onChange={(e) => {
                onInputChange2(e, "education", index, "school", "zipCode");
              }}
              onBlur={(e) => {
                errorCheck(zipCode, index, "education", "school", "zipCode");
              }}
              className="Form__small-group"
            />
          </div>
        </div>

        <div className="Form__row">
          <div className="Form__column">
            <TextInput
              type="text"
              id="degree"
              label="Degree/Certificate Awarded"
              value={degree}
              submitted={submitted}
              error={degreeError}
              onChange={(e) => {
                onInputChange(e, "education", index, "degree", undefined);
              }}
              onBlur={(e) => {
                errorCheck(degree, index, "education", "degree", undefined);
              }}
              className="Form__group"
            />
          </div>
          <div className="Form__column">
            <TextInput
              type="text"
              id="field"
              label="field of study"
              value={field}
              submitted={submitted}
              error={fieldError}
              onChange={(e) => {
                onInputChange(e, "education", index, "field", undefined);
              }}
              onBlur={(e) => {
                errorCheck(field, index, "education", "field", undefined);
              }}
              className="Form__group"
            />
          </div>
        </div>

        <div className="Form__row">
          <div className="Form__column">
            <TextInput
              type="date"
              id="startDate"
              label="from"
              submitted={submitted}
              value={startDate}
              error={startDateError}
              onChange={(e) => {
                onInputChange(e, "education", index, "startDate", undefined);
              }}
              onBlur={(e) => {
                errorCheck(
                  startDate,
                  index,
                  "education",
                  "startDate",
                  undefined
                );
              }}
              className="Form__group"
            />
          </div>
          <div className="Form__column Form__column--space-between">
            <TextInput
              type="date"
              id="endDate"
              label="To"
              value={endDate}
              submitted={submitted}
              error={endDateError}
              disableField={object.ongoing ? true : false}
              onChange={(e) => {
                onInputChange(e, "education", index, "endDate", undefined);
              }}
              onBlur={(e) => {
                errorCheck(endDate, index, "education", "endDate", undefined);
              }}
              className="Form__medium-group"
            />
            <SliderButton
              label="ongoing"
              className="Form__small-group"
              clickedOngoing={clickedOngoing[index]}
              error={errors.education[index].ongoing}
              submitted={submitted}
              ongoing={ongoing}
              onBlur={(e) => {
                errorCheck(ongoing, index, "education", "ongoing", undefined);
              }}
              onSliderClick={() => {
                onSliderClick("education", index);
                errorCheck(ongoing, index, "education", "ongoing", undefined);
                if (clickedOngoing[index] !== undefined) {
                  //component runs once first before useEffect so if undefined for that specific index, lets not do anything. Only till useeffect makes it null,meaning it hasnt been clicked at all and component runs again, will we do something.
                  if (clickedOngoing[index] === null) {
                    const newClickedOngoing = [...clickedOngoing];
                    newClickedOngoing[index] = true;
                    setClickedOngoing(newClickedOngoing);
                  } else {
                    const newClickedOngoing = [...clickedOngoing];
                    newClickedOngoing[index] = !newClickedOngoing[index];
                    setClickedOngoing(newClickedOngoing);
                  }
                }
              }}
            />
          </div>
        </div>
        {/*end of form row*/}
      </div>
    );
  });

  return (
    <div className="Education">
      <h2 className="heading-primary">Education and Training</h2>
      {renderedItems}
      <button
        type="button"
        onClick={onAddEducation}
        className="button button--primary"
      >
        Add
      </button>
    </div>
  );
};

export default Education;
