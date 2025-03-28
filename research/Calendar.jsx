import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon
} from '@mui/icons-material';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week');
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', start: '2025-03-28T10:00', end: '2025-03-28T11:00', color: '#6750A4' },
    { id: 2, title: 'Lunch Break', start: '2025-03-28T12:30', end: '2025-03-28T13:30', color: '#FF8A65' },
    { id: 3, title: 'Work on Project', start: '2025-03-28T14:00', end: '2025-03-28T16:00', color: '#42A5F5' },
    { id: 4, title: 'Doctor Appointment', start: '2025-03-29T09:00', end: '2025-03-29T10:00', color: '#4CAF50' }
  ]);
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    title: '',
    start: '',
    end: '',
    color: '#6750A4'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleViewChange = (event, newView) => {
    setView(newView);
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEvent({
      id: null,
      title: '',
      start: '',
      end: '',
      color: '#6750A4'
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (isEditing) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === currentEvent.id ? currentEvent : event
      ));
    } else {
      // Add new event
      const newEvent = {
        ...currentEvent,
        id: Date.now()
      };
      setEvents([...events, newEvent]);
    }
    handleClose();
  };

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
    setOpen(true);
  };

  // Generate days for the week view
  const generateWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    startOfWeek.setDate(currentDate.getDate() - day);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  // Filter events for the current view
  const getEventsForView = () => {
    if (view === 'day') {
      const dateStr = currentDate.toISOString().split('T')[0];
      return events.filter(event => event.start.startsWith(dateStr));
    } else if (view === 'week') {
      const weekDays = generateWeekDays();
      const startDate = weekDays[0].toISOString().split('T')[0];
      const endDate = weekDays[6].toISOString().split('T')[0];
      return events.filter(event => {
        const eventDate = event.start.split('T')[0];
        return eventDate >= startDate && eventDate <= endDate;
      });
    } else {
      // Month view
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      return events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month;
      });
    }
  };

  // Format time from ISO string
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Get view title
  const getViewTitle = () => {
    if (view === 'day') {
      return formatDate(currentDate);
    } else if (view === 'week') {
      const weekDays = generateWeekDays();
      const startDate = weekDays[0];
      const endDate = weekDays[6];
      const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
      const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      const year = startDate.getFullYear();
      
      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}, ${year}`;
      } else {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  // Render day view
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const filteredEvents = getEventsForView();

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {formatDate(currentDate)}
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          {hours.map(hour => {
            const hourEvents = filteredEvents.filter(event => {
              const eventHour = new Date(event.start).getHours();
              return eventHour === hour;
            });

            return (
              <Box key={hour} sx={{ display: 'flex', borderBottom: '1px solid #e0e0e0', py: 1 }}>
                <Box sx={{ width: '60px', pr: 2, textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary">
                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, position: 'relative', minHeight: '40px' }}>
                  {hourEvents.map(event => (
                    <Paper
                      key={event.id}
                      sx={{
                        p: 1,
                        mb: 1,
                        bgcolor: event.color,
                        color: 'white',
                        borderRadius: 1,
                        cursor: 'pointer'
                      }}
                      onClick={() => handleEventClick(event)}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {event.title}
                      </Typography>
                      <Typography variant="caption">
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Paper>
      </Box>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekDays = generateWeekDays();
    const filteredEvents = getEventsForView();

    return (
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={1}>
          {weekDays.map((day, index) => (
            <Grid item xs key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: day.getDate() === new Date().getDate() ? 'bold' : 'normal' }}>
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  bgcolor: day.getDate() === new Date().getDate() ? 'primary.main' : 'transparent',
                  color: day.getDate() === new Date().getDate() ? 'white' : 'inherit',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}
              >
                {day.getDate()}
              </Typography>
            </Grid>
          ))}
        </Grid>
        
        <Paper sx={{ mt: 2, p: 2, borderRadius: 2 }}>
          <Grid container spacing={1}>
            {weekDays.map((day, index) => {
              const dayStr = day.toISOString().split('T')[0];
              const dayEvents = filteredEvents.filter(event => event.start.startsWith(dayStr));
              
              return (
                <Grid item xs key={index}>
                  <Box 
                    sx={{ 
                      height: '300px', 
                      bgcolor: day.getDate() === new Date().getDate() ? 'rgba(103, 80, 164, 0.05)' : 'transparent',
                      borderRadius: 1,
                      p: 1,
                      overflowY: 'auto'
                    }}
                  >
                    {dayEvents.map(event => (
                      <Paper
                        key={event.id}
                        sx={{
                          p: 1,
                          mb: 1,
                          bgcolor: event.color,
                          color: 'white',
                          borderRadius: 1,
                          cursor: 'pointer'
                        }}
                        onClick={() => handleEventClick(event)}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {event.title}
                        </Typography>
                        <Typography variant="caption">
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Box>
    );
  };

  // Render month view
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    // Get last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Calculate total days to display (including padding from previous and next months)
    const totalDays = 42; // 6 rows of 7 days
    
    // Generate array of dates to display
    const daysArray = [];
    
    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      daysArray.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month
    const remainingDays = totalDays - daysArray.length;
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    // Group days into weeks
    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7));
    }
    
    const filteredEvents = getEventsForView();
    
    return (
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Grid container spacing={0}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <Grid item xs key={index} sx={{ textAlign: 'center', p: 1, borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {day}
                </Typography>
              </Grid>
            ))}
            
            {weeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const dayStr = day.date.toISOString().split('T')[0];
                  const dayEvents = filteredEvents.filter(event => event.start.startsWith(dayStr));
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  
                  return (
                    <Grid 
                      item 
                      xs 
                      key={dayIndex} 
                      sx={{ 
                        height: '100px', 
                        p: 1, 
                        borderBottom: weekIndex < 5 ? '1px solid #e0e0e0' : 'none',
                        borderRight: dayIndex < 6 ? '1px solid #e0e0e0' : 'none',
                        bgcolor: isToday ? 'rgba(103, 80, 164, 0.05)' : 'transparent',
                        opacity: day.isCurrentMonth ? 1 : 0.5
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: isToday ? 'bold' : 'normal',
                          bgcolor: isToday ? 'primary.main' : 'transparent',
                          color: isToday ? 'white' : 'inherit',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {day.date.getDate()}
                      </Typography>
                      <Box sx={{ mt: 1, maxHeight: '60px', overflowY: 'auto' }}>
                        {dayEvents.slice(0, 2).map(event => (
                          <Box
                            key={event.id}
                            sx={{
                              p: 0.5,
                              mb: 0.5,
                              bgcolor: event.color,
                              color: 'white',
                              borderRadius: 1,
                              fontSize: '0.7rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleEventClick(event)}
                          >
                            {event.title}
                          </Box>
                        ))}
                        {dayEvents.length > 2 && (
                          <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                            +{dayEvents.length - 2} more
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </React.Fragment>
            ))}
          </Grid>
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Calendar
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ borderRadius: 2 }}
        >
          Add Event
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handlePrevious}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mx: 2 }}>
            {getViewTitle()}
          </Typography>
          <IconButton onClick={handleNext}>
            <ChevronRightIcon />
          </IconButton>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<TodayIcon />}
            onClick={handleToday}
            sx={{ ml: 2, borderRadius: 2 }}
          >
            Today
          </Button>
        </Box>
        <Tabs value={view} onChange={handleViewChange} aria-label="calendar view tabs">
          <Tab value="day" label="Day" />
          <Tab value="week" label="Week" />
          <Tab value="month" label="Month" />
        </Tabs>
      </Box>

      {view === 'day' && renderDayView()}
      {view === 'week' && renderWeekView()}
      {view === 'month' && renderMonthView()}

      {/* Event Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Event Title"
            type="text"
            fullWidth
            variant="outlined"
            value={currentEvent.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="start"
                label="Start Time"
                type="datetime-local"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={currentEvent.start}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="end"
                label="End Time"
                type="datetime-local"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={currentEvent.end}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="color-label">Color</InputLabel>
            <Select
              labelId="color-label"
              name="color"
              value={currentEvent.color}
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

export default Calendar;
