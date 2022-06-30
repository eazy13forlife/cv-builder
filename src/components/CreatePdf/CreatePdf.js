import React from "react";

import "./CreatePdf.scss";

const CreatePdf = () => {
  return (
    <div className="CreatePdf">
      <h2 className="heading-primary">Create Your CV</h2>
      <button className="button button--secondary" type="submit">
        Preview Pdf
      </button>
    </div>
  );
};

export default CreatePdf;
