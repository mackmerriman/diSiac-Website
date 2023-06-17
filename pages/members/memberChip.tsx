import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Member } from "../../types/Member";
import prisma from "../../lib/prisma";
import { Cloudinary } from "../../types/Cloudinary";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Navigation from "../../components/Navigation";

type Props = {
  member: Member;
  cloudinary: Cloudinary;
};

const MemberChip: React.FC<Props> = ({ member, cloudinary }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteMember = async () => {
    try {
      const data = {
        memberid: member.memberid,
      };
      const response = await fetch("/api/members", {
        method: "DELETE",
        body: JSON.stringify(data),
      });
      const cloudData = {
        cloudinaryid: cloudinary.cloudinaryid,
      };
      const res = await fetch("/api/cloudinary", {
        method: "DELETE",
        body: JSON.stringify(cloudData),
      });
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (!isDeleted) {
    return (
      <div>
        <Navigation />
        <div className="page" key={member.memberid}>
          <img
            src={cloudinary.cloudinaryurl}
            alt={cloudinary.resourcetitle}
            width={150}
            height={300}
          />
          <h2>Name: {member.name}</h2>
          <p>Bio: {member.bio}</p>
          <p>Email: {member.email}</p>
          <p>Instagram: {member.instagram}</p>
          <p>Class year: {member.classyear}</p>
          <p>Testimonial bio: {member.testimonialbio}</p>
          <Link
            href={{ pathname: "/members/edit", query: { id: member.memberid } }}
          >
            Click here to edit {member.name}'s information
          </Link>
          <br />
          <button onClick={deleteMember}>
            Click here to permanently delete {member.name}. This action is
            IRREVERSIBLE
          </button>
          <Link href="/members">Click here to see all members</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation />
        <div className="page">
          <p>
            Member with memberid {member.memberid} and name {member.name} was
            deleted
          </p>
          <br />
          <Link href="/members">Click here to see all members</Link>
        </div>
      </div>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const member = await prisma.members.findUnique({
    where: {
      memberid: id,
    },
  });
  const cloudinary = await prisma.cloudinary.findFirst({
    where: {
      cloudinaryurl: member.headshoturl,
    },
  });
  console.log(cloudinary.cloudinaryurl);
  return { props: { member, cloudinary } };
};

export default MemberChip;
