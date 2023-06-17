import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import ButtonComponent from "../../components/Button";

// model conceptvideos {
//   conceptvideoid     Int @id
//   name               String @db.VarChar(80)
//   choreoid           String?
//   season             String @db.VarChar(80)
//   year               Int
//   memberid           String?
//   description        String
//   youtubelink        String?
//   thumbnailid        Int?
// }

const CreateConceptual: NextPage = () => {
  const [isCreated, setIscreated] = useState(false);
  const [choreoid, setChoreoId] = useState("");
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [youtubelink, setYoutubeLink] = useState("");
  const [year, setYear] = useState("");
  const [memberid, setMemberid] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailurl, setThumbnailurl] = useState("");

  const validateInput = () => {
    const szn = season.toLowerCase()
    if (name == "") alert("name cannot be blank")
    else if (choreoid == "") alert("choreographers netid cannot be blank")
    else if (season == "") alert("season cannot be blank")
    else if (szn != "spring" && szn != "winter" && szn != "fall" && szn != "summer") alert("please input a valid season")
    else if (youtubelink == "") alert("please input a youtube link")
    else if (year == "") alert("please input a year")
    else if (thumbnailurl == "") alert("thumbnailurl cannot be blank")
    else if (Number.isNaN(parseInt(year))) alert("please enter a valid year")
    else if (memberid == "") alert("the memberids of the dancers in the conceptual cannot be blank")
    else return true
    return false
  }

  const handleChoreoIdChange = (event) => {
    setChoreoId(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
 
  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };
  const handleMemberidChange = (event) => {
    setMemberid(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  const createConceptual = async () => {
    if (validateInput()) {
      try {
        const data = {
          choreoid: choreoid,
          name: name,
          season: season,
          year: parseInt(year),
          youtubelink: youtubelink,
          memberid: memberid,
          description: description,
          thumbnailurl: thumbnailurl,
        };
        const response = await fetch("/api/conceptual", {
          method: "POST",
          body: JSON.stringify(data),
        });
        console.log(response.json().toString());
        setIscreated(true);
      } catch (error) {
        console.error(error);
      }
    } else console.log("invalid input")
    
  };
  if (!isCreated) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h2>To add a conceptual:</h2>
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
          <h3>MemberId:</h3>
          <input
            type="text"
            value={memberid}
            onChange={handleMemberidChange}
            placeholder="MemberId"
          />
          <br />
          <h3>Thumbnail url:</h3>
          <input
            type="text"
            value={thumbnailurl}
            onChange={(event) => setThumbnailurl(event.target.value)}
            placeholder="ex. 9999"
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
          <h3>Youtube Link:</h3>
          <input
            name="descrip"
            id="descrip"
            value={youtubelink}
            onChange={handleYoutubeLinkChange}
            placeholder="Youtube Link"
          ></input>
          <br />
          <button className="button" onClick={createConceptual}>Create Conceptual</button>
          <br />
          <Link href="/admin">
            <button className="button">Go back to admin page</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h1>Information for created conceptual:</h1>
          <div>
            <h2>Name: {name}</h2>
            <p>Season: {season}</p>
            <p>Year: {year}</p>
            <p>Youtubelink: {youtubelink}</p>
            <Link href="/conceptual">
              <button className="button">Back to All Conceptuals</button>
            </Link>
            <Link href="/admin">
              <button className="button">Click to Return to Admin</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
export default CreateConceptual;
