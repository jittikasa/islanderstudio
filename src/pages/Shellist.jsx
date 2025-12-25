import './AppPage.css'

export default function Shellist() {
  return (
    <div className="app-page shellist-page">
      {/* Hero */}
      <section className="app-hero coastal-gradient">
        <div className="container">
          <div className="app-hero-content">
            <div className="app-hero-text fade-in-up">
              <div className="app-badge-large" style={{ background: '#4A90A4' }}>
                Habit Tracking
              </div>
              <h1 className="app-hero-title">
                Build Habits
                <br />
                Like Pearls
              </h1>
              <p className="app-hero-description">
                Transform your life one habit at a time. Track your daily progress
                with beautiful pearl visualizations, powerful analytics, and
                motivational tools that make habit building feel like a treasure hunt.
              </p>
              <div className="app-hero-actions">
                <a href="#" className="btn btn-primary btn-large">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Download on App Store
                </a>
                <a href="https://shellist.netlify.app" className="btn btn-outline btn-large" target="_blank" rel="noopener noreferrer">
                  Visit Full Website
                </a>
              </div>
            </div>
            <div className="app-hero-visual fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="app-mockup coastal-mockup">
                <div className="pearl-decoration">
                  <div className="pearl"></div>
                  <div className="pearl"></div>
                  <div className="pearl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section app-features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Shellist?</h2>
            <p className="section-subtitle">
              Everything you need to build lasting habits, beautifully designed for iOS.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🐚</div>
              <h3 className="feature-title">Pearl Chain Visualization</h3>
              <p className="feature-description">
                Watch your progress grow like a string of pearls. Each habit
                completion adds to your beautiful chain, making your journey
                tangible and rewarding.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Powerful Analytics</h3>
              <p className="feature-description">
                Understand your patterns with comprehensive insights. View heatmap
                calendars, track streaks, and discover what drives your success.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Vision Board</h3>
              <p className="feature-description">
                Bring your dreams to life with customizable vision boards. Add
                photos, stickers, and create daily inspiration at your fingertips.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏷️</div>
              <h3 className="feature-title">Smart Categories</h3>
              <p className="feature-description">
                Group habits into 8 beautiful color-coded themes: Mindfulness,
                Fitness, Learning, Health, Creativity, Social, Finance, and Personal.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Privacy First</h3>
              <p className="feature-description">
                All your data stays on your device. Optional iCloud sync, no
                tracking, no ads. Your journey is yours alone.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Widget Support</h3>
              <p className="feature-description">
                Track progress from your home screen with beautiful iOS widgets
                showing streaks and completion rates at a glance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works-section coastal-bg">
        <div className="container">
          <h2 className="section-title text-center">Simple to Start, Powerful to Master</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Create Your Habits</h3>
              <p className="step-description">
                Tap the shell button to add a new habit. Choose a name, category,
                frequency, and target. Shellist adapts to your rhythm.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Track Your Progress</h3>
              <p className="step-description">
                Mark habits complete with a tap. Watch your pearl chain grow,
                earn milestones, and add notes for deeper insights.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Achieve Your Goals</h3>
              <p className="step-description">
                Review analytics, celebrate achievements, and adjust your
                approach. Build habits that actually stick.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section app-cta-section">
        <div className="container">
          <div className="app-cta-card coastal-cta">
            <h2 className="app-cta-title">Start Building Better Habits Today</h2>
            <p className="app-cta-description">
              Download Shellist and watch your transformation unfold, one pearl at a time.
            </p>
            <div className="app-cta-actions">
              <a href="#" className="btn btn-primary btn-large">
                Download on App Store
              </a>
              <p className="app-cta-note">
                Available for iPhone and iPad • iOS 17.0 or later • Free to use
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
