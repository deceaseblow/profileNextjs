import Socials from "../components/Socials";
import ListKeep from "../components/ListKeep";

const fontStyle = {
  fontFamily: "'antsValley', sans-serif",
};

export default function Home() {
  return (
    <div className="pb-10 px-4 h-125 md:px-10">
      <h2
        className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
        style={fontStyle}
      >
        Home
      </h2>

      <div className="flex flex-col gap-5 px-5 md:pl-10 md:pt-10">
        <Socials />
        <ListKeep />
      </div>

      <h2 className="deathNote text-4xl text-center">important message!</h2>
      <p>
        Some shit doesn’t work and I don’t know yet why, so just ignore it!
      </p>
    </div>
  );
}
