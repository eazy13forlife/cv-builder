import React from "react";

import PdfPersonal from "./PdfPersonal/PdfPersonal.js";
import PdfWorkExperience from "./PdfWorkExperience/PdfWorkExperience.js";
import PdfEducation from "./PdfEducation/PdfEducation.js";
import "./ExamplePdf.scss";

const ExamplePdf = ({ onGoBackClick, formValues }) => {
  return (
    <div className="Pdf">
      <button className="button button--primary" onClick={onGoBackClick}>
        Go Back
      </button>
      <PdfPersonal formValues={formValues} />
      <PdfEducation formValues={formValues} />
      <PdfWorkExperience formValues={formValues} />
    </div>
  );
};

export default ExamplePdf;
