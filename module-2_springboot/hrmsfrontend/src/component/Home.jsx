import React from 'react';
import { Link } from 'react-router-dom';
import './shared/NexoraUI.css';
import './shared/Auth.css';
import './Home.css';
import NexoraBrand from './shared/NexoraBrand';

function Home() {
  return (
    <main className="nexora-page nx-home">
      <header className="nx-home__header">
        <NexoraBrand subtitle />
        <nav className="nx-home__nav" aria-label="Main navigation">
          <a href="#features">Your workspace</a>
          <Link to="/Login">Sign in</Link>
          <Link className="nexora-button nx-home__nav-cta" to="/Registration">Get started <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>

      <section className="nx-home__hero">
        <div className="nx-home__copy">
          <span className="nx-auth__eyebrow">EMPLOYEE &amp; WORKFORCE MANAGEMENT</span>
          <h1>Your workday, <span>in sync.</span></h1>
          <p>A simpler way to stay connected to your employee profile and attendance. Everything you need for your workday, in one calm workspace.</p>
          <div className="nx-home__actions">
            <Link className="nexora-button" to="/Login">Open your workspace <span aria-hidden="true">→</span></Link>
            <Link className="nx-home__secondary" to="/Registration">Create an account <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="nx-home__trust"><span className="nx-home__trust-icon">✓</span> Simple. Clear. People-first.</div>
        </div>

        <div className="nx-home__visual" aria-label="Preview of the Nexora employee workspace">
          <div className="nx-home__orb nx-home__orb--one" />
          <div className="nx-home__orb nx-home__orb--two" />
          <div className="nx-home__preview">
            <div className="nx-home__preview-top">
              <div><small>YOUR WORKSPACE</small><strong>Good morning.</strong></div>
              <span className="nx-home__preview-avatar">N</span>
            </div>
            <div className="nx-home__preview-attendance">
              <div><small>ATTENDANCE TODAY</small><strong>Stay on track</strong><span>Check in and keep your record up to date.</span></div>
              <span className="nx-home__clock">◷</span>
            </div>
            <div className="nx-home__preview-grid">
              <div><span className="nx-home__tile-icon">▤</span><small>Employee profile</small><strong>Your details</strong></div>
              <div><span className="nx-home__tile-icon nx-home__tile-icon--yellow">◷</span><small>Attendance</small><strong>Recent activity</strong></div>
            </div>
            <div className="nx-home__preview-footer"><span /> Your people workspace is ready</div>
          </div>
          <div className="nx-home__floating-note"><span>✦</span><div><strong>One connected place</strong><small>Your everyday essentials</small></div></div>
        </div>
      </section>

      <section className="nx-home__features" id="features">
        <div className="nx-home__section-heading">
          <span className="nx-auth__eyebrow">MADE FOR YOUR WORKDAY</span>
          <h2>Less scattered. More connected.</h2>
        </div>
        <div className="nx-home__feature-grid">
          <article><span className="nx-home__feature-icon">◷</span><h3>Attendance, at a glance</h3><p>Check your daily attendance status and review previous check-in records.</p></article>
          <article><span className="nx-home__feature-icon nx-home__feature-icon--yellow">▤</span><h3>Your details, up to date</h3><p>View and maintain the employee information associated with your account.</p></article>
          <article><span className="nx-home__feature-icon nx-home__feature-icon--dark">⌁</span><h3>A calmer workspace</h3><p>Access your employee essentials through a clean, responsive experience.</p></article>
        </div>
      </section>
      <footer className="nx-home__footer">© {new Date().getFullYear()} Nexora <span>·</span> Employee &amp; Workforce Management</footer>
    </main>
  );
}

export default Home;
