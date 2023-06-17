import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import ButtonComponent from "../../components/Button";
import cloudinaryUpload from "../../utils/cloudinary";
import VideoComponent from "../../components/Video";
import ProjectVideo from "../../components/ProjectVideo";
// model shows {
//     showid             Int   @id
//     name               String   @db.VarChar(80)
//     season             String   @db.VarChar(80)
//     year               Int
//     descrip            String
//     memberid           String[]
//     showimageurl       String?
//   }
const CreateShow: NextPage = () => {
  const [isCreated, setIscreated] = useState(false);
  const [showid, setShowId] = useState("");
  const [name, setName] = useState("");
  const [memberid, setMemberId] = useState("");
  const [season, setSeason] = useState("");
  const [descrip, setDescrip] = useState("");
  const [year, setYear] = useState(new Date().getFullYear() as number);
  const [showimage, setShowimage] = useState<File>()
  const [showimageurl, setShowimageurl] = useState("")
  const [showvideo, setShowvideo] = useState<File>()
  const [showvideourl, setShowvideourl] = useState("")
  const [youtubeid, setYoutubeid] = useState("")

  // const handleShowIdChange = (event) => {
  //   setShowId(event.target.value);
  // };
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
      alert("youtubeid cannot be blank")
    } else if (!showimage) {
      alert("You must attach a show image")
    } else if (!showvideo) {
      alert("You must attach a show video")
    } else {
      return true
    }
    return false
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

  const handleShowVideoChange = (event) => {
    setShowvideo(event.target.files[0])
  }
  const handleShowImageChange = (event) => {
    setShowimage(event.target.files[0])
  }

  const handleYoutubeidChange = (event) => {
    setYoutubeid(event.target.value)
  }
  const createShow = async () => {
    if (validateInput()) {
      try {
        const cldShowImageUrl = await cloudinaryUpload(showimage, "showimage", "image") as string
        const cldShowImageData = {
          cloudinaryurl: cldShowImageUrl,
          resourcetitle: `${name}_showimage`,
          isimage: true,
        }
        const res = await fetch("../api/cloudinary", {
          method: "POST",
          body: JSON.stringify(cldShowImageData)
        })
        if (res.status != 200) console.log("RAAAAA")
        setShowimageurl(cldShowImageUrl)
        console.log(`showimageurl: ${cldShowImageUrl}`)
        const cldShowVideoUrl = await cloudinaryUpload(showvideo, "showvideo", "video") as string
        console.log(`showvideourl: ${cldShowVideoUrl}`)
        const cldShowVideoData = {
          cloudinaryurl: cldShowVideoUrl,
          resourcetitle: `${name}_showvideo`,
          isimage: false,
        }
        await fetch("../api/cloudinary", {
          method: "POST",
          body: JSON.stringify(cldShowVideoData)
        })
        setShowvideourl(cldShowVideoUrl)
        const data = {
          //showid: parseInt(showid),
          name: name,
          season: season,
          year: year,
          descrip: descrip,
          memberid: memberid,
          showimageurl: cldShowImageUrl,
          showvideourl: cldShowVideoUrl,
          youtubeid: youtubeid,
        };
        const resJson = await fetch("/api/shows", {
          method: "POST",
          body: JSON.stringify(data),
        }).then(res => res.json());
        setShowId(resJson.showid)
        // console.log(response.json().toString());
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
          <h2>To add a show:</h2>
          <br />
          <form onSubmit={createShow}>
            <h3>Name:</h3>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Name"
              required
            />
            <br />
            <h3>Season:</h3>
            <input
              type="text"
              value={season}
              onChange={handleSeasonChange}
              placeholder="Season"
              required
            />
            <br />
            <h3>Year:</h3>
            <input type="number" value={year} onChange={handleYearChange} required/>
            <br />
            <h3>Description:</h3>
            <textarea
              name="descrip"
              id="descrip"
              rows={10}
              cols={100}
              value={descrip}
              onChange={handleDescripChange}
              placeholder="Description"
              required
            ></textarea>
            <br />
            <h3>
              Members (type each member's netID. Each netID must be eparated by
              exactly a comma. The collection of netIds should be surrounded by
              curly braces {})
            </h3>
            <textarea
              name="memberid"
              id="memberid"
              rows={10}
              cols={100}
              value={memberid}
              onChange={handleMemberIdChange}
              placeholder="{netid1,netid2}"
              required
            ></textarea>
            <br />
            <p>Youtube ID</p>
            <input type="text" value={youtubeid} onChange={handleYoutubeidChange} required/>
            <br />
            <p>Show image upload:</p>
            <input type="file"  onChange={handleShowImageChange} required/>
            <br />
            <p>Show video upload:</p>
            <input type="file"  onChange={handleShowVideoChange} required/>
            <br />
          </form>
          <button className="button" onClick={createShow}>Create Show</button>
          
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
          <h1>Information for created show:</h1>
          <div key={showid}>
            <h2>Show Video:</h2>
            <ProjectVideo cloudinaryurl={showvideourl} key={showvideourl} />
            <br></br>
            <h2>Show Image:</h2>
            <img src={showimageurl} alt={name} />
            <br />
            <h2>name: {name}</h2>
            <p>season: {season}</p>
            <p>year: {year}</p>
            <p>description: {descrip}</p>
            <h1>members:</h1>
            {memberid
              .substring(1, memberid.length - 1)
              .split(",")
              .map((membernetid) => (
                <p>netid: {membernetid}</p>
              ))}
            
            <Link href="/admin">
              <button className="button">Click to return to admin</button>
            </Link>
            <Link href="/shows">
              <button className="button">Click to see all shows</button>
            </Link>
            
            <br />
            
          </div>
        </div>
      </div>
    );
  }
};
export default CreateShow;
