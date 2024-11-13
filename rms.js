import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import './App.css';

// Action Types
const VIEW_HOME = 'HOME';
const VIEW_LOGIN = 'LOGIN';
const VIEW_SIGNUP = 'SIGNUP';
const VIEW_DASHBOARD = 'DASHBOARD';
const VIEW_SETTINGS = 'SETTINGS';
const VIEW_CUSTOMER_MANAGEMENT = 'CUSTOMER_MANAGEMENT';
const VIEW_ORDER_MANAGEMENT = 'ORDER_MANAGEMENT';
const VIEW_MENU_MANAGEMENT = 'MENU_MANAGEMENT';

// Language data
const languageOptions = {
  en: {
    welcome: 'Welcome to Our Restaurant Management System',
    login: 'Login',
    signUp: 'Sign Up',
    dashboard: 'Dashboard',
    settings: 'Settings',
    efficientManagement: 'Efficiently manage your restaurant operations, from menu management to order tracking and reporting.',
    home: 'Back to Home',
    recentOrders: 'Recent Orders',
    performanceMetrics: 'Performance Metrics',
    customerManagement: 'Customer Management',
    orderManagement: 'Order Management',
    menuManagement: 'Menu Management',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
  },
  es: {
    welcome: 'Bienvenido a Nuestro Sistema de Gestión de Restaurantes',
    login: 'Iniciar sesión',
    signUp: 'Registrarse',
    dashboard: 'Tablero',
    settings: 'Ajustes',
    efficientManagement: 'Gestione eficientemente las operaciones de su restaurante, desde la gestión del menú hasta el seguimiento de pedidos e informes.',
    home: 'Volver a inicio',
    recentOrders: 'Pedidos recientes',
    performanceMetrics: 'Métricas de rendimiento',
    customerManagement: 'Gestión de clientes',
    orderManagement: 'Gestión de pedidos',
    menuManagement: 'Gestión del menú',
    theme: 'Tema',
    language: 'Idioma',
    light: 'Claro',
    dark: 'Oscuro',
  },
  fr: {
    welcome: 'Bienvenue dans notre système de gestion de restaurant',
    login: 'Connexion',
    signUp: 'Inscription',
    dashboard: 'Tableau de bord',
    settings: 'Paramètres',
    efficientManagement: 'Gérez efficacement les opérations de votre restaurant, de la gestion des menus au suivi des commandes et aux rapports.',
    home: 'Retour à l\'accueil',
    recentOrders: 'Commandes récentes',
    performanceMetrics: 'Mesures de performance',
    customerManagement: 'Gestion des clients',
    orderManagement: 'Gestion des commandes',
    menuManagement: 'Gestion des menus',
    theme: 'Thème',
    language: 'Langue',
    light: 'Clair',
    dark: 'Sombre',
  },
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case VIEW_HOME:
      return { ...state, view: 'home', loginError: '', username: '', password: '' }; // Reset fields on home
    case VIEW_LOGIN:
      return { ...state, view: 'login' };
    case VIEW_SIGNUP:
      return { ...state, view: 'signup' };
    case VIEW_DASHBOARD:
      return { ...state, view: 'dashboard' };
    case VIEW_SETTINGS:
      return { ...state, view: 'settings' };
    case VIEW_CUSTOMER_MANAGEMENT:
      return { ...state, view: 'customer_management' };
    case VIEW_ORDER_MANAGEMENT:
      return { ...state, view: 'order_management' };
    case VIEW_MENU_MANAGEMENT:
      return { ...state, view: 'menu_management' };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'LOGIN_SUCCESS':
      return { ...state, view: 'dashboard' }; // Navigate to dashboard on successful login
    case 'LOGIN_FAILURE':
      return { ...state, loginError: action.payload }; // Set login error message
    default:
      return state;
  }
};

