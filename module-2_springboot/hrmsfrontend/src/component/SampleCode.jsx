import React, { useEffect, useState } from 'react';
import './shared/NexoraUI.css';
import './SampleCode.css';

function SampleCode({ empdata }) {
  const [counter, setCounter] = useState(20);
  const [pointer, setPointer] = useState(100);

  useEffect(() => {
    console.log(`Counter=${counter}`);
    console.log(`Pointer=${pointer}`);
  }, [pointer, counter]);

  return (
    <main className="nexora-page nx-sample-page">
      <section className="nx-sample-card">
        <span className="nx-sample-card__eyebrow">COMPONENT PREVIEW</span>
        <h1>State interaction demo</h1>
        <p>This keeps the original counter behaviour while using the Nexora visual system.</p>
        <div className="nx-sample-card__metrics">
          <article><span>Counter</span><strong>{counter}</strong><button type="button" onClick={() => setCounter((value) => value + 2)}>Increase by 2 <b>+</b></button></article>
          <article><span>Pointer</span><strong>{pointer}</strong><button type="button" onClick={() => setPointer((value) => value - 2)}>Decrease by 2 <b>−</b></button></article>
        </div>
        {empdata && <div className="nx-sample-card__data">{typeof empdata === 'string' ? empdata : JSON.stringify(empdata)}</div>}
      </section>
    </main>
  );
}

export default SampleCode;
