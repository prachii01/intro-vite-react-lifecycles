import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await firestore.collection('tasks').get();
      setTasks(snapshot.docs.map(doc => doc.data()));
    };
    fetchTasks();
  }, []); // fixed the infinite loop

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;