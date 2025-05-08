import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import emailjs from "emailjs-com";

const ScadDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("companies")) || [];
    setCompanies(stored);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...companies];
    const company = updated[index];
    company.status = newStatus;
    setCompanies(updated);
    localStorage.setItem("companies", JSON.stringify(updated));

    const SERVICE_ID = "service_tu9ez8b";
    const TEMPLATE_ID = "template_0yl28i8";
    const PUBLIC_KEY = "lf73iW75ilvfWLf3G";

    const templateParams = {
      to_email: company.email,
      to_name: company.name,
      message: `Your application has been ${newStatus.toLowerCase()}.`,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((res) => {
        console.log("✅ Email sent", res.status, res.text);
        alert(`📧 Email sent to ${company.email}: Application ${newStatus}`);
      })
      .catch((err) => {
        console.error("❌ Email error:", err);
        alert("Failed to send email. Check console for details.");
      });
  };

  const industries = ["All", ...new Set(companies.map((c) => c.industry))];

  const filteredCompanies = companies.filter((company) => {
    const matchesName = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === "All" || company.industry === industryFilter;
    return matchesName && matchesIndustry;
  });

  return (
    <Layout>
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 text-center">
          SCAD Admin Dashboard
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="w-full sm:w-60 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 bg-white"
          >
            {industries.map((industry, i) => (
              <option key={i} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-xl p-6">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="px-4 py-2 text-left">Company Name</th>
                <th className="px-4 py-2 text-left">Industry</th>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{company.name}</td>
                  <td className="px-4 py-2">{company.industry}</td>
                  <td className="px-4 py-2">{company.size}</td>
                  <td className="px-4 py-2">{company.email}</td>
                  <td className="px-4 py-2">
                    <select
                      value={company.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className="border rounded px-2 py-1 bg-white focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() => alert(JSON.stringify(company, null, 2))}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    No matching companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ScadDashboard;
