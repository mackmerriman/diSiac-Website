import {
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  NextPage,
} from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";
import Navigation from "../../components/Navigation";
import Head from "next/head";
import ImageComponent from "../../components/HomeImg";
import AboutComponent from "../../components/HomeAbout";
import { useState } from "react";
import { Cloudinary } from "../../types/Cloudinary";
import { Shows } from "../../types/Shows";
import { Misctext } from "../../types/Misctext";
import { Conceptual } from "../../types/Conceptual";
import ButtonComponent from "../../components/Button";
import { workshops } from "@prisma/client";
import ProjectsPage from "../projects";
import Footer from "../../components/Footer";
import ProjectVideo from "../../components/ProjectVideo";


type Props = {
  serializableConceptuals: Conceptual[];
  error: string;
  conceptualpageVideo: Cloudinary | null;
  conceptualpageAboutImg: Cloudinary | null;
  conceptualpageAboutText: Misctext | null;
  eighteen: Cloudinary | null; 
  twentyOne: Cloudinary | null; 
  twentyTwo: Cloudinary | null;
};

const Conceptual: NextPage<Props> = ({ 
  serializableConceptuals, conceptualpageVideo, conceptualpageAboutImg, conceptualpageAboutText, error,
  eighteen, twentyOne, twentyTwo }) => {
  const uniqueYears = Array.from(
    new Set(serializableConceptuals?.map((conceptual) => conceptual.year))
  ).sort((a, b) => b - a);

  return (
    <div>
      <Navigation />
      <div className="hero-image-container">
        {conceptualpageVideo && <ProjectVideo cloudinaryurl={conceptualpageVideo.cloudinaryurl} key={conceptualpageVideo.cloudinaryurl}/>}
        <div className="image-text">
          <div className="image-text-subtitle">BREAKING BOUNDARIES</div>
          <br />
          <div className="image-text-title">CONCEPTUAL</div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center gap-0">
        <div className="py-32 pl-32">
          <img className="w-11/12 h-auto" src={conceptualpageAboutImg.cloudinaryurl} />
        </div>
        <div className="py-32 pr-32">
          <p className="text-4xl font-bold">CONCEPTUAL WORK</p>
          <br />
          <hr />
          <br />
          <p>
            {conceptualpageAboutText.misctext}
          </p>
        </div>
      </div>
      <div>
      {serializableConceptuals && (
        <div className="page shows-container">
          {uniqueYears.map((year) => (
            <div className="shows-panels">
            <Link
              href={{
                pathname: "/conceptual/conceptualyear",
                query: { id: year },
              }}
            >
                  {year.toString() === "2022" && (
                    <div className="img__wrap">
                    <div className="img__description">
                      <div className="member-icon">+</div>
                      <p className="img__text">{year}</p>
                      <div></div>
                    </div>
                    <img src={twentyTwo.cloudinaryurl}/>
                  </div>
                  )}
                  {year.toString() === "2021" && (
                    <div className="img__wrap">
                    <div className="img__description">
                      <div className="member-icon">+</div>
                      <p className="img__text">{year}</p>
                      <div></div>
                    </div>
                    <img src={twentyOne.cloudinaryurl}/>
                  </div>
                  )}
                  {year.toString() === "2018" && (
                    <div>
                    <div className="img__description">
                      <div className="member-icon">+</div>
                      <p className="img__text">{year}</p>
                      <div></div>
                    </div>
                    <img src={eighteen.cloudinaryurl}/>
                  </div>
                  )}
            </Link>
            </div>
          ))}
        </div>
      )}
      </div>
      <Footer></Footer>
      {error && (
        <div>
          <p>Something went wrong: {error}</p>
          <Link href="/">Click here to return to the homepage</Link>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  
  try {
    const conceptuals = await prisma.conceptvideos.findMany();
    const serializableConceptuals = conceptuals.map(conceptual => ({
      ...conceptual,
      date: JSON.parse(JSON.stringify(conceptual.date))
    }));
    const conceptualpageVideo = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "conceptualpage",
      },
    });
    const conceptualpageAboutImg = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "conceptualpage-about",
      },
    });
    const conceptualpageAboutText = await prisma.misctext.findFirst({
      where: {
        texttitle: "conceptualpage-paragraph",
      },
    });

    const twentyTwo = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "2022",
        isimage: true,
      },
    });
    const twentyOne = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "2021",
        isimage: true,
      },
    });
    const eighteen = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "2018",
        isimage: true,
      },
    });

    return { props: { serializableConceptuals, conceptualpageVideo, conceptualpageAboutImg, conceptualpageAboutText, eighteen, twentyOne, twentyTwo } };
  } catch (error) {
    const err = `${error}`;
    return { props: { error: err } };
  }

  
};

export default Conceptual;
