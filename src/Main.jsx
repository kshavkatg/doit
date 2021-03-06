import React, { useState } from 'react'
import { Content } from "./components/layout/Content"
import { Header } from "./components/layout/Header"
import { ProjectsProvider, SelectedProjectProvider } from './context'

export const Main = ({ darkModeDefault = false}) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault)
  const [showSidebar, setShowSidebar] = useState(true)

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