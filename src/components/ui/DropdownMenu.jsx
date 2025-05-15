"use client"

import React, { createContext, useContext, useState, useRef, useEffect } from "react"

const DropdownMenuContext = createContext({
  open: false,
  setOpen: () => {},
})

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false)

  return <DropdownMenuContext.Provider value={{ open, setOpen }}>{children}</DropdownMenuContext.Provider>
}

export const DropdownMenuTrigger = ({ asChild = false, children, ...props }) => {
  const { open, setOpen } = useContext(DropdownMenuContext)
  const Comp = asChild ? React.Fragment : "button"

  return (
    <Comp onClick={() => setOpen(!open)} {...props}>
      {children}
    </Comp>
  )
}

export const DropdownMenuContent = ({ className = "", align = "center", children, ...props }) => {
  const { open, setOpen } = useContext(DropdownMenuContext)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setOpen])

  if (!open) return null

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }

  return (
    <div
      ref={ref}
      className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 absolute mt-2 ${alignClasses[align]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const DropdownMenuItem = ({ className = "", asChild = false, children, ...props }) => {
  const { setOpen } = useContext(DropdownMenuContext)
  const Comp = asChild ? React.Fragment : "button"

  return (
    <Comp
      className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left ${className}`}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </Comp>
  )
}
