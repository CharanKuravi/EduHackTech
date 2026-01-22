import React from "react";
import { useParams } from "react-router-dom";
import {
  PlayCircle,
  Clock,
  BarChart,
  Layers,
  CheckCircle,
} from "lucide-react";

/*
  🔥 IMPORTANT:
  In real app this data will come from BACKEND using courseId.
  Example:
    GET /api/courses/:id
*/
const demoCourse = {
  id: 1,
  title: "Full Stack Web Development",
  description:
    "Learn to build complete web applications using React, Node.js, Express and MongoDB. This course takes you from beginner to job-ready developer.",
  level: "Beginner",
  duration: "40 Hours",
  modules: [
    "Introduction & Setup",
    "HTML, CSS & Git",
    "JavaScript Deep Dive",
    "React Fundamentals",
    "Backend with Node & Express",
    "MongoDB & Authentication",
    "Final Full Stack Project",
  ],
};

const CoursePage = () => {
  const { id } = useParams(); // 🔥 will be used for backend API later

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-4xl font-extrabold">{demoCourse.title}</h1>
          <p className="mt-3 text-blue-100 max-w-3xl">
            {demoCourse.description}
          </p>

          {/* Course Stats */}
          <div className="flex flex-wrap gap-6 mt-6 text-sm">
            <Stat icon={<Layers />} label={`${demoCourse.modules.length} Modules`} />
            <Stat icon={<Clock />} label={demoCourse.duration} />
            <Stat icon={<BarChart />} label={demoCourse.level} />
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">

        {/* ===== VIDEO PLAYER ===== */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-2xl h-[360px] flex items-center justify-center text-white relative overflow-hidden">
            <PlayCircle className="w-20 h-20 opacity-80" />
            <span className="absolute bottom-4 right-4 text-xs bg-white/20 px-3 py-1 rounded-full">
              Preview Lesson
            </span>
          </div>

          {/* What you'll learn */}
          <div className="bg-white rounded-2xl shadow p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">What you’ll learn</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <li>✔ Build full stack web apps</li>
              <li>✔ REST APIs with Node.js</li>
              <li>✔ MongoDB database design</li>
              <li>✔ Authentication & security</li>
              <li>✔ Deploy real projects</li>
              <li>✔ Hackathon ready skills</li>
            </ul>
          </div>
        </div>

        {/* ===== MODULE LIST ===== */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="text-lg font-bold mb-4">Course Modules</h3>

          <ul className="space-y-3">
            {demoCourse.modules.map((m, i) => (
              <li
                key={i}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-sm">{m}</span>
                <CheckCircle className="w-5 h-5 text-gray-300" />
              </li>
            ))}
          </ul>

          {/* Enroll Button */}
          <button className="mt-6 w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Enroll & Start Learning
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Courses are managed by Admin
          </p>
        </div>
      </section>
    </div>
  );
};

/* ===== SMALL STAT COMPONENT ===== */
const Stat = ({ icon, label }) => (
  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
    {icon}
    <span>{label}</span>
  </div>
);

export default CoursePage;
