import React from "react";

const Footer = ({ currentTarget }) => {
  return (
    <div className="mt-6 text-xs text-gray-600 ">
      <p className="text-sm text-gray-600">
        Click number:{" "}
        <span className="font-bold text-lg text-blue-600">{currentTarget}</span>
      </p>
    </div>
  );
};

export default Footer;
