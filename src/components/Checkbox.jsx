import React from 'react'
import { firebase } from '../firebase'

export const Checkbox = ({id}) => {

  const archiveTask = () => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .update({ archived: true, })
  }

  return (  
    <div 
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={ () => archiveTask() }
      onKeyDown={(e) => {
        if (e.key === 'Enter') archiveTask()
      }}
      tabIndex={0}
      role="button"
      aria-label="Archive task"
    >
      <span className="checkbox" />
    </div>
  )
}
