"use client"

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Icon,
} from "@mui/material"
import {
  Bookmark,
  BusinessCenter,
  ChevronRight,
  Dashboard,
  History,
  LocationOn,
  Menu as MenuIcon,
  Notifications,
  Logout,
  Person,
  Search,
  Settings,
  Star,
} from "@mui/icons-material"
import "./components/dashboard.css"
import { useNavigate } from "react-router-dom"
import { useEffect , useState} from "react"
import axios from "../util/axios.js"
import JobApplyButton from "./btn/apply-button"
import { jwtDecode } from "jwt-decode"

export default function DashBoardPage() {
  const [sidebarTab, setSidebarTab] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleTabChange = (event, newValue) => {
    setSidebarTab(newValue)
  }

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    
    console.log("User logged out")
    handleUserMenuClose()
    navigate("/login")
    window.location.reload();

  
  }

  const token = localStorage.getItem("token");
  const userName = jwtDecode(token).name;

  const [recJob, setRecJob] = useState([]);

  useEffect (() =>{
    fetchJobs();
  },[]);

  useEffect(() => {
  console.log("recJob :", recJob);
}, [recJob]);

  const fetchJobs = async () => {
    try {
      

      const res = await axios.get('/jobs');
      console.log("recJob updated:", res.data);
      setRecJob(res.data);
    } catch (error){
      console.error("Error fetching jobs:", error);
    }
  };
  
  const handleApply = (jobId) => {

  }
  // Mock data

  const recentSearches = [
    { id: 1, query: "Frontend Developer", date: "2 days ago", results: 243 },
    { id: 2, query: "Remote UX Designer", date: "1 week ago", results: 128 },
    { id: 3, query: "Product Manager San Francisco", date: "2 weeks ago", results: 87 },
  ]

  const categories = [
    { id: 1, name: "Technology", icon: <Dashboard />, jobCount: 1243 },
    { id: 2, name: "Design", icon: <Star />, jobCount: 865 },
    { id: 3, name: "Marketing", icon: <BusinessCenter />, jobCount: 567 },
    { id: 4, name: "Finance", icon: <BusinessCenter />, jobCount: 432 },
    { id: 5, name: "Healthcare", icon: <BusinessCenter />, jobCount: 789 },
    { id: 6, name: "Education", icon: <BusinessCenter />, jobCount: 345 },
  ]

  const sidebar = (
    <div className="dash-sidebar-container">
      <div className="user-profile">
        <Avatar src="/placeholder.svg?height=80&width=80" alt="User Profile" className="user-avatar" />
        <Typography variant="h6" className="user-name">
          {userName}
        </Typography>
        
        <div className="user-stats">
          <div className="stat-item">
            <Typography variant="body2" className="stat-value">
              42
            </Typography>
            <Typography variant="caption" className="stat-label">
              Applications
            </Typography>
          </div>
          <div className="stat-item">
            <Typography variant="body2" className="stat-value">
              8
            </Typography>
            <Typography variant="caption" className="stat-label">
              Interviews
            </Typography>
          </div>
          <div className="stat-item">
            <Typography variant="body2" className="stat-value">
              16
            </Typography>
            <Typography variant="caption" className="stat-label">
              Saved
            </Typography>
          </div>
        </div>
      </div>

      <Divider />
      <div style={{ position: 'sticky', top: 64, zIndex: 1, backgroundColor: '#fff' }}>
      <Tabs value={sidebarTab} onChange={handleTabChange} variant="fullWidth" className="dash-sidebar-tabs">
        <Tab label="Profile" icon={<Person fontSize="small" />} />
        <Tab label="Jobs" icon={<BusinessCenter fontSize="small" />} />
        <Tab label="Settings" icon={<Settings fontSize="small" />} />
      </Tabs>
      </div>
      <div className="tab-content">
        {sidebarTab === 0 && (
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary="Activity" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Bookmark />
                </ListItemIcon>
                <ListItemText primary="Saved Jobs" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
        {sidebarTab === 1 && (
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BusinessCenter />
                </ListItemIcon>
                <ListItemText primary="Applied Jobs" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary="Recommended" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary="Job History" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
        {sidebarTab === 2 && (
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Account Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Privacy" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </div>
    </div>
  )

  return (
    <div className="dashboard-container">
      {/* Top Bar */}
      <AppBar position="fixed" className="top-bar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="app-title">
            CareerConnect
          </Typography>

          <div className="search-bar">
            <Search />
            <InputBase placeholder="Search for jobs, companies..." className="search-input" />
          </div>

          <Box sx={{ flexGrow: 1 }} />

          <div className="quick-actions">
            <Button variant="contained" className="post-job-btn">
              Post a Job
            </Button>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleUserMenuClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
            <Avatar src="/placeholder.svg?height=40&width=40" alt="User" className="user-mini-avatar" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleUserMenuClose}
              onClick={handleUserMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  borderRadius: "12px",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleUserMenuClose} className="user-menu-item">
                <Avatar src="/placeholder.svg?height=32&width=32" /> {userName}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleUserMenuClose} className="user-menu-item">
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem onClick={handleUserMenuClose} className="user-menu-item">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Account Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} className="user-menu-item logout-item">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" className="dash-sidebar">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          className="mobile-drawer"
          sx={{
            display: { xs: "block", xl: "none" },
          }}
        >
          {sidebar}
        </Drawer>
        <Drawer
          variant="permanent"
          className="desktop-drawer"
          open
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          {sidebar}
        </Drawer>
      </Box>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          <Typography variant="h4" className="welcome-text">
            Welcome back, {userName}!
          </Typography>
          <Typography variant="body1" className="subtitle-text">
            You have 3 new job recommendations today
          </Typography>

          {/* Recommended Jobs Section */}
          <div className="section">
            <div className="section-header">
              <Typography variant="h6">Recommended Jobs</Typography>
              <Button endIcon={<ChevronRight />} className="view-all-btn">
                View All
              </Button>
            </div>

            <div className="job-cards">
              {Array.isArray(recJob) && recJob.map((job) => (
                <Card key={job.id} className="job-card">
                  <div className="job-card-header">
                    <Avatar src={job.logo} alt={job.location} />
                    <div className="job-card-title">
                      <Typography variant="h6">{job.title}</Typography>
                      <Typography variant="body2">{job.status}</Typography>
                    </div>
                    <IconButton className="bookmark-btn">
                      <Bookmark />
                    </IconButton>
                  </div>

                  <div className="job-card-details">
                    <div className="job-detail">
                      <LocationOn fontSize="small" />
                      <Typography variant="body2">{job.location}</Typography>
                    </div>
                    <div className="job-detail">
                      <BusinessCenter fontSize="small" />
                      <Typography variant="body2">{job.salary}</Typography>
                    </div>
                  </div>
                
                  <div className="job-tags">
                    {Array.isArray(job.tags) && job.tags.length > 0 ? (
                      job.tags.map((tag) => (
                       <Chip key={tag} label={tag} size="small" className="job-tag" />
                      ))
                    ) : (
                      <Typography variant="caption" color="textSecondary">No tags</Typography>
                    )}
                  </div>

                  <JobApplyButton
                    job={job}
                    variant="contained"
                    size="small"
                    fullWidth />
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Searches Section */}
          <div className="section">
            <div className="section-header">
              <Typography variant="h6">Recent Searches</Typography>
              <Button endIcon={<ChevronRight />} className="view-all-btn">
                View All
              </Button>
            </div>

            <div className="recent-searches">
              {recentSearches.map((search) => (
                <Paper key={search.id} className="search-item">
                  <div className="search-content">
                    <Typography variant="body1" className="search-query">
                      {search.query}
                    </Typography>
                    <Typography variant="body2" className="search-meta">
                      {search.date} • {search.results} results
                    </Typography>
                  </div>
                  <IconButton size="small">
                    <ChevronRight />
                  </IconButton>
                </Paper>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          <div className="section">
            <div className="section-header">
              <Typography variant="h6">Browse by Category</Typography>
              <Button endIcon={<ChevronRight />} className="view-all-btn">
                View All
              </Button>
            </div>

            <div className="categories-scroll">
              <div className="categories-container">
                {categories.map((category) => (
                  <Card key={category.id} className="category-card">
                    <div className="category-icon">{category.icon}</div>
                    <Typography variant="body1" className="category-name">
                      {category.name}
                    </Typography>
                    <Typography variant="body2" className="category-count">
                      {category.jobCount} jobs
                    </Typography>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
