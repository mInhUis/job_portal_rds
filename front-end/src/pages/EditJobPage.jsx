"use client"

import { useState } from "react"
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Toolbar,
  Typography,
  Autocomplete,
  Slider,
} from "@mui/material"
import {
  Add,
  Business,
  CloudUpload,
  Delete,
  LocationOn,
  Logout,
  Notifications,
  Person,
  Preview,
  Publish,
  Save,
  Settings,
  Work,
} from "@mui/icons-material"
import "./components/edit-job.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"

export default function EditJobPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [jobData, setJobData] = useState({
    title: "",
    company: "TechCorp Inc.",
    department: "",
    location: "",
    remote: false,
    jobType: "Full-time",
    experienceLevel: "",
    salary: "",
    currency: "USD",
    description: "",
    requirements: [""],
    benefits: [""],
    skills: [],
    applicationDeadline: "",
    contactEmail: "",
    companyLogo: null,
  })
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const {id} = useParams()
  const steps = ["Basic Information", "Job Details", "Requirements & Benefits", "Review & Publish"]
  const token = localStorage.getItem("token")
  

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
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleInputChange = (field, value) => {
    setJobData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayChange = (field, index, value) => {
    setJobData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field) => {
    setJobData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field, index) => {
    setJobData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleSkillsChange = (event, newValue) => {
    setJobData((prev) => ({
      ...prev,
      skills: newValue,
    }))
  }

  const handleSalaryChange = (event, newValue) => {
    setJobData((prev) => ({
      ...prev,
      salaryRange: newValue,
    }))
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setJobData((prev) => ({
        ...prev,
        companyLogo: file,
      }))
    }
  }

  const handleEdit = async () => {
  try {
    const token = localStorage.getItem("token");

    const payload = {
      title: jobData.title,
      description: jobData.description,
      location: jobData.location,
      salary: jobData.salary, // Convert range to string
      department: jobData.department,
      requirements: jobData.requirements.filter(Boolean), // Remove empty strings
      benefits: jobData.benefits.filter(Boolean),
      skills: jobData.skills,
      applicationDeadline: jobData.applicationDeadline,
      contactEmail: jobData.contactEmail,
    };
    console.log(JSON.stringify(payload));
    const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to post job");

    console.log("Job edited:", result);
    alert("Job successfully edited!");
    navigate("/v2");
  } catch (error) {
    console.error("Edit error:", error.message);
    alert("Failed to Edit job. Check your input or try again.");
  }
};

  const skillOptions = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Figma",
    "UI/UX",
    "Product Management",
    "Agile",
    "Scrum",
    "Machine Learning",
    "Data Science",
    "DevOps",
  ]

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="pj-step-content">
            <Typography variant="h6" className="pj-step-title">
              Basic Job Information
            </Typography>
            <Typography variant="body2" className="pj-step-subtitle">
              Let's start with the essential details about your job posting
            </Typography>

            <div className="pj-form-grid">
              <TextField
                label="Job Title"
                value={jobData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                fullWidth
                required
                className="pj-text-field"
                placeholder="e.g. Senior Frontend Developer"
              />

              <FormControl fullWidth className="pj-select-field">
                <InputLabel>Department</InputLabel>
                <Select
                  value={jobData.department}
                  label="Department"
                  onChange={(e) => handleInputChange("department", e.target.value)}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="HR">Human Resources</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Location"
                value={jobData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                fullWidth
                required
                className="pj-text-field"
                placeholder="e.g. San Francisco, CA"
              />

              <FormControl fullWidth className="pj-select-field">
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={jobData.jobType}
                  label="Job Type"
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Freelance">Freelance</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth className="pj-select-field">
                <InputLabel>Experience Level</InputLabel>
                <Select
                  value={jobData.experienceLevel}
                  label="Experience Level"
                  onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                >
                  <MenuItem value="Entry Level">Entry Level</MenuItem>
                  <MenuItem value="1-2 years">1-2 years</MenuItem>
                  <MenuItem value="3-5 years">3-5 years</MenuItem>
                  <MenuItem value="5+ years">5+ years</MenuItem>
                  <MenuItem value="10+ years">10+ years</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Application Deadline"
                type="date"
                value={jobData.applicationDeadline}
                onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                fullWidth
                className="pj-text-field"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pj-form-section">
              <FormControlLabel
                control={
                  <Switch
                    checked={jobData.remote}
                    onChange={(e) => handleInputChange("remote", e.target.checked)}
                    className="pj-switch"
                  />
                }
                label="Remote work available"
                className="pj-switch-label"
              />
            </div>

            <div className="pj-form-section">
              <Typography variant="subtitle2" className="pj-section-label">
                Salary  ({jobData.currency})
              </Typography>
              <TextField
                label="Salary"
                value={jobData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                fullWidth
                required
                className="pj-text-field"
                placeholder=""
              />
              </div>
          </div>
        )

      case 1:
        return (
          <div className="pj-step-content">
            <Typography variant="h6" className="pj-step-title">
              Job Details
            </Typography>
            <Typography variant="body2" className="pj-step-subtitle">
              Provide a detailed description of the role and responsibilities
            </Typography>

            <div className="pj-form-section">
              <TextField
                label="Job Description"
                value={jobData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                fullWidth
                multiline
                rows={8}
                required
                className="pj-text-area"
                placeholder="Describe the role, responsibilities, and what makes this position exciting..."
              />
            </div>

            <div className="pj-form-section">
              <Typography variant="subtitle2" className="pj-section-label">
                Required Skills & Technologies
              </Typography>
              <Autocomplete
                multiple
                options={skillOptions}
                value={jobData.skills}
                onChange={handleSkillsChange}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      className="pj-skill-chip"
                      key={index}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="Add skills and technologies" className="pj-text-field" />
                )}
                className="pj-autocomplete"
              />
            </div>

            <div className="pj-form-section">
              <TextField
                label="Contact Email"
                type="email"
                value={jobData.contactEmail}
                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                fullWidth
                required
                className="pj-text-field"
                placeholder="hr@company.com"
              />
            </div>

            <div className="pj-form-section">
              <Typography variant="subtitle2" className="pj-section-label">
                Company Logo
              </Typography>
              <div className="pj-upload-container">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="logo-upload"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="logo-upload">
                  <Button variant="outlined" component="span" startIcon={<CloudUpload />} className="pj-upload-btn">
                    Upload Company Logo
                  </Button>
                </label>
                {jobData.companyLogo && (
                  <Typography variant="body2" className="pj-file-name">
                    {jobData.companyLogo.name}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="pj-step-content">
            <Typography variant="h6" className="pj-step-title">
              Requirements & Benefits
            </Typography>
            <Typography variant="body2" className="pj-step-subtitle">
              Define what you're looking for and what you offer
            </Typography>

            <div className="pj-form-section">
              <Typography variant="subtitle2" className="pj-section-label">
                Job Requirements
              </Typography>
              {jobData.requirements.map((requirement, index) => (
                <div key={index} className="pj-array-item">
                  <TextField
                    value={requirement}
                    onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                    fullWidth
                    placeholder="e.g. 3+ years of React experience"
                    className="pj-text-field"
                  />
                  <IconButton
                    onClick={() => removeArrayItem("requirements", index)}
                    className="pj-remove-btn"
                    disabled={jobData.requirements.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </div>
              ))}
              <Button onClick={() => addArrayItem("requirements")} startIcon={<Add />} className="pj-add-btn">
                Add Requirement
              </Button>
            </div>

            <div className="pj-form-section">
              <Typography variant="subtitle2" className="pj-section-label">
                Benefits & Perks
              </Typography>
              {jobData.benefits.map((benefit, index) => (
                <div key={index} className="pj-array-item">
                  <TextField
                    value={benefit}
                    onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
                    fullWidth
                    placeholder="e.g. Health insurance and flexible working hours"
                    className="pj-text-field"
                  />
                  <IconButton
                    onClick={() => removeArrayItem("benefits", index)}
                    className="pj-remove-btn"
                    disabled={jobData.benefits.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </div>
              ))}
              <Button onClick={() => addArrayItem("benefits")} startIcon={<Add />} className="pj-add-btn">
                Add Benefit
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="pj-step-content">
            <Typography variant="h6" className="pj-step-title">
              Review & Publish
            </Typography>
            <Typography variant="body2" className="pj-step-subtitle">
              Review your job posting before publishing
            </Typography>

            <Card className="pj-preview-card">
              <div className="pj-preview-header">
                <div className="pj-preview-company">
                  <Avatar className="pj-preview-logo">
                    <Business />
                  </Avatar>
                  <div>
                    <Typography variant="h5" className="pj-preview-title">
                      {jobData.title || "Job Title"}
                    </Typography>
                    <Typography variant="h6" className="pj-preview-company-name">
                      {jobData.company}
                    </Typography>
                  </div>
                </div>
                <Button variant="contained" className="pj-preview-apply-btn" size="large">
                  Apply Now
                </Button>
              </div>

              <div className="pj-preview-meta">
                <div className="pj-preview-meta-item">
                  <LocationOn fontSize="small" />
                  <Typography variant="body2">
                    {jobData.location || "Location"} {jobData.remote && "• Remote Available"}
                  </Typography>
                </div>
                <div className="pj-preview-meta-item">
                  <Work fontSize="small" />
                  <Typography variant="body2">
                    {jobData.jobType} • {jobData.experienceLevel}
                  </Typography>
                </div>
                {jobData.salaryRange && (
                  <div className="pj-preview-meta-item">
                    <Typography variant="body2">
                      ${jobData.salaryRange[0]}k - ${jobData.salaryRange[1]}k
                    </Typography>
                  </div>
                )}
              </div>

              {jobData.skills.length > 0 && (
                <div className="pj-preview-skills">
                  {jobData.skills.map((skill, index) => (
                    <Chip key={index} label={skill} className="pj-preview-skill-chip" />
                  ))}
                </div>
              )}

              <Divider className="pj-preview-divider" />

              <div className="pj-preview-content">
                <Typography variant="h6" className="pj-preview-section-title">
                  Job Description
                </Typography>
                <Typography variant="body1" className="pj-preview-description">
                  {jobData.description || "Job description will appear here..."}
                </Typography>

                {jobData.requirements.filter(Boolean).length > 0 && (
                  <>
                    <Typography variant="h6" className="pj-preview-section-title">
                      Requirements
                    </Typography>
                    <ul className="pj-preview-list">
                      {jobData.requirements.filter(Boolean).map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </>
                )}

                {jobData.benefits.filter(Boolean).length > 0 && (
                  <>
                    <Typography variant="h6" className="pj-preview-section-title">
                      Benefits & Perks
                    </Typography>
                    <ul className="pj-preview-list">
                      {jobData.benefits.filter(Boolean).map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Card>
          </div>
        )

      default:
        return "Unknown step"
    }
  }

  return (
    <div className="pj-container">
      {/* Top Bar */}
      <AppBar position="fixed" className="pj-top-bar">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" className="pj-app-title">
            CareerConnect - Post a Job
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <div className="pj-quick-actions">
            <Button
              variant="outlined"
              startIcon={<Preview />}
              className="pj-preview-btn"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? "Edit" : "Preview"}
            </Button>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="error">
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
              <Avatar src="/placeholder.svg?height=40&width=40" alt="User" className="pj-user-mini-avatar" />
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
              <MenuItem onClick={handleUserMenuClose} className="pj-user-menu-item">
                <Avatar src="/placeholder.svg?height=32&width=32" /> HR Manager
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleUserMenuClose} className="pj-user-menu-item">
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem onClick={handleUserMenuClose} className="pj-user-menu-item">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} className="pj-user-menu-item pj-logout-item">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <main className="pj-main-content">
        <div className="pj-content-container">
          {/* Header Section */}
          <div className="pj-header-section">
            <Typography variant="h4" className="pj-page-title">
              Post a New Job
            </Typography>
            <Typography variant="body1" className="pj-page-subtitle">
              Find the perfect candidate for your team by creating a detailed job posting
            </Typography>
          </div>

          {/* Progress Stepper */}
          <Card className="pj-stepper-card">
            <Stepper activeStep={activeStep} className="pj-stepper">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel className="pj-step-label">{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Card>

          {/* Form Content */}
          <Card className="pj-form-card">
            {renderStepContent(activeStep)}

            {/* Navigation Buttons */}
            <div className="pj-navigation">
              <Button disabled={activeStep === 0} onClick={handleBack} className="pj-back-btn" variant="outlined">
                Back
              </Button>
              <div className="pj-nav-actions">
                <Button variant="outlined" startIcon={<Save />} className="pj-save-draft-btn">
                  Save Draft
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleEdit} variant="contained" startIcon={<Publish />} className="pj-publish-btn">
                    Publish Job
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleNext} className="pj-next-btn">
                    Next
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="pj-tips-card">
            <Typography variant="h6" className="pj-tips-title">
              💡 Tips for a Great Job Posting
            </Typography>
            <ul className="pj-tips-list">
              <li>Write a clear and specific job title that candidates will search for</li>
              <li>Include salary range to attract qualified candidates</li>
              <li>Be specific about required skills and experience level</li>
              <li>Highlight unique benefits and company culture</li>
              <li>Keep the description concise but comprehensive</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  )
}
