import React from "react";
import moment from "moment";

import "./PdfWorkExperience.scss";

const PdfWorkExperience = ({ formValues }) => {
  const renderedExperience = formValues.workExperience.map((object, index) => {
    //destructure values from the getgo
    const {
      description,
      endDate,
      ongoing,
      startDate,
      title,
      employer: { name, city, state, zipCode },
    } = object;

    const startDateString = moment(startDate).format("MMMM D, YYYY");
    const endDateString = moment(endDate).format("MMMM D, YYYY");

    return (
      <div className="Pdf__listing" key={index}>
        <div className="Pdf__space-between">
          <div className="PdfWorkExperience__title-employer">
            <div className="Pdf__flex">
              <p className="Pdf__title">{name}</p>
              <p className="Pdf__sub-title">{`(${title})`}</p>
            </div>
            <p className="Pdf__address">{`${city}, ${state} ${zipCode}`}</p>
          </div>
          <p className="Pdf__dates">
            {ongoing
              ? `${startDateString}-Present`
              : `${startDateString} - ${endDateString}`}
          </p>
        </div>
        <div className="PdfWorkExperience__description">{description}</div>
      </div>
    );
  });
  return (
    <div className="PdfWorkExperience">
      <h2 className="pdf-secondary-heading">Work Experience</h2>
      {renderedExperience}
    </div>
  );
};

export default PdfWorkExperience;
