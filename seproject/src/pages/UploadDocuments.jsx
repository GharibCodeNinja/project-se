import React, { useState } from 'react';
import Layout from "../components/layout";

const UploadDocuments = () => {
  const [documents, setDocuments] = useState({
    crFile: null,
    taxCard: null,
    insurance: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setDocuments({ ...documents, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Uploaded Documents:', documents);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border-t-4 border-blue-500 animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-2">
          Upload Company Documents
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Supported formats: PDF, JPG, PNG
        </p>

        {/* CR File */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commercial Registration (CR) File
          </label>
          <input
            type="file"
            name="crFile"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg file:bg-blue-100 file:text-blue-700 file:font-semibold file:border-0 file:py-2 file:px-4 hover:file:bg-blue-200"
          />
        </div>

        {/* Tax Card */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tax Card
          </label>
          <input
            type="file"
            name="taxCard"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg file:bg-yellow-100 file:text-yellow-700 file:font-semibold file:border-0 file:py-2 file:px-4 hover:file:bg-yellow-200"
          />
        </div>

        {/* Insurance */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Papers
          </label>
          <input
            type="file"
            name="insurance"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg file:bg-green-100 file:text-green-700 file:font-semibold file:border-0 file:py-2 file:px-4 hover:file:bg-green-200"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
        >
          Upload Documents
        </button>

        {/* Feedback */}
        {submitted && (
          <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-green-700 shadow-sm">
            <p className="font-medium text-sm text-center">
              ✅ Documents uploaded successfully!
            </p>
          </div>
        )}
      </form>
    </Layout>
  );
};

export default UploadDocuments;
