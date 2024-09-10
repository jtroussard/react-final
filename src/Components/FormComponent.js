import React from "react";

const FormComponent = ({ formData, onChange, onSubmit, onCancel }) => {
  const handleChange = ({ target }) => {
    onChange({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
      <div className="form-group">
        <label htmlFor="front" className="font-weight-bold">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          rows="3"
          value={formData.front}
          onChange={handleChange}
          required
          placeholder="Enter the front content..."
        />
      </div>
      <div className="form-group">
        <label htmlFor="back" className="font-weight-bold">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          value={formData.back}
          onChange={handleChange}
          required
          placeholder="Enter the back content..."
        />
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button type="submit" className="btn btn-primary px-4">Submit</button>
        <button type="button" className="btn btn-secondary px-4" onClick={onCancel}>Done</button>
      </div>
    </form>
  );
};

export default FormComponent;
