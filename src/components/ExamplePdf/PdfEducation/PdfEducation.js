import React from "react";
import moment from "moment";

import "./PdfEducation.scss";

const PdfEducation = ({ formValues }) => {
  const renderedEducation = formValues.education.map((object, index) => {
    const {
      degree,
      endDate,
      field,
      ongoing,
      startDate,
      school: { name, city, state, zipCode },
    } = object;

    const startDateString = moment(startDate).format("MMMM D, YYYY");
    const endDateString = moment(endDate).format("MMMM D, YYYY");

    return (
      <div className="Pdf__listing" key={index}>
        <div className="Pdf__space-between">
          <div className="PdfEducation__school">
            <p className="Pdf__title">{name}</p>
            <p className="PdfEducation__address">{`${city}, ${state} ${zipCode}`}</p>
          </div>

          <p className="Pdf__dates">
            {ongoing
              ? `${startDateString} - Preset`
              : `${startDateString} - ${endDateString}`}
          </p>
        </div>
        <ul className="PdfEducation__field-degree">
          <li className="PdfEducation__field">{`Field: ${field}`}</li>
          <li className="PdfEducation__degree">{`Degree: ${degree}`}</li>
        </ul>
      </div>
    );
  });

  return (
    <div className="PdfEducation">
      <h2 className="pdf-secondary-heading">Education</h2>
      {renderedEducation}
    </div>
  );
};

export default PdfEducation;
