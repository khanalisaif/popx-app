import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import AccountSettingsPage from './components/AccountSettingsPage';

const PAGES = {
  WELCOME: 'welcome',
  LOGIN: 'login',
  CREATE_ACCOUNT: 'create_account',
  ACCOUNT_SETTINGS: 'account_settings',
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.WELCOME);
  const [userData, setUserData] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (formData) => {
    setUserData({
      fullName: 'Marry Doe',
      emailAddress: formData.email,
    });
    navigate(PAGES.ACCOUNT_SETTINGS);
  };

  const handleCreateAccount = (formData) => {
    setUserData(formData);
    navigate(PAGES.ACCOUNT_SETTINGS);
  };

  const renderPage = () => {
    switch (currentPage) {
      case PAGES.WELCOME:
        return (
          <WelcomePage
            onCreateAccount={() => navigate(PAGES.CREATE_ACCOUNT)}
            onLogin={() => navigate(PAGES.LOGIN)}
          />
        );
      case PAGES.LOGIN:
        return (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => navigate(PAGES.WELCOME)}
          />
        );
      case PAGES.CREATE_ACCOUNT:
        return (
          <CreateAccountPage
            onCreateAccount={handleCreateAccount}
            onBack={() => navigate(PAGES.WELCOME)}
          />
        );
      case PAGES.ACCOUNT_SETTINGS:
        return (
          <AccountSettingsPage
            userData={userData}
            onBack={() => navigate(PAGES.WELCOME)}
          />
        );
      default:
        return (
          <WelcomePage
            onCreateAccount={() => navigate(PAGES.CREATE_ACCOUNT)}
            onLogin={() => navigate(PAGES.LOGIN)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div
        className="relative w-full bg-gray-100 overflow-hidden shadow-2xl"
        style={{
          maxWidth: '390px',
          minHeight: '100vh',
          borderRadius: '0px',
        }}
      >
        <div className="sm:hidden">{renderPage()}</div>
        <div className="hidden sm:block" style={{ minHeight: '780px' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
