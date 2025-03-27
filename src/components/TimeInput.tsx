"use client";

import { Clock } from "lucide-react";
import { DateInput, DateSegment as ReactAriaDateSegment, Label, TimeField } from "react-aria-components";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  onTimeChange: (time: string) => void;
};

type TimeSegments = {
  hour: string;
  minute: string;
};

export default function TimeInput({ onTimeChange }: Props) {
  const [amPm, setAmPm] = useState<string>("AM");
  const [timeSegments, setTimeSegments] = useState<TimeSegments>({ hour: "12", minute: "00" });

  const handleSegmentChange = (segment: TimeSegments) => {
    setTimeSegments(segment);
    onTimeChange(`${segment.hour}:${segment.minute} ${amPm}`);
  };

  const handleAmPmChange = (value: string) => {
    setAmPm(value);
    onTimeChange(`${timeSegments.hour}:${timeSegments.minute} ${value}`);
  };

  return (
    <TimeField className="space-y-2">
      <Label className="text-md font-medium text-white">Opening Time</Label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 flex items-center justify-center ps-3 text-muted-foreground/80">
          <Clock size={16} strokeWidth={2} aria-hidden="true" />
        </div>
        <DateInput
          className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 ps-9 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20"
        >
          {() => (
            <input
              type="time"
              className="time-input w-full text-black"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleSegmentChange({
                  hour: event.target.value.split(":")[0],
                  minute: event.target.value.split(":")[1],
                })
              }
              value={`${timeSegments.hour}:${timeSegments.minute}`}
            />
          )}
        </DateInput>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="absolute inset-y-0 end-0 z-10 me-2 text-black">
              {amPm}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={amPm} onValueChange={handleAmPmChange}>
              <DropdownMenuRadioItem value="AM">AM</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="PM">PM</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TimeField>
  );
}
