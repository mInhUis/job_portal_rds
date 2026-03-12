"use client"

import { useState, useEffect  } from "react"
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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material"
import {
  Add,
  Business,
  BusinessCenter,
  ChevronRight,
  Description,
  History,
  LocationOn,
  Logout,
  Menu as MenuIcon,
  Notifications,
  Person,
  PostAdd,
  Search,
  Settings,
  Star,
  TrendingUp,
  Visibility,
  Work,
} from "@mui/icons-material"
import "./components/emDashboard.css"
import { useNavigate, useParams } from "react-router-dom"
import axios from "../util/axios.js"
import { jwtDecode } from "jwt-decode"
export default function EmployerDashboard() {
  const [sidebarTab, setSidebarTab] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate();
  const {id} = useParams();
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

  const handlePostJob = () => {
    navigate("/post-job")
  }

  //fetch jobs posted by the employer/////
  const [postedJobs, setPostedJobs] = useState([]);
  const [employerId, setEmployerId] = useState(null);
      useEffect(() => {
      // Decode the token and extract employerId
      const token = localStorage.getItem("token");
      
      if (token) {
      try {
         const decoded = jwtDecode(token);
         console.log("Decoded:", decoded);
          setEmployerId(decoded.id);
           // or decoded.id, depending on your token payload
        } catch (err) {
          console.error("Failed to decode token:", err);
        }
      }
    }, []);

    useEffect(() => {
  if (employerId !== null) {
    // You can now safely fetch jobs using employerId
    fetchJobsByEmployer(employerId);
  }
}, [employerId]);

//testing 
     useEffect(() => {
  console.log("shitJob :", postedJobs);
}, [postedJobs]);


const fetchJobsByEmployer = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`/jobs/${id}`);
    console.log("Fetched jobs:", res.data);
    setPostedJobs(res.data);
  } catch (error) {
    console.error("Error loading jobs", error);
  }
};

const handleEdit = (jobId) => {
  navigate(`/edit-job/${jobId}`);
  };

