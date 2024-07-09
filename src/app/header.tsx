"use client";

import { ModeToggle } from "@/components/theme-mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function AccountDropDown() {
  const session = useSession();

  return (
    <div>
      {session.data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row justify-between items-center gap-x-2">
              <Avatar className="h-10">
                <AvatarImage src={session.data?.user?.image!} />
                <AvatarFallback>Profile Image</AvatarFallback>
              </Avatar>
              <div className="hover:underline">{session.data?.user?.name!}</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {session.data ? (
              <DropdownMenuItem
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                <div className="flex flex-row gap-x-1">
                  <LogIn className="h-5" /> Sign Out
                </div>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => signIn("google")}>
                <div className="flex flex-row gap-x-1">
                  <LogIn className="h-5" /> Sign In
                </div>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => console.log("delete account")}>
              <div className="flex flex-row gap-x-1">
                <Trash className="h-5" /> Delete Account
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant={"outline"} onClick={() => signIn("google")}>
          Sign In
        </Button>
      )}
    </div>
  );
}

export function Header() {
  const session = useSession();
  return (
    <header className=" bg-gray-200 py-4 dark:bg-gray-900 ">
      <div className="mx-10 flex justify-between items-center">
        <Link href={"/"} className="flex  justify-between items-center gap-x-3">
          <Image
            src={"/codeMateIcon1.png"}
            alt="Logo"
            height={"50"}
            width={"50"}
          ></Image>
          <div className="text-xl mt-1 hover:text-blue-200">CodeMate</div>
        </Link>
        <div className="flex flex-row justify-between items-center gap-x-5">
          <AccountDropDown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
