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
import { Workshops } from "../../types/Workshops";
import ButtonComponent from "../../components/Button";
import { workshops } from "@prisma/client";
import ProjectVideo from "../../components/ProjectVideo";
import Footer from "../../components/Footer";

type Props = {
  workshops: Workshops[];
  error: string;
  img: Cloudinary | null;
  workshopspageVideo: Cloudinary | null;
  workshopspageAboutText: Misctext | null;
  winter2020: Cloudinary | null;
  winter2019: Cloudinary | null;
  winter2018: Cloudinary | null;
  spring2017: Cloudinary | null;
  winter2017: Cloudinary | null;
};

const Workshops: NextPage<Props> = ({ 
  workshops, img, error, workshopspageVideo, workshopspageAboutText, 
  winter2020, winter2019, winter2018, spring2017, winter2017  }) => {
  const workshopsByCategory = workshops.reduce((categories, workshop) => {
    const category = categories.find(cat => cat.id === workshop.season);
    if (category) {
      category.workshops.push(workshop);
    } else {
      categories.push({ id: workshop.season, workshops: [workshop]});
    }
    return categories;
  }, []);
  return (
    <div className="h-screen">
      <Navigation />
      <div className="hero-image-container">
        {workshopspageVideo && <ProjectVideo cloudinaryurl={workshopspageVideo.cloudinaryurl} key={workshopspageVideo.cloudinaryurl}/>}
        <div className="image-text">
          <div className="image-text-subtitle">YOU THINK YOU KNOW</div>
          <br />
          <div className="image-text-title">WORKSHOPS</div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center gap-0">
        <div className="py-32 pl-32">
          <img className="w-11/12 h-auto" src={img.cloudinaryurl} />
        </div>
        <div className="py-32 pr-32">
          <p className="text-4xl font-bold">WORKSHOPS</p>
          <br />
          <hr />
          <br />
          {workshopspageAboutText && <p>{workshopspageAboutText.misctext}</p>}
        </div>
      </div>
      <div className="page shows-container">
          {workshops && workshopsByCategory.map((category) => (
              <div className="shows-panels">
                <Link
                  href={{
                    pathname: "/workshops/workshopyear",
                    query: { id: category.id },
                  }}
                >
                {category.id === "Winter 2020" && (
                  <div className="img__wrap">
                  <div className="img__description">
                    <div className="member-icon">+</div>
                    <p className="img__text">{category.id}</p>
                    <div></div>
                  </div>
                  <img src={winter2020.cloudinaryurl} />
                </div>
                )}
                {category.id === "Winter 2019" && (
                  <div className="img__wrap">
                  <div className="img__description">
                    <div className="member-icon">+</div>
                    <p className="img__text">{category.id}</p>
                    <div></div>
                  </div>
                  <img src={winter2019.cloudinaryurl} />
                </div>
                )}
                {category.id === "Winter 2018" && (
                  <div className="img__wrap">
                  <div className="img__description">
                    <div className="member-icon">+</div>
                    <p className="img__text">{category.id}</p>
                    <div></div>
                  </div>
                  <img src={winter2018.cloudinaryurl} />
                </div>
                )}
                {category.id === "Spring 2017" && (
                  <div className="img__wrap">
                  <div className="img__description">
                    <div className="member-icon">+</div>
                    <p className="img__text">{category.id}</p>
                    <div></div>
                  </div>
                  <img src={spring2017.cloudinaryurl} />
                </div>
                )}
                {category.id === "Winter 2017" && (
                  <div>
                  <div className="img__description">
                    <div className="member-icon">+</div>
                    <p className="img__text">{category.id}</p>
                    <div></div>
                  </div>
                  <img src={winter2017.cloudinaryurl} />
                </div>
                )}
                </Link>
              </div>
            ))}
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

export const getServerSideProps = async () => {

  try {
    const workshops = await prisma.workshops.findMany({
      orderBy: {
        yearseasonid: 'desc',
      },
    });

    const img = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "workshopspage-about",
      },
    });
    const workshopspageVideo = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "workshopspage",
      }
    })
  
    const workshopspageAboutText = await prisma.misctext.findFirst({
      where: {
        texttitle: "workshopspage-paragraph"
      }
    })

    const winter2020 = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "Winter 2020",
        isimage: true,
      },
    });

    const winter2019 = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "Winter 2019",
        isimage: true,
      },
    });

    const winter2018 = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "Winter 2018",
        isimage: true,
      },
    });

    const winter2017 = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "Winter 2017",
        isimage: true,
      },
    });

    const spring2017 = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "Spring 2017",
        isimage: true,
      },
    });

    return { props: { 
      workshops, img, workshopspageVideo, workshopspageAboutText,
      winter2020, winter2019, winter2018, spring2017, winter2017 } };
  } catch (error) {
    const err = `${error}`;
    return { props: { error: err } };
  }

};

export default Workshops;
