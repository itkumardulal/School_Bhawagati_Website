import React from "react";
import { Users, BookOpen, Award, Star } from "lucide-react";
import CountUp from "react-countup";

const Stats = () => {
  const data = [
    { icon: Users, label: "Students", count: 1400 },
    { icon: BookOpen, label: "Courses", count: 25 },
    { icon: Award, label: "Awards", count: 50 },
    { icon: Star, label: "Years", count: 39 },
  ];

  return (
    <section className="py-16 bg-yellow-50">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 text-white">
              <item.icon className="h-12 w-12" />
            </div>
            <div
              aria-label={`${item.count}+ ${item.label}`}
              role="region"
              tabIndex={0}
              className="text-3xl font-bold text-blue-900"
            >
              <CountUp
                end={item.count}
                duration={5.0}
                separator=","
                suffix="+"
              />
            </div>
            <div className="mt-1 text-gray-600 text-xl">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
