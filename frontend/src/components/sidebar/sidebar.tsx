import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';

const drawerWidth = 240;

const NAV_ITEMS = [
  { label: 'Dashboard',  icon: <DashboardIcon  fontSize="small" /> },
  { label: 'Clinicians', icon: <PeopleIcon      fontSize="small" /> },
  { label: 'Patients',   icon: <PersonIcon      fontSize="small" /> },
  { label: 'Visits',     icon: <AssignmentIcon  fontSize="small" /> },
];

interface Props {
  children?: React.ReactNode;
  window?: () => Window;
}

export default function Sidebar({ children, window }: Props) {
  const [mobileOpen, setMobileOpen]   = React.useState(false);
  const [isClosing,  setIsClosing]    = React.useState(false);
  const [active,     setActive]       = React.useState('Dashboard');

  const handleDrawerClose        = () => { setIsClosing(true); setMobileOpen(false); };
  const handleDrawerTransitionEnd = () =>   setIsClosing(false);
  const handleDrawerToggle       = () => { if (!isClosing) setMobileOpen(v => !v); };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Brand */}
      <Toolbar sx={{ gap: 1 }}>
        <FavoriteIcon sx={{ color: '#3B82F6', fontSize: 22 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B' }}>
          Visit Manager
        </Typography>
      </Toolbar>
      <Divider />

      {/* Nav */}
      <List sx={{ px: 1, pt: 1, flexGrow: 1 }}>
        {NAV_ITEMS.map(({ label, icon }) => (
          <ListItem key={label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={active === label}
              onClick={() => setActive(label)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: '#EFF6FF',
                  color: '#3B82F6',
                  '& .MuiListItemIcon-root': { color: '#3B82F6' },
                },
                '&.Mui-selected:hover': { bgcolor: '#DBEAFE' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
              <ListItemText
                primary={label}
                
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer help */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary">
          Need help? <Box component="span" sx={{ color: '#3B82F6', cursor: 'pointer' }}>Contact support</Box>
        </Typography>
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml:    { sm: `${drawerWidth}px` },
          bgcolor: '#3B82F6',
          borderBottom: '1px solid #2563EB',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Dashboard</Typography>
          </Box>
          {/* Right side: avatar placeholder */}
          <Box
            sx={{
              width: 34, height: 34, borderRadius: '50%',
              bgcolor: '#1D4ED8', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700 }}>DR</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
          slotProps={{ root: { keepMounted: true } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, borderRight: '1px solid #E2E8F0' } }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, minWidth: 0 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}