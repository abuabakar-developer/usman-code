"use client";

import { useState } from "react";

const JoinUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Hide the form after 3 seconds
    setTimeout(() => {
      setFormVisible(false);
    }, 3000);
  };

  return (
    <section className="relative py-16 bg-gray-100 text-gray-800">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-50 via-white to-purple-50 opacity-70"></div>
        <svg
          className="absolute w-full h-auto top-0 -translate-y-1/2 pointer-events-none"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#f3f4f6"
            fillOpacity="1"
            d="M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,218.7C672,213,768,203,864,186.7C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
            Join Us Today!
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Let us connect with you. Fill out the form, and we’ll get back to you soon!
          </p>
        </div>

        {/* Form Section */}
        {formVisible && (
          <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg md:max-w-2xl mx-auto">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="mt-2 p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-2 p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Message Input */}
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className="mt-2 p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-purple-500">
                  Thank you for reaching out!
                </h3>
                <p className="mt-4 text-gray-600">
                  We will get back to you soon. Have a wonderful day!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JoinUs;
