// components/Socials.js
import { FaGithub, FaPinterest } from "react-icons/fa";
import { SiCarrd } from "react-icons/si";

const fontStyle = {
  fontFamily: "'antsValley', sans-serif",
};

// Map icon names to actual components
const iconMap = {
  FaGithub: <FaGithub className="text-2xl hover:text-purple-800 transition" />,
  FaPinterest: <FaPinterest className="text-2xl hover:text-red-600 transition" />,
  SiCarrd: <SiCarrd className="text-2xl hover:text-blue-500 transition" />,
};

// Demo/static social links (replace later with MongoDB data)
const sampleSocials = [
  { platform: "GitHub", link: "https://github.com/username", icon: "FaGithub" },
  { platform: "Pinterest", link: "https://pinterest.com/username", icon: "FaPinterest" },
  { platform: "Carrd", link: "https://username.carrd.co", icon: "SiCarrd" },
];

export default function Socials({ socials = sampleSocials }) {
  if (!socials || socials.length === 0) {
    return <p className="text-gray-400 italic">No socials available.</p>;
  }

  return (
    <div>
      <h1 style={fontStyle} className="text-[24px] font-semibold mb-2">
        Socials
      </h1>

      <div className="flex gap-6 flex-wrap justify-center md:justify-start">
        {socials.map((social, index) => (
          <div key={index} className="flex flex-col items-center">
            <a
              href={social.link.startsWith("http") ? social.link : `https://${social.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span className="text-xl">{iconMap[social.icon]}</span>
            </a>
            <span className="text-lg font-medium">{social.platform}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
