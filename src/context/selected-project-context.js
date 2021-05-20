import React, { createContext, useContext } from 'react'
import { useProjects } from '../hooks'

export const SelectedProjectContext = createContext();
export const SelectedProjectsProvider = ({ children }) => {
  const { projects, setProjects } = useProjects();

  return (
    <SelectedProjectContext.Provider value={{projects, setProjects}} >
      {children}
    </SelectedProjectContext.Provider>
  )
}

export const useSelectedProjectsValue = () => useContext(SelectedProjectContext) 