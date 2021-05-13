import { useState, useEffect } from 'react'
import moment from 'moment'
import { firebase } from '../firebase'
import { collatedTaskExist } from '../helpers/'



export const useTasks = (selectedProjject) => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])

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

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.map(task => ({
        id: task.id,
        ...task.data()
      }))

      setTasks(
        selectedProjject === 'NEXT_7'
        ? newTasks.filter(task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7
          && task.archived !== true)
        : newTasks.filter(task => task.archived !== true)
      )
      setArchivedTasks(newTasks.filter(task => task.archived !== false))
    })

    return () => unsubscribe()
  }, [selectedProjject])

  return { tasks, archivedTasks }
}
