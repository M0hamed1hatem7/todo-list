import { useMemo, useRef } from "react"
import useTasks from "./hooks/useTasks"
function App() {
  const {tasks, setTasks} = useTasks()
  const remainingTasks = useMemo(() => (
    tasks.filter(task => !task.completed).length
  ), [tasks])

  const addTaskRef = useRef<HTMLInputElement>(null)

  const handleAddTask = () => {
    const text = addTaskRef.current?.value;

    if(!text) return
    setTasks( (prev) => (
      [...prev, {id: prev.length + 1, completed: false, text}]
    ))

    addTaskRef.current!.value = ""
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      handleAddTask()
    }
  }

  const handleTaskCompletion = (id: number) => {
    // const newTasks = [...tasks]
    
    // const task = newTasks.find(task => task.id === id)

    // task!.completed = (!task?.completed)
    // setTasks(newTasks)
    setTasks(prev => prev.map(task => task.id === id? {... task, completed: !task.completed} : task))
  }

  const handleDelete = (id: number) => {
    // const newTasks = tasks.filter(task => task.id !== id)
    // setTasks(newTasks)
    setTasks(prev => prev.filter(task => task.id !== id))
  }

return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        To-Do List
      </h1>

      <div className="mb-6 flex gap-2">
        <input
          ref={addTaskRef}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Add a new task"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          
        />

        <button
          className="rounded-lg bg-blue-600 px-5 text-xl font-semibold text-white transition hover:bg-blue-700 active:scale-95 cursor-pointer"
        onClick={handleAddTask} >
          +
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100"
          >
            <input
              type="checkbox"
              checked={task.completed}
              className="h-5 w-5 cursor-pointer accent-blue-600"
              onClick={() => handleTaskCompletion(task.id)}
              readOnly
              
            />

            <span
              className={`flex-1 break-words text-sm cursor-pointer select-none ${
                task.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-700"
              }`}
              onClick={() => handleTaskCompletion(task.id)}
            >
              {task.text}
            </span>

            <button
              className="rounded-md px-3 py-1 font-semibold text-red-500 transition hover:bg-red-100 hover:text-red-700 cursor-pointer select-none"
              aria-label={`Delete ${task.text}`}
              onClick={() => handleDelete(task.id)}
            >
              x
            </button>
          </div>
        ))}

        <div className="mt-5 border-t border-slate-200 pt-4 text-sm font-medium text-slate-500">
          Remaining Tasks:{" "}
          <span className="font-bold text-blue-600">
            {remainingTasks}
          </span>
        </div>
      </div>
    </div>
  </div>
);
}

export default App
