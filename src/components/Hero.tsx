'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  const handleBookAppointmentClick = () => {
    router.push('/book-appointment');
  };
  
  const handleLearnMoreClick = () => {
    router.push('/aboutus');
  };
  return (
    <section className="relative min-h-[60vh] lg:min-h-[50vh] xl:min-h-[45vh] flex items-center bg-gradient-to-r from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 lg:px-6 py-16 flex flex-col md:flex-row items-center">
        {/* Hero Text Section */}
        <div className="lg:w-1/2 space-y-6 z-10 lg:pr-8 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
            Your Health, <span className="text-green-600">Your Way</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700">
            Find and book appointments with top doctors near you in just a few clicks. Simple, fast, and convenient healthcare solutions at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center md:justify-start">
            <button
              className="px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition transform hover:scale-105"
              onClick={handleBookAppointmentClick}
            >
              Book Appointment
            </button>
            <button
              className="px-8 py-4 border-2 border-green-600 text-green-600 text-lg font-medium rounded-lg shadow-md hover:bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-300 transition transform hover:scale-105"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </button>

          </div>
        </div>

        {/* Hero Image Section */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center items-center">
          <div className="relative overflow-hidden rounded-3xl shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <Image
              src="/ab.webp"
              alt="Medical Hero"
              width={700}
              height={400}
              className="object-cover rounded-xl w-full h-auto max-h-[500px] sm:max-h-[400px] lg:max-h-[350px] xl:max-h-[350px] transition-all duration-500 ease-in-out"
            />
          </div>
          {/* Decorative Shapes */}
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-green-300 opacity-30 rounded-full blur-lg"></div>
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-blue-300 opacity-30 rounded-full blur-lg"></div>
        </div>
      </div>
    </section>
  );
};
         
export default HeroSection;






