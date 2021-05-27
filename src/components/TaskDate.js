import React from 'react'
import moment from 'moment'
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from 'react-icons/fa'

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => 
showTaskDate && (
  <div className="task-date" data-testid="task-date-overlay">
    <ul className="task-date_list">
      <li
        data-testid="task-date-overlay"
        onClick={() => {
          setShowTaskDate(false)
          setTaskDate(moment().format('DD/MM/YYYY'))
        }}
      >
        <span><FaSpaceShuttle /></span>
        <span>Today</span>
      </li>

      <li
        data-testid="task-date-tomorrow"
        onClick={() => {
          setShowTaskDate(false)
          setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'))
        }}
      >
        <span><FaSun /></span>
        <span>Tomorrow</span>
      </li>

      <li
        data-testid="task-date-next_week"
        onClick={() => {
          setShowTaskDate(false)
          setTaskDate(moment().add(7, 'day').format('DD/MM/YYYY'))
        }}
      >
        <span><FaRegPaperPlane /></span>
        <span>Next week</span>
      </li>
    </ul>
  </div>
)
