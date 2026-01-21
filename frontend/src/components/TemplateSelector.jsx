import React from 'react';

function TemplateSelector({ setTheme }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Choose Template:</h3>
      <button style={{ marginRight: '10px' }} onClick={() => setTheme('blue')}>Blue</button>
      <button style={{ marginRight: '10px' }} onClick={() => setTheme('green')}>Green</button>
      <button onClick={() => setTheme('purple')}>Purple</button>
    </div>
  );
}

export default TemplateSelector;
