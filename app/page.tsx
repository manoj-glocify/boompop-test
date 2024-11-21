"use client";

import React, { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    owner1: "",
    owner2: "",
    owner3: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Submit Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="owner1"
          value={formData.owner1}
          onChange={handleChange}
          placeholder="Name of Owner 1"
        />
        <input
          type="text"
          name="owner2"
          value={formData.owner2}
          onChange={handleChange}
          placeholder="Name of Owner 2"
        />
        <input
          type="text"
          name="owner3"
          value={formData.owner3}
          onChange={handleChange}
          placeholder="Name of Owner 3"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
