import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Shellist.css'

export default function Shellist() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const features = [
    {
      icon: '🐚',
      title: 'Pearl Chain Visualization',
      description: 'Watch your progress grow like a string of pearls. Each habit completion adds to your beautiful chain.'
    },
    {
      icon: '📊',
      title: 'Powerful Analytics',
      description: 'Understand your patterns with comprehensive insights. View heatmap calendars and track streaks.'
    },
    {
      icon: '🎯',
      title: 'Vision Board',
      description: 'Bring your dreams to life with customizable vision boards. Add photos and create daily inspiration.'
    },
    {
      icon: '🏷️',
      title: 'Smart Categories',
      description: 'Group habits into 8 beautiful color-coded themes: Mindfulness, Fitness, Learning, and more.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'All your data stays on your device. Optional iCloud sync, no tracking, no ads.'
    },
    {
      icon: '📱',
      title: 'Widget Support',
      description: 'Track progress from your home screen with beautiful iOS widgets showing streaks at a glance.'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Create Your Habits',
      description: 'Tap the shell button to add a new habit. Choose a name, category, frequency, and target.'
    },
    {
      number: '02',
      title: 'Track Your Progress',
      description: 'Mark habits complete with a tap. Watch your pearl chain grow and earn milestones.'
    },
    {
      number: '03',
      title: 'Achieve Your Goals',
      description: 'Review analytics, celebrate achievements, and adjust your approach. Build habits that stick.'
    }
  ]

  return (
    <div className={`shellist ${isLoaded ? 'shellist--loaded' : ''}`}>
      {/* Hero Section */}
      <section className="shellist__hero">
        <div className="shellist__hero-content">
          <div className="shellist__hero-text">
            <span className="shellist__label">Habit Tracking</span>
            <h1 className="shellist__title">
              Shellist<span className="shellist__dot">.</span>
            </h1>
            <p className="shellist__tagline">Build habits like pearls</p>
            <p className="shellist__description">
              Transform your life one habit at a time. Track your daily progress
              with beautiful pearl visualizations and motivational tools.
            </p>
            <div className="shellist__hero-actions">
              <a href="#" className="shellist__btn shellist__btn--primary">
                <svg width="18" height="22" viewBox="0 0 20 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download on App Store
              </a>
              <a href="https://shellist.netlify.app" className="shellist__btn shellist__btn--outline" target="_blank" rel="noopener noreferrer">
                Visit Website →
              </a>
            </div>
          </div>

          <div className="shellist__hero-visual">
            <div className="shellist__pearls">
              <div className="shellist__pearl shellist__pearl--1"></div>
              <div className="shellist__pearl shellist__pearl--2"></div>
              <div className="shellist__pearl shellist__pearl--3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="shellist__features">
        <div className="shellist__section-header">
          <div className="shellist__section-title">
            <span className="shellist__section-number">№</span>
            <h2>Features</h2>
          </div>
          <span className="shellist__section-count">{features.length} things we love</span>
        </div>

        <div className="shellist__features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="shellist__feature"
              style={{ '--index': index }}
            >
              <span className="shellist__feature-icon">{feature.icon}</span>
              <h3 className="shellist__feature-title">{feature.title}</h3>
              <p className="shellist__feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="shellist__steps">
        <div className="shellist__section-header">
          <div className="shellist__section-title">
            <span className="shellist__section-number">№</span>
            <h2>How It Works</h2>
          </div>
          <span className="shellist__section-count">Simple to start</span>
        </div>

        <div className="shellist__steps-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className="shellist__step"
              style={{ '--index': index }}
            >
              <span className="shellist__step-number">{step.number}</span>
              <h3 className="shellist__step-title">{step.title}</h3>
              <p className="shellist__step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="shellist__cta">
        <div className="shellist__cta-card">
          <span className="shellist__cta-icon">🐚</span>
          <h2 className="shellist__cta-title">Start Building Better Habits</h2>
          <p className="shellist__cta-text">
            Download Shellist and watch your transformation unfold, one pearl at a time.
          </p>
          <a href="#" className="shellist__btn shellist__btn--primary">
            Download on App Store
          </a>
          <p className="shellist__cta-note">
            Available for iPhone and iPad • iOS 17.0 or later • Free to use
          </p>
        </div>
      </section>
    </div>
  )
}
