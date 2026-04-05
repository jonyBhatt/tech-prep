"use client";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { User } from "@/generated/prisma/client";
import Link from "next/link";
import { CalendarDays, LayoutDashboard, Users } from "lucide-react";
import CtaButton from "../ui/CtaButton";

export const Navbar = ({ user }: { user: User }) => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50  w-full border-white/7 border-b px-10 py-6 sm:px-8 bg-transparent backdrop-blur-lg">
      <div className="flex items-center justify-between h-full">
        <div className="text-xl font-bold">TechPrep</div>
        <div className="flex items-center space-x-4">
          <Show when="signed-out">
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className="" variant={"outline"}>
                Sign Up
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            {user.role === "INTERVIEWER" && (
              <CtaButton>
                <Link href={"/dashboard"} className="flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </CtaButton>
            )}

            {user.role === "INTERVIEWEE" && (
              <div className="flex items-center gap-4">
                <Button variant={"ghost"} className="px-6 py-5 rounded-full">
                  <Link href={"/explore"} className="flex items-center gap-2">
                    <Users size={16} />
                    <span className="hidden sm:inline text-xl">Explore</span>
                  </Link>
                </Button>
                <CtaButton>
                  <Link
                    href={"/appointments"}
                    className="flex items-center gap-2"
                  >
                    <CalendarDays size={16} />
                    <span className="hidden sm:inline">Appointments</span>
                  </Link>
                </CtaButton>
              </div>
            )}
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
};
