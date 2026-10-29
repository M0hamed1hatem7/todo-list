import { useEffect, useState } from "react";
import type { TaskList }from "../types/Types"

function useTasks() {
    const [tasks, setTasks] = useState<TaskList>(() => {
        const savedTasks = localStorage.getItem('tasks')
        if(savedTasks){
            return (JSON.parse(savedTasks))
        }
        return []
    })

    useEffect(() => {
        const newTasks = JSON.stringify(tasks)
        localStorage.setItem('tasks', newTasks)
    }, [tasks])

    return {tasks, setTasks}
}

export default useTasks