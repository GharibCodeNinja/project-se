import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    duration: "",
    isPaid: "unpaid",
    salary: "",
    skills: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("companyJobs")) || [];
    setJobs(stored);
  }, []);

  const saveJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    localStorage.setItem("companyJobs", JSON.stringify(updatedJobs));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...jobs];
    if (editIndex !== null) {
      updated[editIndex] = formData;
    } else {
      updated.push(formData);
    }
    saveJobs(updated);
    setFormData({
      duration: "",
      isPaid: "unpaid",
      salary: "",
      skills: "",
      description: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(jobs[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = jobs.filter((_, i) => i !== index);
    saveJobs(updated);
  };

  return (
    <Layout>
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-4xl animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-blue-800 text-center mb-10">
          Manage Internship Job Posts
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-12">
          <div>
            <label className="block font-medium mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Paid or Unpaid</label>
            <select
              name="isPaid"
              value={formData.isPaid}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {formData.isPaid === "paid" && (
            <div>
              <label className="block font-medium mb-1">Expected Salary (EGP)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block font-medium mb-1">Skills Required</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows="2"
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
          >
            {editIndex !== null ? "Update Job Post" : "Create Job Post"}
          </button>
        </form>

        {/* Job List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Posted Jobs</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-600">No job posts yet.</p>
          ) : (
            jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-sm rounded-lg p-5 space-y-2"
              >
                <p><strong>Duration:</strong> {job.duration}</p>
                <p><strong>Status:</strong> {job.isPaid}</p>
                {job.isPaid === "paid" && <p><strong>Salary:</strong> {job.salary} EGP</p>}
                <p><strong>Skills:</strong> {job.skills}</p>
                <p><strong>Description:</strong> {job.description}</p>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CompanyJobs;
