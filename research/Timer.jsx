import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  IconButton,
  Button,
  CircularProgress,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const Timer = () => {
  const [timers, setTimers] = useState([
    { id: 1, name: 'Focus Session', duration: 25, color: '#6750A4', icon: '🧠' },
    { id: 2, name: 'Short Break', duration: 5, color: '#4CAF50', icon: '☕' },
    { id: 3, name: 'Long Break', duration: 15, color: '#42A5F5', icon: '🌊' },
    { id: 4, name: 'Reading', duration: 30, color: '#FF8A65', icon: '📚' }
  ]);
  
  const [activeTimer, setActiveTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentTimer, setCurrentTimer] = useState({
    id: null,
    name: '',
    duration: 25,
    color: '#6750A4',
    icon: '🧠'
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      // Play sound or notification when timer ends
      const audio = new Audio('/notification.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimerSelect = (timer) => {
    setActiveTimer(timer);
    setTimeLeft(timer.duration * 60);
    setIsRunning(false);
  };

  const handleStart = () => {
    if (activeTimer) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (activeTimer) {
      setTimeLeft(activeTimer.duration * 60);
    }
  };

  const handleReset = () => {
    if (activeTimer) {
      setTimeLeft(activeTimer.duration * 60);
      setIsRunning(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTimer({
      id: null,
      name: '',
      duration: 25,
      color: '#6750A4',
      icon: '🧠'
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTimer({
      ...currentTimer,
      [name]: value
    });
  };

  const handleDurationChange = (e, value) => {
    setCurrentTimer({
      ...currentTimer,
      duration: value
    });
  };

  const handleSubmit = () => {
    if (isEditing) {
      // Update existing timer
      const updatedTimers = timers.map(timer => 
        timer.id === currentTimer.id ? currentTimer : timer
      );
      setTimers(updatedTimers);
      
      // Update active timer if it was the one edited
      if (activeTimer && activeTimer.id === currentTimer.id) {
        setActiveTimer(currentTimer);
        setTimeLeft(currentTimer.duration * 60);
      }
    } else {
      // Add new timer
      const newTimer = {
        ...currentTimer,
        id: Date.now()
      };
      setTimers([...timers, newTimer]);
    }
    handleClose();
  };

  const handleEdit = (timer) => {
    setCurrentTimer(timer);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const updatedTimers = timers.filter(timer => timer.id !== id);
    setTimers(updatedTimers);
    
    // Reset active timer if it was the one deleted
    if (activeTimer && activeTimer.id === id) {
      setActiveTimer(null);
      setTimeLeft(0);
      setIsRunning(false);
    }
  };

  const calculateProgress = () => {
    if (!activeTimer) return 0;
    const totalSeconds = activeTimer.duration * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const iconOptions = ['🧠', '☕', '🌊', '📚', '🏃', '🎵', '🎮', '🍽️', '💤', '🧘', '📝', '🧹'];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Timer
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ borderRadius: 2 }}
        >
          Add Timer
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Active Timer */}
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              borderRadius: 2,
              height: '100%',
              bgcolor: activeTimer ? activeTimer.color : 'background.paper',
              color: activeTimer ? 'white' : 'text.primary'
            }}
          >
            {activeTimer ? (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {activeTimer.icon} {activeTimer.name}
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                  <CircularProgress
                    variant="determinate"
                    value={calculateProgress()}
                    size={200}
                    thickness={4}
                    sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h2" component="div" sx={{ fontWeight: 'bold' }}>
                      {formatTime(timeLeft)}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {!isRunning ? (
                    <Button 
                      variant="contained" 
                      startIcon={<PlayArrowIcon />}
                      onClick={handleStart}
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.2)', 
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.3)',
                        }
                      }}
                    >
                      Start
                    </Button>
                  ) : (
                    <Button 
                      variant="contained" 
                      startIcon={<PauseIcon />}
                      onClick={handlePause}
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.2)', 
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.3)',
                        }
                      }}
                    >
                      Pause
                    </Button>
                  )}
                  <Button 
                    variant="contained" 
                    startIcon={<StopIcon />}
                    onClick={handleStop}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                      }
                    }}
                  >
                    Stop
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<RefreshIcon />}
                    onClick={handleReset}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                      }
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                  Select a timer to get started
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Choose from the timer presets or create your own
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Timer Presets */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Timer Presets
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {timers.map(timer => (
                <Paper 
                  key={timer.id} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    borderLeft: `4px solid ${timer.color}`,
                    cursor: 'pointer',
                    bgcolor: activeTimer && activeTimer.id === timer.id ? 'rgba(103, 80, 164, 0.05)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.02)',
                    }
                  }}
                  onClick={() => handleTimerSelect(timer)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {timer.icon} {timer.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {timer.duration} minutes
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(timer);
                      }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(timer.id);
                      }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Timer Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Timer' : 'Add New Timer'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Timer Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTimer.name}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          
          <Typography variant="body1" gutterBottom>
            Duration: {currentTimer.duration} minutes
          </Typography>
          <Slider
            value={currentTimer.duration}
            onChange={handleDurationChange}
            aria-labelledby="timer-duration-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={120}
            sx={{ mb: 3 }}
          />
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="color-label">Color</InputLabel>
            <Select
              labelId="color-label"
              name="color"
              value={currentTimer.color}
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
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="icon-label">Icon</InputLabel>
            <Select
              labelId="icon-label"
              name="icon"
              value={currentTimer.icon}
              label="Icon"
              onChange={handleChange}
            >
              {iconOptions.map((icon, index) => (
                <MenuItem key={index} value={icon}>{icon}</MenuItem>
              ))}
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

export default Timer;
