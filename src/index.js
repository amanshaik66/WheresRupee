import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+ API for rendering
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext'; // Theme context provider
import ErrorBoundary from './components/ErrorBoundary'; // ErrorBoundary for runtime error handling

// CSS imports (centralized in styles/index.css)
import 'normalize.css'; // CSS reset for consistency
import './styles/index.css'; // Consolidated CSS imports

// Root application rendering
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Provider store={store}>
           <App />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
