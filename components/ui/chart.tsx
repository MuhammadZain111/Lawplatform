import type React from "react"

interface ChartContainerProps {
  children: React.ReactNode
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return <div>{children}</div>
}

interface ChartProps {
  children: React.ReactNode
}

export const Chart: React.FC<ChartProps> = ({ children }) => {
  return <div>{children}</div>
}

type ChartLegendProps = {}

export const ChartLegend: React.FC<ChartLegendProps> = () => {
  return <div></div>
}

interface ChartTooltipProps {
  content: React.FC
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ content: Content }) => {
  return <Content />
}

type ChartTooltipContentProps = {}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = () => {
  return <div></div>
}
