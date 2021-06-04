import React from 'react'
import { Tasks } from '../Tasks'
import { Sidebar } from './Sidebar'

export const Content = ({ showSidebar }) => (
    <section className="content">
      <Sidebar showSidebar={showSidebar} />
      <Tasks />
    </section>
  )
