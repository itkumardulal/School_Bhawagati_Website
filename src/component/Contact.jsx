import React from "react";

const Contact = () => {
  return (
    <section className="bg-slate-50 pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            Our Location
          </h2>
          <p className="text-xl text-gray-600">
            Visit us or get in touch — we’re here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.486914082568!2d85.91133591045984!3d27.203858547421067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb8b5ebff4e585%3A0x1db8e37f99d1ef6b!2sBhagawati%20Secondary%20School!5e0!3m2!1sen!2snp!4v1753352723499!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bhagawati Secondary School Map"
            ></iframe>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-blue-700">
                Our Address
              </h3>
              <p className="mt-2 text-gray-700">
                Kamalamai Municipality-06, 02-Bazar, Sindhuli, Nepal
              </p>
            </div>

            <div className="border-t border-gray-300 pt-6 mb-6">
              <h3 className="text-2xl font-semibold text-blue-700">
                Office Hours
              </h3>
              <p className="mt-2 text-gray-700">
                Sunday - Friday: 10:00 AM – 5:00 PM
              </p>
              <p className="mt-1 text-gray-700">Saturday: Closed</p>
            </div>

            <div className="border-t border-gray-300 pt-6">
              <h3 className="text-2xl font-semibold text-blue-700">
                Contact Info
              </h3>
              <p className="mt-2 text-gray-700">
                <span className="font-medium">Email: </span>
                bhagawati.hses@gmail.com , info@bhagawatishool.com
              </p>
              <p className="mt-1 text-gray-700">
                <span className="font-medium">Phone:</span> +977-047-520179 , +977-985-4044140 , +977 985-4041567
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
