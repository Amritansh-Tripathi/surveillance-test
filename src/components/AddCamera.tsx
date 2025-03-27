"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cctv } from "lucide-react";

export default function DialogDemo() {
  
  return (
    <Dialog>
      <DialogTrigger asChild className="flex flex-row rounded-lg p-2 gap-2 justify-items-center items-center text-white border border-[#1D36B9] hover:bg-[#121125] bg-[#121125] bg-opacity-25">
        <Button variant="outline" className="aspect-square max-sm:p-0">
            <Plus className="opacity-60 sm:-ms-1 sm:me-2" size={16} strokeWidth={2} aria-hidden="true" />
            <span className="max-sm:sr-only">Add Camera</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <Cctv  className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Enter Camera details</DialogTitle>
            <DialogDescription className="text-left">
                Add a new camera to your account
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="CameraName">Camera Name</Label>
              <Input id="CameraName" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="IpAddress">I.P. Address</Label>
              <Input id="IpAddress" type="text" required />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="expiryDate">Username</Label>
                <Input className="[direction:inherit]"  />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="cvc">Password</Label>
                <Input className="[direction:inherit]"  />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="card-primary" />
            <Label htmlFor="card-primary" className="font-normal text-muted-foreground">
              Set as default Username & Password
            </Label>
          </div>
          <Button type="button" className="w-full">
            Add Camera
          </Button>
        </form>

      </DialogContent>
    </Dialog>
  );
}

