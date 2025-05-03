import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    const unsubscribe = firestore.collection('tasks').onSnapshot(snapshot => {
      const updatedTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(updatedTasks);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    await firestore.collection('tasks').add({ name: taskName, status: 'not-started' });
    setTaskName("");
  };

  const deleteTask = async (id) => {
    await firestore.collection('tasks').doc(id).delete();
  };

  return (
    <div>
      <nav>
        <h2>Project Count</h2>
        {/* Implement counts here */}
      </nav>
      <input value={taskName} onChange={e => setTaskName(e.target.value)} placeholder="Enter task" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;