import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// fix: make sure child components do not get unmounted by hot loader
module.hot.accept('./components/app.jsx', () => {
    const NextApp = require('./components/app.jsx').default;
    render(<NextApp />);
});