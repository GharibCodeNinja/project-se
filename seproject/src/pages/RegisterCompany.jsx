import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    size: "",
    email: "",
    logo: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const logoInputRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "logo" ? files[0] : value,
    });
  };

  const handleRemoveLogo = () => {
    setFormData({ ...formData, logo: null });
    if (logoInputRef.current) logoInputRef.current.value = null;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Company name is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.size) newErrors.size = "Please select company size";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const companies = JSON.parse(localStorage.getItem("companies")) || [];
    const updated = [...companies, { ...formData, status: "Pending" }];
    localStorage.setItem("companies", JSON.stringify(updated));
    setSubmitted(true);
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-md border-t-4 border-blue-600 shadow-2xl rounded-3xl p-10 animate-fadeIn"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-10 text-center">
          Company Registration
        </h2>

        {!submitted ? (
          <>
            {[
              { name: "name", label: "Company Name", type: "text", placeholder: "e.g. TechVision Ltd." },
              { name: "industry", label: "Industry", type: "text", placeholder: "e.g. Software, Healthcare" },
              { name: "email", label: "Official Company Email", type: "email", placeholder: "e.g. hr@techvision.com" },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[name] && <p className="text-sm text-red-500 mt-1">{errors[name]}</p>}
              </div>
            ))}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Size</option>
                <option value="small">Small (≤ 50 employees)</option>
                <option value="medium">Medium (51–100 employees)</option>
                <option value="large">Large (101–500 employees)</option>
                <option value="corporate">Corporate (&gt; 500 employees)</option>
              </select>
              {errors.size && <p className="text-sm text-red-500 mt-1">{errors.size}</p>}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
              <input
                type="file"
                name="logo"
                ref={logoInputRef}
                accept="image/*"
                onChange={handleChange}
                className="w-full text-gray-700 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
              {formData.logo && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Remove Logo
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 text-lg rounded-lg font-bold hover:bg-blue-800 transition"
            >
              Register Company
            </button>
          </>
        ) : (
          <div className="text-center space-y-6">
            <p className="text-blue-800 text-lg font-medium">
              ✅ Company registered successfully. What would you like to do next?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/upload-documents")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Upload Documents
              </button>
              <button
                onClick={() => navigate("/company-jobs")}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Manage Job Posts
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </form>
    </Layout>
  );
};

export default RegisterCompany;
