import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// fix: make sure child components do not get unmounted by hot loader
module.hot.accept('./components/App.jsx', () => {
    const NextApp = require('./components/App.jsx').default;
    render(<NextApp />);
});