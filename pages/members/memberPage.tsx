import Link from "next/link";
import React from "react";
import { Member } from "../../types/Member";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import ButtonComponent from "../../components/Button";
import { Pieces } from "../../types/Pieces";
import Testimonial from "../../components/Testimonial";
import { Shows } from "../../types/Shows";
import YouTube from "react-youtube";

interface Officer extends Member {
  position: string;
}

type Props = {
  member: Member;
  officer: Officer;
  choreo: Pieces[];
  pieces: Pieces[];
  err: string;
};

const MemberPage: React.FC<Props> = ({ member, officer, choreo, pieces, err }) => {
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
            {member.instagram && 
              <Link href={`https://${member.instagram}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" fill="#000000;" className="mx-1">
                <g fill="#232323" fillRule="nonzero" stroke="none" strokeWidth="0.5" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" mix-blend-mode="normal">
                    <g transform="scale(10.66667,10.66667)">
                    <path d="M8,3c-2.757,0 -5,2.243 -5,5v8c0,2.757 2.243,5 5,5h8c2.757,0 5,-2.243 5,-5v-8c0,-2.757 -2.243,-5 -5,-5zM8,5h8c1.654,0 3,1.346 3,3v8c0,1.654 -1.346,3 -3,3h-8c-1.654,0 -3,-1.346 -3,-3v-8c0,-1.654 1.346,-3 3,-3zM17,6c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,7c-2.757,0 -5,2.243 -5,5c0,2.757 2.243,5 5,5c2.757,0 5,-2.243 5,-5c0,-2.757 -2.243,-5 -5,-5zM12,9c1.654,0 3,1.346 3,3c0,1.654 -1.346,3 -3,3c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3z"></path>
                    </g>
                    </g>
                </svg>
              </Link>
            }
          </div>
        </div>
        {member.testimonialbio &&
        <Testimonial cloudinaryurl={member.testimonialurl} testimonial={member.testimonialbio}></Testimonial> 
        }
        {choreo.length > 0 && (
          <div>
            <div className="ml-5 mt-5">
              <p className="text-3xl font-semibold uppercase">Choreography</p>
              <br />
              <hr />
              <br />
            </div>
            <div className="members-pieces-container">
              {choreo.map((piece) => (
                <YouTube
                  className="m-8"
                  videoId={piece.youtubelink.slice(
                    piece.youtubelink.lastIndexOf("/") + 1
                  )}
                />
              ))}
            </div>
          </div>
        )}
         {pieces.length > 0 && (
          <div>
            <div className="ml-5 mt-5">
              <p className="text-3xl font-semibold uppercase">{member.name} in performance</p>
              <br />
              <hr />
              <br />
            </div>
            <div className="members-pieces-container">
              {pieces.map((piece) => (
                <YouTube
                  className="m-8"
                  videoId={piece.youtubelink.slice(
                    piece.youtubelink.lastIndexOf("/") + 1
                  )}
                />
              ))}
            </div>
          </div>
        )}
        <br />
        <div className="flex justify-center">
        <ButtonComponent title="Click here to see all members" href="/members" />
        </div>
        <br />
      </div>}
      {err &&
        <div>
          <p>An error occurred: {err}</p>
          <br />
          <ButtonComponent title="Click here to see all members" href="/members"/>
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

    const currentYear = new Date().getFullYear();
    const memberProfile = await prisma.officers.findFirst({
      where: {
        year: currentYear,
        memberid: id,
      }
    })

    const officer: Officer = (memberProfile ? { ...member, position: memberProfile.position } : null);

    let choreo: Pieces[] = [];
    let pieces: Pieces[] = [];
    const memberYear: number = (+ member.classyear)

    // for each potential year of membership
    for (let i = memberYear; i >= memberYear - 4; i--) {
      // get all shows for that year
      const allShows = await prisma.shows.findMany({
        where: {
          year: i,
        },
        orderBy: {
          season: "asc",
        },
      });
      // for each show that year:
      for (let j = 0; j < allShows.length; j++) {
        // get all choreo for that show
        const allChoreo = await prisma.pieces.findMany({
          where: {
            showid: allShows[j].showid,
            choreoid: {contains: member.memberid},
          }
        });
        if (allChoreo !== null) {
          for (let k = 0; k < allChoreo.length; k++) {
            choreo.push(allChoreo[k]);
          }
        }

        // get all pieces for that show, excluding choreo
        const allPieces = await prisma.pieces.findMany({
          where: {
            showid: allShows[j].showid,
            memberid: {contains: member.memberid},
            NOT: {
              choreoid: {contains: member.memberid},
            },
          },
        });
        if (allPieces !== null) {
          for (let k = 0; k < allPieces.length; k++) {
            pieces.push(allPieces[k]);
          }
        }
      }
    }

    return { props: { member, officer, choreo, pieces, err: null } };
  } catch (error) {
    const err = `${error}`
    console.log(err)
    return { props: {member: null, err: err}}
  }
};

export default MemberPage;
