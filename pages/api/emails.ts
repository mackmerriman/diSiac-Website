import prisma from "../../lib/prisma";
import { Member } from "../../types/Member";


export async function getMembers(): Promise<Member[]> {
  const emails = await prisma.members.findMany({
    where: {
      email: {
        contains: "princeton.edu",
      },
    },
  });

  return emails;
}
