import React from 'react'; // Import React
import { useTheme } from 'next-themes'; // Import useTheme hook

const PrivacyPolicy = () => {
  // Use useTheme() to access the current theme
  const { theme } = useTheme();

  // Check if the current theme is dark
  const isDarkMode = theme === 'dark';

  // Define CSS classes for light and dark modes
  const titleClass = `text-3xl font-semibold ${
    isDarkMode ? 'text-white' : 'text-gray-800'
  } mb-6`;
  const sectionTitleClass = `text-2xl font-semibold ${
    isDarkMode ? 'text-white' : 'text-gray-700'
  } mb-4`;
  const textClass = isDarkMode ? 'text-white' : 'text-gray-600';

  return (
    <section className="m-16">
      <div className="container mx-auto py-12 px-4">
        <h1 className={`${titleClass} text-center mb-24`}>Privacy Policy</h1>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Introduction</h2>
          <p className={textClass}>
            At Illustrya, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services. By using Illustrya, you consent to our Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Data Collection</h2>
          <p className={textClass}>
            We collect user information for the purpose of providing our services. This may include:
          </p>
          <ul className={`list-disc ml-8 ${textClass}`}>
            <li>Profile data</li>
            <li>Usage data</li>
          </ul>
          <p className={textClass}>
            We do not share your information with third parties without your consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Cookies</h2>
          <p className={textClass}>
            We use cookies to enhance your user experience on Illustrya. You can adjust your browser settings to block cookies if you prefer not to use them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Data Security</h2>
          <p className={textClass}>
            We take measures to protect your data and ensure its security. However, no method of data transmission over the internet is entirely secure, and we cannot guarantee the absolute security of your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Contact Information</h2>
          <p className={textClass}>
            If you have any questions or concerns about our Privacy Policy or any other aspect of our services, please feel free to contact us at [Your Contact Email Address].
          </p>
        </section>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
