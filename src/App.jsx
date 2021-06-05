import React, { useState } from 'react'
import { Content } from './components/layout/Content';
import { Header } from "./components/layout/Header"
import { Login } from './components/Login';
import { ProjectsProvider, SelectedProjectProvider } from './context'

export const App = ({ darkModeDefault = false}) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault)
  const [showSidebar, setShowSidebar] = useState(true)
  const [token, setToken] = useState()

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main 
          data-testid="application"
          className={darkMode? 'darkmode': undefined}
        >
          <Header 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            showSidebar={showSidebar} 
            setShowSidebar={setShowSidebar}
          />
          <Content showSidebar={showSidebar}  />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

