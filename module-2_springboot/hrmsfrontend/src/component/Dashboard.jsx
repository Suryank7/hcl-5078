import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './shared/NexoraUI.css';
import './Dashboard.css';
import NexoraBrand from './shared/NexoraBrand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

function readSavedEmployee() {
  try {
    const savedEmployee = sessionStorage.getItem('hrmsEmployee');
    return savedEmployee ? JSON.parse(savedEmployee) : null;
  } catch {
    return null;
  }
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getLocalTimeString(date = new Date()) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

function formatDate(date) {
  if (!date) return '—';
  const parsedDate = new Date(`${date}T12:00:00`);
  return Number.isNaN(parsedDate.getTime())
    ? date
    : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(parsedDate);
}

function formatTime(time) {
  if (!time) return '—';
  const [hours, minutes] = String(time).split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time;
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date);
}

function getInitials(name = 'Employee') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'E';
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(() => location.state?.employee || readSavedEmployee());
  const [attendance, setAttendance] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState('');
  const [attendanceAction, setAttendanceAction] = useState('');
  const [attendanceNotice, setAttendanceNotice] = useState('');
  const [profileEditing, setProfileEditing] = useState(false);
  const [profileDraft, setProfileDraft] = useState({ empName: '', designation: '', stack: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileNotice, setProfileNotice] = useState('');
  const [profileError, setProfileError] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  const employeeId = employee?.empId;

  const loadAttendance = useCallback(async () => {
    if (!employeeId) return;
    setAttendanceLoading(true);
    setAttendanceError('');
    try {
      const response = await fetch(`${API_BASE_URL}/v1/user/attendance/by-employee/${encodeURIComponent(employeeId)}`);
      const responseText = await response.text();
      let result = [];
      try {
        result = responseText ? JSON.parse(responseText) : [];
      } catch {
        result = [];
      }
      if (!response.ok) {
        throw new Error(typeof result === 'string' ? result : result?.message || `Could not load attendance (${response.status})`);
      }
      setAttendance(Array.isArray(result) ? result : []);
    } catch (requestError) {
      setAttendanceError(requestError instanceof TypeError
        ? 'Could not connect to the attendance service. Check that the Spring Boot backend is running.'
        : requestError.message || 'Could not load attendance.');
    } finally {
      setAttendanceLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    if (!employeeId) {
      navigate('/Login', { replace: true });
      return;
    }
    loadAttendance();
  }, [employeeId, loadAttendance, navigate]);

  const employeeName = employee?.empName || 'Employee';
  const initials = getInitials(employeeName);
  const today = getLocalDateString();
  const todayAttendance = attendance.find((record) => record.attendancedate === today);
  const currentDateLabel = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());
  const recentAttendance = attendance.slice(0, 8);

  const weekActivity = useMemo(() => {
    const todayDate = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(todayDate);
      date.setDate(todayDate.getDate() - (6 - index));
      const dateKey = getLocalDateString(date);
      const present = attendance.some((record) => record.attendancedate === dateKey);
      return {
        dateKey,
        day: new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(date),
        dayNumber: date.getDate(),
        present,
        height: present ? 100 : 12,
      };
    });
  }, [attendance]);

  const handleSignOut = () => {
    sessionStorage.removeItem('hrmsEmployee');
    navigate('/Login', { replace: true });
  };

  const handleMarkAttendance = async () => {
    if (!employeeId || todayAttendance || attendanceAction) return;
    setAttendanceAction('loading');
    setAttendanceNotice('');
    try {
      const response = await fetch(`${API_BASE_URL}/v1/user/attendance/markattendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee: { empId: employeeId },
          inTime: getLocalTimeString(),
        }),
      });
      const result = await response.text();
      if (!response.ok) throw new Error(result || `Could not mark attendance (${response.status})`);
      if (/attendance marked successfully/i.test(result)) {
        setAttendanceNotice('Your attendance has been marked successfully.');
      } else if (/already marked/i.test(result)) {
        setAttendanceNotice('Your attendance has already been marked for today.');
      } else {
        throw new Error(result || 'The server did not confirm your check-in.');
      }
      await loadAttendance();
    } catch (requestError) {
      setAttendanceNotice(requestError instanceof TypeError
        ? `Cannot reach the backend at ${API_BASE_URL}. Please try again when the service is available.`
        : requestError.message || 'Could not mark attendance.');
    } finally {
      setAttendanceAction('');
    }
  };

  const beginProfileEdit = () => {
    setProfileDraft({
      empName: employee?.empName || '',
      designation: employee?.designation || '',
      stack: employee?.stack || '',
    });
    setProfileError('');
    setProfileNotice('');
    setProfileEditing(true);
  };

  const handleProfileChange = (event) => {
    setProfileDraft((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    if (!employeeId) return;
    setProfileSaving(true);
    setProfileError('');
    setProfileNotice('');
    try {
      const response = await fetch(`${API_BASE_URL}/v1/user/updatebyid/${encodeURIComponent(employeeId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empId: employeeId,
          empName: profileDraft.empName.trim(),
          designation: profileDraft.designation.trim(),
          stack: profileDraft.stack.trim(),
        }),
      });
      const result = await response.text();
      if (!response.ok) throw new Error(result || `Could not update profile (${response.status})`);
      if (!/employee updated successfully/i.test(result)) throw new Error(result || 'The server did not confirm your profile update.');

      const updatedEmployee = { ...employee, ...profileDraft, empName: profileDraft.empName.trim(), designation: profileDraft.designation.trim(), stack: profileDraft.stack.trim() };
      setEmployee(updatedEmployee);
      sessionStorage.setItem('hrmsEmployee', JSON.stringify(updatedEmployee));
      setProfileEditing(false);
      setProfileNotice('Your profile details have been updated.');
    } catch (requestError) {
      setProfileError(requestError instanceof TypeError
        ? 'Could not connect to the employee service. Check that the backend is running.'
        : requestError.message || 'Could not update your profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  if (!employeeId) return null;

  return (
    <main className="nexora-page nx-dashboard">
      <aside className="nx-dashboard__sidebar">
        <div className="nx-dashboard__brand-wrap"><NexoraBrand /><span className="nx-dashboard__brand-caption">PEOPLE WORKSPACE</span></div>
        <div className="nx-dashboard__nav-label">MENU</div>
        <nav className="nx-dashboard__nav" aria-label="Employee workspace navigation">
          <a className={activeSection === 'overview' ? 'is-active' : ''} href="#overview" onClick={() => setActiveSection('overview')}><span className="nx-dashboard__nav-icon">▦</span> Dashboard</a>
          <a className={activeSection === 'attendance' ? 'is-active' : ''} href="#attendance" onClick={() => setActiveSection('attendance')}><span className="nx-dashboard__nav-icon">◷</span> Attendance</a>
          <a className={activeSection === 'profile' ? 'is-active' : ''} href="#profile" onClick={() => setActiveSection('profile')}><span className="nx-dashboard__nav-icon">♙</span> My profile</a>
        </nav>
        <div className="nx-dashboard__sidebar-bottom">
          <div className="nx-dashboard__sidebar-avatar">{initials}</div>
          <div className="nx-dashboard__sidebar-identity"><strong>{employeeName}</strong><span>Employee account</span></div>
          <button type="button" className="nx-dashboard__sidebar-exit" onClick={handleSignOut} aria-label="Sign out" title="Sign out">↗</button>
        </div>
      </aside>

      <section className="nx-dashboard__main" id="overview">
        <header className="nx-dashboard__topbar">
          <div className="nx-dashboard__topbar-title"><span className="nx-dashboard__mobile-mark"><NexoraBrand /></span><span>Employee workspace <b>/</b> Overview</span></div>
          <div className="nx-dashboard__topbar-actions">
            <span className="nx-dashboard__secure"><span /> Secure workspace</span>
            <div className="nx-dashboard__top-avatar" title={employeeName}>{initials}</div>
            <button type="button" className="nx-dashboard__signout" onClick={handleSignOut}>Sign out <span aria-hidden="true">↗</span></button>
          </div>
        </header>

        <div className="nx-dashboard__content">
          <div className="nx-dashboard__welcome-row">
            <div>
              <span className="nx-dashboard__eyebrow">YOUR PEOPLE PORTAL</span>
              <h1>{getGreeting()}, {employeeName.split(/\s+/)[0]}<span>.</span></h1>
              <p>Here’s what’s happening in your workspace today.</p>
            </div>
            <div className="nx-dashboard__date-pill"><span aria-hidden="true">▦</span>{currentDateLabel}</div>
          </div>

          <section className="nx-dashboard__stats" aria-label="Employee summary">
            <article className="nx-dashboard__stat nx-dashboard__stat--attendance">
              <div className="nx-dashboard__stat-top"><span>YOUR ATTENDANCE TODAY</span><span className="nx-dashboard__stat-icon nx-dashboard__stat-icon--yellow">◷</span></div>
              {attendanceLoading ? <div className="nx-dashboard__skeleton" /> : <strong className="nx-dashboard__stat-value">{todayAttendance ? 'Checked in' : 'Not marked'}</strong>}
              <span className="nx-dashboard__stat-hint">{attendanceLoading ? 'Checking your latest status…' : todayAttendance ? `Check-in at ${formatTime(todayAttendance.inTime)}` : 'Mark your attendance to get started'}</span>
              {!attendanceLoading && !todayAttendance && <button className="nx-dashboard__checkin" type="button" onClick={handleMarkAttendance} disabled={attendanceAction === 'loading'}>{attendanceAction === 'loading' ? 'Marking…' : 'Check in now'} <span>→</span></button>}
              {todayAttendance && <span className="nx-dashboard__present-pill"><i /> Present today</span>}
            </article>
            <article className="nx-dashboard__stat">
              <div className="nx-dashboard__stat-top"><span>ATTENDANCE RECORDS</span><span className="nx-dashboard__stat-icon">▤</span></div>
              <strong className="nx-dashboard__stat-value">{attendanceLoading ? '—' : attendance.length}</strong>
              <span className="nx-dashboard__stat-hint">Recorded check-ins in your account</span>
            </article>
            <article className="nx-dashboard__stat">
              <div className="nx-dashboard__stat-top"><span>EMPLOYEE ID</span><span className="nx-dashboard__stat-icon">♙</span></div>
              <strong className="nx-dashboard__stat-value">{employeeId}</strong>
              <span className="nx-dashboard__stat-hint">Your registered employee number</span>
            </article>
          </section>

          {attendanceNotice && <div className={`nx-dashboard__notice ${/successfully|already been marked/i.test(attendanceNotice) ? 'is-success' : 'is-error'}`} role="status">{attendanceNotice}</div>}

          <section className="nx-dashboard__primary-grid">
            <article className="nx-dashboard__card nx-dashboard__activity-card">
              <div className="nx-dashboard__card-heading">
                <div><span className="nx-dashboard__card-eyebrow">YOUR RECENT ACTIVITY</span><h2>Attendance overview</h2></div>
                <span className="nx-dashboard__card-badge">Last 7 days</span>
              </div>
              {attendanceError ? (
                <div className="nx-dashboard__empty nx-dashboard__empty--error"><strong>Attendance is unavailable</strong><span>{attendanceError}</span><button type="button" onClick={loadAttendance}>Try again</button></div>
              ) : attendanceLoading ? (
                <div className="nx-dashboard__chart-loading"><span className="nx-dashboard__loading-dot" /> Loading your attendance…</div>
              ) : (
                <div className="nx-dashboard__week-chart" aria-label="Attendance during the last seven days">
                  {weekActivity.map((day) => (
                    <div className="nx-dashboard__chart-day" key={day.dateKey}>
                      <div className="nx-dashboard__chart-track"><span className={day.present ? 'is-present' : ''} style={{ height: `${day.height}%` }} title={day.present ? `Present on ${formatDate(day.dateKey)}` : `No record on ${formatDate(day.dateKey)}`} /></div>
                      <span className="nx-dashboard__chart-label">{day.day}</span>
                      <small>{day.dayNumber}</small>
                    </div>
                  ))}
                </div>
              )}
              <div className="nx-dashboard__chart-legend"><span><i className="is-present" /> Attendance recorded</span><span><i /> No record</span></div>
            </article>

            <article className="nx-dashboard__card nx-dashboard__profile-card" id="profile">
              <div className="nx-dashboard__card-heading">
                <div><span className="nx-dashboard__card-eyebrow">YOUR INFORMATION</span><h2>Employee profile</h2></div>
                {!profileEditing && <button className="nx-dashboard__text-button" type="button" onClick={beginProfileEdit}>Edit details <span>↗</span></button>}
              </div>
              <div className="nx-dashboard__profile-person">
                <span className="nx-dashboard__profile-avatar">{initials}</span>
                <div><strong>{employeeName}</strong><span>{employee?.designation || 'Employee'}</span></div>
              </div>
              {profileEditing ? (
                <form className="nx-dashboard__profile-form" onSubmit={saveProfile}>
                  <label>Full name<input name="empName" value={profileDraft.empName} onChange={handleProfileChange} required /></label>
                  <label>Designation<input name="designation" value={profileDraft.designation} onChange={handleProfileChange} required /></label>
                  <label>Tech stack<input name="stack" value={profileDraft.stack} onChange={handleProfileChange} required /></label>
                  {profileError && <div className="nx-dashboard__inline-error" role="alert">{profileError}</div>}
                  <div className="nx-dashboard__profile-actions"><button type="button" className="nx-dashboard__cancel" onClick={() => setProfileEditing(false)} disabled={profileSaving}>Cancel</button><button type="submit" className="nx-dashboard__save" disabled={profileSaving}>{profileSaving ? 'Saving…' : 'Save changes'}</button></div>
                </form>
              ) : (
                <dl className="nx-dashboard__profile-list">
                  <div><dt>Employee ID</dt><dd>{employee?.empId || '—'}</dd></div>
                  <div><dt>Full name</dt><dd>{employee?.empName || '—'}</dd></div>
                  <div><dt>Designation</dt><dd>{employee?.designation || '—'}</dd></div>
                  <div><dt>Tech stack</dt><dd>{employee?.stack || '—'}</dd></div>
                </dl>
              )}
              {profileNotice && !profileEditing && <div className="nx-dashboard__profile-success" role="status">✓ {profileNotice}</div>}
            </article>
          </section>

          <section className="nx-dashboard__card nx-dashboard__attendance-card" id="attendance">
            <div className="nx-dashboard__card-heading">
              <div><span className="nx-dashboard__card-eyebrow">YOUR CHECK-IN HISTORY</span><h2>Recent attendance</h2></div>
              <span className="nx-dashboard__card-badge">{attendanceLoading ? 'Loading…' : `${attendance.length} records`}</span>
            </div>
            {attendanceError ? (
              <div className="nx-dashboard__empty nx-dashboard__empty--error"><strong>We couldn’t load your attendance.</strong><span>{attendanceError}</span></div>
            ) : attendanceLoading ? (
              <div className="nx-dashboard__chart-loading"><span className="nx-dashboard__loading-dot" /> Loading attendance records…</div>
            ) : attendance.length === 0 ? (
              <div className="nx-dashboard__empty"><span className="nx-dashboard__empty-icon">◷</span><strong>No attendance records yet</strong><span>Your check-ins will appear here once marked.</span></div>
            ) : (
              <div className="nx-dashboard__table-wrap">
                <table className="nx-dashboard__table">
                  <thead><tr><th>DATE</th><th>CHECK-IN TIME</th><th>STATUS</th></tr></thead>
                  <tbody>{recentAttendance.map((record) => (
                    <tr key={record.attendanceId ?? `${record.attendancedate}-${record.inTime}`}>
                      <td><strong>{formatDate(record.attendancedate)}</strong></td>
                      <td>{formatTime(record.inTime)}</td>
                      <td><span className="nx-dashboard__status"><i /> Present</span></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
            {attendance.length > 8 && <p className="nx-dashboard__table-note">Showing the 8 most recent records.</p>}
          </section>

          <footer className="nx-dashboard__footer">Nexora <span>·</span> Employee workspace <span>·</span> People first</footer>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
