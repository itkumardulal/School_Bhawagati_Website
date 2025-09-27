import React from "react";

const Features = () => {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-12">
          {[
            {
              title: "Our Mission",
              body: "To empower students with knowledge, skills, and values that inspire lifelong learning, critical thinking, and positive contribution to society. We strive to foster a nurturing environment that promotes academic excellence, personal growth, and social responsibility, ensuring that every student is equipped to navigate the challenges and opportunities of the 21st century with confidence and integrity.",
            },
            {
              title: "Our Vision",
              body: "At Bhagawati English Secondary School, we envision a future where every student emerges as a confident and compassionate leader, equipped with the tools and mindset to thrive in a rapidly changing world. Through innovative education and holistic development, we aim to cultivate a community of lifelong learners who are empowered to shape a brighter tomorrow, contributing positively to their communities and making a lasting impact on the world around them.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-100 bg-white p-6 shadow"
            >
              <h2 className="mb-4 text-3xl text-center  font-semibold text-blue-950 font-heading">
                {f.title}
              </h2>
              <p className="text-gray-600 text-xl text-justify leading-relaxed font-body">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Features;
