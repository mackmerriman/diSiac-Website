import { useState, useEffect } from "react";
import {
    NextPage,
  } from "next";
import Link from "next/link";

import { Conceptual } from "../types/Conceptual";

type Props = {
    conceptvideos: Conceptual[];
};

const ShowsList: NextPage<Props> = ({ conceptvideos }) => {
  return (
    <ul>
      {conceptvideos.map((conceptual) => (
        <li key={conceptual.conceptvideoid}>
          <Link href={`conceptual/conceptualyear/edit?id=${conceptual.conceptvideoid}`}>
            <p>{conceptual.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
  


export default ShowsList;
