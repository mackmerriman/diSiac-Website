import {
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  NextPage,
} from "next";

import prisma from "../../lib/prisma";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import ImageComponent from "../../components/Image";
import EmailForm from "../../components/EmailForm";
import ButtonComponent from "../../components/Button";
import Footer from "../../components/Footer";

import { Cloudinary } from "../../types/Cloudinary";
import { Misctext } from "../../types/Misctext";

type Props = {
  contactpageImg: Cloudinary | null;
  projectImg: Cloudinary | null;
  contactpageImgOne: Cloudinary | null;
  contactpageImgTwo: Cloudinary | null;
  contactpageImgThree: Cloudinary | null;
  projectText: Misctext | null;
};

const Contact: NextPage<Props> = ({
  contactpageImg,
  projectImg,
  contactpageImgOne,
  contactpageImgTwo,
  contactpageImgThree,
  projectText,
}) => {
  return (
    <div>
      <Navigation />
      <div className="hero-image-container">
        {contactpageImg && (
          <ImageComponent cloudinaryurl={contactpageImg.cloudinaryurl} />
        )}
        <div className="image-text">
          <div className="image-text-subtitle">
            POLISHED, PROFESSIONAL, AND PASSIONATE
          </div>
          <br />
          <div className="image-text-title">READY TO JOIN THE BLUE FAM?</div>
        </div>
      </div>
      <div className="center" style={{ backgroundColor: "#f7f7f7" }}>
        <div>
          <img className="split-image" src={projectImg.cloudinaryurl} />
        </div>
        <div className="split-text">
          <p className="text-4xl font-bold">Want to see more of our work?</p>
          <br />
          <hr />
          <br />
          <p>{projectText.misctext}</p>
          <br />
          <ButtonComponent title="PROJECTS" href="../projects" />
        </div>
      </div>
      <EmailForm />
      <div className="center-no-vertical">
        <img className="tri-image-box" src={contactpageImgOne.cloudinaryurl} />
        <div className="tri-image-box">
          <h3>LET'S TALK:</h3>
          <p>
            Message us on{" "}
            <a
              href="https://www.instagram.com/disiacdance/?hl=en"
              target="_blank"
              style={{ color: "#6588be" }}
            >
              Instagram
            </a>{" "}
            or{" "}
            <a
              href="https://www.facebook.com/disiacdancecompany/"
              target="_blank"
              style={{ color: "#6588be" }}
            >
              Facebook
            </a>
          </p>
        </div>
        <img className="tri-image-box" src={contactpageImgTwo.cloudinaryurl} />
      </div>
      <div className="center-no-vertical">
        <div className="tri-image-box">
          <h3>DISIAC ADDRESS</h3>
          <p>diSiac Dance Company</p>
          <p>Box 4003</p>
          <p>Frist Campus Center</p>
          <p>Princeton, NJ 08544</p>
        </div>
        <img
          className="tri-image-box"
          src={contactpageImgThree.cloudinaryurl}
        />
        <div className="tri-image-box">
          <h3>Email Us</h3>
          <h5>(Princeton students/alumni)</h5>
          <Link
            href={`mailto:disiacdance@gmail.com`}
            style={{ color: "#6588be" }}
          >
            disiacdance@gmail.com
          </Link>
          <h5>Other</h5>
          <Link
            href={`mailto:disiacdancecompany@gmail.com`}
            style={{ color: "#6588be" }}
          >
            disiacdancecompany@gmail.com
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps = async () => {
  const contactpageImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "aboutpage-recentwork",
    },
  });

  const projectImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "contactpage-projects",
    },
  });

  const projectText = await prisma.misctext.findFirst({
    where: {
      texttitle: "contactpage-projects",
    },
  });

  const contactpageImgOne = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "contactpage-one",
    },
  });
  const contactpageImgTwo = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "contactpage-two",
    },
  });
  const contactpageImgThree = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "contactpage-three",
    },
  });

  return {
    props: {
      contactpageImg,
      projectImg,
      contactpageImgOne,
      contactpageImgTwo,
      contactpageImgThree,
      projectText,
    },
  };
};

export default Contact;
