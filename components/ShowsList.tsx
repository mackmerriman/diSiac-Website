import { useState, useEffect } from "react";
import {
    NextPage,
  } from "next";
import Link from "next/link";
import prisma from "../lib/prisma";
import { Shows } from "../types/Shows";

type Props = {
    shows: Shows[];
};

const ShowsList: NextPage<Props> = ({ shows }) => {
  return (
    <ul>
      {shows.map((show) => (
        <li key={show.showid}>
          <Link href={`shows/showsnumber/edit?id=${show.showid}`}>
            <p>{show.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
  


export default ShowsList;
