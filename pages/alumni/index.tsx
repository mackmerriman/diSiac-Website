import {
  NextPage,
} from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ButtonComponent from "../../components/Button";
import { Member } from "../../types/Member";
import { Cloudinary } from "../../types/Cloudinary";

interface Officer extends Member {
  position: string;
}

type Props = {
  member: Member;
  members20: Member[];
  members21: Member[];
  members22: Member[];
  // officers20: Officer[];
  // officers21: Officer[];
  // officers22: Officer[];
  error: string;
  alumnipageImg: Cloudinary | null;
};

const MemberPage: NextPage<Props> = ({ alumnipageImg, members20, members21, members22, error }) => {
  // officer map
  // const officerMap = getOfficers(officers);

  // alumni map
  // const alumniMap = new Map<number, Member[]>([[2022, members22], [2021, members21], [2020, members20]]);

  return (
    <div> 
      <Navigation />
      <div className="hero-image-container">
        <img className="home-image" src={alumnipageImg.cloudinaryurl} />
        <div className="image-text">
          <div className="image-text-title">ALUMNI</div>
          <br />
          <div className="image-text-subtitle">MEET THE BLUE FAMILY</div>
        </div>
      </div>
      <div className="page">
      {members22 && <div>
        <h1 className="alumni-title">Class of 2022</h1>
        <div className="alumni-container">
          {members22.map((member) => (
              <div className="alumni">
                <Link
                  href={{
                    pathname: "/alumni/memberPage",
                    query: { id: member.memberid },
                  }}
                  key={member.memberid}
                >
                  {member.headshoturl && (
                    <div>
                      <img src={member.headshoturl} alt={member.name} className="alumni-photo"/>
                      <p className="alumni-text">{member.name}</p>
                    </div>
                  )}
                </Link>
              </div>
          ))}
        </div>
      </div>}
      {members21 && <div>
        <h1 className="alumni-title">Class of 2021</h1>
        <div className="alumni-container">
          {members21.map((member) => (
              <div className="alumni">
                <Link
                  href={{
                    pathname: "/alumni/memberPage",
                    query: { id: member.memberid },
                  }}
                  key={member.memberid}
                >
                  {member.headshoturl && (
                    <div>
                      <img src={member.headshoturl} alt={member.name} className="alumni-photo"/>
                      <p className="alumni-text">{member.name}</p>
                    </div>
                  )}
                </Link>
              </div>
          ))}
        </div>
      </div>}
      {members20 && <div>
        <h1 className="alumni-title">Class of 2020</h1>
        <div className="alumni-container">
          {members20.map((member) => (
              <div className="alumni">
                <Link
                  href={{
                    pathname: "/alumni/memberPage",
                    query: { id: member.memberid },
                  }}
                  key={member.memberid}
                >
                  {member.headshoturl && (
                    <div>
                      <img src={member.headshoturl} alt={member.name} className="alumni-photo"/>
                      <p className="alumni-text">{member.name}</p>
                    </div>
                  )}
                </Link>
              </div>
          ))}
        </div>
      </div>}
      {/* {officers20 && <div>
        <h1 className="alumni-title">Officer Archive</h1>
        <div className="alumni-container">
          {officers20.map((officer) => (
              <div className="alumni">
                <Link
                  href={{
                    pathname: "/alumni/memberPage",
                    query: { id: officer.memberid },
                  }}
                  key={officer.memberid}
                >
                  {officer.memberid && (
                    <div>
                      <p className="alumni-text">{officer.name}</p>
                      <p className="alumni-text">{officer.position}</p>
                    </div>
                  )}
                </Link>
              </div>
          ))}
        </div>
      </div>} */}
      </div>
      <Footer />
      {error && 
      <div>
        <p>Something went wrong: {error}</p>
      </div>}
    </div>
  );
};

// const getOfficers = (officers: Officer[]): Map<string, string[]> => {
//   const officerMap = new Map<string, string[]>();
//   for (let i = 0; i < officers.length; i++) {
//     let currentMember = officers[i].memberid;
//     if (officerMap.has(currentMember)) {
//       let newPositions = officerMap.get(currentMember);
//       newPositions.push(officers[i].position);
//       officerMap.set(currentMember, newPositions);
//     } else {
//       officerMap.set(currentMember, [officers[i].position]);
//     }
//   }
//   return officerMap;
// }

export const getServerSideProps = async (context) => {
  try {
    const alumnipageImg = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "alumnipage",
      },
    });

    const members20 = await prisma.members.findMany({
      where: {
        classyear: "2020",
        NOT: {
          alumniid: null,
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const members21 = await prisma.members.findMany({
      where: {
        NOT: {
          alumniid: null,
        },
        classyear: "2021",
      },
      orderBy: {
        name: "asc",
      },
    });

    const members22 = await prisma.members.findMany({
      where: {
        NOT: {
          alumniid: null,
        },
        classyear: "2022",
      },
      orderBy: {
        name: "asc",
      },
    });

    // const currentOfficers = await prisma.officers.findMany({
    //   orderBy: {
    //     year: 'desc',
    //   },
    // });

    // const officers: Officer[] = [];
    // for (let i = 0; i < currentOfficers.length; i++) {
    //   const member = await prisma.members.findUnique({
    //     where: {
    //       memberid: currentOfficers[i].memberid,
    //     },
    //   });
    //   if (member !== null) {
    //     const officer: Officer = { ...member, position: currentOfficers[i].position };
    //     officers.push(officer);
    //   }
    // }

    // const officers21 = prisma.officers.findMany({
    //   where: {
    //     year: 2021,
    //   }
    // });
    // const officers22 = prisma.officers.findMany({
    //   where: {
    //     year: 2022,
    //   }
    // });
  
    return { props: { alumnipageImg, members20, members21, members22, error: null } };
  } catch (error) {
    const err = `${error}`
    return {props: {members: null, error: err}}
  }
}
  


export default MemberPage;
