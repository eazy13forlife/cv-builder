import React, { useState, useEffect } from "react";

import Header from "../Header/Header.js";
import Education from "../Education/Education.js";
import PersonalInfo from "../PersonalInfo/PersonalInfo.js";
import WorkExperience from "../WorkExperience/WorkExperience.js";
import CreatePdf from "../CreatePdf/CreatePdf.js";
import ExamplePdf from "../ExamplePdf/ExamplePdf.js";

import {
  changeInfoFirstLevel,
  changeInfoSecondLevel,
  onErrorsInputChange,
} from "../formValuesFunctions.js";

//personalinfo data
const personal = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  streetAddress: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
};

//education data
const education = {
  school: {
    name: "",
    city: "",
    state: "",
    zipCode: "",
  },
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  ongoing: false,
};

//work experience data
const workExperience = {
  employer: {
    name: "",
    city: "",
    state: "",
    zipCode: "",
  },
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  ongoing: false,
};

const App = () => {
  //formValues equals an object of all the data in our form. Components will render a list of their individual data
  const [formValues, setFormValues] = useState({
    personal: [{ ...personal, streetAddress: { ...personal.streetAddress } }],
    education: [{ ...education, school: { ...education.school } }],
    workExperience: [
      { ...workExperience, employer: { ...workExperience.employer } },
    ],
  });

  const [errors, setErrors] = useState({
    personal: [{ ...personal, streetAddress: { ...personal.streetAddress } }],
    education: [
      { ...education, school: { ...education.school }, ongoing: null },
    ],
    workExperience: [
      {
        ...workExperience,
        employer: { ...workExperience.employer },
        ongoing: null,
      },
    ],
  });

  const [submitted, setSubmitted] = useState(false);
  const [clickedOngoingEdu, setClickedOngoingEdu] = useState([]); //state for whether the ongoing button has been clicked for each education object
  const [clickedOngoingWork, setClickedOngoingWork] = useState([]); //state for whether the ongoing button has been clicked for each workExperience  object
  const [showPdf, setShowPdf] = useState(false);

  //whenever formValues.education changes see if there is a new object of data in there. if my clickedOngoingState doesnt have any value for that index where this new object is, it means set the value of that index to null, because it hasnt been clicked yet. not false, otherwise our animation will run immediately, which we dont want.null wont make it run.
  useEffect(() => {
    console.log("hey");
    const ongoing = [...clickedOngoingEdu]; // initially equals all the values in clickedOngoing
    formValues.education.forEach((object, index) => {
      if (ongoing[index] === undefined) {
        //meaning nothing is in that index
        ongoing[index] = null; //put null, meaning hasn't been clicked yet
      }
    });
    setClickedOngoingEdu(ongoing);
  }, [formValues.education]);

  useEffect(() => {
    const ongoing = [...clickedOngoingWork]; // initially equals all the values in clickedOngoing
    formValues.workExperience.forEach((object, index) => {
      if (ongoing[index] === undefined) {
        ongoing[index] = null;
      }
    });

    setClickedOngoingWork(ongoing);
  }, [formValues.workExperience]);

  //function that checks for errors as a user enters form data
  const onErrorsInfoChange = (
    e,
    index,
    mainCategory,
    fieldName,
    innerField
  ) => {
    onErrorsInputChange(
      e,
      errors,
      setErrors,
      index,
      mainCategory,
      fieldName,
      innerField,
      formValues
    );
  };

  //function for when an input changes value. We call changeInfoFirstLevel if the property isnt nested.
  const onInfoChange = (e, mainCategory, individualIndex, fieldName) => {
    changeInfoFirstLevel(
      e,
      formValues,
      setFormValues,
      mainCategory,
      individualIndex,
      fieldName
    );
  };

  //fiunction for when an input changes value. We call changeInfoSecondLevel if the property is nested once.
  const onInfoChangeSecondLevel = (
    e,
    mainCategory,
    individualIndex,
    fieldName,
    innerFieldName
  ) => {
    changeInfoSecondLevel(
      e,
      formValues,
      setFormValues,
      mainCategory,
      individualIndex,
      fieldName,
      innerFieldName
    );
  };

  //function to add an education object into our education array
  const onAddEducation = () => {
    const newFormValues = {
      ...formValues,
      education: [
        ...formValues.education,
        { ...education, school: { ...education.school } },
      ],
    };
    const newErrorValues = {
      ...errors,
      education: [
        ...errors.education,
        { ...education, school: { ...education.school }, ongoing: null },
      ],
    };
    setFormValues(newFormValues);
    setErrors(newErrorValues);
  };

  //funciton to add a workExperience object into our workExperience array
  const onAddWorkExperience = () => {
    const newFormValues = {
      ...formValues,
      workExperience: [
        ...formValues.workExperience,
        { ...workExperience, employer: { ...workExperience.employer } },
      ],
    };
    const newErrorValues = {
      ...errors,
      workExperience: [
        ...errors.workExperience,
        {
          ...workExperience,
          employer: { ...workExperience.employer },
          ongoing: null,
        },
      ],
    };
    setFormValues(newFormValues);
    setErrors(newErrorValues);
  };

  //function to remove an education/workExperience object when  a person clicks delete
  const remove = (mainCategory, specificIndex) => {
    const newFormValues = { ...formValues };
    newFormValues[mainCategory] = newFormValues[mainCategory].filter(
      (object, index) => {
        if (index !== specificIndex) {
          return true;
        } else {
          return false;
        }
      }
    );

    const newErrorValues = { ...errors };
    newErrorValues[mainCategory] = newErrorValues[mainCategory].filter(
      (object, index) => {
        if (index !== specificIndex) {
          return true;
        } else {
          return false;
        }
      }
    );
    setFormValues(newFormValues);
    setErrors(newErrorValues);
  };

  //function to call when our slider is clicked,changing its value.
  const onSliderClick = (mainCategory, index) => {
    const newFormValues = { ...formValues };
    newFormValues[mainCategory][index].ongoing =
      !newFormValues[mainCategory][index].ongoing;

    setFormValues(newFormValues);
  };

  //recursve function to call(inside onFormPreview) to record all values in our errors state and put them inside an array. We have to add item does not equal null, because we cant use Object.values with a null.
  const addToArray = (item, newArray) => {
    if (typeof item === "object" && item !== null) {
      const newArray2 = Object.values(item);
      newArray2.forEach((item) => {
        addToArray(item, newArray);
      });
    } else {
      //if item is equal to null, that means there is no error. So, we dont want to push in null in our newArray. We want our newArray to be empty if there are no errors so we only push item if something is an error.
      if (item !== null) {
        newArray.push(item);
      }
      return;
    }
  };

  //when submitted is true, meaning each input has checked for error, we will compile all errors and check to see if pdf should be shown or not
  useEffect(() => {
    if (submitted) {
      const errorsResult = [];
      Object.values(errors).forEach((item) => {
        addToArray(item, errorsResult);
      });
      if (!errorsResult.length) {
        setShowPdf(true);
      }
      setSubmitted(false);
    }
  }, [submitted]);

  //function to call when user clicks preview form.Just sets setSubmitted to true, so each input can check for error
  const onFormPreview = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const onFormGoBackClick = () => {
    setSubmitted(false);
    setShowPdf(false);
  };

  const renderForm = () => {
    return (
      <>
        <Header />
        <form
          action="urlofthepageontheserverthatthisformwillgoto"
          method="POST"
          className="Form"
          onSubmit={onFormPreview}
        >
          <PersonalInfo
            onInputChange={onInfoChange}
            formValues={formValues}
            onInputChange2={onInfoChangeSecondLevel}
            errors={errors}
            errorCheck={onErrorsInfoChange}
            submitted={submitted}
          />
          <Education
            onInputChange={onInfoChange}
            formValues={formValues}
            onInputChange2={onInfoChangeSecondLevel}
            errors={errors}
            errorCheck={onErrorsInfoChange}
            onAddEducation={onAddEducation}
            onSliderClick={onSliderClick}
            submitted={submitted}
            remove={remove}
            clickedOngoing={clickedOngoingEdu}
            setClickedOngoing={setClickedOngoingEdu}
          />
          <WorkExperience
            onInputChange={onInfoChange}
            formValues={formValues}
            onInputChange2={onInfoChangeSecondLevel}
            errors={errors}
            errorCheck={onErrorsInfoChange}
            onAddWorkExperience={onAddWorkExperience}
            onSliderClick={onSliderClick}
            submitted={submitted}
            remove={remove}
            clickedOngoing={clickedOngoingWork}
            setClickedOngoing={setClickedOngoingWork}
          />
          <CreatePdf />
        </form>
      </>
    );
  };

  return (
    <div className="App">
      {showPdf ? (
        <ExamplePdf onGoBackClick={onFormGoBackClick} formValues={formValues} />
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default App;
