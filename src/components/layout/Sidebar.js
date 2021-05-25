import React, { useState } from 'react'
import { 
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa'
import { useSelectedProjectValue } from '../../context'
import { AddProject } from '../AddProject'
import { Projects } from '../Projects'

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue()
  const [ active, setActive ] = useState('inbox')
  const [ showProjects, setShowProjects ] = useState(true)

  return (
    <div className="sidebar" data-testid="sedebar">
      <ul className="sidebar_generic">
        <li
          data-testid="inbox"
          className={ active === 'inbox'? 'avtive' : undefined }
          onClick={() => {
            setActive('inbox')
            setSelectedProject('INBOX')
          }}
        >
          <span><FaInbox /></span>
          <span> Inbox</span>
        </li> 
        <li
          data-testid="today"
          className={ active === 'today'? 'avtive' : undefined }
          onClick={() => {
            setActive('today')
            setSelectedProject('TODAY')
          }}
        >
          <span><FaRegCalendar /></span>
          <span> Today</span>
        </li>
        <li
          data-testid="next_7"
          className={ active === 'next_7'? 'avtive' : undefined }
          onClick={() => {
            setActive('next_7')
            setSelectedProject('NEXT_7')
          }}
        >
          <span><FaRegCalendarAlt /></span>
          <span> Next 7 days</span>
        </li>
      </ul>
      <div className="sidebar_middle" onClick={() => setShowProjects(!showProjects)}>
        <span><FaChevronDown className={!showProjects? 'hidden-projects' : undefined} /></span>
        <h2> Projects</h2>
      </div>
      <ul className="sidebar_projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  )
}
