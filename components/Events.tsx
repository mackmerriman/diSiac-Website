import React from 'react';
import moment from 'moment';

type Props = {
  cloudinaryurl: string;
  title: string;
  description: string;
  date: string;
  starttime: string;
  endtime?: string;
}

const EventsComponent: React.FC<Props> = ({ cloudinaryurl, title, description, date, starttime, endtime}) => {
  return (
    <div className="home-about">
        <img className="home-about-image" src={cloudinaryurl} />
        <div>
            <div className="font-bold text-slate-800 text-4xl uppercase mb-6 tracking-tight"> {title} </div>
            <hr>
            </hr>
            <div className="font-light leading-7 text-slate-500">
              <p>{description}</p>
              <br/>
              {endtime && <p>{moment.utc(date).format('MM/DD/YYYY')} @ {starttime}PM - {endtime}PM</p>}
              {!endtime && <p>{moment.utc(date).format('MM/DD/YYYY')} @ {starttime}PM</p>}
            </div>
            
        </div>
        
    </div>
  );
};

export default EventsComponent;
