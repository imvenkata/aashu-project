import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  IconButton,
  Divider,
  Avatar
} from '@mui/material';
import { 
  AccessTime as AccessTimeIcon,
  Today as TodayIcon,
  ViewWeek as ViewWeekIcon,
  ViewModule as ViewModuleIcon,
  Add as AddIcon
} from '@mui/icons-material';

const Dashboard = () => {
  // Mock data for demonstration
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const upcomingTasks = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', color: '#6750A4' },
    { id: 2, title: 'Lunch Break', time: '12:30 PM', color: '#FF8A65' },
    { id: 3, title: 'Work on Project', time: '2:00 PM', color: '#42A5F5' }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Header Section */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Dashboard
            </Typography>
            <Box>
              <IconButton color="primary" aria-label="add task">
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="h6" color="text.secondary">
            {formattedDate}
          </Typography>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    bgcolor: 'primary.light',
                    color: 'white',
                    borderRadius: 2,
                    cursor: 'pointer'
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body2">Timer</Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    bgcolor: 'secondary.light',
                    borderRadius: 2,
                    cursor: 'pointer'
                  }}
                >
                  <TodayIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body2">Today</Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    bgcolor: '#E8DEF8',
                    borderRadius: 2,
                    cursor: 'pointer'
                  }}
                >
                  <ViewWeekIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body2">Week</Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    bgcolor: '#F6F5FA',
                    borderRadius: 2,
                    cursor: 'pointer'
                  }}
                >
                  <ViewModuleIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body2">Month</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Today's Focus */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Today's Focus
            </Typography>
            <Box 
              sx={{ 
                bgcolor: '#F0F4FF', 
                p: 2, 
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70%'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                Complete Project Proposal
              </Typography>
              <Typography variant="body1" color="text.secondary">
                High priority - Due today
              </Typography>
              <Box 
                sx={{ 
                  mt: 2, 
                  width: '100%', 
                  height: 10, 
                  bgcolor: '#E0E0E0',
                  borderRadius: 5,
                  position: 'relative'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '65%',
                    bgcolor: 'primary.main',
                    borderRadius: 5
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ alignSelf: 'flex-end', mt: 1 }}>
                65% complete
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upcoming Tasks
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {upcomingTasks.map((task, index) => (
                <React.Fragment key={task.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: task.color,
                        width: 10,
                        height: 10,
                        mr: 2
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">{task.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{task.time}</Typography>
                    </Box>
                  </Box>
                  {index < upcomingTasks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Energy Level */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Energy Level Tracker
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <Avatar sx={{ bgcolor: '#FF5252', mb: 1, width: 50, height: 50 }}>
                  <Typography variant="body1">Low</Typography>
                </Avatar>
                <Typography variant="body2">Morning</Typography>
              </Box>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <Avatar sx={{ bgcolor: '#FFB74D', mb: 1, width: 50, height: 50 }}>
                  <Typography variant="body1">Med</Typography>
                </Avatar>
                <Typography variant="body2">Noon</Typography>
              </Box>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <Avatar sx={{ bgcolor: '#4CAF50', mb: 1, width: 50, height: 50 }}>
                  <Typography variant="body1">High</Typography>
                </Avatar>
                <Typography variant="body2">Afternoon</Typography>
              </Box>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <Avatar sx={{ bgcolor: '#FFB74D', mb: 1, width: 50, height: 50 }}>
                  <Typography variant="body1">Med</Typography>
                </Avatar>
                <Typography variant="body2">Evening</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
