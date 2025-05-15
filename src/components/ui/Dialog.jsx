"use client"

import { createContext, useContext, useState } from "react"

const DialogContext = createContext({
  open: false,
  onOpenChange: () => {},
})

export const Dialog = ({ open, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = useState(open || false)

  const handleOpenChange = (value) => {
    setIsOpen(value)
    onOpenChange?.(value)
  }

  return (
    <DialogContext.Provider value={{ open: open !== undefined ? open : isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

export const DialogContent = ({ className = "", children, ...props }) => {
  const { open, onOpenChange } = useContext(DialogContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div
        className={`fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export const DialogHeader = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
      {children}
    </div>
  )
}

export const DialogTitle = ({ className = "", children, ...props }) => {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h2>
  )
}

export const DialogDescription = ({ className = "", children, ...props }) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  )
}

export const DialogFooter = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`} {...props}>
      {children}
    </div>
  )
}
