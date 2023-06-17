import {
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  NextPage,
} from "next";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import Navigation from "../../../components/Navigation";
import Head from "next/head";
import ImageComponent from "../../../components/HomeImg";
import AboutComponent from "../../../components/HomeAbout";
import { useState } from "react";
import { Cloudinary } from "../../../types/Cloudinary";
import { Shows } from "../../../types/Shows";
import { Misctext } from "../../../types/Misctext";
import { Workshops } from "../../../types/Workshops";
import ButtonComponent from "../../../components/Button";
import { workshops } from "@prisma/client";
import YouTube from "react-youtube";
import Footer from "../../../components/Footer";
import ProjectVideo from "../../../components/ProjectVideo";

type Props = {
  workshops: Workshops[];
  error: string;
  video: Cloudinary | null;
};

interface WorkshopsWithImage extends Workshops {
  cloudinaryurl: string;
}

const Workshops: NextPage<Props> = ({ workshops, video, error }) => {
  return (
    <div>
      <Navigation />
      <div className="hero-image-container">
       {video && <ProjectVideo cloudinaryurl={video.cloudinaryurl} key={video.cloudinaryurl}/>} 
        <div className="image-text">
          <div className="image-text-subtitle">{workshops[0].season}</div>
          <br />
          <div className="image-text-title">WORKSHOPS</div>
        </div>
      </div>
      {workshops && (
        <div className="page">
          <p className="text-4xl font-bold">
            diSiac's {workshops[0].season} Workshops
          </p>
          {workshops && (
            <div className="grid grid-cols-2 items-center">
              {workshops.map((workshop) => (
                <YouTube
                  className="m-8"
                  videoId={workshop.youtubelink.slice(
                    workshop.youtubelink.lastIndexOf("/") + 1
                  )}
                />
              ))}
            </div>
          )}
          
        </div>
      )}
      <div className="flex justify-center">
        <ButtonComponent title="Click here to return to all workshops" href="/workshops" />
      </div>
      
      <Footer />
      {error && (
        <div>
          <p>Something went wrong: {error}</p>
          <Link href="/">Click here to return to the homepage</Link>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  
  try {
    const id = context.query.id;
    const workshops = await prisma.workshops.findMany({
      where: {
        season: id,
      },
    });

    const img = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "contactpage-projects",
      },
    });

    const video = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: id,
        isimage: false,
      },
    });


    

    return { props: { workshops, img, video } };
  } catch (error) {
    const err = `${error}`;
    return { props: { error: err } };
  }
};

export default Workshops;
