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
    marginBottom: '20px',
    fontFamily: "'Merienda', cursive",
    textAlign: 'center',
  },
  sectionWrapper: {
    width: '100%',
    maxWidth: '800px',
    textAlign: 'left',
  },
  section: {
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '2px', // Drastically reduce gap between subtitle and content
    color: '#8b5e3c',
  },
  paragraph: {
    fontSize: '16px',
    marginBottom: '8px', // Reduced paragraph spacing for better alignment
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginBottom: '5px',
  },
  listItem: {
    marginBottom: '3px', // Tight spacing between list items
  },
};

const PrivacyPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Privacy Policy</h1>
      <div style={styles.sectionWrapper}>
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
            <li style={styles.listItem}>Name: Collected when you register for an account or fill out forms on our website.</li>
            <li style={styles.listItem}>Email Address: Used to communicate updates, promotions, or important account-related information.</li>
            <li style={styles.listItem}>
              Usage Data: Such as the pages you visit and actions you take on the site, which helps us improve functionality and user experience.
            </li>
          </ul>
          <p style={styles.paragraph}>
            We do not collect sensitive information, such as payment details, IP addresses, or location data.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>How We Use Your Information</h2>
          <p style={styles.paragraph}>The information we collect is used to:</p>
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
            To exercise these rights, please contact our support team at{' '}
            <a href="mailto:support@culinareat.com" style={{ color: '#d77a65', textDecoration: 'none' }}>
              support@culinareat.com
            </a>
            .
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
            If you have any questions, concerns, or feedback regarding this Privacy Policy, feel free to contact us at{' '}
            <a href="mailto:support@culinareat.com" style={{ color: '#d77a65', textDecoration: 'none' }}>
              support@culinareat.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
