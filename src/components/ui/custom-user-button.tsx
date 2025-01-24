"use client"

import { useState } from "react"
import { useUser, useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CustomUserButton() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
            <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={() => (window.location.href = "/user-profile")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => (window.location.href = "/settings")}>Settings</DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem className="text-red-600" onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

