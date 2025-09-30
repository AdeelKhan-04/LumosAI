import React from "react";
import { PricingTable } from "@clerk/clerk-react";
function Pricing() {
  return (
    <div className="max-w-2xl mx-auto z-20 my-24">
      <div className="flex flex-col items-center mb-8">
        <span className="block w-16 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 mb-4"></span>
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-2 drop-shadow text-center">
          Flexible Subscription Plans
        </h2>
      </div>
      <p className="text-center text-gray-600 text-lg max-w-lg mx-auto mb-4">
        Start for free and upgrade as you grow. Find the perfect plan for your creative journey.
      </p>
      <div className="mt-14 max-sm:mx-8 z-50">
        <PricingTable />
      </div>
    </div>
  );
}

export default Pricing;
