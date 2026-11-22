import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './shared/NexoraUI.css';
import './UseFetchApi.css';
import NexoraBrand from './shared/NexoraBrand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const UseFetchApi = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/v1/user/`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const message = await response.text();
      setData(message);
    } catch (requestError) {
      setError(requestError instanceof TypeError
        ? `Cannot reach the backend at ${API_BASE_URL}. Start the Spring Boot service and check the frontend origin in the CORS configuration.`
        : requestError.message || 'Could not connect to the service.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <main className="nexora-page nx-service-page">
      <header className="nx-service-page__header"><NexoraBrand /><Link to="/Login">Back to sign in <span>→</span></Link></header>
      <section className="nx-service-card">
        <span className="nx-service-card__eyebrow">SYSTEM CONNECTION</span>
        <div className={`nx-service-card__symbol ${loading ? 'is-loading' : error ? 'is-error' : 'is-online'}`}>
          {loading ? <span className="nx-service-card__spinner" /> : error ? '!' : '✓'}
        </div>
        <h1>{loading ? 'Checking your connection' : error ? 'Service connection failed' : 'Your service is online'}</h1>
        <p>{loading ? 'Nexora is checking the employee service.' : error ? error : 'The HRMS employee service responded successfully and is ready to receive requests.'}</p>
        {!loading && !error && <div className="nx-service-card__response"><small>SERVER RESPONSE</small><strong>{data || 'Connected'}</strong></div>}
        {error && <button type="button" className="nexora-button" onClick={fetchData}>Try again <span>↻</span></button>}
        <div className="nx-service-card__endpoint"><span /> {API_BASE_URL}/v1/user/</div>
      </section>
    </main>
  );
};

export default UseFetchApi;
