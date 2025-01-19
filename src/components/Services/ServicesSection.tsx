// components/ServicesSection.tsx
import React from 'react';
import ServiceCard from './ServiceCard';
import { FaClinicMedical, FaPills, FaBaby, FaSyringe } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';
import { MdCoronavirus } from 'react-icons/md';
import Link from 'next/link'; // Import Link from next/link

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: FaClinicMedical,
      title: 'Home Lab Services',
      description: 'Get diagnostic tests conveniently at your home.',
      color: 'bg-blue-600',
      link: '/lab', // Add link for other services
    },
    {
      icon: FaPills,
      title: 'Home Pharmacy Services',
      description: 'Order medicines and have them delivered to your door.',
      color: 'bg-green-600',
      link: '/medicines', // Add link for other services
    },
    {
      icon: GiHealthNormal,
      title: 'Home Physio Services',
      description: 'Expert physiotherapy care at the comfort of your home.',
      color: 'bg-purple-600',
      link: '/rehabilitationServices', // Add link for other services
    },
    {
      icon: FaSyringe,
      title: 'Home Vaccination Services',
      description: 'We provide safe and reliable vaccinations for all ages.',
      color: 'bg-orange-600',
      link: '/vaccination', // This is the link to the vaccination page
    },
    {
      icon: FaBaby,
      title: 'Mother & Baby Care Plan',
      description: 'Comprehensive care plans for both mother and baby.',
      color: 'bg-pink-600',
      link: '/mothercare', // Add link for other services
    },
    {
      icon: MdCoronavirus,
      title: 'COVID Clinic',
      description: 'Get tested and treated for COVID-19 at home.',
      color: 'bg-teal-600',
      link: '/tele', // Add link for other services
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center">Our Services</h2>
        <p className="text-gray-700 text-center mt-4 mb-12 max-w-2xl mx-auto text-lg">
          We offer a variety of medical services that bring quality care directly to your home.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Link key={index} href={service.link}> {/* Wrap each service card in a Link */}
              <div>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  color={service.color}
                  link={service.link}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;



