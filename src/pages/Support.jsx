import './LegalPage.css'

export default function Support() {
  return (
    <div className="legal-page support-page">
      <div className="legal-header support-header">
        <div className="container">
          <h1 className="legal-title">Support & Contact</h1>
          <p className="legal-intro">
            We're here to help! Find answers to common questions or get in touch
            with our team.
          </p>
        </div>
      </div>

      <div className="legal-content">
        <div className="container">
          <div className="contact-box">
            <h2>Get in Touch</h2>
            <p>
              Have a question, feedback, or need assistance? We'd love to hear from you!
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <a href="mailto:support@islanderstudio.app" className="contact-link">
                  support@islanderstudio.app
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Response Time:</span>
                <span>Typically within 24-48 hours</span>
              </div>
            </div>
          </div>

          <section className="legal-section">
            <h2>Frequently Asked Questions</h2>

            <div className="faq-grid">
              {/* Shellist FAQs */}
              <div className="faq-category">
                <h3 className="faq-category-title">
                  <span className="faq-icon">🐚</span>
                  Shellist
                </h3>

                <div className="faq-item">
                  <h4 className="faq-question">Is Shellist really free?</h4>
                  <p className="faq-answer">
                    Yes! Shellist is currently completely free with all features unlocked.
                    There are no subscriptions, no in-app purchases, and no advertisements.
                    We may introduce optional premium features in the future, but core
                    habit tracking will always remain accessible.
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">How is my data stored?</h4>
                  <p className="faq-answer">
                    All your habit data is stored locally on your device using Apple's
                    Core Data framework. If you enable iCloud in your device settings,
                    your data will sync across your personal Apple devices using Apple's
                    encrypted CloudKit infrastructure. We never have access to your data.
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">Can I export my habit data?</h4>
                  <p className="faq-answer">
                    Absolutely! You can export all your habits and completion history as
                    CSV or PDF files at any time from the Profile tab. Your data is
                    yours—we make it easy to take it with you or back it up.
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">What iOS version do I need?</h4>
                  <p className="faq-answer">
                    Shellist requires iOS 17.0 or later. This allows us to use the
                    latest Apple technologies to deliver the best possible experience
                    with smooth animations, widgets, and reliable performance.
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">Can I use Shellist offline?</h4>
                  <p className="faq-answer">
                    Yes! Shellist works entirely offline. All features are available
                    without an internet connection. iCloud sync (if enabled) happens
                    automatically in the background when you're connected.
                  </p>
                </div>
              </div>

              {/* PolaMoment FAQs */}
              <div className="faq-category">
                <h3 className="faq-category-title">
                  <span className="faq-icon">📸</span>
                  PolaMoment
                </h3>

                <div className="faq-item">
                  <h4 className="faq-question">When will PolaMoment be available?</h4>
                  <p className="faq-answer">
                    PolaMoment is currently in testing and will be launching soon on
                    the App Store. Join our waitlist at{' '}
                    <a href="mailto:support@islanderstudio.app?subject=PolaMoment%20Waitlist">
                      support@islanderstudio.app
                    </a>{' '}
                    to be notified when it launches.
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">Will PolaMoment be free?</h4>
                  <p className="faq-answer">
                    We're still finalizing pricing details. We believe in fair pricing
                    and will announce our model before launch. Follow us for updates!
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">What devices will PolaMoment support?</h4>
                  <p className="faq-answer">
                    PolaMoment will be available for iPhone and iPad running iOS 17.0
                    or later at launch.
                  </p>
                </div>
              </div>

              {/* General FAQs */}
              <div className="faq-category">
                <h3 className="faq-category-title">
                  <span className="faq-icon">🏝️</span>
                  General
                </h3>

                <div className="faq-item">
                  <h4 className="faq-question">Who makes Islander Studio apps?</h4>
                  <p className="faq-answer">
                    Islander Studio is an independent app studio focused on creating
                    beautifully designed iOS applications that respect your privacy
                    and delight in use. We're passionate about thoughtful design and
                    user experience.
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">Do you sell my data?</h4>
                  <p className="faq-answer">
                    Absolutely not. We don't sell, share, or monetize your personal
                    data in any way. Your information stays on your device (or in your
                    personal iCloud). See our{' '}
                    <a href="/privacy">Privacy Policy</a> for full details.
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">Will you make an Android version?</h4>
                  <p className="faq-answer">
                    We're currently focused on delivering the best possible iOS
                    experience. While we'd love to support Android in the future,
                    we don't have a timeline to share yet.
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">How can I report a bug?</h4>
                  <p className="faq-answer">
                    Please email us at{' '}
                    <a href="mailto:support@islanderstudio.app">
                      support@islanderstudio.app
                    </a>{' '}
                    with:
                    <br />• The app name and version
                    <br />• Your device model and iOS version
                    <br />• A description of the issue
                    <br />• Steps to reproduce (if possible)
                    <br />• Screenshots or screen recordings if helpful
                  </p>
                </div>

                <div className="faq-item">
                  <h4 className="faq-question">Can I request a feature?</h4>
                  <p className="faq-answer">
                    Yes! We love hearing from our users. Email your feature suggestions
                    to <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a>.
                    While we can't implement every request, we carefully consider all
                    feedback when planning updates.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Still Have Questions?</h2>
            <p>
              If you didn't find what you're looking for, please don't hesitate to
              reach out. We're here to help!
            </p>
            <div className="support-cta">
              <a href="mailto:support@islanderstudio.app" className="btn btn-primary">
                Contact Support
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
