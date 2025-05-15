"use client"

import React, { useState } from "react"

const Checkbox = React.forwardRef(({ className = "", checked, defaultChecked, onCheckedChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || false)

  const handleChange = (event) => {
    const newChecked = event.target.checked
    setIsChecked(newChecked)
    onCheckedChange?.(newChecked)
  }

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        ref={ref}
        checked={checked !== undefined ? checked : isChecked}
        onChange={handleChange}
        className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ${className}`}
        {...props}
      />
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox
