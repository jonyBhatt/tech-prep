import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { User } from "@/generated/prisma/client";

const PLAN_CREDIT = {
  free: 5,
  starter: 10,
  pro: 20,
};

export const currentPlan = async () => {
  const { has } = await auth();

  if (has({ plan: "pro" })) return "pro";
  else if (has({ plan: "starter" })) return "starter";
  else return "free";
};

const shouldAllocateCredit = async (user: User, currentPlan: string) => {
  // Always allocate credit for free plan users
  if (user.currentPlan !== currentPlan) return true;

  // allocate if never allocated before
  if (!user.creditsLastAllocatedAt) return true;

  // check the month
  const now = new Date();
  const last = new Date(user.creditsLastAllocatedAt);

  const newMonth =
    now.getFullYear() > last.getFullYear() || now.getMonth() > last.getMonth();

  return newMonth;
};

export const checkuser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const currentPlanName = await currentPlan();
    const currentPlanCredit = PLAN_CREDIT[currentPlanName];
    // check if user logged in
    const loggedIn = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
    if (loggedIn) {
      // check if plan changed or credit need to be allocated
      if (await shouldAllocateCredit(loggedIn, currentPlanName)) {
        await prisma.user.update({
          where: {
            clerkUserId: user.id,
          },
          data: {
            credits: currentPlanCredit,
            currentPlan: currentPlanName,
            creditsLastAllocatedAt: new Date(),
          },
        });
      }
      return loggedIn;
    }
    const name = `${user.firstName} ${user.lastName}`;

    // create user in database
    const newUser = await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
        credits: currentPlanCredit,
        currentPlan: currentPlanName,
        creditsLastAllocatedAt: new Date(),
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error in checkuser:", error);
    return null;
  }
};
