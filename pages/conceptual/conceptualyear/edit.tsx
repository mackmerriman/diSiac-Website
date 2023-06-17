import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import { Conceptual } from "../../../types/Conceptual";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Navigation from "../../../components/Navigation";
import ButtonComponent from "../../../components/Button";


type Props = {
  serializableConceptuals: Conceptual;
  isModified: boolean;
};

const EditConceptual: NextPage<Props> = ({ serializableConceptuals, isModified }) => {
  const [isEdited, setIsEdited] = useState(isModified);
  const [name, setName] = useState(serializableConceptuals.name);
  const [choreoid, setChoreoId] = useState(serializableConceptuals.choreoid);
  const [season, setSeason] = useState(serializableConceptuals.season);
  const [year, setYear] = useState(serializableConceptuals.year);
  const [memberid, setMemberid] = useState(serializableConceptuals.memberid);
  const [description, setDescription] = useState(serializableConceptuals.description);
  const [youtubelink, setYoutubeLink] = useState(serializableConceptuals.youtubelink);
  const [thumbnailurl, setThumbnailurl] = useState(serializableConceptuals.thumbnailurl);

  const [isDeleted, setIsDeleted] = useState(false);

  const validateInput = () => {
    const szn = season.toLowerCase()
    if (name == "") alert("name cannot be blank")
    else if (choreoid == "") alert("choreographers netid cannot be blank")
    else if (season == "") alert("season cannot be blank")
    else if (szn != "spring" && szn != "winter" && szn != "fall" && szn != "summer") alert("please input a valid season")
    else if (youtubelink == "") alert("please input a youtube link")
    else if (thumbnailurl == "") alert("thumbnailurl cannot be blank")
    else if (memberid == "") alert("the memberids of the dancers in the conceptual cannot be blank")
    else return true
    return false
  }
  const deleteConceptual = async () => {
    try {
      const data = {
        conceptvideoid: serializableConceptuals.conceptvideoid,
      };
      const response = await fetch("/api/conceptual", {
        method: "DELETE",
        body: JSON.stringify(data),
      });
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleChoreoIdChange = (event) => {
    setChoreoId(event.target.value);
  };
  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleMemberidChange = (event) => {
    setMemberid(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const editConceptual = async () => {
    if (validateInput()) {
      try {
        const data = {
          name: name,
          choreoid: choreoid,
          season: season,
          year: year,
          memberid: memberid,
          description: description,
          youtubelink: youtubelink,
          thumbnailid: thumbnailurl,
        };
        const response = await fetch("/api/conceptual", {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        console.log(response.json().toString());
        setIsEdited(true);
      } catch (error) {
        console.error(error);
      }
    } else console.log("invalid input")
  };
  if (!isEdited && !isDeleted) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h2>To edit a conceptual:</h2>
          <br />
          <h3>Name:</h3>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
          />
          <br />
          <h3>ChoreoId:</h3>
          <input
            type="text"
            value={choreoid}
            onChange={handleChoreoIdChange}
            placeholder="ChoreoId"
          />
          <br />
          <h3>Season:</h3>
          <input
            type="text"
            value={season}
            onChange={handleSeasonChange}
            placeholder="Season"
          />
          <br />
          <h3>Year:</h3>
          <input type="number" value={year} onChange={handleYearChange} />
          <br />
          <h3>MemberId:</h3>
          <input
            type="text"
            value={memberid}
            onChange={handleMemberidChange}
            placeholder="MemberId"
          />
          <br />
          <h3>Decription:</h3>
          <textarea
            name="description"
            id="description"
            rows={10}
            cols={100}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
          ></textarea>
          <br />
          <h3>Youtube Link:</h3>
          <input
            name="descrip"
            id="descrip"
            value={youtubelink}
            onChange={handleYoutubeLinkChange}
            placeholder="Youtube Link"
          ></input>
          <br />
          <h3>ThumbnailId:</h3>
          <input
            type="text"
            value={thumbnailurl}
            onChange={(event) => setThumbnailurl(event.target.value)}
            placeholder="ex. 9999"
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <button className="button" onClick={editConceptual}>Submit Edits</button>
          <br />
          <button className="button" onClick={deleteConceptual}>Delete {serializableConceptuals.name}</button>
          <br />
          <Link href="/admin">
            <button className="button">Go Back to Admin Page</button>
          </Link>
        </div>
      </div>
    );
  }
  if (isEdited) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h1>
            Updated information for edited conceptual with id{" "}
            {serializableConceptuals.conceptvideoid}:
          </h1>
          <div key={serializableConceptuals.conceptvideoid}>
            <h2>name: {serializableConceptuals.name}</h2>
            <p>choreo id: {serializableConceptuals.choreoid}</p>
            <p>season: {serializableConceptuals.season}</p>
            <p>year: {serializableConceptuals.year}</p>
            <p>member id: {serializableConceptuals.memberid}</p>
            <p>description: {serializableConceptuals.description}</p>
            <p>Youtube Link: {serializableConceptuals.youtubelink}</p>
            <p>thumbnail id: {serializableConceptuals.thumbnailurl}</p>
            <Link href="/admin">
              <button className="button">Go Back to Admin Page</button>
            </Link>
            <Link href="/conceptual">
            <button className="button">Go Back to Conceptuals Page</button>
          </Link>
          </div>
        </div>
      </div>
    );
  }
  if (isDeleted) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <p>
            Conceptual with id {serializableConceptuals.conceptvideoid} and name{" "}
            {serializableConceptuals.name} was deleted
          </p>
          <Link href="/admin">
            <button className="button">Go Back to Admin Page</button>
          </Link>
          <Link href="/conceptual">
            <button className="button">Go Back to Conceptuals Page</button>
          </Link>
        </div>
      </div>
    );
  }
};

export async function getServerSideProps(context) {
  const id = parseInt(context.query.id) as number;
  const conceptuals = await prisma.conceptvideos.findUnique({
    where: {
      conceptvideoid: id,
    },
  });
  const serializableConceptuals = {
    ...conceptuals,
    date: JSON.parse(JSON.stringify(conceptuals.date)),
  };
  

  return { props: { serializableConceptuals, isModified: false } };
}
export default EditConceptual;
