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
      .where('userId', '==', 'vgWJG1rdEs1wuKBQEL7C')

    unsubscribe = selectedProjject && !collatedTaskExist(selectedProjject)
      ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProjject))
      : selectedProjject === 'TODAY'
      ? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
      : selectedProjject === 'INBOX'
      ? (unsubscribe = unsubscribe.where('date', '==', ''))
      : unsubscribe

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      console.log(snapshot.docs)
      const newTasks = snapshot.docs.map(task => ({
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



export const useProjects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'vgWJG1rdEs1wuKBQEL7C')
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id
        }))
        //here i will use the useMemo
        if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects)
        }
      })

  }, [projects])

  return { projects, setProjects }
}