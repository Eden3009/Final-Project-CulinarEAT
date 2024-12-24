import React from 'react';

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '40px',
    minHeight: '100vh',
    backgroundColor: '#f9f7f4',
    fontFamily: "'Poppins', sans-serif",
    color: '#333',
    lineHeight: '1.6',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#d77a65',
    marginBottom: '30px',
    fontFamily: "'Merienda', cursive",
    textAlign: 'center',
  },
  section: {
    maxWidth: '800px',
    marginBottom: '20px',
    textAlign: 'left',
    paddingLeft: '0px', // Remove padding to ensure everything aligns in one column
  },
  subtitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#8b5e3c',
    paddingLeft: '0px', // Remove any padding from subtitles
  },
  paragraph: {
    fontSize: '16px',
    marginBottom: '10px',
    paddingLeft: '0px', // Remove any padding from paragraphs
  },
  list: {
    paddingLeft: '20px', // Consistent indentation for lists
    marginBottom: '10px',
  },
  listItem: {
    marginBottom: '5px',
  },
};

const PrivacyPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Privacy Policy</h1>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Introduction</h2>
        <p style={styles.paragraph}>
          Welcome to CulinarEAT by Eden and Lia. Protecting your privacy is important to us, and this Privacy Policy explains how we collect, use, and safeguard your personal information. By using our website, you agree to the practices outlined here.
        </p>
      </div>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Information We Collect</h2>
        <p style={styles.paragraph}>
          At CulinarEAT, we only collect the personal information necessary to provide you with the best experience. This includes:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>Name:</strong> Collected when you register for an account or fill out forms on our website.
          </li>
          <li style={styles.listItem}>
            <strong>Email Address:</strong> Used to communicate updates, promotions, or important account-related information.
          </li>
          <li style={styles.listItem}>
            <strong>Usage Data:</strong> Such as the pages you visit and actions you take on the site, which helps us improve functionality and user experience.
          </li>
        </ul>
        <p style={styles.paragraph}>
          We do not collect sensitive information, such as payment details, IP addresses, or location data.
        </p>
      </div>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>How We Use Your Information</h2>
        <p style={styles.paragraph}>
          The information we collect is used to:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Enhance and personalize your experience on CulinarEAT.</li>
          <li style={styles.listItem}>Provide you with important updates and communication.</li>
          <li style={styles.listItem}>Analyze site usage trends to improve functionality.</li>
        </ul>
        <p style={styles.paragraph}>
          We never share your personal data with third parties for marketing purposes without your explicit consent.
        </p>
      </div>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Cookies</h2>
        <p style={styles.paragraph}>
          CulinarEAT uses cookies to improve your browsing experience. Cookies allow us to understand how users interact with our site and to optimize its functionality.
        </p>
        <p style={styles.paragraph}>
          You can manage your cookie preferences through your browser settings. However, disabling cookies may affect the functionality of certain features on our website.
        </p>
      </div>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Your Rights</h2>
        <p style={styles.paragraph}>
          As a user of CulinarEAT, you have the following rights:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Access the personal data you have shared with us.</li>
          <li style={styles.listItem}>Request modifications or corrections to your data.</li>
          <li style={styles.listItem}>Request the deletion of your account and associated data.</li>
        </ul>
        <p style={styles.paragraph}>
          To exercise these rights, please contact our support team at <strong>support@culinareat.com</strong>.
        </p>
      </div>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Policy Updates</h2>
        <p style={styles.paragraph}>
          This Privacy Policy may be updated periodically to reflect changes in our practices or legal requirements. We encourage you to check this page regularly for the latest updates.
        </p>
      </div>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Contact Us</h2>
        <p style={styles.paragraph}>
          If you have any questions, concerns, or feedback regarding this Privacy Policy, feel free to contact us at <strong>support@culinareat.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
