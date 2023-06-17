import { GetStaticProps, NextPage } from "next";
import Link from 'next/link';
import prisma from "../lib/prisma";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Head from "next/head";
import AboutComponent from "../components/HomeAbout";
import ButtonComponent from "../components/Button";
import HomeImgComponent from "../components/HomeImg";
import ImageComponent from "../components/Image";
import { Misctext } from "../types/Misctext";
import { Cloudinary } from "../types/Cloudinary";

type Props = {
  homepageImg: Cloudinary | null;
  aboutImg: Cloudinary | null;
  aboutText: Misctext | null;
  parallaxProjects: Cloudinary | null;
  parallaxEvents: Cloudinary | null;
  parallaxContact: Cloudinary | null;
};

const IndexPage: NextPage<Props> = ({
  homepageImg,
  aboutImg,
  aboutText,
  parallaxProjects,
  parallaxEvents,
  parallaxContact,
}) => {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/../public/favicons/favicon.ico" />
      </Head>
      <div>
        <Navigation />
        <div className="object-cover w-full h-full relative">
          {homepageImg && (
            <HomeImgComponent cloudinaryurl={homepageImg.cloudinaryurl} />
          )}
        </div>
        {aboutImg && aboutText && (
          <AboutComponent
            cloudinaryurl={aboutImg.cloudinaryurl}
            abouttext={aboutText.misctext}
          />
        )}
        <div
          style={{
            backgroundImage: `url('${parallaxProjects.cloudinaryurl}')`,
          }}
          className="h-screen w-screen relative bg-fixed bg-center bg-cover"
        >
          <div className="absolute bottom-0 left-0 p-10">
            <ButtonComponent title="Projects" subtitle="View our work" description="SHOWS • WORKSHOPS • CONCEPTUAL" href="/projects" />
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url('${parallaxEvents.cloudinaryurl}')`,
          }}
          className="h-screen w-screen relative bg-fixed bg-center bg-cover"
        >
          <div className="absolute bottom-0 left-0 p-10">
            <ButtonComponent title="Events" subtitle="Upcoming Events" href="/events" />
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url('${parallaxContact.cloudinaryurl}')`,
          }}
          className="h-screen w-screen relative bg-fixed bg-center bg-cover"
        >
          <div className="absolute bottom-0 left-0 p-10">
            <ButtonComponent title="Contact" subtitle="Let's chat" href="/contact" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const homepageImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "homepage",
    },
  });
  const aboutImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "homepage about",
    },
  });
  const aboutText = await prisma.misctext.findFirst({
    where: {
      textid: 2001,
    },
  });
  const parallaxProjects = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "homepage-parallax-projects",
    },
  });
  const parallaxEvents = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "homepage-parallax-events",
    },
  });
  const parallaxContact = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "homepage-parallax-contact",
    },
  });
  return {
    props: {
      homepageImg,
      aboutImg,
      aboutText,
      parallaxProjects,
      parallaxEvents,
      parallaxContact,
    },
  };
};

export default IndexPage;
