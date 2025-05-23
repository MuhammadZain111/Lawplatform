import React from "react"

export const Alert = React.forwardRef(({ className = "", variant = "default", children, ...props }, ref) => {
  const variantClasses = {
    default: "bg-background text-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

Alert.displayName = "Alert"

export const AlertDescription = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
      {children}
    </div>
  )
})

AlertDescription.displayName = "AlertDescription"
