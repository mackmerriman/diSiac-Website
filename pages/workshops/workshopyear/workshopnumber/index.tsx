import {
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  NextPage,
} from "next";
import Link from "next/link";
import prisma from "../../../../lib/prisma";
import { useState } from "react";
import { useRouter } from "next/router";
import { Shows } from "../../../../types/Shows";
import { Workshops } from "../../../../types/Workshops";
import { redirect } from "next/navigation";
import Navigation from "../../../../components/Navigation";
import ButtonComponent from "../../../../components/Button";

type Props = {
  workshop: Workshops | null;
  error: string;
};

const WorkshopNumberPage: NextPage<Props> = ({ workshop, error }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteWorkshop = async () => {
    try {
      const data = {
        workshopid: workshop.workshopid,
      };
      const response = await fetch("/api/workshops", {
        method: "DELETE",
        body: JSON.stringify(data),
      });
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (!isDeleted) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        {workshop && (
          <div className="page" key={workshop.workshopid}>
            <h2>Name: {workshop.title}</h2>
            <p>Season: {workshop.season}</p>
            <a href={workshop.youtubelink}>
              Youtube Link: {workshop.youtubelink}
            </a>
            <br />
            {/* <button>
              <Link
                href={{
                  pathname: "/workshops/workshopyear/workshopnumber/edit",
                  query: { id: workshop.workshopid },
                }}
                passHref
              >
                Click here to edit {workshop.title}'s information
              </Link>
            </button> */}
            <br />
            {/* <ButtonComponent
              title={`Delete ${workshop.title}`}
              onClick={deleteWorkshop}
            />
            <br /> */}
            <ButtonComponent title="Back to All Workshops" href="/workshops" />
          </div>
        )}
        {error && (
          <div>
            <p>Something went wrong: {error}</p>
            <Link href="/">Click here to return to the main page</Link>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Navigation />
        <div className="page">
          <p>
            Workshop with workshopid {workshop.workshopid} and name{" "}
            {workshop.title} was deleted
          </p>
          <ButtonComponent title="Back to All Workshops" href="/workshops" />
        </div>
      </div>
    );
  }
};

export const getServerSideProps = async (context) => {
  try {
    const id = parseInt(context.query.id);
    const workshop = await prisma.workshops.findUnique({
      where: {
        workshopid: id,
      },
    });

    return { props: { workshop } };
  } catch (e) {
    console.log(`Error: ${e}`);
    return { props: { error: `${e}` } };
  }
};

export default WorkshopNumberPage;
