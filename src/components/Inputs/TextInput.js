import React, { useEffect } from "react";

import "./Form.scss";

//classNames for a form are Form__group, Form__small-group and Form__medium-group.
//they occupy different sizes
const showErrorMessage = (error) => {
  return <p className="Form__error">{error}</p>;
};

const TextInput = ({
  type,
  id,
  label,
  value,
  onChange,
  className,
  error,
  onBlur,
  submitted,
  disableField,
}) => {
  useEffect(() => {
    if (submitted) {
      onBlur();
    }
  }, [submitted]);

  return (
    <div className={className}>
      <label htmlFor={id} className="Form__label">
        {label}
      </label>
      <input
        type={type}
        className={`Form__input `}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disableField}
      />
      {showErrorMessage(error)}
    </div>
  );
};

const TextArea = ({
  id,
  label,
  value,
  onChange,
  className,
  rows,
  error,
  onBlur,
  submitted,
}) => {
  useEffect(() => {
    if (submitted) {
      onBlur();
    }
  }, [submitted]);

  return (
    <div className={className}>
      <label htmlFor={id} className="Form__label">
        {label}
      </label>
      <textarea
        className="Form__input Form__text-area"
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
      ></textarea>
      {showErrorMessage(error)}
    </div>
  );
};

//return animation for our slider when circle is clicked
const provideSliderAnimation = (clickedOngoing) => {
  if (clickedOngoing === true) {
    return { animation: "fillForward 300ms forwards" };
  } else if (clickedOngoing === false) {
    return { animation: "fillBackward 300ms backwards" };
  } else {
    return { animation: "none" }; //if clickedOnGoing is not true or false, don't show any animation. Important for when our page first loads
  }
};

//returns animation for our circle wrapper when circle is clicked
const provideCircleAnimation = (clickedOngoing) => {
  if (clickedOngoing === true) {
    return { animation: "sliderMoveForward 300ms forwards" };
  } else if (clickedOngoing === false) {
    return { animation: "sliderMoveBackward 300ms forwards" };
  } else {
    return { animation: "none" }; //if clickedOnGoing is not true or false, don't show any animation. Important for when our page first loads
  }
};

const SliderButton = ({
  className,
  label,
  onSliderClick,
  clickedOngoing,
  onBlur,
  ongoing,
  submitted,
}) => {
  useEffect(() => {
    if (submitted) {
      onBlur();
    }
  }, [submitted]);

  return (
    <div className={className}>
      <label className="Form__label">{label}</label>
      <div
        className={`slider`}
        style={provideSliderAnimation(clickedOngoing, ongoing)}
      >
        <div
          className="slider__circle-wrapper"
          onClick={onSliderClick}
          style={provideCircleAnimation(clickedOngoing, ongoing)}
          onBlur={onBlur}
        >
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};
export { TextInput, TextArea, SliderButton };
