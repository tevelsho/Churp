import Hero from "../app/(pages)/Landing/components/Hero";
import ConcernsEducation from "./(pages)/Landing/components/Flow";
import Usage from "../app/(pages)/Landing/components/Usage"
import Response from "./(pages)/Landing/components/SecureResponse";
import OpenSource from "./(pages)/Landing/components/OpenSource";
import Help from "./(pages)/Landing/components/HelpCentre";
import GettingStarted from "./(pages)/Landing/components/GettingStarted" 

export default function Home() {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Hero />
      </div>

      <div className="py-24">
        <ConcernsEducation />
      </div>

      <div className="py-32">
        <Usage />
      </div>

      <div className="py-32">
        <Response />
      </div>

      <div className="py-32">
        <OpenSource />
      </div>

      <div className="py-32">
        <Help />
      </div>

      <div className="">
        <GettingStarted />
      </div>
    </>
  );
}