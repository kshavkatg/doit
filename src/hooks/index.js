import { useState, useEffect } from 'react'
import moment from 'moment'
import { firebase } from '../firebase'
import { collatedTaskExist } from '../helpers/'



export const useTasks = (selectedProjject) => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])

  useEffect(() => {
    let getTasks = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'vgWJG1rdEs1wuKBQEL7C')
      
    
    getTasks = selectedProjject && !collatedTaskExist(selectedProjject)             // if there is project selected
      ? (getTasks = getTasks.where('projectId', '==', selectedProjject))
      : selectedProjject === 'TODAY'                                                // if TODAY is selected
      ? (getTasks = getTasks.where('date', '==', moment().format('DD/MM/YYYY')))
      : selectedProjject === 'INBOX'                                                // if INBOX is selected
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
    console.log(`selectedProject from useTasks: ${selectedProjject}`)
    return () => getTasks()
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
          name: project.data().name,
          userId: project.data().userId,
          projectId: project.data().projectId,
          docId: project.id,
        }))
        //console.log(JSON.stringify(allProjects) !== JSON.stringify(projects))
        if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects)
        }
        console.log(snapshot.docs[1].data())
        console.log(projects)
      })

  }, [projects])

  return { projects, setProjects }
}
