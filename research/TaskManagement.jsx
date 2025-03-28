import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Team Meeting', description: 'Weekly team sync', status: 'pending', priority: 'high', dueDate: '2025-03-29', category: 'work', color: '#6750A4' },
    { id: 2, title: 'Grocery Shopping', description: 'Buy fruits and vegetables', status: 'pending', priority: 'medium', dueDate: '2025-03-28', category: 'personal', color: '#FF8A65' },
    { id: 3, title: 'Doctor Appointment', description: 'Annual checkup', status: 'completed', priority: 'high', dueDate: '2025-03-27', category: 'health', color: '#42A5F5' }
  ]);
  
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: null,
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    category: 'personal',
    color: '#6750A4'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask({
      id: null,
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      category: 'personal',
      color: '#6750A4'
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({
      ...currentTask,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (isEditing) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === currentTask.id ? currentTask : task
      ));
    } else {
      // Add new task
      const newTask = {
        ...currentTask,
        id: Date.now()
      };
      setTasks([...tasks, newTask]);
    }
    handleClose();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#ff9800';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Task Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ borderRadius: 2 }}
        >
          Add Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Pending Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Pending Tasks
            </Typography>
            {tasks.filter(task => task.status === 'pending').map(task => (
              <Paper 
                key={task.id} 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderLeft: `4px solid ${task.color}`,
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {task.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Box 
                        sx={{ 
                          bgcolor: getPriorityColor(task.priority), 
                          color: 'white', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}
                      >
                        {task.priority.toUpperCase()}
                      </Box>
                      <Box 
                        sx={{ 
                          bgcolor: '#e0e0e0', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}
                      >
                        {task.category}
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleEdit(task)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(task.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleStatusChange(task.id, 'completed')}
                    sx={{ borderRadius: 2 }}
                  >
                    Mark as Completed
                  </Button>
                </Box>
              </Paper>
            ))}
            {tasks.filter(task => task.status === 'pending').length === 0 && (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                No pending tasks
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Completed Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
              Completed Tasks
            </Typography>
            {tasks.filter(task => task.status === 'completed').map(task => (
              <Paper 
                key={task.id} 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderLeft: `4px solid ${task.color}`,
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  opacity: 0.7
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" sx={{ textDecoration: 'line-through' }}>{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {task.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Box 
                        sx={{ 
                          bgcolor: getPriorityColor(task.priority), 
                          color: 'white', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          opacity: 0.7
                        }}
                      >
                        {task.priority.toUpperCase()}
                      </Box>
                      <Box 
                        sx={{ 
                          bgcolor: '#e0e0e0', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}
                      >
                        {task.category}
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleDelete(task.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleStatusChange(task.id, 'pending')}
                    sx={{ borderRadius: 2 }}
                  >
                    Mark as Pending
                  </Button>
                </Box>
              </Paper>
            ))}
            {tasks.filter(task => task.status === 'completed').length === 0 && (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                No completed tasks
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Task Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={currentTask.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  name="priority"
                  value={currentTask.priority}
                  label="Priority"
                  onChange={handleChange}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={currentTask.category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="health">Health</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            margin="dense"
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={currentTask.dueDate}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="color-label">Color</InputLabel>
            <Select
              labelId="color-label"
              name="color"
              value={currentTask.color}
              label="Color"
              onChange={handleChange}
            >
              <MenuItem value="#6750A4">Purple</MenuItem>
              <MenuItem value="#FF8A65">Orange</MenuItem>
              <MenuItem value="#42A5F5">Blue</MenuItem>
              <MenuItem value="#4CAF50">Green</MenuItem>
              <MenuItem value="#F44336">Red</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskManagement;
