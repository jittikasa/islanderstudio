import SEO from '../components/SEO'
import './LegalPage.css'

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy - Islander Studio"
        description="Your privacy matters to us. Learn how Islander Studio apps protect your data with local storage, optional iCloud sync, and no tracking or analytics."
        url="https://islanderstudio.app/privacy"
        keywords="privacy policy, data privacy, iOS app privacy, data protection, user privacy, no tracking"
      />
      <div className="legal-page">
      {/* Header */}
      <section className="legal-hero">
        <span className="legal-label">Legal</span>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-date">Last Updated: January 6, 2025</p>
        <p className="legal-intro">
          Your privacy matters to us. This Privacy Policy explains how Islander
          Studio apps collect, use, and protect your information.
        </p>
      </section>

      {/* Content */}
      <section className="legal-section">
        <div className="legal-container">
          <div className="summary-box">
            <h2>Privacy in Plain English</h2>
            <ul className="summary-list">
              <li>+ All your data stays on your device (or in your personal iCloud)</li>
              <li>+ We don't collect unnecessary information</li>
              <li>+ We don't sell or share your data with anyone</li>
              <li>+ We don't use advertising networks or analytics trackers</li>
              <li>+ You can export or delete your data anytime</li>
              <li>+ No account required—your data is yours alone</li>
            </ul>
            <p className="summary-note">That's it. Read on for the legal details.</p>
          </div>

          <div className="content-section">
            <h2>1. Information We Collect</h2>

            <h3>What You Provide</h3>
            <ul>
              <li><strong>App Data:</strong> The content you create in our apps (habits, photos, notes, goals)</li>
              <li><strong>Photos:</strong> Images you choose to add from your device</li>
              <li><strong>App Settings:</strong> Your preferences for notifications, themes, and configurations</li>
            </ul>

            <h3>What We Collect Automatically</h3>
            <ul>
              <li><strong>Device Information:</strong> iOS version and device type (to optimize performance)</li>
              <li><strong>Anonymous Usage:</strong> Basic app usage patterns via Apple's built-in analytics</li>
            </ul>

            <h3>What We DON'T Collect</h3>
            <ul>
              <li>Your name, email, or contact information</li>
              <li>Your location</li>
              <li>Your browsing history</li>
              <li>Your contacts</li>
              <li>Anything from other apps</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul>
              <li><strong>Provide Core Features:</strong> Display your content, track progress, show analytics</li>
              <li><strong>Improve the App:</strong> Identify bugs, understand feature usage, optimize experience</li>
              <li><strong>Sync Your Data (Optional):</strong> Use Apple's iCloud to sync across your devices</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>3. Data Storage & Security</h2>

            <h3>Local Storage</h3>
            <p>
              All your data is stored locally on your device using Apple's Core Data framework:
            </p>
            <ul>
              <li>Your data never leaves your device (unless you enable iCloud)</li>
              <li>We can't access your information</li>
              <li>Your data is protected by your device's encryption</li>
            </ul>

            <h3>iCloud Sync (Optional)</h3>
            <p>If you enable iCloud:</p>
            <ul>
              <li>Your data syncs across your Apple devices using Apple's CloudKit</li>
              <li>Data is encrypted and managed by Apple, not us</li>
              <li>You can disable iCloud sync anytime in iOS Settings</li>
              <li>We never have access to your iCloud data</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>4. Data Sharing</h2>
            <p className="emphasis">
              We do not sell, trade, or share your personal information with third parties.
            </p>
            <p>Specifically:</p>
            <ul>
              <li>No advertising networks</li>
              <li>No data brokers</li>
              <li>No marketing companies</li>
              <li>No third-party analytics (beyond Apple's built-in tools)</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>5. Your Rights & Choices</h2>
            <p>You have complete control over your data:</p>

            <h3>Access Your Data</h3>
            <ul>
              <li>View all your data in the app</li>
              <li>Export everything as CSV or PDF (in app settings)</li>
            </ul>

            <h3>Delete Your Data</h3>
            <ul>
              <li>Delete individual items in the app</li>
              <li>Reset all data (Settings → Reset All Data)</li>
              <li>Uninstall the app (permanently deletes local data)</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>6. Children's Privacy</h2>
            <p>
              Our apps are suitable for users of all ages (rated 4+ on the App Store).
              We do not knowingly collect personal information from children under 13.
              If you believe a child has provided data to us, contact{' '}
              <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a>.
            </p>
          </div>

          <div className="content-section">
            <h2>7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we do:</p>
            <ul>
              <li>We'll update the "Last Updated" date at the top</li>
              <li>For significant changes, we'll display a notice in the app</li>
              <li>Your continued use after changes means you accept the updates</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>8. Contact Us</h2>
            <p><strong>Questions about your privacy?</strong></p>
            <p>
              Email:{' '}
              <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a>
            </p>
            <p>We typically respond within 24-48 hours.</p>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
