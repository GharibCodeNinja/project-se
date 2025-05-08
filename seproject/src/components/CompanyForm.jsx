import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: '',
    email: '',
    logo: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const logoInputRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'logo') {
      const file = files[0];
      setFormData({ ...formData, logo: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveLogo = () => {
    setFormData({ ...formData, logo: null });
    if (logoInputRef.current) {
      logoInputRef.current.value = null;
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Company name is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.size) newErrors.size = 'Please select company size';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const existingCompanies = JSON.parse(localStorage.getItem("companies")) || [];

    const newCompany = {
      ...formData,
      status: "Pending", // Add status for SCAD tracking
    };

    const updatedCompanies = [...existingCompanies, newCompany];
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));

    setSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-tr from-indigo-100 via-white to-blue-100 min-h-screen flex justify-center items-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl border-t-4 border-blue-500"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
          Company Registration
        </h2>

        {/* Hide the form after submission */}
        {!submitted && (
          <>
            {/* Company Name */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. TechVision Ltd."
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Industry */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Industry</label>
              <input
                type="text"
                name="industry"
                placeholder="e.g. Software, Healthcare"
                value={formData.industry}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
            </div>

            {/* Company Size */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Size</option>
                <option value="small">Small (≤ 50 employees)</option>
                <option value="medium">Medium (51–100 employees)</option>
                <option value="large">Large (101–500 employees)</option>
                <option value="corporate">Corporate (> 500 employees)</option>
              </select>
              {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
            </div>

            {/* Company Logo Upload */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company Logo</label>
              <input
                type="file"
                name="logo"
                ref={logoInputRef}
                accept="image/*"
                onChange={handleChange}
                className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-800 hover:file:bg-pink-200"
              />
              {formData.logo && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="mt-2 text-sm text-red-600 hover:underline hover:text-red-700"
                >
                  Remove Logo
                </button>
              )}
            </div>

            {/* Company Email */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Official Company Email</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. hr@techvision.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
            >
              Register Company
            </button>
          </>
        )}

        {/* Success Panel */}
        {submitted && (
          <div className="mt-6 rounded-lg border border-blue-300 bg-blue-50 px-4 py-5 shadow-sm text-center">
            <p className="text-blue-700 font-medium text-md mb-4">
              Company registered successfully. What would you like to do next?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/upload-documents")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Upload Documents
              </button>
              <button
                onClick={() => navigate("/company-jobs")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Manage Job Posts
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CompanyForm;
