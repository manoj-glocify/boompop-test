"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    owner1: "",
    owner2: "",
    owner3: "",
    email: "",
  });

  const [loading, setLoading] = useState(false); // State to manage loading

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loader

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert("Form submitted successfully!");
      console.log(result);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an error submitting the form.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#000"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: loading ? "#ccc" : "#007BFF", // Grey when loading
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: loading ? "not-allowed" : "pointer", // Disable cursor when loading
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loaderStyle = {
    border: "3px solid #f3f3f3",
    borderTop: "3px solid #007BFF",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={formStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Submit Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Name of Owner 1:</label>
          <input
            type="text"
            name="owner1"
            value={formData.owner1}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Name of Owner 2:</label>
          <input
            type="text"
            name="owner2"
            value={formData.owner2}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Name of Owner 3:</label>
          <input
            type="text"
            name="owner3"
            value={formData.owner3}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? <div style={loaderStyle}></div> : "Submit"}
        </button>
      </form>
    </div>
  );
}
