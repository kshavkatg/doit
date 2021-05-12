import { useState, useEffect } from 'react'
import moment from 'moment'
import { firebase } from '../firebase'
import { collatedTaskExist } from '../helpers/'



export const useTasks = (selectedProjject) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'MhIUlSd6G9Cp2SRqX9Oz')

    unsubscribe = selectedProjject && !collatedTaskExist(selectedProjject)
      ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProjject))
      : selectedProjject === 'TODAY'
      ? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
      : selectedProjject === 'INBOX'
      ? (unsubscribe = unsubscribe.where('date', '==', ''))
      : unsubscribe
  }, [selectedProjject])



  return (
    <div>
      
    </div>
  )
}
