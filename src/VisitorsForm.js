import React, { useState, useEffect } from "react";
import "./VisitorsForm.css";
import axios from "axios";

const VisitorsForm = () => {
  const [formData, setFormData] = useState({
    visitors_name: "",
    visitors_address: "",
    whom_to_see: "",
    any_appointment: false,
    type_of_visit: "",
    purpose_of_visit: "",
  });
  const [staffList, setStaffList] = useState([]);

  // Fetch staff list from the API
  useEffect(() => {
    axios
      .get("https://ibile-fd.onrender.com/api/v1/staffs")
      .then((response) => {
        console.log(response);
        setStaffList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching staff:", error);
      });
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Trim the value if it's a text input or textarea and not the 'purpose_of_visit' field
    const sanitizedValue =
      name === "purpose_of_visit"
        ? value
        : type === "text" || type === "textarea"
        ? value.trim()
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : sanitizedValue,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit the form data to your backend API
    axios
      .post("https://ibile-fd.onrender.com/api/v1/visitors-form", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Visitor form submitted successfully");

        setFormData({
          visitors_name: "",
          visitors_address: "",
          whom_to_see: "",
          any_appointment: false,
          type_of_visit: "",
          purpose_of_visit: "",
        });
      })
      .catch((error) => {
        alert("Error submitting form");
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <img
            src="https://i.postimg.cc/nrZBsZYQ/Image-1.jpg"
            alt="Logo"
            className="logo"
          />
          <h1>IBILE HOLDINGS LIMITED VISITORS FORM</h1>
        </div>

        <div>
          <label htmlFor="visitors_name">Visitor's Name:</label>
          <input
            type="text"
            id="visitors_name"
            name="visitors_name"
            value={formData.visitors_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="visitors_address">Visitor's Address:</label>
          <input
            type="text"
            id="visitors_address"
            name="visitors_address"
            value={formData.visitors_address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="whomToSee">Whom to See:</label>
          <select
            id="whomToSee"
            name="whom_to_see"
            value={formData.whom_to_see}
            onChange={handleChange}
            required
          >
            <option value="">Select a staff member</option>
            {Array.isArray(staffList) &&
              staffList.map((staff) => (
                <option key={staff.first_name} value={staff.first_name}>
                  {`${staff.first_name} ${staff.last_name}`} {/* Full name */}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="any_appointment">Do you have an appointment?</label>
          <input
            type="checkbox"
            id="any_appointment"
            name="any_appointment"
            checked={formData.any_appointment}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="type_of_visit">Type of Visit:</label>
          <select
            id="type_of_visit"
            name="type_of_visit"
            value={formData.type_of_visit}
            onChange={handleChange}
            required
          >
            <option value="">Select Type of Visit</option>
            <option value="official">Official</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div>
          <label htmlFor="purpose_of_visit">Purpose of Visit:</label>
          <input
            type="text"
            id="purpose_of_visit"
            name="purpose_of_visit"
            value={formData.purpose_of_visit}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default VisitorsForm;
