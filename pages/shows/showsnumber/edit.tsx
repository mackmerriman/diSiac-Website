import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import { Shows } from "../../../types/Shows";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Navigation from "../../../components/Navigation";
import ButtonComponent from "../../../components/Button";
import cloudinaryUpload from "../../../utils/cloudinary";
import VideoComponent from "../../../components/Video";
import ProjectVideo from "../../../components/ProjectVideo";

// model shows {
//     showid             Int   @id
//     name               String   @db.VarChar(80)
//     season             String   @db.VarChar(80)
//     year               Int
//     descrip            String
//     memberid           String[]
//     showimageurl       String?
//   }
type Props = {
  show: Shows;
  isModified: boolean;
  error: string;
};
const EditShow: NextPage<Props> = ({ show, isModified, error }) => {
  console.log(show.memberid)
  // console.log(show.memberid.substring(1, show.memberid.length-1))
  // show.memberid
  //   .substring(1, show.memberid.substring.length - 1)
  //   .split(",")
    // .map((membernetid) => console.log(membernetid))
  const [isEdited, setIsEdited] = useState(isModified);
  const [name, setName] = useState(show.name);
  const [memberid, setMemberId] = useState(show.memberid);
  const [season, setSeason] = useState(show.season);
  const [descrip, setDescrip] = useState(show.descrip);
  const [year, setYear] = useState(show.year);
  const [showimage, setShowimage] = useState<File>()
  const [showimageurl, setShowimageurl] = useState(show.showimageurl)
  const [showvideo, setShowvideo] = useState<File>()
  const [showvideourl, setShowvideourl] = useState(show.showvideourl)
  const [showShowimageupload, setShowShowimageupload] = useState(false)
  const [showShowvideoupload, setShowShowvideoupload] = useState(false)
  const [youtubeid, setYoutubeid] = useState(show.youtubeid)
  const [isDeleted, setIsDeleted] = useState(false)
  const validateInput = () => {
    if (name.toLowerCase() == "") {
      alert("Show name cannot be blank")
    } else if (season.toLowerCase() != "spring" && season.toLowerCase() != "fall") {
      alert("Season must be either spring or fall")
    } else if (descrip == "") {
      alert("description cannot be empty")
    } else if (memberid == "") {
      alert("There must be at least one member in the show")
    } else if (memberid.charAt(0) != "{" || memberid.charAt(memberid.length-1) != "}"){
      alert("the text field containing the members must begin and end with { and } respectively")
    } else if (youtubeid == "") {
      alert("youtube ID cannot be blank")
    } else {
      return true
    }
    return false
    }
  const handleShowVideoChange = (event) => {
    setShowvideo(event.target.files[0])
  }
  const handleShowImageChange = (event) => {
    setShowimage(event.target.files[0])
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleMemberIdChange = (event) => {
    setMemberId(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleDescripChange = (event) => {
    setDescrip(event.target.value);
  };
  const revealShowImageUpload = () => {
    setShowShowimageupload(true)
  } 
  const revealShowVideoUpload = () => {
    setShowShowvideoupload(true)
  }
  const handleYoutubeidChange = (event) => {
    setYoutubeid(event.target.value)
  }

  const deleteShow = async () => {
    try {
      const data = {
        showid: show.showid,
      };
      const response = await fetch("/api/shows", {
        method: "DELETE",
        body: JSON.stringify(data),
      });
      setIsDeleted(true);
      setIsEdited(true)
    } catch (error) {
      console.log(error);
    }
  };

  const editShow = async () => {
    if (validateInput()) {
      try {
        var cldShowImageUrl: string
        if (showShowimageupload){
          cldShowImageUrl = await cloudinaryUpload(showimage, "showimage", "image") as string
          const cldShowImageData = {
            cloudinaryurl: cldShowImageUrl,
            resourcetitle: `${name}_showimage`,
            isimage: true,
          }
          const res = await fetch("../../api/cloudinary", {
            method: "POST",
            body: JSON.stringify(cldShowImageData)
          })
          setShowimageurl(cldShowImageUrl)
        } else cldShowImageUrl = showimageurl
        console.log(`showimageurl: ${cldShowImageUrl}`)
        var cldShowVideoUrl: string
        if (showShowvideoupload) {
          cldShowVideoUrl = await cloudinaryUpload(showvideo, "showvideo", "video") as string
          console.log(`showvideourl: ${cldShowVideoUrl}`)
          const cldShowVideoData = {
            cloudinaryurl: cldShowVideoUrl,
            resourcetitle: `${name}_showvideo`,
            isimage: false,
          }
          await fetch("../../api/cloudinary", {
            method: "POST",
            body: JSON.stringify(cldShowVideoData)
          })
          setShowvideourl(cldShowVideoUrl)
        } else cldShowVideoUrl = showvideourl
        const data = {
          showid: show.showid,
          name: name,
          season: season,
          year: year,
          descrip: descrip,
          memberid: memberid,
          showimageurl: cldShowImageUrl,
          showvideourl: cldShowVideoUrl,
          youtubeid: youtubeid,
        };
        const response = await fetch("/api/shows", {
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
  if (!isEdited) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        {show && (
          <div className="page">
            <h2>
              To add edit the show with showid {show.showid} and show name{" "}
              {show.name}:
            </h2>
            <br></br>
            <form onSubmit={editShow}>
              <h3>Name:</h3>
              <input type="text" value={name} onChange={handleNameChange} />
              <br />
              <h3>Season:</h3>
              <input type="text" value={season} onChange={handleSeasonChange} />
              <br />
              <h3>Year:</h3>
              <input type="number" value={year} onChange={handleYearChange} />
              <br />
              <h3>Description:</h3>
              <textarea
                name="descrip"
                id="descrip"
                rows={10}
                cols={100}
                value={descrip}
                onChange={handleDescripChange}
              ></textarea>
              <br />
              <h3>
                Members (type their netIDs. Each netID must be separated by
                exactly one space. The curly braces must remain)
              </h3>
              <textarea
                name="memberid"
                id="memberid"
                rows={10}
                cols={100}
                value={memberid}
                onChange={handleMemberIdChange}
              ></textarea>
              <br />
              <p>Youtube ID</p>
              <input type="text" value={youtubeid} onChange={handleYoutubeidChange} />
              <br />
              <p>Show Image:</p>
              <img src={showimageurl} alt={name} />
              <br />
              {showShowimageupload &&
              <div>
                <p>Show image upload:</p>
                <input type="file"  onChange={handleShowImageChange} required/>
                <br />
              </div>
              }
              {!showShowimageupload &&
              <div>
                <button onClick={revealShowImageUpload}>Click here to upload a new show image</button>
              </div>
              }
              <p>Show video:</p>
              <ProjectVideo cloudinaryurl={showvideourl} key={showvideourl}/>
              <br />
              {showShowvideoupload &&
              <div>
                <p>Show video upload:</p>
              <input type="file"  onChange={handleShowVideoChange} required/>
              <br />
              </div>
              }
              {!showShowvideoupload &&
              <div>
                <button onClick={revealShowVideoUpload}>Click here to upload a new show video</button>
              </div>
              }
            </form>
            <button className="button" onClick={editShow}>
              Click here to submit changes to {show.name}
            </button>
            <br />
            <button className="button" onClick={deleteShow}>
              Click here to delete {show.name}
            </button>
            <br />
            <Link href="/admin">
                <button className="button">Go back to admin page</button>
            </Link>
            
            
          </div>
        )}
        {error && (
          <div>
            <p>Something went wrong: {error}</p>
            <br />
            <Link href="/projects">Click here to see all shows</Link>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Navigation shouldBeDark={true} />
        {!isDeleted &&
          <div className="page">
          <h1>
            Updated information for {show.name}:
          </h1>
          <div key={show.showid}>
            <h2><strong>Name: </strong> {name}</h2>
            <h2><strong>Season:</strong> {season}</h2>
            <h2><strong>Year:</strong> {year}</h2>
            <h2><strong>Description</strong>: {descrip}</h2>
            <h2><strong>Members:</strong></h2>
            {memberid
              .substring(1, memberid.length - 1)
              .split(",")
              .map((membernetid) => (
                <p>netid: {membernetid}</p>
              ))}
            <p><strong>Youtube id:</strong> {youtubeid}</p>
            <p><strong>Show Image:</strong></p>
            <img src={showimageurl} alt={name} />
            <br />
            <p><strong>Show video: </strong></p>
            <ProjectVideo cloudinaryurl={showvideourl} key={showvideourl} />
            <br />
            <ButtonComponent title="Click to return to admin" href="/admin"/>
            <br />
            <ButtonComponent title="Back to All Shows" href="/shows" />
          </div>
        </div> 
        }
        {isDeleted &&
        <div>
          <br />
          <br />
          <br />
          <p>Deleted {show.name}</p>
          <ButtonComponent title="Click to return to admin" href="/admin"/>
          <br />
          <ButtonComponent title="Back to All Shows" href="/shows" />
        </div>
        }
      </div>
    );
  }
};

export async function getServerSideProps(context) {
  try {
    const id = parseInt(context.query.id) as number;
    const show = await prisma.shows.findUnique({
      where: {
        showid: id,
      },
    });
    console.log("this is the show" + show);
    return { props: { show: show, isModified: false } };
  } catch (error) {
    const err = `${error}`;
    return { props: { isModified: false, error: err } };
  }
}
export default EditShow;
