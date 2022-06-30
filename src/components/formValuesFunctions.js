import moment from "moment";

//updates our formValues state with the new value for when an input changes value.
const changeInfoFirstLevel = (
  e,
  formValues,
  updateFormValues,
  category, //the main property we are changing,eg. personalInfo, education, workExperience, equals an array of objects.
  individualIndex, //the index of the item inside the array
  fieldName //the property inside the object we are changing
) => {
  const newFormValues = { ...formValues };
  newFormValues[category][individualIndex][fieldName] = e.target.value;

  updateFormValues(newFormValues);
};

//updates our formValues state with the new value for when an input changes value. Used for when the property is nested once.
const changeInfoSecondLevel = (
  e,
  formValues,
  updateFormValues,
  mainCategory,
  individualIndex,
  fieldName,
  innerFieldName //the property inside the property of the main object that we are changing
) => {
  const newFormValues = { ...formValues };
  newFormValues[mainCategory][individualIndex][fieldName][innerFieldName] =
    e.target.value;
  updateFormValues(newFormValues);
};

//Error Checking
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const checkEndDateError = (endDate, formValues, mainCategory, index) => {
  const startDate = formValues[mainCategory][index]["startDate"];
  const startDateUnix = moment(startDate).valueOf();
  const endDateUnix = moment(endDate).valueOf();
  if (startDateUnix > endDateUnix) {
    return "End date cannot be before start date";
  } else {
    return null;
  }
};

const validatePhoneNumber = (value) => {
  const re =
    /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/;
  if (!re.test(value)) {
    return false;
  } else {
    return true;
  }
};

const validateZipCode = (value) => {
  if (isNaN(Number(value))) {
    return false;
  } else {
    return true;
  }
};

//looks at the value of whatever has been inputted and checks to see if it aligns with an error. if it does, it sets the error for that property in errors state equal to the error so input can display it. Otherwise, error equals null.
const onErrorsInputChange = (
  value,
  errorsValue,
  setErrorsValue,
  index,
  mainCategory,
  fieldName,
  innerFieldName,
  formValues
) => {
  let errorMessage = null;
  const newErrors = { ...errorsValue };

  //ongoing has no value
  if (!value & (fieldName !== "ongoing")) {
    errorMessage = "Required";
  } else if (fieldName === "email") {
    errorMessage = validateEmail(value) ? null : "Invalid Email";
  } else if (fieldName === "endDate") {
    if (errorsValue[mainCategory][index]["startDate"] === null) {
      errorMessage = checkEndDateError(value, formValues, mainCategory, index);
    }
    if (formValues[mainCategory][index]["ongoing"] === true) {
      errorMessage = null;
    }
  } else if (fieldName === "startDate") {
    if (formValues[mainCategory][index]["endDate"] !== "") {
      newErrors[mainCategory][index]["endDate"] = checkEndDateError(
        formValues[mainCategory][index]["endDate"],
        formValues,
        mainCategory,
        index
      );
    }
  } else if (fieldName === "phoneNumber") {
    errorMessage = validatePhoneNumber(value) ? null : "Invalid phone number";
  } else if (innerFieldName === "zipCode") {
    errorMessage = validateZipCode(value) ? null : "Invalid zip code";
  } else if (fieldName === "ongoing") {
    if (formValues[mainCategory][index]["ongoing"] === true) {
      newErrors[mainCategory][index]["endDate"] = null;
    } else {
      if (formValues[mainCategory][index]["endDate"] !== "") {
        const endDateValue = formValues[mainCategory][index]["endDate"];
        newErrors[mainCategory][index]["endDate"] = checkEndDateError(
          endDateValue,
          formValues,
          mainCategory,
          index
        );
      } else {
        newErrors[mainCategory][index]["endDate"] = "Required";
      }
    }
  }

  if (!innerFieldName) {
    newErrors[mainCategory][index][fieldName] = errorMessage;
  } else if (innerFieldName) {
    newErrors[mainCategory][index][fieldName][innerFieldName] = errorMessage;
  }

  setErrorsValue(newErrors);
};

export { changeInfoFirstLevel, changeInfoSecondLevel, onErrorsInputChange };
