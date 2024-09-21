import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./RegistrationPage.module.css";

export const RegistrationPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    source: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const validateForm = () => {
    if (formData.fullName.length < 3) {
      return "Full name must be at least 3 characters long.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Email is invalid.";
    }
    if (new Date(formData.dob) > new Date()) {
      return "Date of birth cannot be in the future.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      dob: formData.dob,
      referral: formData.source,
    };

    try {
      await axios.post(
        // `http://localhost:5000/api/events/${eventId}/register`,
        `https://event-registration-backend-qbi2.onrender.com/api/events/${eventId}/register`,
        payload
      );

      setFormData({
        fullName: "",
        email: "",
        dob: "",
        source: "",
      });

      setSuccess("Registration successful!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.formContainer}>
        <h2 className={css.title}>Register for Event</h2>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <DatePicker
            className={css.datePicker}
            selected={formData.dob}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            placeholderText="Date of Birth"
            required
          />
          <fieldset>
            <legend>Where did you hear about this event?</legend>
            <div className={css.btnInput}>
              <label>
                <input
                  type="radio"
                  name="source"
                  value="Social media"
                  checked={formData.source === "Social media"}
                  onChange={handleChange}
                  required
                />
                Social media
              </label>
              <label>
                <input
                  type="radio"
                  name="source"
                  value="Friends"
                  checked={formData.source === "Friends"}
                  onChange={handleChange}
                  required
                />
                Friends
              </label>
              <label>
                <input
                  type="radio"
                  name="source"
                  value="Found myself"
                  checked={formData.source === "Found myself"}
                  onChange={handleChange}
                  required
                />
                Found myself
              </label>
            </div>
          </fieldset>
          <button type="submit">Register</button>
        </form>

        {error && <p className={css.error}>{error}</p>}
        {success && <p className={css.success}>{success}</p>}
      </div>
    </div>
  );
};
