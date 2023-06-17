import {
  
  NextPage,
} from "next";
import prisma from "../../lib/prisma";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ImageComponent from "../../components/Image";
import { Cloudinary } from "../../types/Cloudinary";
import { Events } from "../../types/Events";
import VideoComponent from "../../components/Video";
import EventsComponent from "../../components/Events";


type Props = {
  eventspageImg: Cloudinary | null;
  fallauditionsVideo: Cloudinary | null;
  tigernightVideo: Cloudinary | null;
  psafeVideo: Cloudinary | null;
  fallauditionsImg: Cloudinary | null;
  tigernightImg: Cloudinary | null;
  psafeImg: Cloudinary | null;
  fallauditionsText: Events | null;
  tigernightText: Events | null;
  psafeText: Events | null;
};

const Events: NextPage<Props> = ({eventspageImg, fallauditionsVideo, tigernightVideo, psafeVideo, fallauditionsImg, fallauditionsText, 
  tigernightImg, psafeImg, tigernightText, psafeText}) => {
  return (
    <div>
      <Navigation />
      <div className="hero-image-container">
        {eventspageImg && <ImageComponent cloudinaryurl={eventspageImg.cloudinaryurl} />}
        <div className="image-text">
          <div className="opacity-60 font-normal">
            CHECK OUT WHERE YOU CAN SEE DISIAC NEXT.
          </div>
          <div className="text-5xl text-white font-semibold">
            UPCOMING
          </div>
        </div>
      </div>
      
      <div>
        {fallauditionsVideo && <VideoComponent cloudinaryurl={fallauditionsVideo.cloudinaryurl} title={fallauditionsText.name} date={fallauditionsText.date} location={fallauditionsText.location} locationlink={fallauditionsText.locationlink} />}
          {fallauditionsImg && fallauditionsText && (
            <EventsComponent
            cloudinaryurl={fallauditionsImg.cloudinaryurl}
            title={fallauditionsText.name}
            description={fallauditionsText.description}    
            date={fallauditionsText.date}    
            starttime={fallauditionsText.starttime}    
            endtime={fallauditionsText.endtime}
                  />
          )}
      </div>
      <div>
        {tigernightVideo && <VideoComponent cloudinaryurl={tigernightVideo.cloudinaryurl} title={tigernightText.name} date={tigernightText.date} location={tigernightText.location} locationlink={tigernightText.locationlink} />}
        {tigernightImg && tigernightText && (
            <EventsComponent
            cloudinaryurl={tigernightImg.cloudinaryurl}
            title={tigernightText.name}
            description={tigernightText.description}    
            date={tigernightText.date}    
            starttime={tigernightText.starttime}    
                  />
          )}
      </div>
      <div>
        {psafeVideo && <VideoComponent cloudinaryurl={psafeVideo.cloudinaryurl} title={psafeText.name} date={psafeText.date} location={psafeText.location} locationlink={psafeText.locationlink} />}
        {psafeImg && psafeText && (
            <EventsComponent
            cloudinaryurl={psafeImg.cloudinaryurl}
            title={psafeText.name}
            description={psafeText.description}    
            date={psafeText.date}    
            starttime={psafeText.starttime}    
                  />
          )}
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps = async () => {
  
  const eventspageImg = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "eventspage",
    },
  });

  const fallauditionsVideo  = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "eventspage-fall-auditions-video",
    },
  });
  
  const fallauditionsImg  = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "eventspage-fall-auditions-img",
    },
  });

  const fallauditionsText = await prisma.events.findFirst({
    where: {
      eventid: 3,
    },
  });

  const tigernightVideo  = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "eventspage-tigernight-video",
    },
  });
  
  const tigernightImg  = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "eventspage-tigernight-img",
    },
  });

  const tigernightText = await prisma.events.findFirst({
    where: {
      eventid: 2,
    },
  });

  const psafeVideo  = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "eventspage-psafe-video",
    },
  });
  
  const psafeImg  = await prisma.cloudinary.findFirst({
    where: {
      resourcetitle: "eventspage-psafe-img",
    },
  });

  const psafeText = await prisma.events.findFirst({
    where: {
      eventid: 1,
    },
  });


  return { props: { eventspageImg, fallauditionsVideo, fallauditionsImg, tigernightVideo, tigernightImg, psafeImg, psafeVideo, 
    fallauditionsText: JSON.parse(JSON.stringify(fallauditionsText)), 
    tigernightText: JSON.parse(JSON.stringify(tigernightText)),
    psafeText: JSON.parse(JSON.stringify(psafeText))
  } };
};

export default Events;
