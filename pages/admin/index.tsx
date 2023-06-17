import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ButtonComponent from "../../components/Button";
import prisma from "../../lib/prisma";
import { NextPage } from "next";
import { Cloudinary } from "../../types/Cloudinary";
import ImageComponent from "../../components/Image";
import Link from "next/link";
import { useNavigate } from "react-router-dom";
import MemberList from "../../components/MemberList";
import { Member } from "../../types/Member";
import ShowsList from "../../components/ShowsList";
import { Shows } from "../../types/Shows";
import Conceptual from "../conceptual";
import { Workshops } from "../../types/Workshops";
import WorkshopsList from "../../components/WorkshopsList";
import ConceptualList from "../../components/ConceptualList";

type Props = {
  adminpageImg: Cloudinary | null;
  members: Member[];
  shows: Shows[];
  workshops: Workshops[];
  conceptvideos: Conceptual[];
}

const Admin: NextPage<Props> = ({ adminpageImg, members, shows, workshops, conceptvideos }) => {
  const { data, status } = useSession();
  const [showFeatures, setShowFeatures] = useState(false);
  const [password, setPassword] = useState("");
  const [showMemberList, setShowMemberList] = useState(false);
  const [showShowList, setShowShowList] = useState(false);
  const [showWorkshopList, setShowWorkshopList] = useState(false);
  const [showConceptualList, setShowConceptualList] = useState(false);

  if (status === "loading") return <h1> loading... please wait</h1>;

  if (status === "authenticated") {
    const handleSignOut = () => {
      signOut();
    };

    const username = data.user.email?.split('@')[0];
    return (
      <div>
        <Navigation />
        <div className="hero-image-container">
        {adminpageImg && <img  style={{width:"100%", height:"100%"}}  src={adminpageImg.cloudinaryurl}/>}
        <div className="image-text">
          <p className="image-text-subtitle">
            <div>
            Welcome {data.user.name}
            </div>
            
            <div><ButtonComponent title={`Click here to edit your bio`} href={`/members/edit?id=${username}&isAdmin=false`}/></div>
            
            {showFeatures ? (
          <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Link href="/members/create">
              <button className="button">Create New Member</button>
            </Link>
            <Link href="/shows/create">
              <button className="button">Create New Show</button>
            </Link>
            <Link href="/workshops/create">
              <button className="button">Create New Workshop</button>
            </Link>
            <Link href="/conceptual/create">
              <button className="button">Create New Conceptual</button>
            </Link>
            
            <div>
              <button className="button" onClick={() => setShowMemberList(!showMemberList)}>
                {showMemberList ? "Hide Member List" : "Edit Members"}
              </button>
              {showMemberList && <MemberList members={members} />}

              <button className="button" onClick={() => setShowShowList(!showShowList)}>
                {showShowList ? "Hide Shows List" : "Edit Shows"}
              </button>
              {showShowList && <ShowsList shows={shows} />}

              <button className="button" onClick={() => setShowWorkshopList(!showWorkshopList)}>
                {showWorkshopList ? "Hide Workshops List" : "Edit Workshops"}
              </button>
              {showWorkshopList && <WorkshopsList workshops={workshops} />}

              <button className="button" onClick={() => setShowConceptualList(!showConceptualList)}>
                {showConceptualList ? "Hide Conceptual List" : "Edit Conceptuals"}
              </button>
              {showConceptualList && <ConceptualList conceptvideos={conceptvideos} />}
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === "APHRO") {
              setShowFeatures(true);
            } else {
              alert("Incorrect password");
            }
          }}>
            <label className="pr-5" htmlFor="password">Enter password:</label>
            <input className="pr-10"
              type="password"
              id="password"
              value={password}
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="pl-10"type="submit">Submit</button>
          </form>
          
        )}
          <br />
          <br />
          <button className="button" onClick={handleSignOut}>sign out</button>
          </p>
        </div>
        </div>
        <Footer />
      </div>
    );
  }
  

  return (
    <div>
      <Navigation />
      <div className="hero-image-container">
      {adminpageImg && <ImageComponent cloudinaryurl={adminpageImg.cloudinaryurl} />}
        <div className="image-text">
          <p className="image-text-subtitle">
            Sign In!
          </p>
          <button onClick={() => signIn("google")}>sign in with Google</button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const adminpageImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "adminpage"
    }
  });

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
    },
  });

  const shows = await prisma.shows.findMany();
  const workshops = await prisma.workshops.findMany();
  const conceptual = await prisma.conceptvideos.findMany();
  const conceptvideos = conceptual.map(conceptual => ({
    ...conceptual,
    date: JSON.parse(JSON.stringify(conceptual.date))
  }));

  return { props: { adminpageImg, members, shows, workshops, conceptvideos } };
};

export default Admin;
