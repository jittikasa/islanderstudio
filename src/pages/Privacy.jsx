import './LegalPage.css'

export default function Privacy() {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <div className="container">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-date">Last Updated: January 6, 2025</p>
          <p className="legal-intro">
            Your privacy matters to us. This Privacy Policy explains how Islander
            Studio apps collect, use, and protect your information.
          </p>
        </div>
      </div>

      <div className="legal-content">
        <div className="container">
          <div className="summary-box">
            <h2>Privacy in Plain English</h2>
            <ul className="summary-list">
              <li>✅ All your data stays on your device (or in your personal iCloud)</li>
              <li>✅ We don't collect unnecessary information</li>
              <li>✅ We don't sell or share your data with anyone</li>
              <li>✅ We don't use advertising networks or analytics trackers</li>
              <li>✅ You can export or delete your data anytime</li>
              <li>✅ No account required—your data is yours alone</li>
            </ul>
            <p className="summary-note">That's it. Read on for the legal details.</p>
          </div>

          <section className="legal-section">
            <h2>1. Information We Collect</h2>

            <h3>What You Provide:</h3>
            <ul>
              <li><strong>App Data:</strong> The content you create in our apps (habits, photos, notes, goals)</li>
              <li><strong>Photos:</strong> Images you choose to add from your device (Shellist vision boards, PolaMoment photos)</li>
              <li><strong>App Settings:</strong> Your preferences for notifications, themes, and app configurations</li>
            </ul>

            <h3>What We Collect Automatically:</h3>
            <ul>
              <li><strong>Device Information:</strong> iOS version and device type (to optimize performance)</li>
              <li><strong>Anonymous Usage Data:</strong> Basic app usage patterns via Apple's built-in analytics (no personal identification)</li>
            </ul>

            <h3>What We DON'T Collect:</h3>
            <ul>
              <li>❌ Your name, email, or contact information (no accounts required)</li>
              <li>❌ Your location</li>
              <li>❌ Your browsing history</li>
              <li>❌ Your contacts</li>
              <li>❌ Anything from other apps</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul>
              <li><strong>Provide Core Features:</strong> Display your content, track progress, show analytics</li>
              <li><strong>Improve the App:</strong> Identify bugs, understand feature usage, optimize user experience</li>
              <li><strong>Sync Your Data (Optional):</strong> Use Apple's iCloud to sync across your devices (only if you enable it)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Data Storage & Security</h2>

            <h3>Local Storage:</h3>
            <p>
              All your data is stored locally on your device using Apple's Core Data framework. This means:
            </p>
            <ul>
              <li>✅ Your data never leaves your device (unless you enable iCloud)</li>
              <li>✅ We can't access your information</li>
              <li>✅ Your data is protected by your device's encryption</li>
            </ul>

            <h3>iCloud Sync (Optional):</h3>
            <p>If you enable iCloud:</p>
            <ul>
              <li>Your data syncs across your Apple devices using Apple's CloudKit</li>
              <li>Data is encrypted and managed by Apple, not us</li>
              <li>You can disable iCloud sync anytime in iOS Settings</li>
              <li>We never have access to your iCloud data</li>
            </ul>

            <h3>Photos:</h3>
            <p>
              Photos you add to vision boards or capture with PolaMoment are stored
              in your device's photo library, not in our app database. We only
              reference them, never copy or upload them.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Data Sharing</h2>
            <p className="emphasis">
              We do not sell, trade, or share your personal information with third parties. Period.
            </p>
            <p>Specifically:</p>
            <ul>
              <li>❌ No advertising networks</li>
              <li>❌ No data brokers</li>
              <li>❌ No marketing companies</li>
              <li>❌ No third-party analytics (beyond Apple's built-in tools)</li>
            </ul>

            <h3>The only "sharing" that happens:</h3>
            <ul>
              <li>✅ Your data syncs to YOUR iCloud (if you enable it)</li>
              <li>✅ Your data exports to files YOU choose (CSV/PDF)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Your Rights & Choices</h2>
            <p>You have complete control over your data:</p>

            <h3>Access Your Data:</h3>
            <ul>
              <li>View all your data in the app</li>
              <li>Export everything as CSV or PDF (in app settings)</li>
            </ul>

            <h3>Delete Your Data:</h3>
            <ul>
              <li>Delete individual items in the app</li>
              <li>Reset all data (Settings → Reset All Data)</li>
              <li>Uninstall the app (permanently deletes local data)</li>
            </ul>

            <h3>Control iCloud Sync:</h3>
            <ul>
              <li>Enable/disable in iOS Settings → iCloud → [App Name]</li>
              <li>Delete iCloud data (Settings → iCloud → Manage Storage)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Children's Privacy</h2>
            <p>
              Our apps are suitable for users of all ages (rated 4+ on the App Store).
              We do not knowingly collect personal information from children under 13.
              If you believe a child has provided data to us, contact{' '}
              <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. International Users</h2>

            <h3>For European Union & UK Users (GDPR):</h3>
            <p>You have additional rights under GDPR:</p>
            <ul>
              <li><strong>Right to Access:</strong> Request a copy of your data (use export feature)</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate data (edit in app)</li>
              <li><strong>Right to Erasure:</strong> Delete your data (reset feature or uninstall)</li>
              <li><strong>Right to Data Portability:</strong> Export data in machine-readable format (CSV export)</li>
            </ul>

            <h3>For California Users (CCPA):</h3>
            <p>You have rights under California privacy law:</p>
            <ul>
              <li><strong>Right to Know:</strong> What data we collect (see Section 1)</li>
              <li><strong>Right to Delete:</strong> Delete your personal data (see Section 5)</li>
              <li><strong>Right to Opt Out:</strong> We don't sell data, so nothing to opt out of</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do:
            </p>
            <ul>
              <li>We'll update the "Last Updated" date at the top</li>
              <li>For significant changes, we'll display a notice in the app</li>
              <li>Your continued use after changes means you accept the updates</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>9. Contact Us</h2>
            <p><strong>Questions about your privacy?</strong></p>
            <p>
              Email:{' '}
              <a href="mailto:support@islanderstudio.app">
                support@islanderstudio.app
              </a>
            </p>
            <p>We typically respond within 24-48 hours.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
