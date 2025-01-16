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
    color: '#B55335',
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
    marginBottom: '2px',
    color: '#8b5e3c',
  },
  paragraph: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginBottom: '5px',
  },
  listItem: {
    marginBottom: '3px',
  },
};

const TermsOfService = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Terms of Service</h1>
      <div style={styles.sectionWrapper}>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Introduction</h2>
          <p style={styles.paragraph}>
            Welcome to CulinarEAT by Eden and Lia. By accessing or using our website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Use of Our Services</h2>
          <p style={styles.paragraph}>
            Our website provides users with access to recipes, cooking tips, and other culinary content. By using our services, you agree to:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Use our content for personal, non-commercial purposes only.</li>
            <li style={styles.listItem}>Avoid copying, distributing, or modifying content without permission.</li>
            <li style={styles.listItem}>Refrain from engaging in any activity that disrupts or interferes with our website functionality.</li>
          </ul>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>User Accounts</h2>
          <p style={styles.paragraph}>
            To access certain features of CulinarEAT, you may need to create an account. By creating an account, you agree to:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Provide accurate and complete information during registration.</li>
            <li style={styles.listItem}>Keep your login credentials confidential and notify us of any unauthorized access.</li>
            <li style={styles.listItem}>Be responsible for all activities under your account.</li>
          </ul>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Content Ownership</h2>
          <p style={styles.paragraph}>
            All content on CulinarEAT, including recipes, images, and text, is the property of CulinarEAT or its contributors. Unauthorized use of our content is prohibited.
          </p>
          <p style={styles.paragraph}>
            Users who contribute content to the website grant us a non-exclusive, royalty-free license to use, modify, and display their contributions.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Prohibited Activities</h2>
          <p style={styles.paragraph}>
            While using our website, you agree not to:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Upload or share content that is offensive, illegal, or infringes on the rights of others.</li>
            <li style={styles.listItem}>Engage in fraudulent or deceptive practices.</li>
            <li style={styles.listItem}>Attempt to bypass security measures or gain unauthorized access to our systems.</li>
          </ul>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Limitation of Liability</h2>
          <p style={styles.paragraph}>
            CulinarEAT is provided on an "as-is" basis. We make no warranties or guarantees about the accuracy, reliability, or suitability of the content provided. We are not liable for any damages resulting from the use of our website.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Termination</h2>
          <p style={styles.paragraph}>
            We reserve the right to terminate or suspend access to our services for any user who violates these Terms of Service or engages in unlawful behavior.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Changes to the Terms</h2>
          <p style={styles.paragraph}>
            These Terms of Service may be updated periodically. Continued use of our website constitutes acceptance of the updated terms. Please review this page regularly.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Contact Us</h2>
          <p style={styles.paragraph}>
            If you have any questions or concerns regarding these Terms of Service, feel free to contact us at{' '}
            <a href="mailto:culinareat@gmail.com" style={{ color: '#B55335', textDecoration: 'none' }}>
              support@culinareat.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