// Home Page Component
const HomePage = ({ dispatch, language }) => (
  <div className="home-page">
    <header className="header">
      <h1>Restaurant Management System</h1>
      <div className="header-buttons">
        <button onClick={() => dispatch({ type: VIEW_LOGIN })}>{language.login}</button>
        <button onClick={() => dispatch({ type: VIEW_SIGNUP })}>{language.signUp}</button>
        <button onClick={() => dispatch({ type: VIEW_DASHBOARD })}>{language.dashboard}</button>
        <button onClick={() => dispatch({ type: VIEW_SETTINGS })}>{language.settings}</button>
      </div>
    </header>
    <main className="home-content">
      <h2>{language.welcome}</h2>
      <p>{language.efficientManagement}</p>
    </main>
  </div>
);

// Login Page Component with Axios
const LoginPage = ({ dispatch, state }) => {
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        username: state.username,
        password: state.password,
      });
      if (response.status === 200) {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }
    } catch (error) {
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage; // Get message from server
      }
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    }
  };

  return (
    <div className="login-page">
      <h2>{state.loginError || "Login"}</h2> {/* Display error message if exists */}
      <input
        type="text"
        placeholder="Username"
        value={state.username}
        onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => dispatch({ type: VIEW_HOME })}>Back to Home</button>
    </div>
  );
};

// Signup Page Component with Axios
const SignupPage = ({ dispatch, state }) => {
  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/signup', {
        username: state.username,
        password: state.password,
      });
      if (response.status === 201) {
        alert('Signup successful! Please log in.');
        dispatch({ type: VIEW_LOGIN });
      }
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage; // Get message from server
      }
      alert(errorMessage);
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={state.username}
        onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={() => dispatch({ type: VIEW_HOME })}>Back to Home</button>
    </div>
  );
};

// Dashboard Page Component (Placeholder)
const Dashboard = ({ dispatch }) => (
  <div className="dashboard-page">
    <h2>Dashboard</h2>
    <p>Here you can manage orders, view metrics, and more.</p>
    <button onClick={() => dispatch({ type: VIEW_HOME })}>Back to Home</button>
  </div>
);

// Menu Management Component (Placeholder)
const MenuManagement = ({ dispatch }) => (
  <div className="menu-management-page">
    <h2>Menu Management</h2>
    <p>Manage your restaurant's menu here.</p>
    <button onClick={() => dispatch({ type: VIEW_HOME })}>Back to Home</button>
  </div>
);

// Settings Page Component with Theme and Language Toggle
const SettingsPage = ({ dispatch, theme, setTheme, languageCode, setLanguageCode, language }) => {
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguageCode(e.target.value);
  };

  return (
    <div className="settings-page">
      <h2>{language.settings}</h2>
      <div className="settings-components">
        <div className="settings-section">
          <h3>{language.theme}</h3>
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">{language.light}</option>
            <option value="dark">{language.dark}</option>
          </select>
        </div>
        <div className="settings-section">
          <h3>{language.language}</h3>
          <select value={languageCode} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
      <button onClick={() => dispatch({ type: VIEW_HOME })}>{language.home}</button>
    </div>
  );
};

// Main App Component
const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    view: 'home',
    username: '',
    password: '',
    loginError: '', // New state for login errors
  });
  const [theme, setTheme] = useState('light'); // Manage theme state
  const [languageCode, setLanguageCode] = useState('en'); // Manage language state
  const language = languageOptions[languageCode]; // Set the selected language

  useEffect(() => {
    document.body.className = theme; // Apply the theme class to the body
  }, [theme]);

  const renderContent = () => {
    switch (state.view) {
      case 'login':
        return <LoginPage dispatch={dispatch} state={state} />;
      case 'signup':
        return <SignupPage dispatch={dispatch} state={state} />;
      case 'dashboard':
        return <Dashboard dispatch={dispatch} />;
      case 'settings':
        return (
          <SettingsPage
            dispatch={dispatch}
            theme={theme}
            setTheme={setTheme}
            languageCode={languageCode}
            setLanguageCode={setLanguageCode}
            language={language}
          />
        );
      case 'customer_management':
        return <div>{language.customerManagement}</div>; // Placeholder
      case 'order_management':
        return <div>{language.orderManagement}</div>; // Placeholder
      case 'menu_management':
        return <MenuManagement dispatch={dispatch} />;
      default:
        return <HomePage dispatch={dispatch} language={language} />;
    }
  };

  return (
    <div className={App ${theme}}>
      {renderContent()}
    </div>
  );
};

export default App;
