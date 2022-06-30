import React from "react";
import { IoTrashOutline } from "react-icons/io5";

import { TextInput, TextArea, SliderButton } from "../Inputs/TextInput.js";

import "./WorkExperience.scss";

const WorkExperience = ({
  onInputChange,
  formValues,
  onInputChange2,
  errors,
  errorCheck,
  onAddWorkExperience,
  onSliderClick,
  submitted,
  remove,
  clickedOngoing,
  setClickedOngoing,
}) => {
  const renderedItems = formValues.workExperience.map((object, index) => {
    // destructure all the values and errors from the object from the getgo
    const {
      description,
      endDate,
      ongoing,
      startDate,
      title,
      employer: { name, city, state, zipCode },
    } = object;

    const {
      description: descriptionError,
      endDate: endDateError,
      ongoing: ongoingError,
      startDate: startDateError,
      title: titleError,
      employer: {
        name: nameError,
        city: cityError,
        state: stateError,
        zipCode: zipCodeError,
      },
    } = errors.workExperience[index];

    return (
      <div className="container container--workExperience" key={index}>
        {index !== 0 ? (
          <button
            onClick={() => {
              remove("workExperience", index);
            }}
            className="Form__remove-button Form__remove-button--work-experience"
            type="button"
          >
            <IoTrashOutline className="Form__trash-icon" />
          </button>
        ) : null}
        {/**/}

        <div className="Form__row">
          <div className="Form__column">
            <TextInput
              type="text"
              id="employer"
              label="employer"
              value={name}
              error={nameError}
              submitted={submitted}
              onChange={(e) => {
                onInputChange2(e, "workExperience", index, "employer", "name");
              }}
              onBlur={(e) => {
                errorCheck(name, index, "workExperience", "employer", "name");
              }}
              className="Form__group"
            />
          </div>
          <div className="Form__column Form__column--space-between">
            <TextInput
              type="text"
              id="employer_city"
              label="city"
              value={city}
              error={cityError}
              submitted={submitted}
              onChange={(e) => {
                onInputChange2(e, "workExperience", index, "employer", "city");
              }}
              onBlur={(e) => {
                errorCheck(city, index, "workExperience", "employer", "city");
              }}
              className="Form__small-group"
            />
            <TextInput
              type="text"
              id="employer_state"
              label="state"
              value={state}
              error={stateError}
              submitted={submitted}
              onChange={(e) => {
                onInputChange2(e, "workExperience", index, "employer", "state");
              }}
              onBlur={(e) => {
                errorCheck(state, index, "workExperience", "employer", "state");
              }}
              className="Form__small-group"
            />
            <TextInput
              type="text"
              id="employer_zip_code"
              label="zip code"
              value={zipCode}
              error={zipCodeError}
              submitted={submitted}
              onChange={(e) => {
                onInputChange2(
                  e,
                  "workExperience",
                  index,
                  "employer",
                  "zipCode"
                );
              }}
              onBlur={(e) => {
                errorCheck(
                  zipCode,
                  index,
                  "workExperience",
                  "employer",
                  "zipCode"
                );
              }}
              className="Form__small-group"
            />
          </div>
        </div>

        <div className="Form__row">
          <div className="Form__column-full">
            <TextInput
              type="text"
              id="occupation_title"
              label="Occupation title"
              value={title}
              error={titleError}
              submitted={submitted}
              onChange={(e) => {
                onInputChange(e, "workExperience", index, "title", undefined);
              }}
              onBlur={(e) => {
                errorCheck(title, index, "workExperience", "title", undefined);
              }}
              className="Form__group"
            />
          </div>
        </div>

        <div className="Form__row">
          <div className="Form__column-full">
            <TextArea
              id="occupation_description"
              label="Occupation description"
              value={description}
              error={descriptionError}
              submitted={submitted}
              rows="6"
              onChange={(e) => {
                onInputChange(
                  e,
                  "workExperience",
                  index,
                  "description",
                  undefined
                );
              }}
              onBlur={(e) => {
                errorCheck(
                  description,
                  index,
                  "workExperience",
                  "description",
                  undefined
                );
              }}
              className="Form__group"
            />
          </div>
        </div>

        <div className="Form__row">
          <div className="Form__column">
            <TextInput
              type="date"
              id="occupation_startDate"
              label="From"
              value={startDate}
              error={startDateError}
              submitted={submitted}
              onChange={(e) => {
                onInputChange(
                  e,
                  "workExperience",
                  index,
                  "startDate",
                  undefined
                );
              }}
              onBlur={(e) => {
                errorCheck(
                  startDate,
                  index,
                  "workExperience",
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
              id="occupation_endDate"
              label="To"
              value={endDate}
              submitted={submitted}
              error={endDateError}
              disableField={ongoing ? true : false}
              onChange={(e) => {
                onInputChange(e, "workExperience", index, "endDate", undefined);
              }}
              onBlur={(e) => {
                errorCheck(
                  endDate,
                  index,
                  "workExperience",
                  "endDate",
                  undefined
                );
              }}
              className="Form__medium-group"
            />
            <SliderButton
              label="ongoing"
              className="Form__small-group"
              clickedOngoing={clickedOngoing[index]}
              submitted={submitted}
              onBlur={(e) => {
                errorCheck(
                  ongoing,
                  index,
                  "workExperience",
                  "ongoing",
                  undefined
                );
              }}
              onSliderClick={() => {
                onSliderClick("workExperience", index);
                errorCheck(
                  ongoingError,
                  index,
                  "workExperience",
                  "ongoing",
                  undefined
                );
                if (clickedOngoing[index] !== undefined) {
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
      </div>
    );
  });

  return (
    <div className="WorkExperience">
      <h2 className="heading-primary">Work Experience</h2>
      {renderedItems}
      <button
        type="button"
        onClick={onAddWorkExperience}
        className="button button--primary"
      >
        Add
      </button>
    </div>
  );
};

export default WorkExperience;
