import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    bio: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData); // Debugging
      const response = await axios.post("http://localhost:3000/signup", formData);
      console.log("Server Response:", response.data); // Debugging
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error); // Debugging
      alert(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <>
      <div className="container-lg mt-5 custome">
      <h1 className="text-center myloginsignup">Sign Up for Crunchily</h1><br></br>
      <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="text"
            className="form-control" placeholder="Enter bio (describe you in short 4 to 5 words)"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </form>
      <br></br>
    </div><br></br><br></br>
    </>
  );
};

export default Signup;