import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  ShieldCheck,
  User,
  GraduationCap,
  BookUser,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      label: "Company",
      icon: <Briefcase className="w-5 h-5" />,
      path: "/register-company",
    },
    {
      label: "SCAD Office",
      icon: <ShieldCheck className="w-5 h-5" />,
      path: "/scad-dashboard",
    },
    {
      label: "Student",
      icon: <User className="w-5 h-5" />,
      path: "/student-dashboard",
    },
    {
      label: "PRO Student",
      icon: <GraduationCap className="w-5 h-5" />,
      path: "/pro-dashboard",
    },
    {
      label: "Faculty Member",
      icon: <BookUser className="w-5 h-5" />,
      path: "/faculty-dashboard",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 flex items-center justify-center px-4 py-20">
      <section className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-12 max-w-4xl w-full text-center border-t-8 border-blue-800 animate-fadeIn">
        <span className="text-sm uppercase tracking-widest text-blue-700 bg-blue-100 px-4 py-1 rounded-full font-semibold mb-4 inline-block">
          Welcome to
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight leading-snug drop-shadow-lg">
          SCAD Internships Portal
        </h1>
        <p className="text-blue-800 text-md sm:text-lg mb-10 font-medium max-w-xl mx-auto leading-relaxed">
          Select your role to begin exploring or managing internships.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() => navigate(role.path)}
              className="flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 text-md font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
            >
              {role.icon}
              {role.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
