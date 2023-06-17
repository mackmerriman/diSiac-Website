import {
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  NextPage,
} from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Head from "next/head";
import ImageComponent from "../../components/HomeImg";
import AboutComponent from "../../components/HomeAbout";
import { useState } from "react";
import { Cloudinary } from "../../types/Cloudinary";
import { Shows } from "../../types/Shows";
import { Misctext } from "../../types/Misctext";

type Props = { imgs: Cloudinary[] | null; mediaImg: Cloudinary | null };

const Media: NextPage<Props> = ({ imgs, mediaImg }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imgUrl: string) => {
    setSelectedImage(imgUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div>
      <Navigation />
      <div className="hero-image-container">
        <img className="home-image" src={mediaImg.cloudinaryurl} />
        <div className="image-text">
          <div className="image-text-subtitle">BETWEEN THE LINES</div>
          <br />
          <div className="image-text-title">MEDIA</div>
        </div>
      </div>
      <div className="columns-5 gap-0">
        {imgs.map((img) => (
          <img
            key={img.cloudinaryid}
            className="h-auto w-full cursor-pointer"
            src={img.cloudinaryurl}
            onClick={() => openModal(img.cloudinaryurl)}
          />
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img className="max-w-full max-h-screen" src={selectedImage} />
          </div>
          <button
            className="absolute top-0 right-0 p-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      )}
      {/* <Link href="media/upload">Click here to upload media</Link> */}
      <Footer />
    </div>
  );
};

export const getServerSideProps = async () => {
  const imgs = await prisma.cloudinary.findMany({
    where: {
      isimage: true,
    },
    orderBy: {
      resourcetitle: "asc",
    },
  });

  const mediaImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "contactpage",
    },
  });

  return { props: { imgs, mediaImg } };
};

export default Media;
