"use client"

import { createContext, useContext, useState } from "react"

const TabsContext = createContext({
  value: "",
  onValueChange: () => {},
})

export const Tabs = ({ defaultValue, value, onValueChange, className = "", children, ...props }) => {
  const [tabValue, setTabValue] = useState(defaultValue || "")

  const contextValue = {
    value: value !== undefined ? value : tabValue,
    onValueChange: onValueChange || setTabValue,
  }

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={`${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export const TabsList = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  )
}

export const TabsTrigger = ({ className = "", value, children, ...props }) => {
  const { value: selectedValue, onValueChange } = useContext(TabsContext)
  const isSelected = selectedValue === value

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isSelected ? "bg-background text-foreground shadow-sm" : "hover:bg-muted hover:text-foreground"
      } ${className}`}
      role="tab"
      aria-selected={isSelected}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ className = "", value, children, ...props }) => {
  const { value: selectedValue } = useContext(TabsContext)
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      role="tabpanel"
      {...props}
    >
      {children}
    </div>
  )
}
