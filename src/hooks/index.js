/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react'
import moment from 'moment'
import { firebase } from '../firebase'
import { collatedTaskExist } from '../helpers'
import { useAuth } from '../context'

export const useTasks = (selectedProjject) => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])
  const { uniqueId } = useAuth()

  useEffect(() => {
    let getTasks = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', uniqueId)
      
    
    getTasks = selectedProjject && !collatedTaskExist(selectedProjject)
      ? (getTasks = getTasks.where('projectId', '==', selectedProjject))
      : selectedProjject === 'TODAY'
      ? (getTasks = getTasks.where('date', '==', moment().format('DD/MM/YYYY')))
      : selectedProjject === 'INBOX'
      ? (getTasks = getTasks.where('date', '==', ''))
      : getTasks

    getTasks = getTasks.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }))
      
      setTasks(
        selectedProjject === 'NEXT_7'
        ? newTasks.filter(task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7
          && task.archived !== true)
        : newTasks.filter(task => task.archived !== true)
      )
      setArchivedTasks(newTasks.filter(task => task.archived !== false))
    })
    return () => getTasks()
  }, [selectedProjject])

  return { tasks, archivedTasks }
}



export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const { uniqueId } = useAuth()

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', uniqueId)
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          name: project.data().name,
          userId: project.data().userId,
          projectId: project.data().projectId,
          docId: project.id,
        }))
        if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects)
        }
      })

  }, [projects])

  return { projects, setProjects }
}
