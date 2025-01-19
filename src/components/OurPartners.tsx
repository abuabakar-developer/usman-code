'use client';
import { useEffect } from "react";
import { FaCreditCard, FaPaypal, FaRegCreditCard } from "react-icons/fa";
import Link from "next/link";

const OurPartners = () => {
  useEffect(() => {
    const scrollContainer = document.getElementById("partners-scroll");

    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", () => {
      if (
        scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollLeft = 0;
      }
    });

    const scrollAmount = 200;
    const interval = setInterval(() => {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Partners</h2>
        </div>

        {/* Scrolling Section */}
        <div className="relative">
          <div
            id="partners-scroll"
            className="flex space-x-6 overflow-x-auto whitespace-nowrap py-6 scrollbar-hide"
          >
            {[1, 2, 3, 1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="partner-logo w-72 sm:w-80 md:w-96 lg:w-96 flex-shrink-0 bg-white flex items-center gap-4 shadow-lg transform hover:-translate-y-2 transition-all duration-300 px-6 py-6 rounded-xl"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 shadow-md">
                  {item === 1 && (
                    <FaCreditCard className="text-blue-500 w-10 h-10" />
                  )}
                  {item === 2 && (
                    <FaPaypal className="text-yellow-500 w-10 h-10" />
                  )}
                  {item === 3 && (
                    <FaRegCreditCard className="text-green-500 w-10 h-10" />
                  )}
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {item === 1 ? "Visa" : item === 2 ? "PayPal" : "MasterCard"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Trusted by millions worldwide.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/joinus">
            <button className="bg-yellow-500 text-green-900 px-6 py-3 rounded-full shadow-md hover:shadow-lg focus:outline-none transition-all hover:scale-105">
              Become a Partner
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;



