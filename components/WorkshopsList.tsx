import { useState, useEffect } from "react";
import {
    NextPage,
  } from "next";
import Link from "next/link";

import { Workshops } from "../types/Workshops";

type Props = {
    workshops: Workshops[];
};

const ShowsList: NextPage<Props> = ({ workshops }) => {
  return (
    <ul className="listgrid">
      {workshops.map((workshop) => (
        <li key={workshop.workshopid}>
          <Link href={`workshops/workshopyear/workshopnumber/edit?id=${workshop.workshopid}`}>
            <p>{workshop.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
  


export default ShowsList;
