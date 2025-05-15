"use client"

import React, { useState, useRef, useEffect } from "react"

export const Popover = ({ children }) => {
  return <>{children}</>
}

export const PopoverTrigger = ({ asChild = false, children, ...props }) => {
  const Comp = asChild ? React.Fragment : "button"
  return <Comp {...props}>{children}</Comp>
}

export const PopoverContent = ({ className = "", children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setIsOpen(true)

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={`z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
