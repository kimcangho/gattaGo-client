import { motion } from "framer-motion";
import githubLogo from "../assets/logos/github.svg";
import linkedInLogo from "../assets/logos/linkedin.svg";
import gmailLogo from "../assets/logos/gmail.svg";

const Footer = (): JSX.Element => {
  return (
    <motion.div
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 50,
        mass: 1,
      }}
    >
      <div className="flex justify-center space-x-4 midMobile:space-x-6 tablet:space-x-8 desktop:space-x-12 my-4 tablet:my-8 ">
        <a href="https://github.com/kimcangho" target="_blank">
          <img
            src={githubLogo}
            alt="Github"
            className="w-6 midMobile:w-8 tablet:w-10 desktop:w-12 cursor-pointer"
          />
        </a>
        <a href="https://www.linkedin.com/in/kentkcho/" target="_blank">
          <img
            src={linkedInLogo}
            alt="LinkedIn"
            className="w-6 midMobile:w-8 tablet:w-10 desktop:w-12 cursor-pointer"
          />
        </a>
        <a href="mailto:ho.kimcang@gmail.com?subject=gattaGo Feedback">
          <img
            src={gmailLogo}
            alt="Gmail"
            className="w-6 midMobile:w-8 tablet:w-10 desktop:w-12 cursor-pointer"
          />
        </a>
      </div>
      <p className="mb-4 text-center">Copyright @ 2023</p>
    </motion.div>
  );
};

export default Footer;
