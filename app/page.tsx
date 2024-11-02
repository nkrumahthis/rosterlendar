"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [image, setImage] = React.useState<File | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [calendarLink, setCalendarLink] = React.useState<string | null>(null)
  const [staffName, setStaffName] = React.useState<string>('')


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const processRota = async () => {
    if(!image || !staffName.trim()) {
      return;
    }

    setLoading(true)
    setCalendarLink("")
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
              <Input
                type="text"
                accept="text"
                placeholder="Enter your name here"
                className="w-full"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <Button
                onClick={processRota}
                disabled={!image || loading}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Convert Rota to Calendar'}
              </Button>

              {calendarLink && (
                <Button
                  onClick={() => window.open(calendarLink)}
                  variant="outline"
                  className="w-full"
                >
                  Download Calendar File
                </Button>
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
