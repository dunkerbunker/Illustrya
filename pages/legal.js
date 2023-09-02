import React from 'react'; // Import React
import { useTheme } from 'next-themes'; // Import useTheme hook

const Legal = () => {
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
        <h1 className={`${titleClass} text-center mb-24`}>Legal Information</h1>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Terms and Conditions</h2>
          <p className={textClass}>
            Welcome to Illustrya! These Terms and Conditions ("Terms") govern your use of Illustrya and its services. By accessing or using our platform, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use Illustrya.
          </p>
          <p className={textClass}>
            1. **User Responsibilities:** You are responsible for any content you post on Illustrya. You must not engage in illegal or harmful activities, including but not limited to spamming, harassment, or copyright infringement.
          </p>
          <p className={textClass}>
            2. **Intellectual Property:** All content on Illustrya, including text, images, and artwork, is protected by intellectual property rights. You may not use, reproduce, or distribute this content without permission.
          </p>
          <p className={textClass}>
            [Include other relevant terms and conditions as needed for your platform.]
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Privacy Policy</h2>
          <p className={textClass}>
            At Illustrya, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services.
          </p>
          <p className={textClass}>
            1. **Data Collection:** We collect user information such as email addresses and profile data for the purpose of providing our services. We do not share this information with third parties without your consent.
          </p>
          <p className={textClass}>
            2. **Cookies:** We use cookies to enhance your user experience. You can adjust your browser settings to block cookies if you prefer not to use them.
          </p>
          <p className={textClass}>
            [Include other privacy-related information as needed for your platform.]
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Disclaimer</h2>
          <p className={textClass}>
            The information provided on Illustrya is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the accuracy, completeness, reliability, or suitability of the information contained herein.
          </p>
          <p className={textClass}>
            1. **Content:** The content on Illustrya is user-generated and does not necessarily reflect our views or opinions. We are not responsible for any user-generated content.
          </p>
          <p className={textClass}>
            2. **Legal Advice:** Illustrya does not provide legal, financial, or professional advice. Users should seek appropriate professional advice for their specific needs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Contact Information</h2>
          <p className={textClass}>
            If you have any questions or concerns about our Legal page or any other aspect of our services, please feel free to contact us at [Your Contact Email Address].
          </p>
        </section>
      </div>
    </section>
  );
};

export default Legal;
