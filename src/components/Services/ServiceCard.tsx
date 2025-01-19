import React from 'react';
import { IconType } from 'react-icons';

interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
  color: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, color }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${color} shadow-lg mb-4`}>
        <Icon className="text-white text-4xl" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 leading-tight text-center">{title}</h3>
      <p className="text-gray-600 mt-3 text-center text-sm sm:text-base">{description}</p>
    </div>
  );
};

export default ServiceCard;

