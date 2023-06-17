import Link from "next/link";
import Image from "next/image";
import SocialMedia from "./SocialMedia";

const Footer = () => {
    return (
        <div className="flex py-12 mx-20 footer">
            <Link href={"/"}>
                <Image
                    src="/disiac-logo-web-header-black.png"
                    alt="diSiac Dance Company"
                    width={100}
                    height={30}
                />
            </Link> 
            <div className="text-sm font-medium text-center text-slate-800 uppercase footer-text">© 2023 diSiac Dance Company</div>
            <SocialMedia isDarkMode={true} />  
        </div>
    );
  };
  
  export default Footer;