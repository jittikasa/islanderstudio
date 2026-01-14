import SEO from '../components/SEO'
import './LegalPage.css'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service - islander Studio | App Usage Terms"
        description="Terms of Service for islander Studio apps (Shellist, PolaMoment). Read about usage rights, user responsibilities, intellectual property, disclaimers, and more."
        url="https://islanderstudio.app/terms"
        keywords="terms of service, terms and conditions, user agreement, app terms, iOS app terms, usage policy, legal terms, Shellist terms, PolaMoment terms"
      />
      <div className="legal-page">
        {/* Header */}
        <section className="legal-hero">
          <span className="legal-label">Legal</span>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-date">Effective Date: January 8, 2025</p>
          <p className="legal-intro">
            Welcome to Islander Studio. These Terms of Service ("Terms") govern your use of our mobile
            applications, including Shellist and PolaMoment (collectively, the "Apps"), and any related
            services provided by Islander Studio ("we," "our," or "us"). By downloading, installing, or
            using our Apps, you agree to be bound by these Terms.
          </p>
        </section>

        {/* Content */}
        <section className="legal-section">
          <div className="legal-container">
            <div className="summary-box">
              <h2>Terms Summary</h2>
              <ul className="summary-list">
                <li>+ Our Apps are provided for personal, non-commercial use</li>
                <li>+ You retain ownership of all content you create within the Apps</li>
                <li>+ You are responsible for maintaining the security of your device and data</li>
                <li>+ Our Apps are provided "as is" without warranties</li>
                <li>+ We may update these Terms with notice to users</li>
                <li>+ Violations may result in termination of access</li>
              </ul>
              <p className="summary-note">
                Please read the full Terms below for complete details about your rights and responsibilities.
              </p>
            </div>

            <div className="content-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Apps, you confirm that you have read, understood, and agree to be
                bound by these Terms and our <a href="/privacy">Privacy Policy</a>. If you do not agree to
                these Terms, you must not use our Apps.
              </p>

              <h3>1.1 Eligibility</h3>
              <ul>
                <li><strong>Age Requirement:</strong> Our Apps are rated 4+ and are suitable for users of all ages</li>
                <li><strong>Parental Consent:</strong> If you are under the age of majority in your jurisdiction, your parent or guardian must agree to these Terms on your behalf</li>
                <li><strong>Account Responsibility:</strong> If using a device managed by a parent, guardian, or organization, the account holder is responsible for compliance with these Terms</li>
              </ul>

              <h3>1.2 Updates to Terms</h3>
              <p>
                We reserve the right to modify these Terms at any time. Material changes will be communicated
                through in-app notifications or updates to this page. Your continued use of the Apps after
                changes take effect constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div className="content-section">
              <h2>2. License and Usage Rights</h2>

              <h3>2.1 License Grant</h3>
              <p>
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
                non-transferable, revocable license to download, install, and use our Apps on compatible
                Apple devices that you own or control, for personal, non-commercial purposes.
              </p>

              <h3>2.2 License Restrictions</h3>
              <p>You may not:</p>
              <ul>
                <li><strong>Copy or Modify:</strong> Copy, modify, or create derivative works based on the Apps</li>
                <li><strong>Reverse Engineer:</strong> Reverse engineer, decompile, disassemble, or attempt to derive the source code of the Apps</li>
                <li><strong>Distribute:</strong> Sell, rent, lease, sublicense, distribute, or otherwise transfer the Apps to third parties</li>
                <li><strong>Remove Notices:</strong> Remove, alter, or obscure any copyright, trademark, or other proprietary notices</li>
                <li><strong>Commercial Use:</strong> Use the Apps for commercial purposes without our prior written consent</li>
                <li><strong>Circumvent Security:</strong> Attempt to bypass, disable, or interfere with any security features</li>
              </ul>

              <h3>2.3 App Store Terms</h3>
              <p>
                Your use of the Apps is also subject to the Apple App Store Terms of Service. In the event
                of any conflict between these Terms and the App Store Terms, the App Store Terms shall
                prevail to the extent of the conflict.
              </p>
            </div>

            <div className="content-section">
              <h2>3. User Content and Data</h2>

              <h3>3.1 Your Content</h3>
              <p>
                Our Apps allow you to create, store, and manage content including habits, photos, notes,
                and other data ("User Content"). You retain full ownership of all User Content you create.
              </p>

              <h3>3.2 Content Responsibility</h3>
              <p>You are solely responsible for:</p>
              <ul>
                <li><strong>Accuracy:</strong> The accuracy and legality of your User Content</li>
                <li><strong>Backup:</strong> Maintaining backup copies of your User Content</li>
                <li><strong>Security:</strong> The security of your device and any access to your data</li>
                <li><strong>Compliance:</strong> Ensuring your User Content does not violate any laws or third-party rights</li>
              </ul>

              <h3>3.3 Data Storage</h3>
              <p>
                All User Content is stored locally on your device. If you enable iCloud synchronization,
                your data is also stored in your personal iCloud account. We do not have access to your
                User Content. For details on data handling, please review our <a href="/privacy">Privacy Policy</a>.
              </p>

              <h3>3.4 Data Loss</h3>
              <p>
                We are not responsible for any loss of User Content due to device failure, app uninstallation,
                software updates, or any other cause. We strongly recommend enabling iCloud sync and regularly
                exporting your data using the built-in export features.
              </p>
            </div>

            <div className="content-section">
              <h2>4. Intellectual Property</h2>

              <h3>4.1 Our Intellectual Property</h3>
              <p>
                The Apps and all content, features, and functionality (excluding User Content) are owned by
                Islander Studio and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <ul>
                <li><strong>Trademarks:</strong> "Islander Studio," "Shellist," "PolaMoment," and associated logos are trademarks of Islander Studio</li>
                <li><strong>Content:</strong> All text, graphics, icons, images, audio clips, and software are our property or licensed to us</li>
                <li><strong>Design:</strong> The visual design, user interface, and user experience are proprietary</li>
              </ul>

              <h3>4.2 Feedback</h3>
              <p>
                If you provide feedback, suggestions, or ideas about our Apps, you grant us a perpetual,
                irrevocable, worldwide, royalty-free license to use, modify, and incorporate such feedback
                into our products and services without any obligation to you.
              </p>
            </div>

            <div className="content-section">
              <h2>5. Purchases and Subscriptions</h2>

              <h3>5.1 In-App Purchases</h3>
              <p>
                Our Apps may offer in-app purchases, including premium features, subscriptions, or one-time
                purchases. All purchases are processed through the Apple App Store and are subject to Apple's
                terms and conditions.
              </p>

              <h3>5.2 Payment</h3>
              <ul>
                <li><strong>Processing:</strong> All payments are processed by Apple. We do not collect or store payment information</li>
                <li><strong>Pricing:</strong> Prices are displayed in your local currency and may vary by region</li>
                <li><strong>Taxes:</strong> Prices may be subject to applicable taxes as determined by Apple</li>
              </ul>

              <h3>5.3 Refunds</h3>
              <p>
                Refund requests must be submitted through Apple. We do not process refunds directly.
                To request a refund, visit <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a> or
                contact Apple Support.
              </p>

              <h3>5.4 Subscriptions</h3>
              <ul>
                <li><strong>Renewal:</strong> Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period</li>
                <li><strong>Management:</strong> Manage subscriptions in your Apple ID settings</li>
                <li><strong>Price Changes:</strong> We may change subscription prices with advance notice; continued use after a price change constitutes acceptance</li>
              </ul>
            </div>

            <div className="content-section">
              <h2>6. Prohibited Uses</h2>
              <p>You agree not to use the Apps to:</p>
              <ul>
                <li><strong>Illegal Activities:</strong> Engage in any activity that violates applicable laws or regulations</li>
                <li><strong>Harmful Content:</strong> Create, store, or share content that is illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable</li>
                <li><strong>Infringement:</strong> Infringe upon the intellectual property rights of others</li>
                <li><strong>Malicious Use:</strong> Introduce viruses, malware, or other harmful code</li>
                <li><strong>Interference:</strong> Interfere with or disrupt the Apps or related servers and networks</li>
                <li><strong>Unauthorized Access:</strong> Attempt to gain unauthorized access to any portion of the Apps or related systems</li>
                <li><strong>Data Mining:</strong> Use automated systems to extract data from the Apps</li>
              </ul>
            </div>

            <div className="content-section">
              <h2>7. Disclaimers and Limitations</h2>

              <h3>7.1 "As Is" Provision</h3>
              <p>
                THE APPS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>

              <h3>7.2 No Guarantees</h3>
              <p>We do not warrant that:</p>
              <ul>
                <li>The Apps will meet your specific requirements</li>
                <li>The Apps will be uninterrupted, timely, secure, or error-free</li>
                <li>Any defects or errors will be corrected</li>
                <li>The Apps will be compatible with all devices or operating system versions</li>
              </ul>

              <h3>7.3 Health and Wellness Disclaimer</h3>
              <p>
                Shellist is a habit tracking tool designed to help you organize and monitor your daily routines.
                It is not a medical device and should not be used as a substitute for professional medical advice,
                diagnosis, or treatment. Always consult qualified healthcare providers for health-related decisions.
              </p>

              <h3>7.4 Limitation of Liability</h3>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ISLANDER STUDIO SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, USE,
                GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF THE APPS,
                REGARDLESS OF THE THEORY OF LIABILITY.
              </p>
              <p>
                Our total liability for any claims arising from or related to these Terms or the Apps shall
                not exceed the amount you paid for the Apps in the twelve (12) months preceding the claim.
              </p>
            </div>

            <div className="content-section">
              <h2>8. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Islander Studio, its affiliates, officers,
                directors, employees, and agents from and against any claims, liabilities, damages, losses,
                and expenses, including reasonable attorneys' fees, arising out of or related to:
              </p>
              <ul>
                <li>Your use of the Apps</li>
                <li>Your User Content</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
              </ul>
            </div>

            <div className="content-section">
              <h2>9. Termination</h2>

              <h3>9.1 Termination by You</h3>
              <p>
                You may terminate your use of the Apps at any time by uninstalling them from your device.
                If you have an active subscription, you must cancel it separately through your Apple ID settings.
              </p>

              <h3>9.2 Termination by Us</h3>
              <p>
                We may terminate or suspend your access to the Apps immediately, without prior notice, if:
              </p>
              <ul>
                <li>You breach any provision of these Terms</li>
                <li>We are required to do so by law</li>
                <li>We discontinue the Apps or any features thereof</li>
              </ul>

              <h3>9.3 Effect of Termination</h3>
              <p>
                Upon termination, your license to use the Apps is revoked. Provisions that by their nature
                should survive termination shall remain in effect, including ownership provisions, warranty
                disclaimers, indemnification, and limitations of liability.
              </p>
            </div>

            <div className="content-section">
              <h2>10. Governing Law and Disputes</h2>

              <h3>10.1 Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction
                in which Islander Studio operates, without regard to conflict of law principles.
              </p>

              <h3>10.2 Dispute Resolution</h3>
              <p>
                Any disputes arising from or related to these Terms shall first be attempted to be resolved
                through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding
                arbitration in accordance with applicable arbitration rules. You agree to waive any right to
                a jury trial or to participate in a class action.
              </p>

              <h3>10.3 Exceptions</h3>
              <p>
                Notwithstanding the above, either party may seek injunctive or other equitable relief in any
                court of competent jurisdiction to protect intellectual property rights.
              </p>
            </div>

            <div className="content-section">
              <h2>11. General Provisions</h2>

              <h3>11.1 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you
                and Islander Studio regarding the Apps and supersede all prior agreements and understandings.
              </p>

              <h3>11.2 Severability</h3>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions
                shall continue in full force and effect.
              </p>

              <h3>11.3 Waiver</h3>
              <p>
                Our failure to enforce any right or provision of these Terms shall not constitute a waiver
                of such right or provision.
              </p>

              <h3>11.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms without our prior written consent. We may assign
                our rights and obligations under these Terms without restriction.
              </p>

              <h3>11.5 Contact Information</h3>
              <p>
                For questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a>.
              </p>
            </div>

            <div className="content-section">
              <h2>12. Contact Us</h2>
              <p>
                If you have any questions, concerns, or feedback regarding these Terms of Service, please
                reach out to us:
              </p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a></li>
                <li><strong>Subject Line:</strong> "Terms of Service Inquiry"</li>
                <li><strong>Response Time:</strong> We typically respond within 24-48 hours</li>
              </ul>

              <p className="emphasis">
                <strong>Last Updated:</strong> January 8, 2025<br />
                <strong>Version:</strong> 1.0
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
