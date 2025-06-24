import HotConcerns from "./components/Landing/HotConcerns";
import ConcernsEducation from "./components/Landing/ConcernsEducation";
import Usage from "./components/Landing/Usage"
import Response from "./components/Landing/Response";
import OpenSource from "./components/Landing/OpenSource";
import Help from "./components/Landing/HelpCentre/HelpCentre";
import GettingStarted from "./components/Landing/GettingStarted" 

export default function Home() {
  return (
    <>
      <div className="bg-blue-50/70 w-full flex items-center justify-center">
        <div className="max-w-screen-2xl mx-auto px-4 w-full flex justify-between">
          <HotConcerns />
        </div>
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