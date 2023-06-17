import {
  NextPage,
} from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "../../lib/prisma";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ButtonComponent from "../../components/Button";
import { Member } from "../../types/Member";
import { Cloudinary } from "../../types/Cloudinary";
import { off } from "process";

interface Officer extends Member {
  position: string;
}

type Props = {
  member: Member;
  members: Member[];
  officers: Officer[];
  error: string;
  memberspageImg: Cloudinary | null;
};

let officerRanking = new Map<string,number>([
  ["President", 1],
  ["Artistic Director", 2],
  ["Vice President", 3],
  ["Assistant Artistic Director", 4],
  ["Business Chair", 5],
  ["Publicity Chair", 6],
  ["Design Chair", 7],
  ["Strategy Chair", 8],
  ["Social Chair", 9],
  ["Costume Chair", 10],
  ["Gear Chair", 11],
  ["Diversity, Equity, and Inclusion Chair", 12],
  ["Web Chair", 13],
  ["Photography Chair", 14],
  ["Video Chair", 15],
]);

const MemberPage: NextPage<Props> = ({ memberspageImg, officers, members, error }) => {
  const sortedOfficers = sortOfficers(officers);

  return (
    <div> 
      <Navigation />
      <div className="hero-image-container">
        <img className="home-image" src={memberspageImg.cloudinaryurl} />
        <div className="image-text">
          <div className="image-text-title">MEMBERS</div>
          <br />
          <div className="image-text-subtitle">MEET THE BLUE FAMILY</div>
        </div>
      </div>
      {members && <div className="page">
        
        <div className="members-container">
          {sortedOfficers.map((officer) => (
            <Link
              href={{
                pathname: "/members/memberPage",
                query: { id: officer.memberid },
              }}
              key={officer.memberid}
            >
              {officer && <div className="member-panel img__wrap">
                <div className="img__description">
                  <div className="member-icon">+</div>
                  <p className="img__text">{officer.name}</p>
                  <div></div>
                  <p className="img__subtext">{officer.position}</p>
                </div>
                {officer.headshoturl && (
                  <img src={officer.headshoturl} alt={officer.name} />
                )}
              </div>}
            </Link>
          ))}
          {members.map((member) => (
            <Link
              href={{
                pathname: "/members/memberPage",
                query: { id: member.memberid },
              }}
              key={member.memberid}
            >
              {member && <div className="member-panel img__wrap">
                <div className="img__description">
                  <div className="member-icon">+</div>
                  <p className="img__text">{member.name}</p>
                </div>
                {member.headshoturl && (
                  <img src={member.headshoturl} alt={member.name} />
                )}
              </div>}
            </Link>
          ))}
        </div>
      </div>}
      <Footer />
      {error && 
      <div>
        <p>Something went wrong: {error}</p>
      </div>}
    </div>
  );
};

const sortOfficers = (officers: Officer[]): Officer[] => {
  let sortedOfficers: Officer[] = []
  officerRanking.forEach((idx, position) => {
    for (let i = 0; i < officers.length; i++) {
      if (officers[i].position === position) sortedOfficers.push(officers[i]);
    }
  })
  return sortedOfficers;
}

export const getServerSideProps = async (context) => {
  try {
    const memberspageImg = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "memberspage",
      },
    });

    const currentYear: number = new Date().getFullYear()
    const currentOfficers = await prisma.officers.findMany({
      where: {
        year: currentYear,
      },
    });

    const officers: Officer[] = [];
    const officersId: string[] = [];
    for (let i = 0; i < currentOfficers.length; i++) {
      const member = await prisma.members.findUnique({
        where: {
          memberid: currentOfficers[i].memberid,
        },
      });
      if (member !== null) {
        const officer: Officer = { ...member, position: currentOfficers[i].position };
        officers.push(officer);
        officersId.push(officer.memberid);
      }
    }

    const members = await prisma.members.findMany({
      where: {
        OR: [
          {
            alumniid: null,
          },
          {
            memberid: "bshenry",
          },
        ],
        NOT: [
          {memberid: {in: officersId}}
        ]
      },
      orderBy: {
        name: "asc",
      }
    });
  
    return { props: { memberspageImg, officers, members, error: null } };
  } catch (error) {
    const err = `${error}`
    return {props: {members: null, error: err}}
  }
}
  


export default MemberPage;