const handleDelete = async (jobId) => {
  try {
    const token = localStorage.getItem("token");
                
    const res = await axios.delete(`/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      if (res.ok) {
        console.log("Job deleted successfully");
      }
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};
  // Mock data
  const availableResumes = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Frontend Developer",
      experience: "5 years",
      location: "San Francisco, CA",
      skills: ["React", "TypeScript", "Node.js"],
      avatar: "/placeholder.svg?height=40&width=40",
      match: 95,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "UX Designer",
      experience: "3 years",
      location: "Remote",
      skills: ["Figma", "Sketch", "Prototyping"],
      avatar: "/placeholder.svg?height=40&width=40",
      match: 88,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Product Manager",
      experience: "7 years",
      location: "Austin, TX",
      skills: ["Agile", "Analytics", "Strategy"],
      avatar: "/placeholder.svg?height=40&width=40",
      match: 92,
    },
  ]

  const companyStats = [
    { label: "Active Jobs", value: "12", icon: <Work />, color: "#7f7fd5" },
    { label: "Total Applications", value: "156", icon: <Description />, color: "#86a8e7" },
    { label: "Interviews Scheduled", value: "23", icon: <BusinessCenter />, color: "#91eae4" },
    { label: "Hires This Month", value: "4", icon: <TrendingUp />, color: "#8ec5fc" },
  ]

  const sidebar = (
    <div className="sidebar-container">
      <div className="company-profile">
        <Avatar src="/placeholder.svg?height=80&width=80" alt="Company Logo" className="company-avatar" />
        <Typography variant="h6" className="company-name">
          TechCorp Inc.
        </Typography>
        <Typography variant="body2" className="company-type">
          Technology Company
        </Typography>
        <div className="company-stats">
          <div className="stat-item">
            <Typography variant="body2" className="stat-value">
              12
            </Typography>
            <Typography variant="caption" className="stat-label">
              Active Jobs
            </Typography>
          </div>
          <div className="stat-item">
            <Typography variant="body2" className="stat-value">
              156
            </Typography>
            <Typography variant="caption" className="stat-label">
              Applications
            </Typography>
          </div>
          <div className="stat-item">
            <Typography variant="body2" className="stat-value">
              4.8
            </Typography>
            <Typography variant="caption" className="stat-label">
              Rating
            </Typography>
          </div>
        </div>
      </div>

      <Divider />

      <Tabs value={sidebarTab} onChange={handleTabChange} variant="fullWidth" className="sidebar-tabs">
        <Tab label="Company" icon={<Business fontSize="small" />} />
        <Tab label="Jobs" icon={<Work fontSize="small" />} />
        <Tab label="Settings" icon={<Settings fontSize="small" />} />
      </Tabs>

      <div className="tab-content">
        {sidebarTab === 0 && (
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText primary="Company Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TrendingUp />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
        {sidebarTab === 1 && (
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PostAdd />
                </ListItemIcon>
                <ListItemText primary="Post New Job" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText primary="Manage Jobs" />
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
                <ListItemText primary="Team Management" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </div>
    </div>
  )

  return (
    <div className="Emdashboard-container">
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
            CareerConnect Employer
          </Typography>

          <div className="search-bar">
            <Search />
            <InputBase placeholder="Search resumes, candidates..." className="search-input" />
          </div>

          <Box sx={{ flexGrow: 1 }} />

          <div className="quick-actions">
            <Button onClick={handlePostJob}ariant="contained" className="post-job-btn" startIcon={<Add />}>
              Post Job
            </Button>
            <IconButton color="inherit">
              <Badge badgeContent={7} color="error">
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
                <Avatar src="/placeholder.svg?height=32&width=32" /> HR Manager
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
      <Box component="nav" className="sidebar">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
            display: { xs: "none", xl: "block" },
          }}
        >
          {sidebar}
        </Drawer>
      </Box>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          <Typography variant="h4" className="welcome-text">
            Welcome back, TechCorp!
          </Typography>
          <Typography variant="body1" className="subtitle-text">
            You have 7 new applications and 3 new resumes to review
          </Typography>

          {/* Company Stats Section */}
          <div className="section">
            <div className="section-header">
              <Typography variant="h6">Company Overview</Typography>
              <Button endIcon={<ChevronRight />} className="view-all-btn">
                View Analytics
              </Button>
            </div>

            <div className="stats-grid">
              {companyStats.map((stat, index) => (
                <Card key={index} className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                    <div style={{ color: stat.color }}>{stat.icon}</div>
                  </div>
                  <div className="stat-content">
                    <Typography variant="h4" className="stat-number">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" className="stat-label">
                      {stat.label}
                    </Typography>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Posted Jobs Section */}
          <div className="section">
            <div className="section-header">
              <Typography variant="h6">Your Posted Jobs</Typography>
              <Button endIcon={<ChevronRight />} className="view-all-btn">
                Manage All
              </Button>
            </div>

            <div className="job-cards">
              {Array.isArray(postedJobs) && postedJobs.map((job) => (
                <Card key={job.id} className="job-card">
                  <div className="job-card-header">
                    <div className="job-card-title">
                      <Typography variant="h6">{job.title}</Typography>
                      <Typography variant="body2" className="job-department">
                        {job.department}
                      </Typography>
                    </div>
                    <Chip label={job.status} size="small" className={`status-chip ${job.status.toLowerCase()}`} />
                  </div>

                  <div className="job-card-details">
                    <div className="job-detail">
                      <LocationOn fontSize="small" />
                      <Typography variant="body2">{job.location}</Typography>
                    </div>
                    <div className="job-detail">
                      <BusinessCenter fontSize="small" />
                      <Typography variant="body2">{job.type}</Typography>
                    </div>
                  </div>

                  <div className="job-metrics">
                    <div className="metric">
                      
                      <Typography variant="caption" className="metric-label">
                        Applicants
                      </Typography>
                    </div>
                    <div className="metric">
                      <Typography variant="body2" className="posted-date">
                        Posted 
                      </Typography>
                    </div>
                  </div>

                  <div className="job-actions">
                    
                    <Button onClick={() => handleEdit(job.id)} variant="contained" size="small" className="edit-btn">
                      Edit Job
                    </Button>

                    <Button onClick={() => handleDelete(job.id)} variant="contained" size="small" className="delete-btn">
                      Delete Job
                      </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Available Resumes Section */}
          <div className="section">
            <div className="section-header">
              <Typography variant="h6">Available Resumes</Typography>
              <Button endIcon={<ChevronRight />} className="view-all-btn">
                Browse All
              </Button>
            </div>

            <div className="resume-cards">
              {availableResumes.map((resume) => (
                <Card key={resume.id} className="resume-card">
                  <div className="resume-header">
                    <Avatar src={resume.avatar} alt={resume.name} className="resume-avatar" />
                    <div className="resume-info">
                      <Typography variant="h6" className="resume-name">
                        {resume.name}
                      </Typography>
                      <Typography variant="body2" className="resume-title">
                        {resume.title}
                      </Typography>
                      <Typography variant="caption" className="resume-experience">
                        {resume.experience} experience
                      </Typography>
                    </div>
                    <div className="match-score">
                      <Typography variant="h6" className="match-percentage">
                        {resume.match}%
                      </Typography>
                      <Typography variant="caption">Match</Typography>
                    </div>
                  </div>

                  <div className="resume-location">
                    <LocationOn fontSize="small" />
                    <Typography variant="body2">{resume.location}</Typography>
                  </div>

                  <div className="resume-skills">
                    {resume.skills.map((skill) => (
                      <Chip key={skill} label={skill} size="small" className="skill-chip" />
                    ))}
                  </div>

                  <div className="resume-actions">
                    <Button variant="outlined" size="small" startIcon={<Visibility />}>
                      View Resume
                    </Button>
                    <Button variant="contained" size="small" className="contact-btn">
                      Contact
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="section">
            <div className="section-header">
              <Typography variant="h6">Quick Actions</Typography>
            </div>

            <div className="quick-action-cards">
              <Card className="action-card">
                <div className="action-icon">
                  <PostAdd />
                </div>
                <Typography variant="h6" className="action-title">
                  Post New Job
                </Typography>
                <Typography variant="body2" className="action-description">
                  Create and publish a new job vacancy
                </Typography>
                <Button variant="contained" className="action-btn">
                  Get Started
                </Button>
              </Card>

              <Card className="action-card">
                <div className="action-icon">
                  <Search />
                </div>
                <Typography variant="h6" className="action-title">
                  Search Resumes
                </Typography>
                <Typography variant="body2" className="action-description">
                  Find the perfect candidates for your roles
                </Typography>
                <Button variant="contained" className="action-btn">
                  Browse Now
                </Button>
              </Card>

              <Card className="action-card">
                <div className="action-icon">
                  <Business />
                </div>
                <Typography variant="h6" className="action-title">
                  Update Company Profile
                </Typography>
                <Typography variant="body2" className="action-description">
                  Keep your company information current
                </Typography>
                <Button variant="contained" className="action-btn">
                  Update Profile
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
