"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  IconButton,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Chip,
  Paper,
  Divider,
  CircularProgress,
  InputAdornment,
  FormHelperText,
} from "@mui/material"
import {
  Close,
  CloudUpload,
  Delete,
  Description,
  CheckCircle,
  Phone,
  Email,
  Person,
  LinkedIn,
  GitHub,
  LocationOn,
  Work,
  CalendarToday,
} from "@mui/icons-material"
import "./apply-job-dialog.css"
import {jwtDecode} from "jwt-decode"

export default function ApplyJobDialog({ open, onClose, job }) {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    location: "",
    resume: null,
    coverLetter: null,
    yearsOfExperience: "",
    availability: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})

  const steps = ["Basic Information", "Upload Resume", "Additional Questions", "Review & Submit"]

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleFileUpload = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }))
    // Clear error when user uploads
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleFileRemove = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: null,
    }))
  }

  const validateStep = (step) => {
    let isValid = true
    const newErrors = {}

    if (step === 0) {
      // Validate basic information
      if (!formData.name.trim()) {
        newErrors.firstName = "First name is required"
        isValid = false
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
        isValid = false
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
        isValid = false
      }
    } else if (step === 1) {
      // Validate resume upload
      if (!formData.resume) {
        newErrors.resume = "Resume is required"
        isValid = false
      }
    } else if (step === 2) {
      // Validate additional questions
      if (!formData.yearsOfExperience) {
        newErrors.yearsOfExperience = "Please select your experience"
        isValid = false
      }
      if (!formData.availability) {
        newErrors.availability = "Please indicate your availability"
        isValid = false
      }
    } else if (step === 3) {
      // Validate review
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = "You must agree to the terms and conditions"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async () => {

    const token = localStorage.getItem("token");
    try {
        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            linkedin: formData.linkedin,
            github: formData.github,
            resume: formData.resume,
            coverLetter: formData.coverLetter || "",
            yearsOfExperience: formData.yearsOfExperience,
            availability: formData.availability,
            agreeTerms: formData.agreeTerms
        }
        console.log(payload);
        const res = await fetch(`http://localhost:5000/api/applications/${job.id}`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "Failed to apply job");

        console.log("Job applied:", result);
        alert("Job successfully applied!");
 
    } catch (error) {
        console.error("Edit error:", error.message);
        alert("Failed to apply job. Check your input or try again.");
      }
  };

  

  const renderBasicInfoForm = () => (
    <div className="ajd-form-section">
      <Typography variant="h6" className="ajd-section-title">
        Tell us about yourself
      </Typography>
      <Typography variant="body2" className="ajd-section-subtitle">
        We'll use this information to contact you about this position
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
            required
            className="ajd-text-field"
            error={!!errors.firstName}
            helperText={errors.firstName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className="ajd-input-icon" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            fullWidth
            required
            className="ajd-text-field"
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email className="ajd-input-icon" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            fullWidth
            required
            className="ajd-text-field"
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone className="ajd-input-icon" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Current Location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            fullWidth
            className="ajd-text-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn className="ajd-input-icon" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="LinkedIn Profile (Optional)"
            value={formData.linkedin}
            onChange={(e) => handleInputChange("linkedin", e.target.value)}
            fullWidth
            className="ajd-text-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedIn className="ajd-input-icon" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="GitHub Profile (Optional)"
            value={formData.github}
            onChange={(e) => handleInputChange("github", e.target.value)}
            fullWidth
            className="ajd-text-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GitHub className="ajd-input-icon" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  )

  const renderResumeUploadForm = () => (
    <div className="ajd-form-section">
      <Typography variant="h6" className="ajd-section-title">
        Upload Your Documents
      </Typography>
      <Typography variant="body2" className="ajd-section-subtitle">
        Please upload your resume and optional cover letter
      </Typography>

      <div className="ajd-upload-section">
        <Typography variant="subtitle1" className="ajd-upload-label">
          Resume *
        </Typography>
        <div className={`ajd-upload-container ${errors.resume ? "error" : ""}`}>
          {!formData.resume ? (
            <>
              <input
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                id="resume-upload"
                type="file"
                onChange={(e) => handleFileUpload("resume", e.target.files[0])}
              />
              <label htmlFor="resume-upload" className="ajd-upload-label-container">
                <div className="ajd-upload-placeholder">
                  <CloudUpload className="ajd-upload-icon" />
                  <Typography variant="body1" className="ajd-upload-text">
                    Drag and drop your resume here or
                  </Typography>
                  <Button variant="contained" component="span" className="ajd-upload-btn">
                    Browse Files
                  </Button>
                  <Typography variant="caption" className="ajd-upload-formats">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </Typography>
                </div>
              </label>
            </>
          ) : (
            <div className="ajd-file-preview">
              <div className="ajd-file-info">
                <Description className="ajd-file-icon" />
                <div className="ajd-file-details">
                  <Typography variant="body1" className="ajd-file-name">
                    {formData.resume.name}
                  </Typography>
                  <Typography variant="caption" className="ajd-file-size">
                    {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </div>
              </div>
              <IconButton onClick={() => handleFileRemove("resume")} className="ajd-file-remove">
                <Delete />
              </IconButton>
            </div>
          )}
        </div>
        {errors.resume && <FormHelperText error>{errors.resume}</FormHelperText>}

        <Typography variant="subtitle1" className="ajd-upload-label mt-4">
          Cover Letter (Optional)
        </Typography>
        <div className="ajd-upload-container">
          {!formData.coverLetter ? (
            <>
              <input
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                id="cover-letter-upload"
                type="file"
                onChange={(e) => handleFileUpload("coverLetter", e.target.files[0])}
              />
              <label htmlFor="cover-letter-upload" className="ajd-upload-label-container">
                <div className="ajd-upload-placeholder">
                  <CloudUpload className="ajd-upload-icon" />
                  <Typography variant="body1" className="ajd-upload-text">
                    Drag and drop your cover letter here or
                  </Typography>
                  <Button variant="contained" component="span" className="ajd-upload-btn">
                    Browse Files
                  </Button>
                  <Typography variant="caption" className="ajd-upload-formats">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </Typography>
                </div>
              </label>
            </>
          ) : (
            <div className="ajd-file-preview">
              <div className="ajd-file-info">
                <Description className="ajd-file-icon" />
                <div className="ajd-file-details">
                  <Typography variant="body1" className="ajd-file-name">
                    {formData.coverLetter.name}
                  </Typography>
                  <Typography variant="caption" className="ajd-file-size">
                    {(formData.coverLetter.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </div>
              </div>
              <IconButton onClick={() => handleFileRemove("coverLetter")} className="ajd-file-remove">
                <Delete />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderAdditionalQuestionsForm = () => (
    <div className="ajd-form-section">
      <Typography variant="h6" className="ajd-section-title">
        Additional Questions
      </Typography>
      <Typography variant="body2" className="ajd-section-subtitle">
        Please answer these questions to help us evaluate your application
      </Typography>

      <div className="ajd-question-section">
        <Typography variant="subtitle1" className="ajd-question-label">
          How many years of relevant experience do you have? *
        </Typography>
        <FormControl component="fieldset" error={!!errors.yearsOfExperience} className="ajd-form-control">
          <RadioGroup
            value={formData.yearsOfExperience}
            onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
          >
            <FormControlLabel value="0-1" control={<Radio />} label="0-1 years" />
            <FormControlLabel value="1-3" control={<Radio />} label="1-3 years" />
            <FormControlLabel value="3-5" control={<Radio />} label="3-5 years" />
            <FormControlLabel value="5-10" control={<Radio />} label="5-10 years" />
            <FormControlLabel value="10+" control={<Radio />} label="10+ years" />
          </RadioGroup>
          {errors.yearsOfExperience && <FormHelperText>{errors.yearsOfExperience}</FormHelperText>}
        </FormControl>
      </div>

      <div className="ajd-question-section">
        <Typography variant="subtitle1" className="ajd-question-label">
          When would you be available to start? *
        </Typography>
        <FormControl component="fieldset" error={!!errors.availability} className="ajd-form-control">
          <RadioGroup value={formData.availability} onChange={(e) => handleInputChange("availability", e.target.value)}>
            <FormControlLabel value="immediately" control={<Radio />} label="Immediately" />
            <FormControlLabel value="2-weeks" control={<Radio />} label="2 weeks notice" />
            <FormControlLabel value="1-month" control={<Radio />} label="1 month notice" />
            <FormControlLabel value="more-than-month" control={<Radio />} label="More than 1 month" />
          </RadioGroup>
          {errors.availability && <FormHelperText>{errors.availability}</FormHelperText>}
        </FormControl>
      </div>
    </div>
  )

  const renderReviewForm = () => (
    <div className="ajd-form-section">
      <Typography variant="h6" className="ajd-section-title">
        Review Your Application
      </Typography>
      <Typography variant="body2" className="ajd-section-subtitle">
        Please review your information before submitting
      </Typography>

      <Paper elevation={0} className="ajd-review-paper">
        <div className="ajd-review-header">
          <div className="ajd-review-job-info">
            <Typography variant="h6" className="ajd-review-job-title">
              {job?.title || "Senior Frontend Developer"}
            </Typography>
            <Typography variant="body2" className="ajd-review-job-company">
              {job?.company || "TechCorp Inc."}
            </Typography>
          </div>
          <Chip label="Ready to Submit" color="primary" icon={<CheckCircle />} className="ajd-review-status-chip" />
        </div>

        <Divider className="ajd-review-divider" />

        <div className="ajd-review-section">
          <Typography variant="subtitle1" className="ajd-review-section-title">
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className="ajd-review-field">
                <Typography variant="body2" className="ajd-review-field-label">
                  <Person fontSize="small" className="ajd-review-field-icon" /> Name
                </Typography>
                <Typography variant="body1" className="ajd-review-field-value">
                  {formData.firstName} {formData.lastName}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="ajd-review-field">
                <Typography variant="body2" className="ajd-review-field-label">
                  <Email fontSize="small" className="ajd-review-field-icon" /> Email
                </Typography>
                <Typography variant="body1" className="ajd-review-field-value">
                  {formData.email}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="ajd-review-field">
                <Typography variant="body2" className="ajd-review-field-label">
                  <Phone fontSize="small" className="ajd-review-field-icon" /> Phone
                </Typography>
                <Typography variant="body1" className="ajd-review-field-value">
                  {formData.phone}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="ajd-review-field">
                <Typography variant="body2" className="ajd-review-field-label">
                  <LocationOn fontSize="small" className="ajd-review-field-icon" /> Location
                </Typography>
                <Typography variant="body1" className="ajd-review-field-value">
                  {formData.location || "Not specified"}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>

        <Divider className="ajd-review-divider" />

        <div className="ajd-review-section">
          <Typography variant="subtitle1" className="ajd-review-section-title">
            Documents
          </Typography>
          <div className="ajd-review-documents">
            <div className="ajd-review-document">
              <Description className="ajd-review-document-icon" />
              <div className="ajd-review-document-info">
                <Typography variant="body1" className="ajd-review-document-name">
                  {formData.resume?.name || "resume.pdf"}
                </Typography>
                <Typography variant="caption" className="ajd-review-document-type">
                  Resume
                </Typography>
              </div>
            </div>
            {formData.coverLetter && (
              <div className="ajd-review-document">
                <Description className="ajd-review-document-icon" />
                <div className="ajd-review-document-info">
                  <Typography variant="body1" className="ajd-review-document-name">
                    {formData.coverLetter.name}
                  </Typography>
                  <Typography variant="caption" className="ajd-review-document-type">
                    Cover Letter
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>

        <Divider className="ajd-review-divider" />

        <div className="ajd-review-section">
          <Typography variant="subtitle1" className="ajd-review-section-title">
            Additional Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className="ajd-review-field">
                <Typography variant="body2" className="ajd-review-field-label">
                  <Work fontSize="small" className="ajd-review-field-icon" /> Experience
                </Typography>
                <Typography variant="body1" className="ajd-review-field-value">
                  {formData.yearsOfExperience || "Not specified"} years
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="ajd-review-field">
                <Typography variant="body2" className="ajd-review-field-label">
                  <CalendarToday fontSize="small" className="ajd-review-field-icon" /> Availability
                </Typography>
                <Typography variant="body1" className="ajd-review-field-value">
                  {formData.availability === "immediately"
                    ? "Immediately"
                    : formData.availability === "2-weeks"
                      ? "2 weeks notice"
                      : formData.availability === "1-month"
                        ? "1 month notice"
                        : formData.availability === "more-than-month"
                          ? "More than 1 month"
                          : "Not specified"}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="ajd-terms-section">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeTerms}
                onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
                color="primary"
                size="medium"
              />
            }
            label={
              <Typography variant="body2" style={{ marginLeft: "8px" }}>
                I certify that all information provided is accurate and complete to the best of my knowledge.
              </Typography>
            }
            style={{
              alignItems: "flex-start",
              marginTop: "16px",
              marginBottom: "8px",
              cursor: "pointer",
            }}
          />
          {errors.agreeTerms && (
            <FormHelperText error style={{ marginLeft: "32px" }}>
              {errors.agreeTerms}
            </FormHelperText>
          )}
        </div>
      </Paper>
    </div>
  )

  const renderSuccessState = () => (
    <div className="ajd-success-container">
      <div className="ajd-success-icon-container">
        <CheckCircle className="ajd-success-icon" />
      </div>
      <Typography variant="h5" className="ajd-success-title">
        Application Submitted!
      </Typography>
      <Typography variant="body1" className="ajd-success-message">
        Thank you for applying to {job?.title || "Senior Frontend Developer"} at {job?.company || "TechCorp Inc."}
      </Typography>
      <Typography variant="body2" className="ajd-success-details">
        We've sent a confirmation email to {formData.email}. The hiring team will review your application and contact
        you if there's a match.
      </Typography>
      <Button variant="contained" className="ajd-success-btn" onClick={onClose}>
        Close
      </Button>
    </div>
  )

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBasicInfoForm()
      case 1:
        return renderResumeUploadForm()
      case 2:
        return renderAdditionalQuestionsForm()
      case 3:
        return renderReviewForm()
      default:
        return "Unknown step"
    }
  }

  return (
    <Dialog
      open={open}
      onClose={success ? null : onClose}
      closeAfterTransition={false}
      maxWidth="md"
      fullWidth
      className="ajd-dialog"
      PaperProps={{
        className: "ajd-dialog-paper",
      }}
    >
      <DialogTitle className="ajd-dialog-title">
        <div className="ajd-title-container">
          <div className="ajd-job-info">
            <Typography variant="h6" className="ajd-job-title">
              Apply for {job?.title || "Senior Frontend Developer"}
            </Typography>
            <Typography variant="body2" className="ajd-job-company">
              {job?.company || "TechCorp Inc."} • {job?.location || "San Francisco, CA"}
            </Typography>
          </div>
          {!success && (
            <IconButton aria-label="close" onClick={onClose} className="ajd-close-button">
              <Close />
            </IconButton>
          )}
        </div>
      </DialogTitle>

      <DialogContent className="ajd-dialog-content">
        {success ? (
          renderSuccessState()
        ) : (
          <>
            <Stepper activeStep={activeStep} alternativeLabel className="ajd-stepper">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {renderStepContent(activeStep)}
          </>
        )}
      </DialogContent>

      {!success && (
        <DialogActions className="ajd-dialog-actions">
          <Button disabled={activeStep === 0} onClick={handleBack} className="ajd-back-button">
            Back
          </Button>
          <div className="ajd-action-right">
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="ajd-submit-button"
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} color="inherit" />}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext} className="ajd-next-button">
                Next
              </Button>
            )}
          </div>
        </DialogActions>
      )}
    </Dialog>
  )
}
