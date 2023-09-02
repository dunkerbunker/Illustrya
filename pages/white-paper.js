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
        <h1 className={`${titleClass} text-center mb-24`}>Illustrya - The Hub for Everything Art</h1>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Introduction</h2>
          <p className={textClass}>
            Illustrya is a groundbreaking web application designed to revolutionize the art industry. Our platform serves as a creative hub where artists from diverse backgrounds can share their talents, connect with audiences, and monetize their work. By integrating social media elements with cutting-edge blockchain technology, we offer a decentralized and transparent marketplace that addresses the unique challenges faced by artists today.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Section 1: The Artistic Journey</h2>
          <p className={textClass}>
            In this section, we embark on a profound exploration of the artistic journey and how Illustrya empowers artists throughout it. We delve into the core features that make Illustrya a game-changer for artists of all kinds. From the ease of showcasing their work to the ability to sell it securely, we provide artists with the tools they need to thrive in the digital age.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Section 2: Blockchain and Art</h2>
          <p className={textClass}>
            Blockchain technology is the backbone of Illustrya, and in this section, we demystify the profound connection between blockchain and art. We explain how Illustrya leverages blockchain to ensure transparency, provenance, and security for every piece of digital art. By harnessing blockchain, we provide both artists and collectors with the confidence that their creations and acquisitions are genuine and protected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Section 3: Issues with the Current System</h2>
          <p className={textClass}>
            Currently, there is a glaring gap in the existing systems that cater to artists. The proposed Illustrya website seeks to address the shortcomings of three distinct types of existing systems, each with its own set of flaws. Additionally, this section highlights the issues associated with the current banking system and other cryptocurrencies, particularly in the context of this project.
          </p>
          <div className="ml-8">
            <p className={textClass}><br />
              <strong>Existing Social Media Apps are Not Suited for Artists:</strong> While popular social media platforms like Instagram and Facebook have enabled millions of artists to showcase their work, their highly personalized content algorithms primarily benefit a select few. The chances of lesser-known artists gaining significant popularity are minimal, making it challenging for them to monetize their art. The complexities of post optimization, view retention, and like ratios further burden artists who should be focused on their craft.
            </p>
            <p className={textClass}><br />
              <strong>Current Artist-Catered Websites:</strong> Websites like DeviantArt and Pinterest provide a fairer platform for artists to grow and gain visibility. However, these platforms lack effective monetization options, often requiring artists to link external sites for commissions or sales. The subpar chat systems on these websites further hinder private communication between artists and potential clients.
            </p>
            <p className={textClass}><br />
              <strong>Current NFT Implementations:</strong> NFT platforms like OpenSea, while successful, are plagued with issues. Dependency on a single cryptocurrency like Ethereum poses a risk, and the focus on NFT collections as investment opportunities overshadows genuine art. This trend makes it challenging for traditional artists to thrive in such an environment.
            </p><br />
          </div>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Section 4: Why Not Use Traditional Banking?</h2>
          <p className={textClass}>
            Traditional banking systems are not suitable for this project due to their centralized nature. The SWIFT banking system&amp;s ability to exclude entities, as evidenced by the recent ban of Russian banks following Russia&amp;s invasion of Ukraine, underscores the need for a decentralized solution. Illustrya aims to ensure that anyone who purchases art on the platform truly owns it, with administrators having no authority to revoke ownership. This level of trust and reliability can only be achieved through blockchain technology.
          </p>
          <p className={textClass}>
            Ethereum, with its transition from Proof of Work (PoW) to Proof of Stake (PoS), offers both environmental friendliness and security. PoS reduces energy consumption, making it a sustainable choice. In contrast, cryptocurrencies like Bitcoin, with their PoW model, continue to demand substantial computational power and energy.
          </p>
        </section>

        <section>
          <h2 className={sectionTitleClass}>Section 5: Advantages of the Proposed System</h2>
          <p className={textClass}>
            The proposed Illustrya system offers a range of advantages for artists and buyers alike. It functions as an inclusive hub for all things art-related, with content discovery based on art preferences rather than social connections. This approach gives emerging artists a better chance at gaining exposure.
          </p>
          <div className="ml-8">
            <p className={textClass}><br />
              <strong>Artwork Presentation:</strong> Unlike existing platforms, Illustrya prioritizes meaningful art presentation. Each artwork is given its row, complete with details, allowing users to appreciate the art&amp;s context and value fully.
            </p>
            <p className={textClass}><br />
              <strong>Easy Artwork Transactions:</strong> The platform simplifies both the selling and buying processes. Artists can easily list their work for sale, and buyers can complete transactions with a single click, using MetaMask for secure payment approval.
            </p>
            <p className={textClass}><br />
              <strong>Blockchain Security:</strong> Illustrya leverages the power and transparency of blockchain technology to ensure the security of all transactions. Fraudulent activities become virtually impossible due to the decentralized nature of the network and the consensus mechanism required for transaction approval.
            </p>
            <p className={textClass}><br />
              <strong>Low Transaction Fees:</strong> While blockchain transactions incur minimal gas fees, these costs can help filter out less serious artists and trolls from the marketplace, ensuring a more focused and reliable community. Artworks not intended for sale can be uploaded to the blockchain without fees.
            </p>
            <p className={textClass}><br />
              <strong>IPFS Integration:</strong> Illustrya utilizes the Inter-Planetary File System (IPFS) for storing artwork files, offering decentralized accessibility even if the platform&amp;s servers are temporarily unavailable. IPFS enhances data integrity through its unique data structure, ensuring the security and availability of artworks.
            </p><br />
          </div>
        </section>

        <section className="mb-8">
          <h2 className={sectionTitleClass}>Conclusion</h2>
          <p className={textClass}>
            As we conclude our journey through the world of Illustrya, we emphasize its transformative potential in the art landscape. Our platform seamlessly blends creativity and technology, offering artists and art enthusiasts an inclusive and dynamic space to explore, connect, and thrive. Join us on this exciting journey as we redefine the art experience for the modern era.
          </p>
        </section>

        <section>
          <h2 className={sectionTitleClass}>References</h2>
          <p className={textClass}>
            In this section, we express our gratitude to the sources, references, and inspirations that have shaped the development of Illustrya. These references serve as a testament to our commitment to excellence, research, and innovation, which form the foundation of our platform.
          </p>
        </section>
      </div>
    </section>
  );
};

export default WhitePaper;
