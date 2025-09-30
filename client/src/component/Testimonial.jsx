import React from "react";

const Testimonials = () => {
  const [tooltip, setTooltip] = React.useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });
  const cardRefs = React.useRef([]);

  const handleMouseMove = (e, index) => {
    const bounds = cardRefs.current[index].getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      text: testimonials[index].name,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const testimonials = [
    {
      name: "John Doe",
      title: "Frontend Developer",
      message:
        "Integrating this component into our project was seamless and saved us countless hours of development and testing. Highly recommended!",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      name: "Jane Smith",
      title: "Full Stack Engineer",
      message:
        "This solution not only simplified our workflow but also improved our UI consistency across the board. Excellent tool for modern teams.",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      name: "Bonnie Green",
      title: "UX Designer",
      message:
        "I was impressed with how intuitive and flexible the design was. It allowed us to rapidly prototype and launch features with confidence.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    },
  ];

  return (
    <>
  <div className="py-24 testimonial-section">
        <div className="flex flex-col items-center mb-8">
          <span className="block w-16 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 mb-4"></span>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-2 drop-shadow text-center">
            What Our Users Say
          </h1>
        </div>
        <p className="text-center text-gray-600 text-lg max-w-xl mx-auto mb-4">
          Real feedback from creators and teams who use our platform every day.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 py-20 cursor-pointer">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300"
            >
              {tooltip.visible && tooltip.text === testimonial.name && (
                <span
                  className="absolute px-2.5 py-1 text-sm rounded text-nowrap bg-indigo-500 text-white pointer-events-none transition-all duration-300"
                  style={{
                    top: tooltip.y + 8,
                    left: tooltip.x + 8,
                    transition: "all 0.3s ease-out",
                    animationDelay: "0.2s",
                  }}
                >
                  {tooltip.text}
                </span>
              )}

              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 text-gray-500">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Very easy to integrate
                  </h3>
                  <p className="my-4 text-sm line-clamp-3">
                    {testimonial.message}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    className="rounded-full w-9 h-9"
                    src={testimonial.image}
                    alt={`${testimonial.name} profile`}
                  />
                  <div className="space-y-0.5 font-medium text-left ml-3">
                    <p>{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
