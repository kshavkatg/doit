import React, { createContext, useContext } from 'react'
import { useProjects } from '../hooks'

export const SelectedProjectContext = createContext();
export const SelectedProjectsProvider = ({ children }) => {
  const { SelectedProjects, setSelectedProjects } = useProjects();

  return (
    <SelectedProjectContext.Provider value={{SelectedProjects, setSelectedProjects}} >
      {children}
    </SelectedProjectContext.Provider>
  )
}

export const useSelectedProjectsValue = () => useContext(SelectedProjectContext) 