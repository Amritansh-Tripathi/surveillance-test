"use client"

import { useEffect, useState } from "react"
import { AlertCircle, Clock, Edit2 } from "lucide-react"
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
  StepperTitle,
} from "@/components/ui/stepper"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Define the alert type
interface Alert {
  id: string
  title: string
  severity: "low" | "medium" | "high"
  message: string
  timestamp: string
}

// Sample alerts data - in real app, this would come from your backend
const sampleAlerts: Record<string, Alert[]> = {
  "13": [
    {
      id: "1",
      title: "High CPU Usage",
      severity: "high",
      message: "Server CPU usage exceeded 90%",
      timestamp: "1:15 PM",
    },
    {
      id: "2",
      title: "Memory Warning",
      severity: "medium",
      message: "Available memory below 20%",
      timestamp: "1:30 PM",
    },
    {
      id: "3",
      title: "Disk Space Alert",
      severity: "low",
      message: "Disk usage reaching threshold",
      timestamp: "1:45 PM",
    },
  ],
  "16": [
    {
      id: "4",
      title: "Network Latency",
      severity: "high",
      message: "High network latency detected",
      timestamp: "4:10 PM",
    },
    {
      id: "5",
      title: "Database Connection",
      severity: "high",
      message: "Database connection timeout",
      timestamp: "4:15 PM",
    },
  ],
}

const severityColors = {
  low: "bg-yellow-500",
  medium: "bg-orange-500",
  high: "bg-red-500",
}

// Generate time options for select
const generateTimeOptions = () => {
  const options = []
  for (let i = 1; i <= 12; i++) {
    options.push({
      value: i.toString(),
      label: `${i}:00 AM`,
    })
    options.push({
      value: (i + 12).toString(),
      label: `${i}:00 PM`,
    })
  }
  return options
}

const timeOptions = generateTimeOptions()

export default function TimeStepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const [currentHour, setCurrentHour] = useState<number>(0)
  const [startHour, setStartHour] = useState("10") // 10 AM default
  const [endHour, setEndHour] = useState("22") // 10 PM default

  // Generate hours from start to end time
  const hours = Array.from(
    { length: Number.parseInt(endHour) - Number.parseInt(startHour) + 1 },
    (_, i) => Number.parseInt(startHour) + i,
  )

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date()
      const hour = now.getHours()
      setCurrentHour(hour)

      // Calculate current step based on time
      if (hour >= Number.parseInt(startHour) && hour <= Number.parseInt(endHour)) {
        setCurrentStep(hour - Number.parseInt(startHour))
      } else if (hour < Number.parseInt(startHour)) {
        setCurrentStep(0)
      } else {
        setCurrentStep(hours.length - 1)
      }
    }

    updateCurrentTime()
    const interval = setInterval(updateCurrentTime, 60000)
    return () => clearInterval(interval)
  }, [startHour, endHour, hours.length])

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM"
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${hour12}${period}`
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="w-full space-y-1 p-1">
      <div className="hidden items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          <span>{formatTime(new Date())}</span>
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Edit2 className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Time Range</h4>
                <p className="text-sm text-muted-foreground">Set the start and end time for the timeline</p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start">Start Time</Label>
                  <Select value={startHour} onValueChange={setStartHour}>
                    <SelectTrigger id="start">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          disabled={Number.parseInt(option.value) >= Number.parseInt(endHour)}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end">End Time</Label>
                  <Select value={endHour} onValueChange={setEndHour}>
                    <SelectTrigger id="end">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          disabled={Number.parseInt(option.value) <= Number.parseInt(startHour)}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="overflow-x-auto py-3 pb-4">
        <Stepper value={currentStep} orientation="horizontal" className="min-w-[800px]">
          {hours.map((hour, index) => {
            const hourAlerts = sampleAlerts[hour.toString()] || []
            const hasAlerts = hourAlerts.length > 0

            return (
              <StepperItem key={hour} step={index} completed={currentHour > hour} className="flex-1 last:flex-initial">
                <Popover>
                  <PopoverTrigger asChild>
                    <StepperTrigger className="group relative flex flex-col items-center gap-2">
                      {hasAlerts ? (
                        <div className="relative">
                          <div className="size-6 rounded-full bg-destructive text-destructive-foreground">
                            <AlertCircle className="size-6 p-1" />
                          </div>
                          <Badge
                            variant="destructive"
                            className="absolute -right-2 -top-2 size-4 rounded-full p-0 text-[10px] flex items-center justify-center"
                          >
                            {hourAlerts.length}
                          </Badge>
                        </div>
                      ) : (
                        <StepperIndicator />
                      )}
                      <StepperTitle className="text-xs">{formatHour(hour)}</StepperTitle>
                    </StepperTrigger>
                  </PopoverTrigger>
                  {hasAlerts && (
                    <PopoverContent className="w-80 p-0">
                      <div className="p-4 pb-2">
                        <h3 className="font-medium">Alerts for {formatHour(hour)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {hourAlerts.length} alert{hourAlerts.length !== 1 ? "s" : ""} detected
                        </p>
                      </div>
                      <ScrollArea className="h-[280px]">
                        <div className="space-y-2 p-4 pt-0">
                          {hourAlerts.map((alert) => (
                            <div key={alert.id} className="rounded-lg border p-3 text-sm">
                              <div className="flex items-center gap-2">
                                <div className={`size-2 rounded-full ${severityColors[alert.severity]}`} />
                                <div className="font-medium">{alert.title}</div>
                                <div className="ml-auto text-xs text-muted-foreground">{alert.timestamp}</div>
                              </div>
                              <div className="mt-1 text-muted-foreground">{alert.message}</div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </PopoverContent>
                  )}
                </Popover>
                {index < hours.length - 1 && <StepperSeparator />}
              </StepperItem>
            )
          })}
        </Stepper>
      </div>
    </div>
  )
}

