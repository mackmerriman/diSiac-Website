import {
  GetStaticProps,
  GetStaticPropsContext,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  NextPage,
} from "next";
import prisma from "../../lib/prisma";
import { useState } from "react";
import { Member } from "../../types/Member";
import React from "react";
import { Cloudinary as cld} from '../../types/Cloudinary'
import Navigation from "../../components/Navigation";
import cloudinaryUpload from "../../utils/cloudinary";
import { cloudinary } from "@prisma/client";
import ButtonComponent from "../../components/Button";
import Link from "next/link";
type Props = {
  member: Member;
  cldHeadshot: cloudinary;
  cldTestimonialImage: cloudinary;
  isAdmin: boolean;
  isModified: boolean;
};

const EditMember: NextPage<Props> = ({ member, cldHeadshot, cldTestimonialImage, isAdmin, isModified }) => {
  console.log(`isAdmin: ${isAdmin}`)
  var initHeadshotUrl: string
  if (cldHeadshot) initHeadshotUrl = cldHeadshot.cloudinaryurl
  else initHeadshotUrl = ""
  var initTestimonialUrl: string
  if (cldTestimonialImage) initTestimonialUrl = cldTestimonialImage.cloudinaryurl
  else initTestimonialUrl = ""
  const [cloudinaryurl, setCloudinaryurl] = useState(initHeadshotUrl);
  const [headshot, setHeadshot] = useState<File>();
  const [isEdited, setIsEdited] = useState(isModified);
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [classyear, setClassyear] = useState(member.classyear);
  const [bio, setBio] = useState(member.bio);
  const [instagram, setInstagram] = useState(member.instagram);
  const [testimonialbio, setTestimonialBio] = useState(member.testimonialbio);
  const [testimonialurl, setTestimonialUrl] = useState(initTestimonialUrl)
  const [headshotChange, setHeadshotChange] = useState(false)
  const [testimonialImageChange, setTestimonialImageChange] = useState(false)
  const [testimonialimage, setTestimonialimage] = useState<File>();
  const [isDeleted, setIsDeleted] = useState(false)

  const validateInput = () => {
    const emailRegEx = new RegExp("@.")
    if (email == "") alert("email can't be empty")
    else if (!email.match(emailRegEx)) alert("please provide a valid email")
    else if (name == "") alert("name cannot be empty")
    else if (classyear == "") alert("class year can't be empty")
    else return true
    return false
  }
  const deleteMember = async () => {
    try {
      const data = {
        memberid: member.memberid,
      };
      await fetch("/api/members", {
        method: "DELETE",
        body: JSON.stringify(data),
      });
      if (cldHeadshot) {
        const cloudData = {
          cloudinaryid: cldHeadshot.cloudinaryid,
        };
        await fetch("/api/cloudinary", {
          method: "DELETE",
          body: JSON.stringify(cloudData),
        });
      } 
      if (cldTestimonialImage) {
        const cloudData = {
          cloudinaryid: cldTestimonialImage.cloudinaryid,
        };
        await fetch("/api/cloudinary", {
          method: "DELETE",
          body: JSON.stringify(cloudData),
        });
      }
      setIsDeleted(true);
      setIsEdited(true);
    } catch (error) {
      console.log(error);
    }
  };
  const editMember = async () => {
  if (validateInput()) {
    try {
      // setting cldHeadshotUrl var to pass to PATCH members api call
      var cldHeadshotUrl: string | null
      if (headshotChange) { // if the user clicks "upload headshot"
        if (headshot) { // if there is actually an image attached
          cldHeadshotUrl = (await cloudinaryUpload(headshot, "headshot", "image")
          ) as string;
          if (!cldHeadshot) { // if there was no prior image, post not patch
            const cloudData = {
              // cloudinaryid: cldHeadshot.cloudinaryid,
              cloudinaryurl: cldHeadshotUrl,
              resourcetitle: `headshot_${name}`,
              isimage: true,
            };
            await fetch("/api/cloudinary", {
              method: "POST",
              body: JSON.stringify(cloudData)
            })
          } else { // if there was a prior image, patch, not post
            const cloudData = {
              cloudinaryid: cldHeadshot.cloudinaryid,
              cloudinaryurl: cldHeadshotUrl,
              resourcetitle: `headshot_${name}`,
              isimage: true,
            };
            await fetch("/api/cloudinary", {
              method: "PATCH",
              body: JSON.stringify(cloudData),
            });
          }
        } else cldHeadshotUrl = null
        setCloudinaryurl(cldHeadshotUrl);
      } else cldHeadshotUrl = initHeadshotUrl
      // setting the cldTestimonialImageUrl variable to be sent to the
      // PATCH API call
      var cldTestimonialImageUrl: string | null
      if (testimonialImageChange) { // if user clicks "upload testimonial image"
        if (testimonialimage) { // if there is actually an image attached
          cldTestimonialImageUrl = (await cloudinaryUpload(testimonialimage, "testimonialimage", "image")
          ) as string;
          if (!cldTestimonialImage) { // if there was no prior image
            const cloudData = {
              cloudinaryurl: cldTestimonialImageUrl,
              resourcetitle: `testimonialImage_${name}`,
              isimage: true,
            }
            await fetch("/api/cloudinary", {
              method: "POST",
              body: JSON.stringify(cloudData), 
            })
          } else { // if there was a prior image
            const cloudData = {
              cloudinaryid: cldHeadshot.cloudinaryid,
              cloudinaryurl: cldTestimonialImageUrl,
              resourcetitle: `testimonialImage_${name}`,
              isimage: true,
            };
            await fetch("/api/cloudinary", {
              method: "PATCH",
              body: JSON.stringify(cloudData),
            });
          } 
        } else cldTestimonialImageUrl = null
        setTestimonialUrl(cldTestimonialImageUrl);
      } else cldTestimonialImageUrl = initTestimonialUrl
      // calling members PATCH API call
      const data = {
        memberid: member.memberid,
        name: name,
        email: email,
        bio: bio,
        instagram: instagram,
        classyear: classyear,
        testimonialbio: testimonialbio,
        testimonialurl: cldTestimonialImageUrl,
        headshoturl: cldHeadshotUrl,
      };
      await fetch("/api/members", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      setIsEdited(true);
    } catch (error) {
      console.log(error);
    }
  } else console.log("invalid input")
  };
  console.log(`isAdmin: ${isAdmin}`)
  if (!isEdited) {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        <div className="page">
          <h2>To edit member with memberid {member.memberid}:</h2>
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
          <h3>Class year:</h3>
          <input
            type="text"
            value={classyear}
            onChange={(event) => setClassyear(event.target.value)}
            placeholder="class year"
          />
          <br />
          <h3>Instagram:</h3>
          <input
            type="text"
            value={instagram}
            onChange={(event) => setInstagram(event.target.value)}
            placeholder="@"
          />
          <br />
          <h3>Bio:</h3>
          <textarea
            rows={10}
            cols={100}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="Bio"
          />
          <br />
          <h3>Testimonial Bio:</h3>
          <textarea
            rows={10}
            cols={100}
            value={testimonialbio}
            onChange={(event) => setTestimonialBio(event.target.value)}
            placeholder="Testimonial Bio"
          />
          <br />
          <p>Headshot:</p>
          {cldHeadshot && <img src={cldHeadshot.cloudinaryurl} alt={name} height="600px" width="400px"/>}
          {!cldHeadshot &&
          <p>No headshot on record for {member.name}</p>
          }
          <br />
          {headshotChange && <div>
          <h3>Upload a new headshot below!</h3>
          <input type="file" onChange={(event) => setHeadshot(event.target.files[0])} />
          </div>}
          {!headshotChange && 
            <button onClick={() => setHeadshotChange(true)}>Click here to upload a new headshot</button>
          }
          <br />
          <p>testimonial image:</p>
          {cldTestimonialImage && <img src={cldTestimonialImage.cloudinaryurl} alt={name} />}
          {!cldTestimonialImage &&
          <p>No testimonial image on record for {member.name}</p>
          }
          <br />
          {testimonialImageChange && <div>
          <h3>Upload a new testimonial image below!</h3>
          <input type="file" onChange={(event) => setTestimonialimage(event.target.files[0])} />
          </div>}
          {!testimonialImageChange && 
            <button onClick={() => setTestimonialImageChange(true)}>Click here to upload a new testimonial image</button>
          }
          <br />
          <br />
          <button className="button" onClick={editMember}>
            Click here to submit changes to {member.name}
          </button>
          <br />
          
          <Link href="/admin">
              <button className="button">Go back to admin page</button>
          </Link>
          
          {isAdmin && 
          <div>
            <button className="button" onClick={deleteMember}>
          Click here to permanently delete {member.name}. This action is
          IRREVERSIBLE
           </button>
          </div>
          }
          
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigation shouldBeDark={true}/>
        {!isDeleted &&
        <div className="page">
          <h1>Updated info:</h1>
          <div key={member.memberid}>
            <h2>name: {name}</h2>
            <p>class year: {classyear}</p>
            <p>bio: {bio}</p>
            <p>email: {email}</p>
            <p>instagram: {instagram}</p>
            <p>testimonial bio: {testimonialbio}</p>
            <p>headshot:</p>
            {cloudinaryurl && <img height="600px" width="400px" src={cloudinaryurl} alt={name} />}
            {!cloudinaryurl &&
            <p>No headshot on record for {name}</p>
            }
            <br />
            <p>testimonial image:</p>
            {testimonialurl && <img height="600px" width="400px" src={testimonialurl} alt={name} />}
            {!testimonialurl &&
            <p>No testimonial image on record for {name}</p>
            }
            <br />
            <ButtonComponent title="Click to return to the admin page" href="/admin" />
            <br />
            <ButtonComponent title="Click to see all members" href="/members" />
          </div>
        </div>}
        {isDeleted &&
        <div className="grid grid-rows-3 pt-30">
          <br />
          <br />
          <br />
          <br />
          <div>
          <p>
            Member with memberid {member.memberid} and name {member.name} was
            deleted
          </p>
          </div>
          <div>
            <ButtonComponent title="Click to return to the admin page" href="/admin" />
          </div>
          <div>
            <ButtonComponent title="Click to see all members" href="/members" />
          </div>
        </div>
        }
      </div>
    );
  }
};

export const getServerSideProps = async (context) => {
  try {
    const id = context.query.id as string;
    const isAdmin = context.query.isAdmin as boolean;
    console.log(`isAdmin: + ${isAdmin}`)
    const member = await prisma.members.findFirst({
      where: {
        memberid: id,
      },
    });
    var cldHeadshot: cld | null
    if (member.headshoturl) {
      cldHeadshot = await prisma.cloudinary.findFirst({
        where: {
          cloudinaryurl: member.headshoturl,
        },
      });
    } else cldHeadshot = null 
    var cldTestimonialImage: cld | null
    if (member.testimonialurl) {
      cldTestimonialImage = await prisma.cloudinary.findFirst({
        where: {
          cloudinaryurl: member.testimonialurl,
        },
      });
    } else cldTestimonialImage = null
    return { props: { member, cldHeadshot, cldTestimonialImage, isAdmin: isAdmin, isModified: false } };
  } catch (error) {
    const err = `${error}`
    console.log(err)
    return { props: {member: null, cldHeadshot: null, cldTestimonialImage: null, err: err}}
  }
  
};

export default EditMember;
