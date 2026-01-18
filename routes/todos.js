const express = require('express');
const router = express.Router();

// In-memory storage
let todos = [];
let nextId = 1;

// Validation middleware
const validateTodo = (req, res, next) => {
  const { title } = req.body;
  
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }
  
  next();
};

// GET all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// GET single todo
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json(todo);
});

// POST create todo
router.post('/', validateTodo, (req, res) => {
  const { title, completed = false } = req.body;
  
  const newTodo = {
    id: nextId++,
    title: title.trim(),
    completed: Boolean(completed),
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo
router.put('/:id', validateTodo, (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const { title, completed } = req.body;
  
  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title.trim(),
    completed: completed !== undefined ? Boolean(completed) : todos[todoIndex].completed,
    updatedAt: new Date().toISOString()
  };
  
  res.json(todos[todoIndex]);
});

// DELETE todo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
});

module.exports = router;
