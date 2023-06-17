import { useState, useEffect } from "react";
import {
    NextPage,
  } from "next";
import Link from "next/link";
import prisma from "../lib/prisma";
import { Member } from "../types/Member";

type Props = {
    members: Member[];
};

const MemberList: NextPage<Props> = ({ members }) => {
  return (
    <ul className="listgrid">
      {members.map((member) => (
        <li key={member.memberid}>
          <Link href={`members/edit?id=${member.memberid}&isAdmin=true`}>
            <p>{member.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
  


export default MemberList;
