import { useState, useCallback } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';

// ─── Constants ───────────────────────────────────────────────────────────────

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { label: 'Dashboard',  path: '/',            icon: <DashboardIcon fontSize="small" /> },
  { label: 'Clinicians', path: '/clinicians',  icon: <PeopleIcon    fontSize="small" /> },
  { label: 'Patients',   path: '/patients',    icon: <PersonIcon    fontSize="small" /> },
  { label: 'Visits',     path: '/visits',      icon: <AssignmentIcon fontSize="small" /> },
] as const;

const NAV_BUTTON_SX = {
  borderRadius: 2,
  '&.active': {                                      // NavLink adds this class
    bgcolor: '#EFF6FF',
    color: '#15663f',
    '& .MuiListItemIcon-root': { color: '#15663f' },
  },
  '&.active:hover': { bgcolor: '#c5f6de' },
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

const DrawerContent = ({ onNavClick }: { onNavClick?: () => void }) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Toolbar sx={{ gap: 1 }}>
      <FavoriteIcon sx={{ color: '#15663f', fontSize: 22 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B' }}>
        Visit Manager
      </Typography>
    </Toolbar>

    <Divider />

    <List sx={{ px: 1, pt: 1, flexGrow: 1 }}>
      {NAV_ITEMS.map(({ label, path, icon }) => (
        <ListItem key={label} disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={NavLink}
            to={path}
            end={path === '/'}           
            sx={NAV_BUTTON_SX}
            onClick={onNavClick}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>

    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant="caption" color="text.secondary">
        Need help?{' '}
        <Box component="span" sx={{ color: '#15663f', cursor: 'pointer' }}>
          Contact support
        </Box>
      </Typography>
    </Box>
  </Box>
);

// ─── Main Layout ──────────────────────────────────────────────────────────────

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing,  setIsClosing]  = useState(false);
  const { pathname } = useLocation();

  // Derive appbar title from current route — no hardcoding
  const pageTitle = NAV_ITEMS.find(i => i.path === pathname)?.label ?? 'Dashboard';

  const handleClose  = useCallback(() => { setIsClosing(true);  setMobileOpen(false); }, []);
  const handleToggle = useCallback(() => { if (!isClosing) setMobileOpen(v => !v); }, [isClosing]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <CssBaseline />

      {/* ── Top AppBar ── */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml:    { sm: `${DRAWER_WIDTH}px` },
          bgcolor: '#15663f',
          borderBottom: '1px solid #135c38',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {pageTitle}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Sidebar ── */}
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        {/* Mobile — temporary */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={() => setIsClosing(false)}
          onClose={handleClose}
          slotProps={{ root: { keepMounted: true } }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
          }}
        >
          <DrawerContent onNavClick={handleClose} />  {/* close drawer on mobile nav */}
        </Drawer>

        {/* Desktop — permanent */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, borderRight: '1px solid #E2E8F0' },
          }}
        >
          <DrawerContent />
        </Drawer>
      </Box>

      {/* ── Page Content ── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minWidth: 0,
        }}
      >
        <Toolbar />
        <Outlet />   {/* React Router renders the matched page here */}
      </Box>
    </Box>
  );
}