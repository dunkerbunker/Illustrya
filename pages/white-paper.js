import React from 'react'; // Import React
import { useTheme } from 'next-themes'; // Import useTheme hook

const WhitePaper = () => {
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
        <h1 className={titleClass}>Whitepaper Title</h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className={sectionTitleClass}>Introduction</h2>
          <p className={textClass}>
            This is the introduction section of your whitepaper. You can
            provide an overview of the content and its significance here. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lorem
            ac justo scelerisque vestibulum. Fusce et lectus ut dolor euismod
            tincidunt.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className={sectionTitleClass}>Section 1: Topic</h2>
          <p className={textClass}>
            Here, you can provide detailed information about the first section
            of your whitepaper. Pellentesque habitant morbi tristique senectus
            et netus et malesuada fames ac turpis egestas. Vestibulum at
            malesuada est, a volutpat quam.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className={sectionTitleClass}>Section 2: Topic</h2>
          <p className={textClass}>
            Describe the content of the second section of your whitepaper.
            Aliquam erat volutpat. Proin vel justo vel libero sollicitudin
            euismod. Nulla facilisi. Vivamus tincidunt eget urna sit amet
            lacinia.
          </p>
        </section>

        {/* More sections */}
        {/* Add more sections as needed using a similar structure */}

        {/* Conclusion */}
        <section className="mb-8">
          <h2 className={sectionTitleClass}>Conclusion</h2>
          <p className={textClass}>
            Summarize the key points and findings of your whitepaper in this
            section. In hac habitasse platea dictumst. Nunc id elit nec libero
            cursus cursus vel sit amet libero. Duis vestibulum ac justo vel
            efficitur. Sed interdum.
          </p>
        </section>

        {/* References */}
        <section>
          <h2 className={sectionTitleClass}>References</h2>
          <p className={textClass}>
            Include a list of references, citations, or sources used in your
            whitepaper. Sed vitae nulla sed arcu rhoncus semper. Donec eu ex
            vel libero facilisis vulputate. Praesent in ipsum ante. Nullam eget
            enim nec odio volutpat ultrices vel ut libero.
          </p>
        </section>
      </div>
    </section>
  );
};

export default WhitePaper;
