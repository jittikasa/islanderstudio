import SEO from '../components/SEO'
import './LegalPage.css'

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy - islander Studio | GDPR & CCPA Compliant"
        description="Comprehensive privacy policy for islander Studio apps (Shellist, PolaMoment). Local-first data storage, optional iCloud sync, GDPR & CCPA compliant, no tracking, no ads. Learn about your data rights, security measures, and children's privacy protection."
        url="https://islanderstudio.app/privacy"
        keywords="privacy policy, GDPR compliant, CCPA compliant, data privacy, iOS app privacy, data protection, user privacy, no tracking, no ads, children's privacy, COPPA, data rights, local storage, iCloud privacy, data security"
      />
      <div className="legal-page">
      {/* Header */}
      <section className="legal-hero">
        <span className="legal-label">Legal</span>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-date">Effective Date: December 29, 2024</p>
        <p className="legal-intro">
          Islander Studio ("we," "our," or "us") is committed to protecting your privacy.
          This Privacy Policy describes how we collect, use, store, and protect your personal
          information when you use our mobile applications, including Shellist and PolaMoment
          (collectively, the "Apps").
        </p>
      </section>

      {/* Content */}
      <section className="legal-section">
        <div className="legal-container">
          <div className="summary-box">
            <h2>Privacy Summary</h2>
            <ul className="summary-list">
              <li>+ Your data is stored locally on your device using industry-standard encryption</li>
              <li>+ Optional iCloud sync is managed entirely by Apple's secure CloudKit infrastructure</li>
              <li>+ We do not collect, store, or have access to your personal information</li>
              <li>+ No third-party tracking, advertising networks, or analytics services</li>
              <li>+ Full data portability—export your information as CSV or PDF at any time</li>
              <li>+ No account creation required—complete privacy by design</li>
              <li>+ GDPR and CCPA compliant—your data rights are fully protected</li>
            </ul>
            <p className="summary-note">
              Continue reading for comprehensive details about our privacy practices and your legal rights.
            </p>
          </div>

          <div className="content-section">
            <h2>1. Information Collection and Processing</h2>

            <h3>1.1 User-Generated Content</h3>
            <p>When you use our Apps, you may create and store the following types of data locally on your device:</p>
            <ul>
              <li><strong>Habit Tracking Data (Shellist):</strong> Habit names, categories, completion records, streaks, analytics, custom goals, and vision board content including photos you select</li>
              <li><strong>Photo Content (PolaMoment):</strong> Images you capture or import, applied filters, and editing preferences</li>
              <li><strong>Application Preferences:</strong> Theme selections, notification settings, display preferences, and app configurations</li>
              <li><strong>Media Assets:</strong> Photos and images you voluntarily import from your device's photo library</li>
            </ul>
            <p className="data-note">
              <strong>Important:</strong> All user-generated content is stored exclusively on your local device.
              We do not transmit, collect, or have access to this information unless you explicitly enable iCloud sync.
            </p>

            <h3>1.2 Technical Information (Automatically Collected)</h3>
            <p>To ensure optimal performance and compatibility, we may collect limited technical data:</p>
            <ul>
              <li><strong>Device Information:</strong> Device model, iOS version, screen resolution, and available storage (used solely for performance optimization and crash prevention)</li>
              <li><strong>App Analytics (Optional):</strong> If you opt-in to share analytics with Apple, we receive aggregated, anonymized data about app launches, feature usage, and crash reports through Apple's App Analytics framework. This data is fully anonymized and cannot be traced back to individual users</li>
              <li><strong>Performance Metrics:</strong> App response times, memory usage, and battery consumption (processed locally on your device)</li>
            </ul>

            <h3>1.3 Information We Do Not Collect</h3>
            <p>We are committed to minimal data collection. We do not collect:</p>
            <ul>
              <li>Personal identifiers (name, email address, phone number, physical address)</li>
              <li>Location data (GPS coordinates, WiFi positioning, or approximate location)</li>
              <li>Biometric information</li>
              <li>Financial information or payment details</li>
              <li>Web browsing history or search history</li>
              <li>Contacts, calendar, or data from other applications</li>
              <li>Advertising identifiers or device identifiers for cross-app tracking</li>
              <li>Social media profile information</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>2. How We Use Your Information</h2>
            <p>
              We process your information solely to provide, maintain, and improve our Apps.
              Our data usage is limited to the following purposes:
            </p>

            <h3>2.1 Core App Functionality</h3>
            <ul>
              <li><strong>Content Display and Management:</strong> Rendering your habits, photos, analytics, and other user-generated content within the App interface</li>
              <li><strong>Progress Tracking:</strong> Calculating streaks, completion rates, statistical insights, and visual analytics based on your locally-stored data</li>
              <li><strong>Notification Delivery:</strong> Sending local push notifications for habit reminders (if you enable notifications in iOS Settings)</li>
              <li><strong>Data Persistence:</strong> Saving your content and preferences using Core Data for reliable, offline access</li>
            </ul>

            <h3>2.2 Product Improvement</h3>
            <ul>
              <li><strong>Bug Identification:</strong> Analyzing crash reports and error logs (anonymized) to identify and resolve technical issues</li>
              <li><strong>Feature Optimization:</strong> Understanding aggregated usage patterns to prioritize feature development and improve user experience</li>
              <li><strong>Performance Enhancement:</strong> Monitoring app performance metrics to ensure smooth operation across different devices and iOS versions</li>
            </ul>

            <h3>2.3 Optional iCloud Synchronization</h3>
            <ul>
              <li><strong>Cross-Device Sync:</strong> If you enable iCloud in your device settings, we use Apple's CloudKit infrastructure to synchronize your data across your personal Apple devices</li>
              <li><strong>Data Backup:</strong> iCloud sync provides automatic backup of your data to your personal iCloud storage</li>
            </ul>

            <p className="legal-note">
              <strong>Legal Basis for Processing (GDPR):</strong> We process data based on (a) contractual necessity
              to provide our services, (b) legitimate interests in improving our Apps, and (c) your explicit consent
              for optional features like iCloud sync.
            </p>
          </div>

          <div className="content-section">
            <h2>3. Data Storage, Retention, and Security</h2>

            <h3>3.1 Local Data Storage</h3>
            <p>
              All user-generated content is stored exclusively on your iOS device using Apple's Core Data framework,
              an industry-standard local database system. Key security features include:
            </p>
            <ul>
              <li><strong>Device-Only Storage:</strong> Your data never leaves your device unless you explicitly enable iCloud synchronization</li>
              <li><strong>iOS Encryption:</strong> All app data is protected by iOS's built-in encryption when your device is locked (Data Protection API)</li>
              <li><strong>Sandboxed Environment:</strong> App data is stored in a secure, isolated container that other apps cannot access</li>
              <li><strong>Zero Server Transmission:</strong> We do not operate servers that collect, store, or process your personal data</li>
              <li><strong>No Third-Party Access:</strong> We cannot access, view, or retrieve your locally stored information</li>
            </ul>

            <h3>3.2 iCloud Synchronization (Optional)</h3>
            <p>
              If you choose to enable iCloud in your iOS Settings, your data is synchronized using Apple's CloudKit service.
              This feature is entirely optional and managed by Apple:
            </p>
            <ul>
              <li><strong>Apple-Managed Encryption:</strong> Data is encrypted in transit (TLS 1.2+) and at rest (AES-256) by Apple</li>
              <li><strong>Your Personal iCloud:</strong> Data syncs only to your personal iCloud account and your authorized devices</li>
              <li><strong>Apple's Privacy Policy Applies:</strong> iCloud data is governed by <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple's Privacy Policy</a></li>
              <li><strong>Full Control:</strong> You can disable iCloud sync at any time via iOS Settings → [Your Name] → iCloud</li>
              <li><strong>No Islander Studio Access:</strong> We cannot view, access, or decrypt your iCloud-synced data</li>
            </ul>

            <h3>3.3 Data Retention</h3>
            <ul>
              <li><strong>Local Data:</strong> Retained on your device until you manually delete it or uninstall the app</li>
              <li><strong>iCloud Data:</strong> Retained in your personal iCloud account according to your iCloud storage settings</li>
              <li><strong>Analytics Data:</strong> Aggregated, anonymized analytics are retained for up to 24 months to identify long-term trends</li>
              <li><strong>No Automatic Deletion:</strong> We do not automatically delete your data—you have complete control</li>
            </ul>

            <h3>3.4 Security Measures</h3>
            <p>We implement industry-standard security practices:</p>
            <ul>
              <li>Secure coding practices following OWASP Mobile Security guidelines</li>
              <li>Regular security audits and code reviews</li>
              <li>Compliance with Apple's App Store security requirements</li>
              <li>Prompt security updates to address vulnerabilities</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>4. Data Sharing and Third-Party Services</h2>

            <p className="emphasis">
              <strong>We do not sell, rent, trade, or share your personal information with third parties for marketing purposes.</strong>
            </p>

            <h3>4.1 No Third-Party Data Sharing</h3>
            <p>We do not share your data with:</p>
            <ul>
              <li><strong>Advertising Networks:</strong> We do not use ad networks or serve advertisements</li>
              <li><strong>Data Brokers:</strong> Your information is never sold or provided to data aggregators</li>
              <li><strong>Marketing Platforms:</strong> No email marketing, social media tracking, or promotional targeting</li>
              <li><strong>Analytics Providers:</strong> We only use Apple's first-party App Analytics (opt-in only)</li>
              <li><strong>Social Media Platforms:</strong> No integration with social networks for data collection</li>
            </ul>

            <h3>4.2 Limited Exceptions</h3>
            <p>We may disclose information only in the following exceptional circumstances:</p>
            <ul>
              <li><strong>Legal Compliance:</strong> If required by law, court order, or governmental regulation (e.g., subpoena, warrant)</li>
              <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of Islander Studio, our users, or the public</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, with advance notice to affected users</li>
            </ul>
            <p className="legal-note">
              Note: Due to our privacy-by-design architecture, we possess minimal user data and
              cannot provide user-specific information even if compelled, as it resides solely on user devices.
            </p>

            <h3>4.3 Apple Services</h3>
            <p>We rely on Apple's services for core functionality:</p>
            <ul>
              <li><strong>iCloud (Optional):</strong> If you enable iCloud, your data is transmitted to and stored in your personal iCloud account, governed by Apple's Privacy Policy</li>
              <li><strong>App Store:</strong> App purchases and refunds are processed by Apple; see <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple's Privacy Policy</a></li>
              <li><strong>Push Notifications:</strong> Delivered via Apple Push Notification Service (APNs), which does not expose content to Apple</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>5. Your Privacy Rights</h2>

            <p>
              You have comprehensive rights regarding your personal data. Depending on your location,
              these rights may be protected under GDPR (Europe), CCPA (California), or other privacy regulations.
            </p>

            <h3>5.1 Right to Access</h3>
            <ul>
              <li><strong>View All Data:</strong> Access all your stored information directly within the App interface</li>
              <li><strong>Data Export:</strong> Export your complete data set as CSV or PDF files from App Settings → Export Data</li>
              <li><strong>Data Portability:</strong> Take your data to competing services in a machine-readable format</li>
            </ul>

            <h3>5.2 Right to Deletion ("Right to be Forgotten")</h3>
            <ul>
              <li><strong>Selective Deletion:</strong> Delete individual habits, photos, or entries within the App</li>
              <li><strong>Complete Reset:</strong> Erase all app data via Settings → Advanced → Reset All Data</li>
              <li><strong>App Uninstallation:</strong> Permanently remove all local data by uninstalling the App from your device</li>
              <li><strong>iCloud Deletion:</strong> Disable iCloud sync and delete data from Settings → iCloud → Manage Storage</li>
            </ul>

            <h3>5.3 Right to Rectification</h3>
            <ul>
              <li>Edit, update, or correct your data directly in the App at any time</li>
              <li>All changes are immediately saved and reflected across synced devices (if iCloud is enabled)</li>
            </ul>

            <h3>5.4 Right to Object and Restrict Processing</h3>
            <ul>
              <li><strong>Disable Analytics:</strong> Opt out of sharing usage data via iOS Settings → Privacy → Analytics & Improvements</li>
              <li><strong>Disable Notifications:</strong> Manage notification permissions in iOS Settings → Notifications → [App Name]</li>
              <li><strong>Disable iCloud:</strong> Stop data synchronization in iOS Settings → [Your Name] → iCloud</li>
            </ul>

            <h3>5.5 California Privacy Rights (CCPA)</h3>
            <p>If you are a California resident, you have additional rights:</p>
            <ul>
              <li><strong>Right to Know:</strong> Request details about data collected (though we collect minimal personal information)</li>
              <li><strong>Right to Delete:</strong> Request deletion of personal information (exercisable through in-app deletion tools)</li>
              <li><strong>Right to Opt-Out of Sale:</strong> We do not sell personal information, so no opt-out is necessary</li>
              <li><strong>Non-Discrimination:</strong> We do not discriminate based on privacy rights exercise</li>
            </ul>

            <h3>5.6 European Privacy Rights (GDPR)</h3>
            <p>If you are in the European Economic Area (EEA) or United Kingdom:</p>
            <ul>
              <li>Right to lodge a complaint with your local data protection authority</li>
              <li>Right to withdraw consent for optional data processing (e.g., analytics, iCloud sync)</li>
              <li>Right to data portability in a structured, commonly used format</li>
            </ul>

            <h3>5.7 Exercising Your Rights</h3>
            <p>
              Most privacy rights can be exercised directly within the App. For questions or assistance,
              contact <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a>.
              We will respond to verified requests within 30 days as required by applicable law.
            </p>
          </div>

          <div className="content-section">
            <h2>6. Children's Privacy (COPPA Compliance)</h2>
            <p>
              Our Apps are rated 4+ on the Apple App Store and are designed to be safe for users of all ages,
              including children. We are committed to protecting children's privacy in accordance with the
              Children's Online Privacy Protection Act (COPPA) and similar regulations worldwide.
            </p>

            <h3>6.1 Data Collection from Children</h3>
            <ul>
              <li><strong>No Personal Information Required:</strong> Our Apps do not require children to provide names, email addresses, photos of themselves, or any personal identifiers</li>
              <li><strong>Local Storage Only:</strong> All app data created by children is stored exclusively on the device and is not transmitted to our servers</li>
              <li><strong>No Behavioral Tracking:</strong> We do not track children's behavior, online activities, or location</li>
              <li><strong>No Third-Party Advertising:</strong> Our Apps contain no advertisements or links to third-party websites</li>
            </ul>

            <h3>6.2 Parental Rights</h3>
            <p>Parents and legal guardians have the right to:</p>
            <ul>
              <li>Review any data their child has created within the App (accessible on the child's device)</li>
              <li>Delete their child's data at any time via the App's settings or by uninstalling the App</li>
              <li>Refuse to permit further collection of their child's information (by uninstalling the App)</li>
            </ul>

            <h3>6.3 Parental Consent for iCloud</h3>
            <p>
              If a child uses the App with iCloud sync enabled, parental consent is managed through Apple's
              Family Sharing system, which complies with COPPA requirements. We do not independently verify
              parental consent, as all App Store accounts for children under 13 require parental authorization.
            </p>

            <p>
              <strong>Contact for Parental Concerns:</strong> If you believe your child has provided data through
              our Apps or have questions about children's privacy, please contact{' '}
              <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a>.
            </p>
          </div>

          <div className="content-section">
            <h2>7. International Data Transfers</h2>
            <p>
              Because our Apps store data locally on your device and do not transmit personal information to our
              servers, there are no international data transfers managed by Islander Studio. If you enable iCloud
              sync, data transfers are managed by Apple in accordance with{' '}
              <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple's Privacy Policy</a>,
              which includes appropriate safeguards for international transfers (e.g., Standard Contractual Clauses for GDPR compliance).
            </p>
          </div>

          <div className="content-section">
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements,
              or App features. Material changes will be communicated as follows:
            </p>

            <h3>8.1 Notification of Changes</h3>
            <ul>
              <li><strong>Effective Date Update:</strong> The "Effective Date" at the top of this policy will reflect the date of the latest revision</li>
              <li><strong>In-App Notice:</strong> Significant changes will be announced via an in-app notification upon your next App launch</li>
              <li><strong>Website Update:</strong> The updated policy will be posted at <a href="https://islanderstudio.app/privacy">islanderstudio.app/privacy</a></li>
            </ul>

            <h3>8.2 Your Acceptance</h3>
            <p>
              Your continued use of the Apps after the effective date of changes constitutes acceptance of the
              updated Privacy Policy. If you do not agree with changes, please discontinue use and uninstall the App.
              We encourage you to review this policy periodically.
            </p>
          </div>

          <div className="content-section">
            <h2>9. Governing Law and Jurisdiction</h2>
            <p>
              This Privacy Policy is governed by and construed in accordance with the laws of the jurisdiction in
              which Islander Studio operates, without regard to conflict of law principles. Any disputes arising from
              this policy shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
            </p>
          </div>

          <div className="content-section">
            <h2>10. Contact Information</h2>

            <h3>Privacy Questions or Requests</h3>
            <p>
              For questions about this Privacy Policy, to exercise your privacy rights, or to report privacy concerns:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a></li>
              <li><strong>Subject Line:</strong> "Privacy Inquiry" or "Data Rights Request"</li>
              <li><strong>Response Time:</strong> We typically respond within 24-48 hours, with formal rights requests handled within 30 days as required by law</li>
            </ul>

            <h3>Data Protection Officer</h3>
            <p>
              For GDPR-related inquiries or to contact our Data Protection Officer, use the email address above
              with the subject line "GDPR / Data Protection Officer."
            </p>

            <h3>Regulatory Complaints</h3>
            <p>
              While we strive to address all privacy concerns directly, you have the right to lodge a complaint
              with your local data protection authority if you believe your privacy rights have been violated.
            </p>

            <p className="emphasis">
              <strong>Last Updated:</strong> December 29, 2024<br />
              <strong>Version:</strong> 2.0
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
