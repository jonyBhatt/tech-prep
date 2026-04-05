import React from "react";
import { Navbar } from "../common/Navbar";
import { checkuser } from "@/lib/checkuser";
import { User } from "@/generated/prisma/client";

export default async function Header() {
  const user = await checkuser();

  return (
    <div>
      <Navbar user={user as User} />
    </div>
  );
}
