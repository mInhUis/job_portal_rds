"use client"

import { useState, useEffect } from "react"
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Slider,
  Toolbar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material"
import {
  Bookmark,
  BookmarkBorder,
  ExpandMore,
  FilterList,
  LocationOn,
  Logout,
  Menu as MenuIcon,
  Notifications,
  Person,
  Search,
  Settings,
  Work,
  AccessTime,
  AttachMoney,
  School,
  Star,
  Clear,
  ViewList,
  ViewModule,
} from "@mui/icons-material"
import "./components/home.css"
import { useNavigate } from "react-router-dom"
export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [salaryRange, setSalaryRange] = useState([40, 200])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState("list")
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: [],
    experience: [],
    location: [],
    company: [],
    remote: false,
  })
  const [filteredJobs, setFilteredJobs] = useState([])
  const open = Boolean(anchorEl)
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
    // Add mobile drawer class for very small screens
    const sidebar = document.querySelector(".hp-sidebar")
    if (sidebar && window.innerWidth <= 600) {
      sidebar.classList.toggle("mobile-drawer")
      sidebar.classList.toggle("mobile-open", !mobileOpen)
    }
  }

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    console.log("User logged out")
    handleUserMenuClose()
  }

  const handleJobClick = (job) => {
    setSelectedJob(job)
  }

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }))
  }

  const handleRemoteToggle = () => {
    setSelectedFilters((prev) => ({
      ...prev,
      remote: !prev.remote,
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      jobType: [],
      experience: [],
      location: [],
      company: [],
      remote: false,
    })
    setSearchQuery("")
    setLocationQuery("")
    setSalaryRange([40, 200])
  }

  const ClickOut = () => {
    navigate("/login")
  }
  const SignUp = () => {
    navigate("/register")
  }
  

  // Mock data - expanded job listings
  const allJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      experience: "5+ years",
      remote: true,
      logo: "/placeholder.svg?height=40&width=40",
      tags: ["React", "TypeScript", "Node.js", "GraphQL"],
      postedDate: "2 days ago",
      applicants: 24,
      featured: true,
      description:
        "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features using React and TypeScript, collaborating with our design team to implement pixel-perfect UIs, and optimizing applications for maximum speed and scalability.",
      requirements: [
        "5+ years of experience with React and JavaScript",
        "Strong knowledge of TypeScript",
        "Experience with modern build tools (Webpack, Vite)",
        "Familiarity with state management (Redux, Zustand)",
        "Understanding of responsive design principles",
      ],
      benefits: [
        "Competitive salary and equity package",
        "Health, dental, and vision insurance",
        "Flexible working hours and remote work options",
        "Professional development budget",
        "Unlimited PTO policy",
      ],
      isBookmarked: false,
      rating: 4.8,
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      location: "Remote",
      salary: "$90k - $110k",
      type: "Full-time",
      experience: "3+ years",
      remote: true,
      logo: "/placeholder.svg?height=40&width=40",
      tags: ["Figma", "UI/UX", "Prototyping", "User Research"],
      postedDate: "1 week ago",
      applicants: 18,
      featured: false,
      description:
        "Join our creative team as a UX Designer where you'll design intuitive and engaging user experiences for our digital products. You'll work closely with product managers and developers to create user-centered designs that solve real problems.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio showcasing user-centered design",
        "Experience with user research and testing",
        "Knowledge of accessibility standards",
      ],
      benefits: [
        "Remote-first culture",
        "Top-tier design tools and equipment",
        "Conference and workshop attendance",
        "Mentorship programs",
        "Stock options",
      ],
      isBookmarked: true,
      rating: 4.6,
    },
    {
      id: 3,
      title: "Product Manager",
      company: "InnovateCo",
      location: "New York, NY",
      salary: "$130k - $160k",
      type: "Full-time",
      experience: "4+ years",
      remote: false,
      logo: "/placeholder.svg?height=40&width=40",
      tags: ["Agile", "SaaS", "Analytics", "Strategy"],
      postedDate: "3 days ago",
      applicants: 31,
      featured: true,
      description:
        "We're seeking a Product Manager to drive the strategy and execution of our core product features. You'll work with cross-functional teams to define product requirements, prioritize features, and ensure successful product launches.",
      requirements: [
        "4+ years of product management experience",
        "Experience with SaaS products",
        "Strong analytical and data-driven mindset",
        "Excellent communication and leadership skills",
        "Familiarity with Agile methodologies",
      ],
      benefits: [
        "Competitive base salary plus bonus",
        "Comprehensive health benefits",
        "401(k) with company matching",
        "Learning and development stipend",
        "Team building events and retreats",
      ],
      isBookmarked: false,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "DataTech",
      location: "Austin, TX",
      salary: "$110k - $140k",
      type: "Full-time",
      experience: "3+ years",
      remote: true,
      logo: "/placeholder.svg?height=40&width=40",
      tags: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      postedDate: "5 days ago",
      applicants: 42,
      featured: false,
      description:
        "Join our data science team to build machine learning models and extract insights from large datasets. You'll work on exciting projects involving predictive analytics, recommendation systems, and data visualization.",
      requirements: [
        "3+ years of data science experience",
        "Strong programming skills in Python and R",
        "Experience with machine learning frameworks",
        "Proficiency in SQL and database management",
        "Knowledge of statistical analysis and modeling",
      ],
      benefits: [
        "Competitive salary and performance bonuses",
        "Flexible work arrangements",
        "Access to latest ML tools and platforms",
        "Conference attendance and training",
        "Collaborative and innovative work environment",
      ],
      isBookmarked: true,
      rating: 4.5,
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudSys",
      location: "Seattle, WA",
      salary: "$115k - $145k",
      type: "Full-time",
      experience: "4+ years",
      remote: true,
      logo: "/placeholder.svg?height=40&width=40",
      tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
      postedDate: "1 week ago",
      applicants: 19,
      featured: false,
      description:
        "We're looking for a DevOps Engineer to help us scale our infrastructure and improve our deployment processes. You'll work with cutting-edge cloud technologies and help build robust, scalable systems.",
      requirements: [
        "4+ years of DevOps/Infrastructure experience",
        "Strong knowledge of AWS services",
        "Experience with containerization (Docker, Kubernetes)",
        "Proficiency in Infrastructure as Code (Terraform)",
        "Understanding of CI/CD pipelines",
      ],
      benefits: [
        "Competitive compensation package",
        "Remote work flexibility",
        "Professional certification support",
        "Health and wellness programs",
        "Equity participation",
      ],
      isBookmarked: false,
      rating: 4.4,
    },
    {
      id: 6,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Los Angeles, CA",
      salary: "$95k - $125k",
      type: "Full-time",
      experience: "2+ years",
      remote: true,
      logo: "/placeholder.svg?height=40&width=40",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      postedDate: "4 days ago",
      applicants: 35,
      featured: false,
      description:
        "Join our fast-growing startup as a Full Stack Developer. You'll work on exciting projects, have the opportunity to shape our technology stack, and grow with the company.",
      requirements: [
        "2+ years of full-stack development experience",
        "Proficiency in React and Node.js",
        "Experience with databases (MongoDB, PostgreSQL)",
        "Understanding of RESTful APIs",
        "Knowledge of version control (Git)",
      ],
      benefits: [
        "Equity package with high growth potential",
        "Flexible work schedule",
        "Learning and development budget",
        "Modern tech stack",
        "Collaborative startup environment",
      ],
      isBookmarked: false,
      rating: 4.3,
    },
  ]

  const filterOptions = {
    jobType: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
    experience: ["Entry Level", "1-2 years", "3-5 years", "5+ years", "10+ years"],
    location: ["Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Los Angeles, CA"],
    company: ["TechCorp", "DesignHub", "InnovateCo", "DataTech", "CloudSys", "StartupXYZ"],
  }

  // Filter jobs based on search criteria
  useEffect(() => {
    const filtered = allJobs.filter((job) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Location filter
      const matchesLocation = locationQuery === "" || job.location.toLowerCase().includes(locationQuery.toLowerCase())

      // Salary filter
      const jobSalaryMin = Number.parseInt(job.salary.replace(/[^0-9]/g, ""))
      const matchesSalary = jobSalaryMin >= salaryRange[0] * 1000 && jobSalaryMin <= salaryRange[1] * 1000

      // Job type filter
      const matchesJobType = selectedFilters.jobType.length === 0 || selectedFilters.jobType.includes(job.type)

      // Experience filter
      const matchesExperience =
        selectedFilters.experience.length === 0 || selectedFilters.experience.includes(job.experience)

      // Company filter
      const matchesCompany = selectedFilters.company.length === 0 || selectedFilters.company.includes(job.company)

      // Remote filter
      const matchesRemote = !selectedFilters.remote || job.remote

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSalary &&
        matchesJobType &&
        matchesExperience &&
        matchesCompany &&
        matchesRemote
      )
    })

    // Sort jobs
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
    } else if (sortBy === "salary") {
      filtered.sort((a, b) => {
        const aSalary = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
        const bSalary = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
        return bSalary - aSalary
      })
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredJobs(filtered)
  }, [searchQuery, locationQuery, salaryRange, selectedFilters, sortBy])

  const sidebar = (
    <div className="hp-sidebar-container">
      <div className="hp-sidebar-header">
        <Typography variant="h6" className="hp-sidebar-title">
          Job Results
        </Typography>
        <Typography variant="body2" className="hp-job-count">
          {filteredJobs.length} jobs found
        </Typography>
      </div>

      <div className="hp-sidebar-controls">
        <div className="hp-sort-controls">
          <FormControl size="small" fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={(e) => setSortBy(e.target.value)}
              className="hp-sort-select"
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="salary">Salary</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="hp-view-controls">
          <IconButton
            onClick={() => setViewMode("list")}
            className={`hp-view-btn ${viewMode === "list" ? "active" : ""}`}
          >
            <ViewList />
          </IconButton>
          <IconButton
            onClick={() => setViewMode("grid")}
            className={`hp-view-btn ${viewMode === "grid" ? "active" : ""}`}
          >
            <ViewModule />
          </IconButton>
        </div>
      </div>

      <div className="hp-job-list">
        {filteredJobs.map((job) => (
          <Card
            key={job.id}
            className={`hp-job-item ${selectedJob?.id === job.id ? "hp-selected" : ""} ${job.featured ? "hp-featured" : ""}`}
            onClick={() => handleJobClick(job)}
          >
            {job.featured && (
              <div className="hp-featured-badge">
                <Star fontSize="small" />
                <Typography variant="caption">Featured</Typography>
              </div>
            )}

            <div className="hp-job-item-header">
              <Avatar src={job.logo} alt={job.company} className="hp-company-logo" />
              <div className="hp-job-item-info">
                <Typography variant="subtitle2" className="hp-job-item-title">
                  {job.title}
                </Typography>
                <Typography variant="caption" className="hp-job-item-company">
                  {job.company}
                </Typography>
                <div className="hp-job-rating">
                  <Star fontSize="small" className="hp-rating-star" />
                  <Typography variant="caption">{job.rating}</Typography>
                </div>
              </div>
              <IconButton size="small" className="hp-bookmark-btn">
                {job.isBookmarked ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </div>

            <div className="hp-job-item-details">
              <div className="hp-job-item-meta">
                <LocationOn fontSize="small" />
                <Typography variant="caption">{job.location}</Typography>
                {job.remote && <Chip label="Remote" size="small" className="hp-remote-chip" />}
              </div>
              <div className="hp-job-item-meta">
                <AttachMoney fontSize="small" />
                <Typography variant="caption">{job.salary}</Typography>
              </div>
            </div>

            <div className="hp-job-item-tags">
              {job.tags.slice(0, 3).map((tag) => (
                <Chip key={tag} label={tag} size="small" className="hp-job-tag" />
              ))}
              {job.tags.length > 3 && (
                <Typography variant="caption" className="hp-more-tags">
                  +{job.tags.length - 3} more
                </Typography>
              )}
            </div>

            <div className="hp-job-item-footer">
              <Typography variant="caption" className="hp-posted-date">
                {job.postedDate}
              </Typography>
              <Typography variant="caption" className="hp-applicants">
                {job.applicants} applicants
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="hp-container">
      {/* Top Bar */}
      <AppBar position="fixed" className="hp-top-bar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="hp-menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="hp-app-title">
            CareerConnect
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <div className="hp-quick-actions">
            <Button onClick={ClickOut} variant="contained" className="hp-post-resume-btn">
              Upload Resume
            </Button>
            
            <IconButton
              onClick={handleUserMenuClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src="/placeholder.svg?height=40&width=40" alt="User" className="hp-user-mini-avatar" />
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

              <Divider />
              <MenuItem onClick={ClickOut} className="hp-user-menu-item">
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Log In
              </MenuItem>
              <MenuItem onClick={SignUp} className="hp-user-menu-item">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Sign up
              </MenuItem>
              <Divider />
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <div className="hp-hero-section">
        <div className="hp-hero-content">
          <Typography variant="h3" className="hp-hero-title">
            Find Your Dream Job
          </Typography>
          <Typography variant="h6" className="hp-hero-subtitle">
            Discover thousands of opportunities from top companies worldwide
          </Typography>

          <div className="hp-hero-search">
            <div className="hp-search-row">
              <div className="hp-search-field">
                <Search className="hp-search-icon" />
                <InputBase
                  placeholder="Job title, keywords, or company"
                  className="hp-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hp-location-field">
                <LocationOn className="hp-location-icon" />
                <InputBase
                  placeholder="City, state, or remote"
                  className="hp-location-input"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <Button variant="contained" className="hp-search-btn" size="large">
                Search Jobs
              </Button>
            </div>
          </div>

          <div className="hp-quick-stats">
            <div className="hp-stat">
              <Typography variant="h4" className="hp-stat-number">
                10K+
              </Typography>
              <Typography variant="body2" className="hp-stat-label">
                Active Jobs
              </Typography>
            </div>
            <div className="hp-stat">
              <Typography variant="h4" className="hp-stat-number">
                500+
              </Typography>
              <Typography variant="body2" className="hp-stat-label">
                Companies
              </Typography>
            </div>
            <div className="hp-stat">
              <Typography variant="h4" className="hp-stat-number">
                50K+
              </Typography>
              <Typography variant="body2" className="hp-stat-label">
                Job Seekers
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="hp-filters-section">
        <div className="hp-filters-header">
          <div className="hp-filters-title">
            <FilterList />
            <Typography variant="h6">Refine Your Search</Typography>
          </div>
          <Button onClick={clearAllFilters} startIcon={<Clear />} className="hp-clear-filters-btn">
            Clear All
          </Button>
        </div>

        <div className="hp-filters-content">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
              <Accordion className="hp-filter-accordion">
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2">Job Type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {filterOptions.jobType.map((type) => (
                      <FormControlLabel
                        key={type}
                        control={
                          <Checkbox
                            checked={selectedFilters.jobType.includes(type)}
                            onChange={() => handleFilterChange("jobType", type)}
                            size="small"
                          />
                        }
                        label={type}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Accordion className="hp-filter-accordion">
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2">Experience</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {filterOptions.experience.map((exp) => (
                      <FormControlLabel
                        key={exp}
                        control={
                          <Checkbox
                            checked={selectedFilters.experience.includes(exp)}
                            onChange={() => handleFilterChange("experience", exp)}
                            size="small"
                          />
                        }
                        label={exp}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Accordion className="hp-filter-accordion">
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2">Company</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {filterOptions.company.map((comp) => (
                      <FormControlLabel
                        key={comp}
                        control={
                          <Checkbox
                            checked={selectedFilters.company.includes(comp)}
                            onChange={() => handleFilterChange("company", comp)}
                            size="small"
                          />
                        }
                        label={comp}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Accordion className="hp-filter-accordion">
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2">Salary Range</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="caption" gutterBottom>
                    ${salaryRange[0]}k - ${salaryRange[1]}k
                  </Typography>
                  <Slider
                    value={salaryRange}
                    onChange={(e, newValue) => setSalaryRange(newValue)}
                    valueLabelDisplay="auto"
                    min={20}
                    max={300}
                    step={10}
                    className="hp-salary-slider"
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <div className="hp-remote-filter">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFilters.remote}
                      onChange={handleRemoteToggle}
                      className="hp-remote-checkbox"
                    />
                  }
                  label="Remote Work Only"
                  className="hp-remote-label"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      {/* Content Layout */}
      <div className="hp-content-layout">
        {/* Sidebar */}
        <div className={`hp-sidebar ${mobileOpen && window.innerWidth <= 600 ? "mobile-drawer mobile-open" : ""}`}>
          {sidebar}
        </div>

        {/* Main Content */}
        <main className="hp-main-content">
          {selectedJob ? (
            <div className="hp-job-detail-container">
              <div className="hp-job-detail-header">
                <div className="hp-job-header-info">
                  <Avatar src={selectedJob.logo} alt={selectedJob.company} className="hp-job-detail-logo" />
                  <div className="hp-job-header-text">
                    <div className="hp-job-title-row">
                      <Typography variant="h4" className="hp-job-detail-title">
                        {selectedJob.title}
                      </Typography>
                      {selectedJob.featured && (
                        <Chip icon={<Star />} label="Featured" className="hp-featured-chip" size="small" />
                      )}
                    </div>
                    <Typography variant="h6" className="hp-job-detail-company">
                      {selectedJob.company}
                    </Typography>
                    <div className="hp-job-detail-rating">
                      <Star className="hp-rating-star" />
                      <Typography variant="body2">{selectedJob.rating} Company Rating</Typography>
                    </div>
                    <div className="hp-job-detail-meta">
                      <div className="hp-meta-item">
                        <LocationOn fontSize="small" />
                        <Typography variant="body2">{selectedJob.location}</Typography>
                      </div>
                      <div className="hp-meta-item">
                        <AttachMoney fontSize="small" />
                        <Typography variant="body2">{selectedJob.salary}</Typography>
                      </div>
                      <div className="hp-meta-item">
                        <AccessTime fontSize="small" />
                        <Typography variant="body2">{selectedJob.type}</Typography>
                      </div>
                      <div className="hp-meta-item">
                        <School fontSize="small" />
                        <Typography variant="body2">{selectedJob.experience}</Typography>
                      </div>
                      {selectedJob.remote && (
                        <div className="hp-meta-item">
                          <Work fontSize="small" />
                          <Typography variant="body2">Remote Available</Typography>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hp-job-header-actions">
                  <IconButton className="hp-bookmark-detail-btn">
                    {selectedJob.isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                  </IconButton>
                  <Button onClick={ClickOut} variant="contained" className="hp-apply-btn" size="large">
                    Apply Now
                  </Button>
                </div>
              </div>

              <div className="hp-job-detail-content">
                <div className="hp-job-tags-section">
                  <Typography variant="subtitle2" className="hp-section-title">
                    Skills & Technologies
                  </Typography>
                  <div className="hp-job-detail-tags">
                    {selectedJob.tags.map((tag) => (
                      <Chip key={tag} label={tag} className="hp-job-detail-tag" />
                    ))}
                  </div>
                </div>

                <div className="hp-job-description-section">
                  <Typography variant="h6" className="hp-section-title">
                    Job Description
                  </Typography>
                  <Typography variant="body1" className="hp-job-description">
                    {selectedJob.description}
                  </Typography>
                </div>

                <div className="hp-job-requirements-section">
                  <Typography variant="h6" className="hp-section-title">
                    Requirements
                  </Typography>
                  <ul className="hp-requirements-list">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>
                        <Typography variant="body2">{req}</Typography>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hp-job-benefits-section">
                  <Typography variant="h6" className="hp-section-title">
                    Benefits & Perks
                  </Typography>
                  <ul className="hp-benefits-list">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index}>
                        <Typography variant="body2">{benefit}</Typography>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hp-job-stats-section">
                  <Card className="hp-job-stats-card">
                    <Typography variant="subtitle2" className="hp-stats-title">
                      Job Statistics
                    </Typography>
                    <div className="hp-stats-grid">
                      <div className="hp-stat-item">
                        <Typography variant="h6" className="hp-stat-value">
                          {selectedJob.applicants}
                        </Typography>
                        <Typography variant="caption" className="hp-stat-label">
                          Applicants
                        </Typography>
                      </div>
                      <div className="hp-stat-item">
                        <Typography variant="h6" className="hp-stat-value">
                          {selectedJob.postedDate}
                        </Typography>
                        <Typography variant="caption" className="hp-stat-label">
                          Posted
                        </Typography>
                      </div>
                      <div className="hp-stat-item">
                        <Typography variant="h6" className="hp-stat-value">
                          Active
                        </Typography>
                        <Typography variant="caption" className="hp-stat-label">
                          Status
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="hp-no-job-selected">
              <div className="hp-no-job-content">
                <Work className="hp-no-job-icon" />
                <Typography variant="h5" className="hp-no-job-title">
                  Select a job to view details
                </Typography>
                <Typography variant="body1" className="hp-no-job-subtitle">
                  Choose from {filteredJobs.length} available positions to see detailed information, requirements, and
                  benefits.
                </Typography>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
