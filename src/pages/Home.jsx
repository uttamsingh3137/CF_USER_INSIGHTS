// Import necessary dependencies
// import React from 'react';

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen text-gray-800 bg-white">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-6">Welcome to CF User Insights</h2>
          <p className="text-xl mb-8">Analyze Codeforces profiles, detect plagiarisms, and uncover insightful trends effortlessly.</p>
          <a href="#features" className="px-6 py-3 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">Explore Features</a>
        </div>
        <hr className="border-gray-300 mt-16" />
      </section>
      

      {/* Features Section */}
      <section id="features" className="py-12 pt-0">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div id="plagiarism-check" className="shadow-lg rounded-lg p-8 text-center border border-gray-300">
              <h3 className="text-2xl font-bold mb-4">Plagiarism Checker</h3>
              <p>Detect if a user has been flagged for plagiarism and get detailed information about their flagged submissions.</p>
              <Link to="/plag" className="mt-6 inline-block px-5 py-3 rounded bg-blue-500 text-white hover:bg-blue-600 transition">Learn More</Link>
            </div>
            {/* Feature 2 */}
            <div id="profile-overview" className="shadow-lg rounded-lg p-8 text-center border border-gray-300">
              <h3 className="text-2xl font-bold mb-4">Profile Overview</h3>
              <p>Visualize user statistics including question difficulty ratings, solved problems, and recent contest performances.</p>
              <Link to="/profile" className="mt-6 inline-block px-5 py-3 rounded bg-blue-500 text-white hover:bg-blue-600 transition">Learn More</Link>
            </div>
            {/* Feature 3 */}
            <div id="problem-insights" className="shadow-lg rounded-lg p-8 text-center border border-gray-300">
              <h3 className="text-2xl font-bold mb-4">Problem Insights</h3>
              <p>Filter solved problems based on difficulty levels and tags to identify patterns and improve your preparation strategy.</p>
              <Link to="/problems" className="mt-6 inline-block px-5 py-3 rounded bg-blue-500 text-white hover:bg-blue-600 transition">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
