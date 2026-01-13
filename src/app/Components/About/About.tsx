import React from 'react';
import Image from 'next/image';

import { HiCheckBadge } from "react-icons/hi2";

const About: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4 md:px-16">
        <span className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">About Us</span>
        <div className="flex flex-col lg:flex-row items-center gap-16 mt-8">
          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Empowering Farmers, <br />
                <span className="text-secondary">Delighting Consumers.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                Our platform <strong className="text-gray-800">bridges the gap</strong> between the hardworking farmers of Sri Lanka and conscious consumers like you. By eliminating middlemen, we ensure that farmers receive <strong className="text-gray-800">fair prices</strong> for their toil, and you get the freshest, high-quality agricultural products directly from the source.
              </p>
            </div>

            <div className="space-y-6 w-full md:w-3/4 lg:w-full">
              {[
                "Get fresh agricultural products at competitive prices.",
                "High-quality, farm-fresh produce delivered to your door.",
                "Directly support farmers and the local agricultural community."
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 lg:bg-transparent hover:bg-green-50 transition-colors duration-300 border border-transparent hover:border-green-100 text-left">
                  <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                    <HiCheckBadge className="text-2xl" />
                  </div>
                  <p className="text-gray-700 font-medium">{text}</p>
                </div>
              ))}
            </div>

            <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-primary transition-colors duration-300 shadow-lg">
              Learn More
            </button>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10"></div>
              <Image
                src="/assets/about-img-2k.png"
                alt="Authentic Sri Lankan Produce"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
