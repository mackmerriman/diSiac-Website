import {
  NextPage,
} from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { Cloudinary } from "../../types/Cloudinary";
import { Misctext } from "../../types/Misctext";
import ButtonComponent from "../../components/Button";
import ProjectVideo from "../../components/ProjectVideo";

type Props = {
  projectspageVideo: Cloudinary | null;
  projectspageAboutImg: Cloudinary | null;
  projectspageAboutText: Misctext | null;
  error: string;
  oblivionImg: Cloudinary | null;
  parallax1: Cloudinary | null;
  parallax2: Cloudinary | null;
  parallax3: Cloudinary | null;
};

const ProjectsPage: NextPage<Props> = ({
  projectspageVideo,
  projectspageAboutImg,
  projectspageAboutText,
  error,
  parallax1,
  parallax2,
  parallax3,
}) => {
  return (
    <div>
      <Navigation />
      <div className="hero-image-container">
        {projectspageVideo && <ProjectVideo cloudinaryurl={projectspageVideo.cloudinaryurl} key={projectspageVideo.cloudinaryurl}/>}
        <div className="image-text">
          <div className="image-text-subtitle">OUR WORK</div>
          <br />
          <div className="image-text-title">PROJECTS</div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center gap-0">
        <div className="py-32 pl-32">
          <img className="w-11/12 h-auto" src={projectspageAboutImg.cloudinaryurl} />
        </div>
        <div className="py-32 pr-32">
          <p className="text-4xl font-bold">YOU THINK YOU KNOW</p>
          <br />
          <hr />
          <br />
          <p>
            {projectspageAboutText.misctext}
          </p>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('${parallax2.cloudinaryurl}')`,
        }}
        className="h-screen w-screen relative bg-fixed bg-center bg-cover"
      >
        <div className="absolute bottom-0 left-0 p-10">
          <ButtonComponent title="Shows" href="/shows" />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('${parallax3.cloudinaryurl}')`,
        }}
        className="h-screen w-screen relative bg-fixed bg-center bg-cover"
      >
        <div className="absolute bottom-0 left-0 p-10">
          <ButtonComponent title="Workshops" href="/workshops" />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('${parallax1.cloudinaryurl}')`,
        }}
        className="h-screen w-screen relative bg-fixed bg-center bg-cover"
      >
        <div className="absolute bottom-0 left-0 p-10">
          <ButtonComponent title="Conceptual" href="/conceptual" />
        </div>
      </div>
      {error && (
        <div>
          <p>Something went wrong: {error}</p>
          <Link href="/">Click here to return to the homepage</Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export const getServerSideProps = async () => {
  
  try {
    const projectspageVideo = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "projectspage",
      },
    });

    const projectspageAboutImg = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "projectspage-about",
      },
    });

    const projectspageAboutText = await prisma.misctext.findFirst({
      where: {
        texttitle: "projectspage-paragraph",
      },
    });
  
    const parallax1 = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "projectspage-conceptual",
      },
    });
    const parallax2 = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "projectspage-shows",
      },
    });
    const parallax3 = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "projectspage-workshops",
      },
    });  
    
    return {
      props: {
        projectspageAboutImg,
        projectspageAboutText,
        projectspageVideo,
        parallax1,
        parallax2,
        parallax3,
      },
    };
  } catch (error) {
    const err = `${error}`;
    return { props: { error: err } };
  }
};

export default ProjectsPage;
