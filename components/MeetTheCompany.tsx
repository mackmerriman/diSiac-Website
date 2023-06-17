import Link from "next/link";

const MeetTheCompany = ({officers}) => {
    return (
    <div className="core-box">
          <p className="core-text">Core 4</p>
          <div className="core-container">
            {officers.map((officer) => (
              <Link
                href={{
                  pathname: "/members/memberPage",
                  query: { id: officer.memberid },
                }}
                key={officer.memberid}
              >
                {officer && <div className="core__img__wrap">
                {officer.headshoturl && (
                  <img src={officer.headshoturl} alt={officer.name} />
                )}
                <p className="core-member-text">{officer.name}</p>
                  <div></div>
                  <p className="img__subtext core-member-subtext">{officer.position}</p>
              </div>}
              </Link>
            ))}
          </div>
          <br />
    </div>
    );
};

export default MeetTheCompany;