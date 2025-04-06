"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DatePickerWithPresets() {
  const [date, setDate] = React.useState<Date>(new Date()) // ✅ Default to today

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"invite"}
          size='sm'
          className={cn(
            "w-fit justify-center gap-2 items-center text-left text-xs md:text-xl md:gap-4 font-bold md:font-semibold py-1 px-2",
            !date && "text-muted-foreground"
          )}
        >
          
          {date ? format(date, "PPP") : <span>Pick a date</span>}

          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger className="bg-[#121125]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-[#1B1B2E]">
            <SelectItem className="text-white" value="0">Today</SelectItem>
            <SelectItem className="text-white" value="1">Tomorrow</SelectItem>
            <SelectItem className="text-white" value="3">In 3 days</SelectItem>
            <SelectItem className="text-white" value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
