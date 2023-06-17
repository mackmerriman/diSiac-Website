import { NextPage } from "next";

type Props = {};

const EmailForm: NextPage<Props> = ({}) => {
  return (
    <div className="flex items-center justify-center m-5">
      <div className="p-10 bg-gray-200">
        <h1>Contact Us</h1>
        <form
          method="post"
          encType="text/plain"
          action={`mailto:disiacdance@gmail.com?subject=${encodeURIComponent(
            "Subject"
          )}&body=${encodeURIComponent("Message")}`}
        >
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="m-2 w-96"
          />
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="m-2 w-96"
          />
          <br />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            className="m-2 w-96"
          />
          <br />
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            className="m-2 w-96 h-32"
          />
          <br />
          <input type="submit" value="Send" className="m-2" />
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
