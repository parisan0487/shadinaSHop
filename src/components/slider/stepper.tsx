import React from "react";
import { FaShoppingBag, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import clsx from "clsx";

const steps = [
  { id: 3, title: "پرداخت", icon: <FaCreditCard /> },
  { id: 2, title: "ارسال", icon: <FaMapMarkerAlt /> },
  { id: 1, title: "سبد خرید", icon: <FaShoppingBag /> },
];

const Stepper = ({ currentStep }) => {
  return (
    <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto mt-12 mb-12">
      {/* خط بین مراحل */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 z-0"></div>
      {steps.map((step, index) => (
        <div key={step.id} className="relative flex-1 flex justify-center">
          {/* نوار فعال بین مراحل */}
          {index > 0 && (
            <div
              className={clsx(
                "absolute top-1/2 left-0 h-1 transition-all duration-300",
                currentStep >= step.id ? "bg-pink-500" : "bg-gray-300",
                "w-full"
              )}
            ></div>
          )}
          {/* دایره مراحل */}
          <div
            className={clsx(
              "flex flex-col items-center justify-center text-center transition-all relative",
              "w-20 h-20 rounded-full border-4 p-4 bg-white z-10",
              currentStep >= step.id
                ? "border-pink-500 text-black"
                : "border-gray-300 text-gray-400"
            )}
          >
            <div className="text-2xl mb-1">{step.icon}</div>
            <span className="text-sm font-semibold">{step.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
