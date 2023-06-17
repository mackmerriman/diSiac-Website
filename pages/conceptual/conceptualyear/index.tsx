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
import YouTube from "react-youtube";
import ImageComponent from "../../../components/HomeImg";
import AboutComponent from "../../../components/HomeAbout";
import { useState } from "react";
import { Cloudinary } from "../../../types/Cloudinary";
import { Shows } from "../../../types/Shows";
import { Misctext } from "../../../types/Misctext";
import { Conceptual } from "../../../types/Conceptual";
import ButtonComponent from "../../../components/Button";
import { workshops } from "@prisma/client";
import Footer from "../../../components/Footer";
import ProjectVideo from "../../../components/ProjectVideo";

type Props = {
  serializableConceptuals: Conceptual[];
  error: string;
  video: Cloudinary | null;
};

const ConceptualYearPage: NextPage<Props> = ({ serializableConceptuals, video, error }) => {
  return (
    <div>
      <Navigation shouldBeDark={true}/>
      <div className="hero-image-container">
      {video && <ProjectVideo cloudinaryurl={video.cloudinaryurl} key={video.cloudinaryurl}/>}
        <div className="image-text">
          <div className="image-text-subtitle">CONCEPTUAL</div>
          <br />
          <div className="image-text-title">
            {serializableConceptuals[0].year}
          </div>
        </div>
      </div>
      {serializableConceptuals && (
        <div>
          {serializableConceptuals.map((conceptual) => (
            <div className="relative">
              {/* {conceptual.youtubelink && <YouTube videoId={conceptual.youtubelink.slice(conceptual.youtubelink.lastIndexOf("/") + 1)} />} */}
              <div className="grid grid-cols-2 items-center gap-0">
                <div className="py-32 pl-32">
                  <img className="w-11/12 h-auto" src={conceptual.thumbnailurl} />
                </div>
                <div className="py-32 pr-32">
                  <a href={conceptual.youtubelink} target="_blank"><p className="text-4xl font-bold">{conceptual.name}</p></a>
                  <br />
                  <hr />
                  <br />
                  <p>{conceptual.description}</p>
                </div>
              </div>
            </div>
          ))}
          <Footer/>
        </div>
      )}
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
    const id = parseInt(context.query.id);
    const conceptuals = await prisma.conceptvideos.findMany({
      where: {
        year: id,
      },
      orderBy: {
        conceptvideoid: 'asc',
      }
    });
    
    const serializableConceptuals = conceptuals.map(conceptual => ({
      ...conceptual,
      date: JSON.parse(JSON.stringify(conceptual.date))
    }));

    const video = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: id.toString(),
        isimage: false,
      },
    });    

    return { props: { serializableConceptuals, video } };
  } catch (error) {
    const err = `${error}`;
    return { props: { error: err } };
  }
};

export default ConceptualYearPage;
