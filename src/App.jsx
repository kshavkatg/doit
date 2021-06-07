import React, { useState } from 'react'
import { Content } from './components/layout/Content';
import { Header } from "./components/layout/Header"
import { Login } from './components/Login';
import { ProjectsProvider, SelectedProjectProvider } from './context'
// import { auth } from './firebase';

export const App = ({ darkModeDefault = false}) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault)
  const [showSidebar, setShowSidebar] = useState(true)
  const [user, setUser] = useState()

  if(!user) {
    return <Login  setUser={setUser}/>
  }
  
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main 
          data-testid="application"
          className={darkMode? 'darkmode': undefined}
        >
          <Header 
            setUser={setUser}
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

