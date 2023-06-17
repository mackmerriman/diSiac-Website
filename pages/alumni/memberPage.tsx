import Link from "next/link";
import React from "react";
import { Member } from "../../types/Member";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import ButtonComponent from "../../components/Button";

interface Officer extends Member {
  position: string;
}

type Props = {
  member: Member;
  officer: Officer;
  err: string;
};

const MemberPage: React.FC<Props> = ({ member, officer, err }) => {
  return (
    <div>
      <Navigation shouldBeDark={true}/>
      {member && <div key={member.memberid}>
        <div className="flex mt-20">
          {member.headshoturl && <img
            src={member.headshoturl}
            alt={member.name}
            width="400px"
            height="600px"
            className="member-image"
          />}
          <div className="member">
            <div className="name">{member.name}</div>
            {officer ? 
              (<div className="info">{member.classyear} // {officer.position}</div>)
              : (<div className="info">{member.classyear}</div>)
            }
            <hr className="w-8/12 home-about-divider"></hr>
            <div className="text-base leading-7 text-slate-700">{member.bio}</div>
            <div className="my-5 text-slate-700">
              <Link href={`mailto:${member.email}`}>
                  {member.email}
              </Link>
            </div>
            <Link href={`https://${member.instagram}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" fill="#000000;" className="mx-1">
                <g fill="#232323" fill-rule="nonzero" stroke="none" stroke-width="0.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" mix-blend-mode="normal">
                    <g transform="scale(10.66667,10.66667)">
                    <path d="M8,3c-2.757,0 -5,2.243 -5,5v8c0,2.757 2.243,5 5,5h8c2.757,0 5,-2.243 5,-5v-8c0,-2.757 -2.243,-5 -5,-5zM8,5h8c1.654,0 3,1.346 3,3v8c0,1.654 -1.346,3 -3,3h-8c-1.654,0 -3,-1.346 -3,-3v-8c0,-1.654 1.346,-3 3,-3zM17,6c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,7c-2.757,0 -5,2.243 -5,5c0,2.757 2.243,5 5,5c2.757,0 5,-2.243 5,-5c0,-2.757 -2.243,-5 -5,-5zM12,9c1.654,0 3,1.346 3,3c0,1.654 -1.346,3 -3,3c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3z"></path>
                    </g>
                    </g>
                </svg>
            </Link>
          </div>
        </div>
        {member.testimonialurl &&
        <div className="flex justify-center">
          <img
          src={member.testimonialurl}
          alt={member.name}
          width="400px"
          height="600px"  
        />
        </div> }
        <br />
        <div className="flex justify-center">
        <ButtonComponent title="Click here to see all alumni" href="/alumni" />
        </div>
        <br />
      </div>}
      {err &&
        <div>
          <p>An error occurred: {err}</p>
          <br />
          <ButtonComponent title="Click here to see all alumni" href="/alumni"/>
        </div>
      }
      <Footer />
    </div>
  );
  
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context.query.id as string;
    const member = await prisma.members.findFirst({
      where: {
        memberid: id,
      },
    });
    const memberProfile = await prisma.officers.findFirst({
      where: {
        year: 2023,
        core: true,
        memberid: id,
      }
    })
    const officer: Officer = (memberProfile ? { ...member, position: memberProfile.position } : null);
    return { props: { member, officer, err: null } };
  } catch (error) {
    const err = `${error}`
    console.log(err)
    return { props: {member: null, err: err}}
  }
};

export default MemberPage;
