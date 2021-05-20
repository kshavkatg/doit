import React, { useState } from 'react'
import { 
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa'
import { useSelectedProjectsValue } from '../../context'
import { Projects } from '../Projects'

export const Sidebar = () => {
  const { setSelectedProjects } = useSelectedProjectsValue
  const [ active, setActive ] = useState('INBOX')
  const [ showProjects, setShowProjects ] = useState(true)

  return (
    <div className="sidebar" data-testid="sedebar">
      <ul className="sidebar_generic">
        <li>
          <span><FaInbox /></span>
          <span> Inbox</span>
        </li> 
        <li>
          <span><FaRegCalendar /></span>
          <span> Today</span>
        </li>
        <li>
          <span><FaRegCalendarAlt /></span>
          <span> Next 7 days</span>
        </li>
      </ul>
      <div className="sidebar_middle">
        <span><FaChevronDown /></span>
        <h2> Projects</h2>
      </div>
      <ul className="sidebar_projects"></ul>
      <Projects />
    </div>
  )
}
