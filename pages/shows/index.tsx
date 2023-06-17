import {
  NextPage,
} from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";
import Navigation from "../../components/Navigation";
import { Cloudinary } from "../../types/Cloudinary";
import { Misctext } from "../../types/Misctext";
import { Shows } from "../../types/Shows";
import ProjectVideo from "../../components/ProjectVideo";
import Footer from "../../components/Footer";

type Props = {
  
  showspageVideo: Cloudinary | null;
  showspageAboutText: Misctext | null;
  error: string;
  showspageAboutImg: Cloudinary | null;
  shows: Shows[];
};

const Shows: NextPage<Props> = ({ showspageVideo, showspageAboutText, showspageAboutImg, error, shows }) => {
  return (
    <div>
      <Navigation />
      <div className="hero-image-container">
        {showspageVideo && <ProjectVideo cloudinaryurl={showspageVideo.cloudinaryurl} key={showspageVideo.cloudinaryurl} />}
        <div className="image-text">
          <div className="image-text-subtitle">YOU THINK YOU KNOW</div>
          <br />
          <div className="image-text-title">SHOWS</div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center gap-0">
        <div className="py-32 pl-32">
        {showspageAboutImg && <img className="w-11/12 h-auto" src={showspageAboutImg.cloudinaryurl} />}
        </div>
        <div className="py-32 pr-32">
          <p className="text-4xl font-bold">SHOWS</p>
          <br />
          <hr />
          <br />
          {showspageAboutText && <p>{showspageAboutText.misctext}</p>}
        </div>
      </div>
      {shows && (
        <div className="shows-container">
          {shows.map((show) => (
            <div className="shows-panel">
              <Link
                href={{
                  pathname: "/shows/showsnumber",
                  query: { id: show.showid },
                }}
              >
                <div className="img__wrap">
                  <div className="img__description">
                    <div className="member-icon">+</div>
                    <p className="img__text">{show.name}</p>
                    <div></div>
                    <p className="img__subtext">{show.season} {show.year}</p>
                  </div>
                  <img src={show.showimageurl}/>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
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

    const showspageAboutImg = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "showspage-about",
      },
    });

    const showspageVideo = await prisma.cloudinary.findFirst({
      where: {
        resourcetitle: "showspage",
      },
    });

    const showspageAboutText = await prisma.misctext.findFirst({
      where: {
        texttitle: "showspage-paragraph",
      },
    });

    const shows = await prisma.shows.findMany({
      orderBy: {
        showid: 'desc',
      }
    });

    return { props: { showspageVideo, showspageAboutText, showspageAboutImg, shows } };
  } catch (error) {
    const err = `${error}`;
    return { props: { error: err } };
  }
};

export default Shows;
