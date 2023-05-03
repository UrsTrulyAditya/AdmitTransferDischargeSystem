import React, { useState, useEffect } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  ListItemSecondaryAction,
  Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleTodoAdd = () => {
    if (todoInput.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoInput, completed: false }]);
      setTodoInput('');
    }
  };

  const handleTodoDelete = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleTodoToggle = (id) => {
    const toggledTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(toggledTodos);
  };

  return (
    <Paper>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} divider={true}>
            <Checkbox checked={todo.completed} onClick={() => handleTodoToggle(todo.id)} />
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleTodoDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem>
          <TextField
            label="Priority List"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? handleTodoAdd() : null)}
            fullWidth={true}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default TodoList;
