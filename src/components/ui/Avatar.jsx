import React from "react"

export const Avatar = ({ className = "", children, ...props }) => {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
      {children}
    </div>
  )
}

export const AvatarImage = React.forwardRef(({ className = "", src, alt = "", ...props }, ref) => {
  return (
    <img
      ref={ref}
      src={src || "/placeholder.svg"}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`}
      {...props}
    />
  )
})

AvatarImage.displayName = "AvatarImage"

export const AvatarFallback = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props}>
      {children}
    </div>
  )
}
