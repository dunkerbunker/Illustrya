import { useState } from 'react'; // Import the useState hook if you haven't already

const FAQSection = () => {
  // Define the FAQ data as an array of objects
  const faqs = [
    {
      question: 'How can I pay for an artwork?',
      answer:
        'You can pay for an artwork using your ETH. We use MetaMask as a wallet and the blockchain to process all payments. It is a secure, trusted payment method that allows you to buy and sell artworks with anyone in the world.',
    },
    {
      question: 'Is the blockchain safe?',
      answer:
        'Yes, the blockchain is considered safe and secure. It employs advanced cryptographic techniques to protect data and transactions. Transactions are immutable and transparent, making it difficult for unauthorized parties to tamper with the data. However, its essential to follow best security practices and use reputable wallets and platforms.',
    },
    {
      question: 'Can I sell my art?',
      answer:
        'Absolutely! You can sell your art on our platform. We provide a marketplace for artists to showcase and sell their work. Simply create an account, list your art pieces, set prices, and start selling to a global audience of art enthusiasts.',
    },
    {
      question: 'Do I need a referral?',
      answer:
        'No, you do not need a referral to use our platform. You can sign up and use our services without needing a referral from someone else. Our platform is open to all users who meet our terms and conditions.',
    },
    {
      question: 'Are there any upfront costs?',
      answer:
        'There are no upfront costs to use our platform. You can join and list your art for sale without any initial fees. We operate on a commission-based model, where we take a percentage of the sale price when you successfully sell your art. You only pay when you make a sale.',
    },
  ];

  // Use the useState hook to manage the open/closed state of each FAQ
  const [openFAQs, setOpenFAQs] = useState(
    faqs.map(() => false),
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
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  className="flex items-center focus:outline-none"
                  type="button"
                  onClick={() => toggleFAQ(index)}
                >
                  {openFAQs[index] ? ( // Check if the FAQ is open
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  ) : (
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  )}

                  <h2 className="mx-4 text-xl text-gray-700 dark:text-white">{faq.question}</h2>
                </button>

                {openFAQs[index] && (
                  <div className="flex mt-8 md:mx-10">
                    <span className="border border-blue-500" />

                    <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}

                <hr className="my-8 border-gray-200 dark:border-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
