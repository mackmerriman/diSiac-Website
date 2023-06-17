import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import prisma from "../../../../lib/prisma";
import { Workshops } from "../../../../types/Workshops";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Navigation from "../../../../components/Navigation";
import ButtonComponent from "../../../../components/Button";

type Props = {
  workshop: Workshops;
  isModified: boolean;
};

const EditWorkshop: NextPage<Props> = ({ workshop, isModified }) => {
  const [isEdited, setIsEdited] = useState(isModified);
  const [title, setTitle] = useState(workshop.title);
  const [choreoid, setChoreoId] = useState(workshop.choreoid);
  const [season, setSeason] = useState(workshop.season);
  const [youtubelink, setYoutubeLink] = useState(workshop.youtubelink);
  const [isDeleted, setIsDeleted] = useState(false)

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChoreoIdChange = (event) => {
    setChoreoId(event.target.value);
  };
  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const deleteWorkshop = async() => {
    try {
      const data = {workshopid: workshop.workshopid}
      const res = await fetch("/api/workshops", {
        method: "DELETE",
        body: JSON.stringify(data)
      })
      if (res.status == 200) {
        setIsDeleted(true)
        setIsEdited(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editWorkshop = async () => {
    if (validateInput()) {
      try {
        const yearSzn = season.split(" ")
        var yearSznId = parseInt(yearSzn[1])*10
        if (yearSzn[0] == 'Winter') yearSznId+=1
        if (yearSzn[0] == 'Spring') yearSznId+=2
        if (yearSzn[0] == 'Summer') yearSznId+=3
        if (yearSzn[0] == 'Fall') yearSznId+=4
        const data = {
          workshopid: workshop.workshopid,
          choreoid: choreoid,
          title: title,
          season: season,
          youtubelink: youtubelink,
          yearseasonid: yearSznId,
        };
        const response = await fetch("/api/workshops", {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        console.log(response.json().toString());
        if (response.status == 200) setIsEdited(true);
      } catch (error) {
        console.error(error);
      }
    } else console.log("invalid input")
  };
  if (!isEdited) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h2>
            To add edit {workshop.title}:
          </h2>
          <h3>Title:</h3>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          />
          <br />
          <h3>Choreographer's netID:</h3>
          <input
            type="text"
            value={choreoid}
            onChange={handleChoreoIdChange}
            placeholder="ab1234"
          />
          <br />
          <h3>Season:</h3>
          <input
            type="text"
            value={season}
            onChange={handleSeasonChange}
            placeholder="Spring 2023"
          />
          <br />
          <h3>Youtube Link:</h3>
          <input
            type="text"
            value={youtubelink}
            onChange={handleYoutubeLinkChange}
            placeholder="youtube.com/example"
          />
          <br />
          <button className="button" onClick={editWorkshop}>
            Submit Edits for {workshop.title}
          </button>
          <Link href="/admin">
            <button className="button">Go Back to Admin Page</button>
          </Link>
          <br />
          <ButtonComponent title={`delete ${workshop.title}`} onClick={deleteWorkshop}/>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        {!isDeleted && 
          <div className="page">
          <h1>
            Updated information for edited workshop with workshopid{" "}
            {workshop.workshopid}:
          </h1>
          <div key={workshop.workshopid}>
            <h2>title: {title}</h2>
            <p>choreo id: {choreoid}</p>
            <p>season: {season}</p>
            <p>Youtube Link: {youtubelink}</p>
            
          </div>
          <Link href="/workshops">
            <button className="button" >
              Back to All Workshops
            </button>
          </Link>
          
          <Link href="/admin">
            <button className="button">Go Back to Admin Page</button>
          </Link>
        </div>
        }
        {isDeleted &&
          <div>
          <p>{workshop.title} has been deleted</p>
          <ButtonComponent title="Click to see all workshops" href="/workshops"/>
          <ButtonComponent title="Click to return to admin" href="/admin"/>
          </div>
        }
      </div>
    );
  }
};

export async function getServerSideProps(context) {
  const id = parseInt(context.query.id) as number;
  const workshop = await prisma.workshops.findUnique({
    where: {
      workshopid: id,
    },
  });
  return { props: { workshop: workshop, isModified: false } };
}
export default EditWorkshop;
