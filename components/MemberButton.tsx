import { Link } from 'react-router-dom';

export default function MemberButton() {
  return (
    <div>
      <Link to="../pages/Member">
        <button>Members</button>
      </Link>
    </div>
  );
}
