"use client"

import { useState } from "react"
import { Button } from "@mui/material"
import ApplyJobDialog from "./apply-job-dialog"

export default function JobApplyButton({ job, variant = "contained", size = "large", fullWidth = false }) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        onClick={handleOpenDialog}
        className="job-apply-button"
      >
        Apply Now
      </Button>
      <ApplyJobDialog open={dialogOpen} onClose={handleCloseDialog} job={job} />
    </>
  )
}
