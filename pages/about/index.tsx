import {
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import prisma from "../../lib/prisma";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ImageComponent from "../../components/Image";
import { Cloudinary } from "../../types/Cloudinary";
import { Misctext } from "../../types/Misctext";
import { Member } from "../../types/Member";
import YouTube from "react-youtube";
import VideoComponent from "../../components/Video";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TestimonialComponent from "../../components/Testimonial";
import Link from "next/link";
import next from "next/types";
import AboutImg from "../../components/AboutImg";
import CarouselComponent from "../../components/Carousel";

interface Officer extends Member {
  position: string;
}

type Props = {
  aboutpageImg: Cloudinary | null;
  aboutText: Misctext | null;
  missionStatement: Misctext | null;
  membersImg: Cloudinary | null;
  projectsImg: Cloudinary | null;
  eventsImg: Cloudinary | null;
  recentworkImg: Cloudinary | null;
  membersText: Misctext | null;
  projectsText: Misctext | null;
  eventsText: Misctext | null;
  officers: Officer[];
  vivianTestimonial: Member | null;
  margaretTestimonial: Member | null;
  zyanTestimonial: Member | null;
  adamTestimonial: Member | null;
  wasifTestimonial: Member | null;
};

const About: NextPage<Props> = ({
  aboutpageImg,
  aboutText,
  missionStatement,
  membersImg,
  projectsImg,
  eventsImg,
  membersText,
  projectsText,
  eventsText,
  recentworkImg,
  vivianTestimonial,
  zyanTestimonial,
  adamTestimonial,
  wasifTestimonial,
  margaretTestimonial,
  officers,
}) => {
  return (
    <div>
      <Navigation />
      <div className="hero-image-container">
        {aboutpageImg && (
          <ImageComponent cloudinaryurl={aboutpageImg.cloudinaryurl} />
        )}
        <div className="image-text">
          <div className="opacity-60 font-normal">
            PROFESSIONAL, POLISHED, AND PASSIONATE
          </div>
          <div className="text-5xl text-white font-semibold">
            DISIAC DANCE COMPANY
          </div>
        </div>
      </div>
      <div className="page">
        <div className="about-description">
          <div className="font-bold text-slate-800 text-4xl uppercase mb-6 tracking-tight">
            {" "}
            About Disiac
          </div>
          <hr></hr>
          <p className="text-center font-light leading-7 text-slate-500">
            {aboutText.misctext}
          </p>
        </div>
        <div className="about-mission-statement">
          <div className="uppercase text-center font-normal opacity-60 mb-7 text-lg">
            {" "}
            Disiac Mission Statement
          </div>
          <div className="px-40">
            <svg
              aria-hidden="true"
              className="w-10 h-10 disiac-blue"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <p className="uppercase text-left font-semibold text-black text-3xl">
              {missionStatement.misctext}
            </p>
          </div>
        </div>
        <div className="flex py-32 text-center">
          <div className="about-section">
          <Link href='../members'>
            <img src={membersImg.cloudinaryurl} />
            <div className="font-semibold py-4 uppercase">Members</div>
            <p className="font-light px-8 leading-8 text-sm">
              {membersText.misctext}
            </p>
          </Link>
          </div>
          <div className="about-section">
            <Link href='../projects'>
            <img src={projectsImg.cloudinaryurl} />
            <div className="font-semibold py-4 uppercase">Projects</div>
            <p className="font-light px-8 leading-8 text-sm">
              {projectsText.misctext}
            </p>
            </Link>
          </div>
          <div className="about-section">
          <Link href='../events'>
            <img src={eventsImg.cloudinaryurl} />
            <div className="font-semibold py-4 uppercase">Events</div>
            <p className="font-light px-8 leading-8 text-sm">
              {eventsText.misctext}
            </p>
            </Link>
          </div>
        </div>
        
      </div>
      <div>
        {recentworkImg && (
            <AboutImg cloudinaryurl={recentworkImg.cloudinaryurl} title="WATCH OUR MOST RECENT WORK" description="[AU]RUM"/>
          )}
      </div>
      <div className="page" >
        <p className="image-text-title" style={{textAlign:"center"}}>Member Testimonials</p>
        <div style={{maxHeight:"600px"}}>
          <Carousel>
            <div>
              <CarouselComponent
                cloudinaryurl={vivianTestimonial.testimonialurl}
                testimonial={vivianTestimonial.testimonialbio}
              />
            </div>
            <div>
              <CarouselComponent
                cloudinaryurl={adamTestimonial.testimonialurl}
                testimonial={adamTestimonial.testimonialbio}
              />
            </div>
            <div>
              <CarouselComponent
                cloudinaryurl={wasifTestimonial.testimonialurl}
                testimonial={wasifTestimonial.testimonialbio}
              />
            </div>
            <div>
              <CarouselComponent
                cloudinaryurl={zyanTestimonial.testimonialurl}
                testimonial={zyanTestimonial.testimonialbio}
              />
            </div>
            <div>
              <CarouselComponent
                cloudinaryurl={margaretTestimonial.testimonialurl}
                testimonial={margaretTestimonial.testimonialbio}
              />
            </div>
          </Carousel>
        </div>
      </div>
      <div className="page">
        <p className="image-text-title" style={{textAlign:"center"}}>Meet The Company</p>
        <p style={{textAlign: "center"}}>diSiac is 100% student-run, led by these 5 core officers. Learn more about them on our Members page.</p>
        <br/>
          <div className="core-container">
            {officers.map((officer) => (
              <Link
                href={{
                  pathname: "/members/memberPage",
                  query: { id: officer.memberid },
                }}
                key={officer.memberid}
              >
                {officer && <div className="member-panel ">
                {officer.headshoturl && (
                  <img src={officer.headshoturl} alt={officer.name} />
                )}
                  <div className="member-icon">+</div>
                  <p className="alumni-text">{officer.name} '{officer.classyear.slice(-2)}
                  <br/>{officer.position}</p>
                
              </div>}
              </Link>
            ))}
          </div>
          <br />
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const aboutpageImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "aboutpage",
    },
  });
  const aboutText = await prisma.misctext.findFirst({
    where: {
      texttitle: "about-paragraph",
    },
  });

  const missionStatement = await prisma.misctext.findFirst({
    where: {
      texttitle: "disiac-mission-statement",
    },
  });

  const membersImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "aboutpage-members",
    },
  });
  const projectsImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "aboutpage-projects",
    },
  });
  const eventsImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "aboutpage-events",
    },
  });
  const recentworkImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "aboutpage-recentwork",
    },
  });

  const membersText = await prisma.misctext.findFirst({
    where: {
      texttitle: "aboutpage-members",
    },
  });
  const projectsText = await prisma.misctext.findFirst({
    where: {
      texttitle: "aboutpage-projects",
    },
  });
  const eventsText = await prisma.misctext.findFirst({
    where: {
      texttitle: "aboutpage-events",
    },
  });

  const vivianTestimonial = await prisma.members.findFirst({
    where: {
      memberid: "vivianl",
    },
  });

  const zyanTestimonial = await prisma.members.findFirst({
    where: {
      memberid: "zwynn",
    },
  });

  const adamTestimonial = await prisma.members.findFirst({
    where: {
      memberid: "ad2005",
    },
  });

  const wasifTestimonial = await prisma.members.findFirst({
    where: {
      memberid: "ws6348",
    },
  });

  const margaretTestimonial = await prisma.members.findFirst({
    where: {
      memberid: "mking",
    },
  });

  const core = await prisma.officers.findMany({
    where: {
      year: 2023,
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

  return {
    props: {
      aboutpageImg,
      aboutText,
      missionStatement,
      membersImg,
      projectsImg,
      eventsImg,
      membersText,
      projectsText,
      eventsText,
      recentworkImg,
      vivianTestimonial,
      margaretTestimonial,
      zyanTestimonial,
      adamTestimonial,
      wasifTestimonial,
      officers,
    },
  };
}

export default About;
