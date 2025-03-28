import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  ColorLens as ColorLensIcon,
  Visibility as VisibilityIcon,
  VolumeUp as VolumeUpIcon,
  Contrast as ContrastIcon,
  TextFields as TextFieldsIcon,
  Accessibility as AccessibilityIcon,
  Language as LanguageIcon
} from '@mui/icons-material';

const Settings = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <List>
              <ListItem button selected>
                <ListItemIcon>
                  <AccessibilityIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Accessibility" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <ListItemText primary="Appearance" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Language" />
              </ListItem>
              <Divider sx={{ my: 2 }} />
              <ListItem button>
                <ListItemText primary="Privacy Policy" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Terms of Service" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="About Aashu" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Accessibility Settings
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main' }}>
              Visual Preferences
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="High Contrast Mode"
                sx={{ mb: 1, display: 'block' }}
              />
              <Typography variant="body2" color="text.secondary">
                Enhances visual contrast for better readability
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Color Blind Friendly Mode"
                sx={{ mb: 1, display: 'block' }}
              />
              <Typography variant="body2" color="text.secondary">
                Adjusts colors to be distinguishable for different types of color blindness
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>Text Size</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextFieldsIcon fontSize="small" />
                <Box
                  sx={{
                    width: '100%',
                    mx: 2,
                    height: 4,
                    bgcolor: 'grey.300',
                    borderRadius: 2,
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '60%',
                      height: '100%',
                      bgcolor: 'primary.main',
                      borderRadius: 2,
                    }}
                  />
                </Box>
                <TextFieldsIcon fontSize="large" />
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main' }}>
              Motion & Animation
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Reduce Motion"
                sx={{ mb: 1, display: 'block' }}
              />
              <Typography variant="body2" color="text.secondary">
                Minimizes animations and transitions throughout the app
              </Typography>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main' }}>
              Audio & Notifications
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Sound Effects"
                sx={{ mb: 1, display: 'block' }}
              />
              <Typography variant="body2" color="text.secondary">
                Play sounds for notifications and timer completions
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>Sound Volume</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <VolumeUpIcon fontSize="small" />
                <Box
                  sx={{
                    width: '100%',
                    mx: 2,
                    height: 4,
                    bgcolor: 'grey.300',
                    borderRadius: 2,
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '70%',
                      height: '100%',
                      bgcolor: 'primary.main',
                      borderRadius: 2,
                    }}
                  />
                </Box>
                <VolumeUpIcon fontSize="large" />
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main' }}>
              Focus Assistance
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Distraction-Free Mode"
                sx={{ mb: 1, display: 'block' }}
              />
              <Typography variant="body2" color="text.secondary">
                Simplifies the interface during focus sessions to reduce distractions
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Task Breakdown Reminders"
                sx={{ mb: 1, display: 'block' }}
              />
              <Typography variant="body2" color="text.secondary">
                Provides gentle reminders to break down complex tasks into smaller steps
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
