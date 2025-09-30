


const steps = [
  {
  icon: <i className="text-3xl text-blue-600"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></i>,
    title: "Sign Up",
    description: "Create your free account in seconds to get started.",
  },
  {
  icon: <i className="text-3xl text-purple-500"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2M19.364 19.364l-1.414-1.414M12 22v-2M4.636 19.364l1.414-1.414M2 12h2M4.636 4.636l1.414 1.414M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8z"/></svg></i>,
    title: "Choose a Tool",
    description: "Select from a variety of powerful AI tools for your needs.",
  },
  {
  icon: <i className="text-3xl text-green-500"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 2 21l1.5-5L16.5 3.5z"/></svg></i>,
    title: "Customize & Generate",
    description: "Input your requirements and let AI generate content instantly.",
  },
  {
  icon: <i className="text-3xl text-indigo-500"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v-4a4 4 0 0 0-8 0v4"/><path d="M12 12v8m0 0l-4-4m4 4l4-4"/></svg></i>,
    title: "Download or Share",
    description: "Save your results or share them directly from the platform.",
  },
];


function FeaturesOverview() {
  return (
    <section className="w-full pt-40 pb-20 bg-white/80">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <span className="block w-16 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 mb-4"></span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-2 drop-shadow text-center">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl text-center">
            Follow these simple steps to unlock the full power of our AI platform.
          </p>
        </div>
        <div className="relative flex flex-col items-center mt-16">
          {/* Timeline vertical line (hidden on mobile) */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-purple-400 -translate-x-1/2 z-0 hidden sm:block" />
          <div className="flex flex-col gap-10 w-full z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={
                  `relative flex w-full transition-all duration-700 ease-out ` +
                  `sm:items-center ` +
                  (idx % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end')
                }
                style={{ minHeight: '120px' }}
              >
                {/* On mobile, stack all steps centered and full width */}
                <div className="w-full px-0 flex justify-center sm:w-1/2 sm:px-0 " >
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center max-w-xs border border-blue-100 w-full">
                    <div className="mb-4 animate-bounce-slow">{step.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 text-center">{step.title}</h3>
                    <p className="text-gray-500 text-center text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesOverview;
