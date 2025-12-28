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
      number: '01',
      title: 'Pearl Chain Visualization',
      description: 'Watch your progress grow like a string of pearls. Each habit completion adds to your beautiful chain.'
    },
    {
      number: '02',
      title: 'Powerful Analytics',
      description: 'Understand your patterns with comprehensive insights. View heatmap calendars and track streaks.'
    },
    {
      number: '03',
      title: 'Vision Board',
      description: 'Bring your dreams to life with customizable vision boards. Add photos and create daily inspiration.'
    },
    {
      number: '04',
      title: 'Smart Categories',
      description: 'Group habits into 8 beautiful color-coded themes: Mindfulness, Fitness, Learning, and more.'
    },
    {
      number: '05',
      title: 'Privacy First',
      description: 'All your data stays on your device. Optional iCloud sync, no tracking, no ads.'
    },
    {
      number: '06',
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
              <a href="https://apps.apple.com/us/app/shellist/id6755242144" className="shellist__btn shellist__btn--primary">
                <svg width="18" height="22" viewBox="0 0 20 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download on App Store
              </a>
            </div>
          </div>

          <div className="shellist__hero-visual">
            <img
              src="/shellist/images/screenshots/Screens-2.png"
              alt="Shellist app interface showing habit tracking"
              className="shellist__hero-image"
            />
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
              <span className="shellist__feature-number">{feature.number}</span>
              <h3 className="shellist__feature-title">{feature.title}</h3>
              <p className="shellist__feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* App Showcase */}
      <section className="shellist__showcase">
        <img
          src="/shellist/images/screenshots/Screens-3.png"
          alt="Shellist app features overview"
          className="shellist__showcase-image"
        />
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

      {/* Vision Board Section */}
      <section className="shellist__vision">
        <div className="shellist__vision-content">
          <div className="shellist__vision-text">
            <h2 className="shellist__vision-title">Vision Meets Daily Action</h2>
            <p className="shellist__vision-description">
              Connect your aspirations to your actions. Define who you want to become,
              then build the daily habits that bridge the gap. Your vision board becomes
              actionable when paired with consistent micro-commitments that compound over time.
            </p>
          </div>
          <div className="shellist__vision-visual">
            <div className="shellist__vision-quote">
              <svg width="60" height="48" viewBox="0 0 60 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 28C12 22.48 14.62 18.44 19.86 15.88C22.42 14.62 23.7 13.36 23.7 12.1C23.7 10.84 22.92 9.58 21.36 8.32C19.8 7.06 18.24 6.42 16.68 6.42C15.12 6.42 13.86 7.06 12.9 8.34C11.94 9.62 11.46 11.32 11.46 13.44C11.46 15.56 12.24 17.26 13.8 18.54C15.36 19.82 17.22 20.46 19.38 20.46C21.54 20.46 23.4 19.82 24.96 18.54C26.52 17.26 27.3 15.56 27.3 13.44C27.3 9.62 25.74 6.42 22.62 3.84C19.5 1.26 15.42 0 10.38 0C5.34 0 1.26 1.26 0 3.84V28C0 35.08 2.94 40.64 8.82 44.68C14.7 48.72 22.32 48 31.68 42.34L28.26 36.76C21.18 40.8 15.72 41.76 11.88 39.64C8.04 37.52 6.12 33.64 6.12 28H12ZM44 28C44 22.48 46.62 18.44 51.86 15.88C54.42 14.62 55.7 13.36 55.7 12.1C55.7 10.84 54.92 9.58 53.36 8.32C51.8 7.06 50.24 6.42 48.68 6.42C47.12 6.42 45.86 7.06 44.9 8.34C43.94 9.62 43.46 11.32 43.46 13.44C43.46 15.56 44.24 17.26 45.8 18.54C47.36 19.82 49.22 20.46 51.38 20.46C53.54 20.46 55.4 19.82 56.96 18.54C58.52 17.26 59.3 15.56 59.3 13.44C59.3 9.62 57.74 6.42 54.62 3.84C51.5 1.26 47.42 0 42.38 0C37.34 0 33.26 1.26 32 3.84V28C32 35.08 34.94 40.64 40.82 44.68C46.7 48.72 54.32 48 63.68 42.34L60.26 36.76C53.18 40.8 47.72 41.76 43.88 39.64C40.04 37.52 38.12 33.64 38.12 28H44Z" fill="var(--coconut-shell)" fillOpacity="0.15"/>
              </svg>
            </div>
            <img
              src="/shellist/images/screenshots/Screens-4.png"
              alt="Shellist vision board feature"
              className="shellist__vision-image"
            />
          </div>
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
          <a href="https://apps.apple.com/us/app/shellist/id6755242144" className="shellist__btn shellist__btn--primary">
            Download on App Store
          </a>
          <p className="shellist__cta-note">
            Available for iPhone and iPad • iOS 17.0 or later • $2.99 USD
          </p>
        </div>
      </section>
    </div>
  )
}
