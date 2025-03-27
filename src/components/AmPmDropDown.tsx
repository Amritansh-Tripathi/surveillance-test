"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  onSelectionChange: (selection: string) => void;
};

export default function TimeSelector({ onSelectionChange }: Props) {
  const [timePeriod, setTimePeriod] = useState<string>("AM");

  const handleSelectionChange = (value: string) => {
    setTimePeriod(value);
    onSelectionChange(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {timePeriod}
          <ChevronDown
            className="-me-1 ms-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={timePeriod}
          onValueChange={handleSelectionChange}
        >
          <DropdownMenuRadioItem value="AM">AM</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="PM">PM</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
