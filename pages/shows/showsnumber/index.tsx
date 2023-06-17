import {
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  NextPage,
} from "next";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import { useState } from "react";
import { useRouter } from "next/router";
import { Shows } from "../../../types/Shows";
import { Member } from "../../../types/Member";
import Navigation from "../../../components/Navigation";
import { Cloudinary } from "../../../types/Cloudinary";
import YouTube from "react-youtube";
import { Officers } from "../../../types/Officers";
import { Pieces } from "../../../types/Pieces";
import VideoComponent from "../../../components/Video";
import MeetTheCompany from "../../../components/MeetTheCompany";
import ProjectVideo from "../../../components/ProjectVideo";
import Footer from "../../../components/Footer";
interface Officer extends Member {
  position: string;
}

type Props = {
  show: Shows;
  officers: Officer[];
  error: string;
  showVideo: Cloudinary;
  pieces: Pieces[];
};

const ShowPage: NextPage<Props> = ({ show, error, officers, pieces }) => {
  console.log(show.showvideourl)
  return (
    <div>
      <Navigation shouldBeDark={true}/>
      <div className="hero-image-container">
        <br />
        {show && <ProjectVideo cloudinaryurl={show.showvideourl} key={show.showvideourl}/>}

        <div className="image-text">
          <div className="image-text-subtitle">
            {show.season} {show.year}
          </div>
          <br />
          <div className="image-text-title">{show.name}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <div className="m-10">
          <YouTube videoId={show.youtubeid}></YouTube>
        </div>
        <div className="py-32 pr-32">
          <p className="text-4xl font-bold">{show.name}</p>
          <br />
          <hr />
          <br />
          {show.descrip}
        </div>
      </div>
      <div>
        <MeetTheCompany officers={officers}></MeetTheCompany>
      </div>
      <div className="mx-2 my-10">
        <p className="text-3xl mx-8 font-bold uppercase text-slate-600">Pieces</p>
        {pieces && (
          <div className="pieces-container">
            {pieces.map((piece) => (
              <YouTube
                className="piece-cover"
                videoId={piece.youtubelink.slice(
                  piece.youtubelink.lastIndexOf("/") + 1
                )}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* <p className="text-2xl mx-8 font-bold">Show Members:</p>
      {show.memberid &&
        show.memberid
          .substring(1, show.memberid.length - 1)
          .split(",")
          .map((membernetid) => (
            <div className="flex justify-content text-lg mx-8">
              <Link
                className="text-blue underline hover:decoration-blue-400"
                href={{
                  pathname: "../members/memberPage",
                  query: { id: membernetid },
                }}
              >
                {membernetid}
              </Link>
              <br />
            </div>
          ))} */}
      <Footer />
      {error && (
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>Something went wrong: {error}</p>
          <Link href="/shows">Click here to return to see all shows</Link>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const id = parseInt(context.query.id);
    const show = await prisma.shows.findFirst({
      where: {
        showid: id,
      },
    });

    const core = await prisma.officers.findMany({
      where: {
        year: show.year,
        core: true,
      },
    });

    const officers: Officer[] = [];
    for (let i = 0; i < core.length; i++) {
      const member = await prisma.members.findUnique({
        where: {
          memberid: core[i].memberid,
        },
      });
      if (member !== null) {
        const officer: Officer = { ...member, position: core[i].position };
        officers.push(officer);
      }
    }

    const pieces = await prisma.pieces.findMany({
      where: {
        showid: id,
      },
    });

    return { props: { show, officers, core, pieces } };
  } catch (e) {
    console.log(`Error: ${e}`);
    const err = `${e}`;
    return { props: { error: err } };
  }
};

export default ShowPage;
