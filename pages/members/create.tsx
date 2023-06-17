import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import cloudinaryUpload from "../../utils/cloudinary";


const CreateMember: NextPage = () => {
  const [isCreated, setIscreated] = useState(false);
  const [memberid, setMemberid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [testimonialbio, setTestimonialbio] = useState("");
  const [headshoturl, setHeadshoturl] = useState("");
  const [headshot, setHeadshot] = useState<File>()
  const [classyear, setClassyear] = useState("")
  const [testimonialimage, setTestimonialimage] = useState<File>()
  const [testimonialurl, setTestimonialurl] = useState("")

  const validateInput = () => {
    const emailRegEx = new RegExp("@.")
    if (memberid == "") alert("memberid can't be empty")
    else if (email == "") alert("email can't be empty")
    else if (!email.match(emailRegEx)) alert("please provide a valid email")
    else if (name == "") alert("name cannot be empty")
    else if (classyear == "") alert("class year can't be empty")
    else return true
    return false
  }
  const createMember = async () => {
    if (validateInput()) {
      try {
        var cldHeadshotUrl: string | null
        if (headshot) {
          cldHeadshotUrl = await cloudinaryUpload(headshot, "headshot", "image") as string
          const cloudData = {
            cloudinaryurl: cldHeadshotUrl,
            resourcetitle: `${name}_headshot`,
            isimage: true,
          }
          await fetch("/api/cloudinary", {
            method: "POST",
            body: JSON.stringify(cloudData),
          })
        } else {
          cldHeadshotUrl = null
        }
        setHeadshoturl(cldHeadshotUrl)
        var testimonialUrl: string | null
        if (testimonialimage) {
          testimonialUrl = await cloudinaryUpload(testimonialimage, "testimonialimage", "image") as string
          const cloudData = {
            cloudinaryurl: testimonialUrl,
            resourcetitle: `${name}_testimonialimage`,
            isimage: true,
          }
          await fetch("/api/cloudinary", {
            method: "POST",
            body: JSON.stringify(cloudData),
          })
        } else {
          testimonialUrl = null
        }
        setTestimonialurl(testimonialUrl)
        const data = {
          memberid: memberid,
          name: name,
          email: email,
          classyear: classyear,
          instagram: instagram,
          testimonialbio: testimonialbio,
          headshoturl: cldHeadshotUrl,
          bio: bio,
          testimonialurl: testimonialUrl,
        };
        const response = await fetch("/api/members", {
          method: "POST",
          body: JSON.stringify(data),
        });
        console.log(response.json().toString());
        setIscreated(true);
      } catch (error) {
        console.error(error);
      }
    } else console.log("input invalid")    
  };

  if (!isCreated) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h2>To add a member:</h2>
          <h3>Email:</h3>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <br />
          <h3>Name:</h3>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
          />
          <br />
          <h3>memberid:</h3>
          <input
            type="text"
            value={memberid}
            onChange={(event) => setMemberid(event.target.value)}
            placeholder="ID"
          />
          <br />
          <h3>Bio:</h3>
          <textarea
            name="bio"
            id="bio"
            rows={10}
            cols={100}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="Bio"
          ></textarea>
          <br />
          <h3>Class year:</h3>
          <input type="text" value={classyear} onChange={(event) => setClassyear(event.target.value)} />
          <br />
          <h3>Instagram:</h3>
          <input
            type="text"
            value={instagram}
            onChange={(event) => setInstagram(event.target.value)}
            placeholder="@"
          />
          <br />
          <h3>Testimonial Bio:</h3>
          <textarea
            name="testimonial-bio"
            id="testimonial-bio"
            rows={10}
            cols={100}
            value={testimonialbio}
            onChange={(event) => setTestimonialbio(event.target.value)}
            placeholder="Testimonial Bio"
          ></textarea>
          <br />
          <p>Headshot upload:</p>
          <input type="file"  onChange={(event) => setHeadshot(event.target.files[0])}/>
          <br />
          <p>Testimonial Image upload:</p>
          <input type="file"  onChange={(event) => setTestimonialimage(event.target.files[0])}/>
          <br />

          <button className="button" onClick={createMember}>
            Create Member
          </button>
          <br />
          <Link href="/admin">
            <button className="button">Go Back to Admin Page</button>
          </Link>
          
          <br />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h1>Information for created member:</h1>
          <div key={memberid}>
            <h2>name: {name}</h2>
            <p>bio: {bio}</p>
            <p>classyear: {classyear} </p>
            <p>email: {email}</p>
            <p>instagram: {instagram}</p>
            <p>testimonial bio: {testimonialbio}</p>
            <p>headshot: </p>
            {headshoturl && <img height="600px" width="400px" src={headshoturl} alt={name} />}
            {!headshoturl && 
            <p>No headshot on record for {name}</p>
            }
            <br />
            <p>testimonial image:</p>
            {testimonialurl && <img height="600px" width="400px" src={testimonialurl} alt={name} />}
            {!testimonialurl && 
            <p>No testimonial image on record for {name}</p>}
            <Link href="/admin">
              <button className="button">Go Back to Admin Page</button>
            </Link>
            <br />
            <Link href="/members">
              <button className="button">Click to See All Members</button>
            </Link>
            
          </div>
        </div>
      </div>
    );
  }
};
export default CreateMember;
