import { useState } from 'react'; // Import the useState hook if you haven't already

const FAQSection = () => {
  // Define the FAQ data as an array of objects
  const faqs = [
    {
      question: 'How long does it take to deliver the first blog post?',
      answer:
        'It takes 2-3 weeks to get your first blog post ready. This includes in-depth research and the creation of your monthly content marketing strategy before writing your first blog post.',
    },
    // Add more FAQ items here as needed
  ];

  // Use the useState hook to manage the open/closed state of each FAQ
  const [openFAQs, setOpenFAQs] = useState(
    faqs.map((faq, index) => (index === 0)),
  );

  // Function to toggle the open/closed state of a FAQ item
  const toggleFAQ = (index) => {
    const newOpenFAQs = [...openFAQs];
    newOpenFAQs[index] = !newOpenFAQs[index];
    setOpenFAQs(newOpenFAQs);
  };

  return (
    <section className="">
      <div className="container px-6 py-12 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">Help Center</h1>

        <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12 p-24 md:p-0">
          <div className="lg:mx-12">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Table of Contents</h2>

            <div className="mt-4 space-y-4 lg:mt-8">
              <a href="#" className="block text-blue-500 dark:text-blue-400 hover:underline">General</a>
              <a href="#" className="block text-gray-500 dark:text-gray-300 hover:underline">Trust & Safety</a>
              <a href="#" className="block text-gray-500 dark:text-gray-300 hover:underline">Services</a>
              <a href="#" className="block text-gray-500 dark:text-gray-300 hover:underline">Marketplace</a>
              <a href="#" className="block text-gray-500 dark:text-gray-300 hover:underline">Content policy</a>
            </div>
          </div>

          <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
            <div>
              <button
                className="flex items-center focus:outline-none"
                type="button"
              >
                <svg className="flex-shrink-0 w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>

                <h2 className="mx-4 text-xl text-gray-700 dark:text-white">How can I pay for an artwork?</h2>
              </button>

              <div className="flex mt-8 md:mx-10">
                <span className="border border-blue-500" />

                <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                  You can pay for an artwork using your ETH. We use MetaMask as a wallet and the blockchain to process all payments. It is a secure, trusted payment method that allows you to buy and sell artworks with anyone in the world.
                </p>
              </div>
            </div>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <div>
              <button
                className="flex items-center focus:outline-none"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>

                <h2 className="mx-4 text-xl text-gray-700 dark:text-white">Is the blockchain safe?</h2>
              </button>
            </div>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <div>
              <button
                className="flex items-center focus:outline-none"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>

                <h2 className="mx-4 text-xl text-gray-700 dark:text-white">Can I sell my art?</h2>
              </button>
            </div>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <div>
              <button
                className="flex items-center focus:outline-none"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>

                <h2 className="mx-4 text-xl text-gray-700 dark:text-white">Do I need a referral?</h2>
              </button>
            </div>

            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <div>
              <button
                className="flex items-center focus:outline-none"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>

                <h2 className="mx-4 text-xl text-gray-700 dark:text-white">Is there any upfront costs?</h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
