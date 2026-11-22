import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './shared/NexoraUI.css';
import './shared/Auth.css';
import './Login.css';
import NexoraBrand from './shared/NexoraBrand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ admission_no: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const registrationSuccess = location.state?.registrationSuccess || '';

  const handleChange = (event) => {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const query = new URLSearchParams(credentials);
      const response = await fetch(`${API_BASE_URL}/v1/user/login?${query.toString()}`, {
        method: 'POST',
      });
      const responseText = await response.text();
      let result = responseText;
      try {
        result = responseText ? JSON.parse(responseText) : null;
      } catch {
        // The Spring Boot endpoint may return a plain-text error.
      }

      if (!response.ok) {
        const message = typeof result === 'string' ? result : result?.message || result?.error;
        throw new Error(message || `Login failed (${response.status})`);
      }

      if (!result || typeof result !== 'object' || !result.empId) {
        throw new Error(typeof result === 'string' ? result : 'The server returned an invalid employee profile.');
      }

      sessionStorage.setItem('hrmsEmployee', JSON.stringify(result));
      navigate('/Dashboard', { state: { employee: result }, replace: true });
    } catch (requestError) {
      const isNetworkError = requestError instanceof TypeError;
      setError(isNetworkError
        ? `Cannot reach the backend at ${API_BASE_URL}. Start the Spring Boot service and allow requests from this frontend origin.`
        : requestError.message || 'Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="nexora-page nx-auth nx-login-page">
      <section className="nx-auth__showcase" aria-label="Nexora employee platform">
        <NexoraBrand subtitle />
        <div className="nx-auth__pitch">
          <span className="nx-auth__eyebrow">A BETTER WAY TO WORK</span>
          <h1>A smarter workplace for <span>everyone.</span></h1>
          <p>Bring your workday together. Keep your employee profile and attendance close, clear, and easy to manage.</p>
          <div className="nx-auth__preview" aria-hidden="true">
            <div className="nx-auth__preview-head">
              <div className="nx-auth__preview-user">
                <span className="nx-auth__preview-avatar">N</span>
                <span><small>Good morning</small><strong>Your workspace</strong></span>
              </div>
              <span className="nx-auth__preview-chip">Workspace</span>
            </div>
            <div className="nx-auth__preview-row">
              <div className="nx-auth__preview-attendance">
                <small>Today's attendance</small>
                <strong>09:00 AM</strong>
                <span>● Check-in overview</span>
              </div>
              <div className="nx-auth__preview-balance">
                <small>Employee portal</small>
                <strong>01</strong>
                <span>Your profile, one place</span>
              </div>
            </div>
            <div className="nx-auth__preview-tools">
              <span>◷ &nbsp; Attendance</span><span>▤ &nbsp; My details</span><span>✧ &nbsp; Workspace</span>
            </div>
          </div>
        </div>
        <div className="nx-auth__showcase-footer">
          <span>People first. Progress together.</span>
          <span className="nx-auth__footer-dots"><span /><span /><span /></span>
        </div>
      </section>

      <section className="nx-auth__panel">
        <div className="nx-auth__inner">
          <div className="nx-auth__mobile-brand"><NexoraBrand subtitle /></div>
          <header className="nx-auth__heading">
            <span className="nx-auth__eyebrow">WELCOME BACK</span>
            <h2>Sign in to continue.</h2>
            <p>Enter your employee credentials to access your workspace.</p>
          </header>

          <form className="nx-auth__form" onSubmit={handleSubmit}>
            {registrationSuccess && (
              <div className="nexora-alert nexora-alert--success" role="status">
                <span className="nexora-alert__icon" aria-hidden="true">✓</span>
                <span>{registrationSuccess}</span>
              </div>
            )}
            <div className="nx-auth__field">
              <label htmlFor="login-admission-number">Admission number</label>
              <div className="nx-auth__input-wrap">
                <svg className="nx-auth__input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M6.5 16c.6-1.3 1.4-2 2.5-2s1.9.7 2.5 2M14 10h3.5M14 14h3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  id="login-admission-number"
                  name="admission_no"
                  autoComplete="username"
                  inputMode="numeric"
                  placeholder="Enter your admission number"
                  value={credentials.admission_no}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="nx-auth__field">
              <label htmlFor="login-password">Password</label>
              <div className="nx-auth__input-wrap">
                <svg className="nx-auth__input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M8 10V7.5a4 4 0 1 1 8 0V10M12 14v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
                <button
                  className="nx-auth__toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && <div className="nexora-alert" role="alert"><span className="nexora-alert__icon">!</span><span>{error}</span></div>}

            <div className="nx-auth__row">
              <span className="nx-auth__hint">Use the credentials provided by HR.</span>
              <span className="nx-auth__hint">Secure sign-in</span>
            </div>

            <button className="nexora-button nx-auth__submit" type="submit" disabled={loading}>
              <span>{loading ? 'Signing you in…' : 'Sign in'}</span>
              {loading ? <span className="nexora-spinner" aria-hidden="true" /> : <span aria-hidden="true">→</span>}
            </button>
          </form>

          <div className="nx-auth__divider">or</div>
          <Link className="nexora-button nexora-button--light nx-auth__alternate" to="/Registration">
            Create an employee account <span aria-hidden="true">↗</span>
          </Link>
          <p className="nx-auth__switch">Need help signing in? <span className="nx-auth__text-link">Contact your HR administrator</span></p>
          <div className="nx-auth__bottom">© {new Date().getFullYear()} Nexora <span>·</span> Employee workspace</div>
        </div>
      </section>
    </main>
  );
}

export default Login;
