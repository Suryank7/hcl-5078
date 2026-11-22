import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './shared/NexoraUI.css';
import './shared/Auth.css';
import './Registration.css';
import NexoraBrand from './shared/NexoraBrand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const INITIAL_EMPLOYEE = { empId: '', empName: '', designation: '', stack: '', password: '' };

function Registration() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(INITIAL_EMPLOYEE);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setEmployee((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const sendData = async (event) => {
    event.preventDefault();
    setError('');

    const numericEmployeeId = Number(employee.empId);
    if (!Number.isSafeInteger(numericEmployeeId) || numericEmployeeId <= 0) {
      setError('Enter a valid numeric employee ID.');
      return;
    }

    setLoading(true);
    const employeeData = {
      empId: numericEmployeeId,
      empName: employee.empName.trim(),
      designation: employee.designation.trim(),
      stack: employee.stack.trim(),
      password: employee.password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/v1/user/addemp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      const result = await response.text();

      if (!response.ok) {
        throw new Error(result || `Registration failed (${response.status})`);
      }

      // This controller returns plain text and may send validation messages with HTTP 200.
      if (!/employee is added successfully/i.test(result)) {
        throw new Error(result || 'The server did not confirm employee registration.');
      }

      navigate('/Login', {
        replace: true,
        state: { registrationSuccess: 'Your employee account has been created. Sign in with your employee ID and password.' },
      });
    } catch (requestError) {
      setError(requestError instanceof TypeError
        ? `Cannot reach the backend at ${API_BASE_URL}. Start the Spring Boot service and try again.`
        : requestError.message || 'Could not complete registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="nexora-page nx-auth nx-registration-page">
      <section className="nx-auth__showcase" aria-label="Nexora employee platform">
        <NexoraBrand subtitle />
        <div className="nx-auth__pitch">
          <span className="nx-auth__eyebrow">YOUR WORKPLACE, CONNECTED</span>
          <h1>Make room for <span>better work.</span></h1>
          <p>Create your employee account to access your profile and attendance in one simple workspace.</p>
          <div className="nx-auth__preview" aria-hidden="true">
            <div className="nx-auth__preview-head">
              <div className="nx-auth__preview-user">
                <span className="nx-auth__preview-avatar">N</span>
                <span><small>Welcome to Nexora</small><strong>Your profile starts here</strong></span>
              </div>
              <span className="nx-auth__preview-chip">New account</span>
            </div>
            <div className="nx-auth__preview-row">
              <div className="nx-auth__preview-attendance">
                <small>Employee profile</small>
                <strong>Personal</strong>
                <span>● One connected workspace</span>
              </div>
              <div className="nx-auth__preview-balance">
                <small>Getting started</small>
                <strong>01</strong>
                <span>Create your account</span>
              </div>
            </div>
            <div className="nx-auth__preview-tools">
              <span>✓ &nbsp; Your details</span><span>◷ &nbsp; Attendance</span><span>✧ &nbsp; Nexora</span>
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
            <span className="nx-auth__eyebrow">GET STARTED</span>
            <h2>Create your account.</h2>
            <p>Enter the employee details registered with your organisation.</p>
          </header>

          <form className="nx-auth__form nx-registration-form" onSubmit={sendData}>
            <div className="nx-auth__field">
              <label htmlFor="registration-emp-id">Employee ID</label>
              <div className="nx-auth__input-wrap">
                <svg className="nx-auth__input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" /><path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                <input id="registration-emp-id" name="empId" type="number" min="1" step="1" inputMode="numeric" autoComplete="off" placeholder="Enter your employee ID" value={employee.empId} onChange={handleChange} required />
              </div>
            </div>
            <div className="nx-auth__field">
              <label htmlFor="registration-name">Full name</label>
              <div className="nx-auth__input-wrap">
                <svg className="nx-auth__input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" /><path d="M5 20c.7-3.3 3-5 7-5s6.3 1.7 7 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                <input id="registration-name" name="empName" type="text" autoComplete="name" placeholder="Enter your full name" value={employee.empName} onChange={handleChange} required />
              </div>
            </div>
            <div className="nx-registration-form__split">
              <div className="nx-auth__field">
                <label htmlFor="registration-designation">Designation</label>
                <div className="nx-auth__input-wrap">
                  <svg className="nx-auth__input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="7" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M9 7V5h6v2M4 12h16M10 12v2h4v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                  <input id="registration-designation" name="designation" type="text" placeholder="e.g. Developer" value={employee.designation} onChange={handleChange} required />
                </div>
              </div>
              <div className="nx-auth__field">
                <label htmlFor="registration-stack">Tech stack</label>
                <div className="nx-auth__input-wrap">
                  <svg className="nx-auth__input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <input id="registration-stack" name="stack" type="text" placeholder="e.g. Java" value={employee.stack} onChange={handleChange} required />
                </div>
              </div>
            </div>
            <div className="nx-auth__field">
              <label htmlFor="registration-password">Create password</label>
              <div className="nx-auth__input-wrap">
                <svg className="nx-auth__input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.7" /><path d="M8 10V7.5a4 4 0 1 1 8 0V10M12 14v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                <input id="registration-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Create a password" value={employee.password} onChange={handleChange} required />
                <button className="nx-auth__toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
            </div>

            {error && <div className="nexora-alert" role="alert"><span className="nexora-alert__icon">!</span><span>{error}</span></div>}

            <button className="nexora-button nx-auth__submit" type="submit" disabled={loading}>
              <span>{loading ? 'Creating account…' : 'Create account'}</span>
              {loading ? <span className="nexora-spinner" aria-hidden="true" /> : <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="nx-auth__switch">Already have an account? <Link className="nx-auth__text-link" to="/Login">Sign in</Link></p>
          <div className="nx-auth__bottom">© {new Date().getFullYear()} Nexora <span>·</span> Employee workspace</div>
        </div>
      </section>
    </main>
  );
}

export default Registration;
