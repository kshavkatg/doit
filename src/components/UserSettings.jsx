import React from 'react'
import { FaSignOutAlt, FaEnvelope } from 'react-icons/fa'
import { useAuth } from '../context'

export const UserSettings = () => {
  const { userEmail, logout } = useAuth()

  return (
    <div className="user-settings">
      <div className="user-settings_inner">
        <div className="user-email"><FaEnvelope /><p>{userEmail}</p></div>
        <div 
          className="logout" 
          onClick={() => logout()}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter') logout()
          }}
        >
          <FaSignOutAlt />
          <p>Log out</p>
        </div>
      </div>
    </div>
  )
}
