"use client"

import { ScheduleTable } from "@/components/ScheduleTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StaffSchedule } from "@/lib/types";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [image, setImage] = React.useState<File | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [staffName, setStaffName] = React.useState<string>('')
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [schedule, setSchedule] = React.useState<StaffSchedule | null>(null)


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const processRota = async () => {
    if (!image || !staffName.trim()) {
      setErrorMessage("Please provide both staff name and an image.")
      return;
    }

    setLoading(true)
    setErrorMessage('')

    try {
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(image);
      })

      const response = await fetch(`/api/rota`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64Image, staffName }),
      })

      if (!response.ok) {
        throw new Error("Failed to process rota");
      }

      const { data } = await response.json() as { data: StaffSchedule }

      setSchedule(data)

    } catch (error) {
      console.error('Error processing rota:', error)
      setErrorMessage("Error processing rota. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Rota to Calendar Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staffName">Staff Name</Label>
                <Input
                  id="staffName"
                  name="staffName"
                  required
                  type="text"
                  accept="text"
                  placeholder="Enter your staff name here"
                  className="w-full"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staffName">Rota Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <Button
                onClick={processRota}
                disabled={!image || loading}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Convert Rota to Calendar'}
              </Button>

              {schedule && (<ScheduleTable schedule={schedule} />)}

              {errorMessage && (
                <Alert variant="destructive">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center absolute bottom-4 mx-auto">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:nkrumahthis@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          nkrumahthis@gmail.com
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/nkrumahthis/rotalendar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nkrumahsarpong.com"
          target="_blank"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          nkrumahsarpong.com
        </a>
      </footer>
    </div>
  );
}
