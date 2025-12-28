import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccordionGroup from '../components/Accordion'
import SEO from '../components/SEO'
import './LegalPage.css'

const shellistFAQs = [
  {
    question: 'Is Shellist really free?',
    answer: 'Yes! Shellist is currently completely free with all features unlocked. There are no subscriptions, no in-app purchases, and no advertisements. We may introduce optional premium features in the future, but core habit tracking will always remain accessible.',
  },
  {
    question: 'How is my data stored?',
    answer: "All your habit data is stored locally on your device using Apple's Core Data framework. If you enable iCloud in your device settings, your data will sync across your personal Apple devices using Apple's encrypted CloudKit infrastructure. We never have access to your data.",
  },
  {
    question: 'Can I export my habit data?',
    answer: 'Absolutely! You can export all your habits and completion history as CSV or PDF files at any time from the Profile tab. Your data is yours—we make it easy to take it with you or back it up.',
  },
  {
    question: 'What iOS version do I need?',
    answer: 'Shellist requires iOS 17.0 or later. This allows us to use the latest Apple technologies to deliver the best possible experience with smooth animations, widgets, and reliable performance.',
  },
  {
    question: 'Can I use Shellist offline?',
    answer: "Yes! Shellist works entirely offline. All features are available without an internet connection. iCloud sync (if enabled) happens automatically in the background when you're connected.",
  },
]

const polamomentFAQs = [
  {
    question: 'When will PolaMoment be available?',
    answer: (
      <>
        PolaMoment is currently in testing and will be launching soon on the App Store. Email us at{' '}
        <a href="mailto:support@islanderstudio.app?subject=PolaMoment%20Waitlist">
          support@islanderstudio.app
        </a>{' '}
        to be notified when it launches.
      </>
    ),
  },
  {
    question: 'Will PolaMoment be free?',
    answer: "We're still finalizing pricing details. We believe in fair pricing and will announce our model before launch.",
  },
  {
    question: 'What devices will PolaMoment support?',
    answer: 'PolaMoment will be available for iPhone and iPad running iOS 17.0 or later at launch.',
  },
]

const generalFAQs = [
  {
    question: 'Who makes Islander Studio apps?',
    answer: "Islander Studio is an independent app studio focused on creating beautifully designed iOS applications that respect your privacy and delight in use. We're passionate about thoughtful design and user experience.",
  },
  {
    question: 'Do you sell my data?',
    answer: (
      <>
        Absolutely not. We don't sell, share, or monetize your personal data in any way. Your
        information stays on your device (or in your personal iCloud). See our{' '}
        <Link to="/privacy">Privacy Policy</Link> for full details.
      </>
    ),
  },
  {
    question: 'Will you make an Android version?',
    answer: "We're currently focused on delivering the best possible iOS experience. While we'd love to support Android in the future, we don't have a timeline to share yet.",
  },
  {
    question: 'How can I report a bug?',
    answer: (
      <>
        Please email us at{' '}
        <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a> with:
        <br />• The app name and version
        <br />• Your device model and iOS version
        <br />• A description of the issue
        <br />• Steps to reproduce (if possible)
      </>
    ),
  },
  {
    question: 'Can I request a feature?',
    answer: (
      <>
        Yes! We love hearing from our users. Email your feature suggestions to{' '}
        <a href="mailto:support@islanderstudio.app">support@islanderstudio.app</a>. While we
        can't implement every request, we carefully consider all feedback.
      </>
    ),
  },
]

export default function Support() {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('support@islanderstudio.app')
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      window.location.href = 'mailto:support@islanderstudio.app'
    }
  }

  return (
    <>
      <SEO
        title="Support & FAQs - Islander Studio"
        description="Get help with Shellist and PolaMoment. Find answers to common questions about features, privacy, data storage, and more. Contact our support team."
        url="https://islanderstudio.app/support"
        keywords="app support, FAQ, help center, customer support, Shellist help, PolaMoment support, iOS app help"
      />
      <div className="legal-page">
      {/* Header */}
      <section className="legal-hero">
        <span className="legal-label">Help</span>
        <h1 className="legal-title">Support</h1>
        <p className="legal-intro">
          Find answers to common questions or get in touch with our team.
        </p>
      </section>

      {/* Contact */}
      <section className="legal-section">
        <div className="legal-container">
          <div className="contact-card">
            <h2 className="contact-card-title">Get in touch</h2>
            <p className="contact-card-text">
              Have a question, feedback, or need assistance?
            </p>
            <button className="contact-email-btn" onClick={handleCopyEmail}>
              <span className="contact-email-text">support@islanderstudio.app</span>
              <span className="contact-email-action">
                {copiedEmail ? 'Copied!' : 'Copy'}
              </span>
            </button>
            <p className="contact-response">Typically responds within 24-48 hours</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="legal-section">
        <div className="legal-container">
          <div className="section-header">
            <h2 className="section-title">FAQs</h2>
            <span className="section-count">3 categories</span>
          </div>

          <div className="faq-category">
            <h3 className="faq-category-title">
              <span className="faq-category-number">01</span>
              Shellist
            </h3>
            <AccordionGroup items={shellistFAQs} allowMultiple={false} />
          </div>

          <div className="faq-category">
            <h3 className="faq-category-title">
              <span className="faq-category-number">02</span>
              PolaMoment
            </h3>
            <AccordionGroup items={polamomentFAQs} allowMultiple={false} />
          </div>

          <div className="faq-category">
            <h3 className="faq-category-title">
              <span className="faq-category-number">03</span>
              General
            </h3>
            <AccordionGroup items={generalFAQs} allowMultiple={false} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="legal-section legal-section--cta">
        <div className="legal-container">
          <div className="cta-card">
            <h2 className="cta-title">Still have questions?</h2>
            <p className="cta-text">
              If you didn't find what you're looking for, don't hesitate to reach out.
            </p>
            <a href="mailto:support@islanderstudio.app" className="cta-btn">
              Contact support <span>→</span>
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
