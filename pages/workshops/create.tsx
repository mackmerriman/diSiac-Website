import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import ButtonComponent from "../../components/Button";

const CreateWorkshop: NextPage = () => {
  const [isCreated, setIscreated] = useState(false);
  const [choreoid, setChoreoId] = useState("");
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState("");
  const [youtubelink, setYoutubeLink] = useState("");

  const validateInput = () => {
    var rlSeason: string
    var rlYear: number
    if (season != "") {
      rlSeason = season.split(" ")[0].toLowerCase()
      try {
        rlYear = parseInt(season.split(" ")[1])
        if (Number.isNaN(rlYear)) {
          alert ("You must input a valid year")
          return false;
        }
      } catch (e) {
        alert("You must input a valid year")
      }
    } else {
      alert("season cannot be empty")
    }
    if (choreoid == "") {
      alert("choreographer's netID cannot be blank")
    } else if (title == "") {
      alert("title cannot be blank") 
    } else if (rlSeason != "spring" && rlSeason != "winter" && rlSeason != "summer" && rlSeason != "fall") {
      alert("You must input a valid season")
    } else if (youtubelink == "") {
      alert("youtube link must not be empty")
    } else {
      return true
    }
    return false
  }
  const handleChoreoIdChange = (event) => {
    setChoreoId(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const createWorkshop = async () => {
    if (validateInput()) {
      try {
        const yearSzn = season.split(" ")
        var yearSznId = parseInt(yearSzn[1])*10
        if (yearSzn[0] == 'Winter') yearSznId+=1
        if (yearSzn[0] == 'Spring') yearSznId+=2
        if (yearSzn[0] == 'Summer') yearSznId+=3
        if (yearSzn[0] == 'Fall') yearSznId+=4
        const data = {
          choreoid: choreoid,
          title: title,
          season: season,
          yearseasonid: yearSznId,
          youtubelink: youtubelink,
        };
        const response = await fetch("/api/workshops", {
          method: "POST",
          body: JSON.stringify(data),
        });
        console.log(response.json().toString());
        if (response.status == 200) setIscreated(true);
      } catch (error) {
        console.error(error);
      }
    } console.log("input invalid")
  };
  if (!isCreated) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h2>To add a workshop:</h2>
          <br />
          <h3>Choreographer's netId:</h3>
          <input
            type="text"
            value={choreoid}
            onChange={handleChoreoIdChange}
            placeholder="ChoreoId"
          />
          <h3>Title:</h3>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Name"
          />
          <br />
          <h3>Season and year:</h3>
          <input
            type="text"
            value={season}
            onChange={handleSeasonChange}
            placeholder="Spring 2023"
          />
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
          <button className="button" onClick={createWorkshop}>Create Workshop</button>
          <br />
          <Link href="/admin">
            <button className="button">Go Back to Admin Page</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h1>Information for created workshop:</h1>
          <div>
            <h2>title: {title}</h2>
            <p>season: {season}</p>
            <p>youtubelink: {youtubelink}</p>
            <Link href="/admin">
              <button className="button">Go Back to Admin Page</button>
            </Link>
            <Link href="../workshops">
              <button className="button">Back to All Workshops</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
export default CreateWorkshop;
