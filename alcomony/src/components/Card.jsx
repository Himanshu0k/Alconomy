// Card.jsx
import { Link } from "react-router-dom";

function Card({ title, description, route, icon }) {
  return (
    <Link
      to={route}
      className="block max-w-sm p-6 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl relative overflow-hidden group"
    >
      <div className="mb-6 text-4xl text-white w-16 h-16 mx-auto transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h5 className="mb-4 text-2xl font-bold text-white text-center">
        {title}
      </h5>
      <p className="text-base font-medium text-gray-300 text-center">
        {description}
      </p>

      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </Link>
  );
}

export default Card;
