import HotConcerns from "./components/homepage/HotConcerns";
import ConcernsEducation from "./components/homepage/ConcernsEducation";
import Usage from "./components/homepage/Usage"
import Topics from "./components/homepage/Topics";

export default function Home() {
  return (
    <>
      <div className="bg-blue-50/70 w-full min-h-screen flex items-center justify-center">
        <div className="max-w-screen-2xl mx-auto px-4 w-full flex justify-between">
          <HotConcerns />
        </div>
      </div>

      <div className="py-24">
        <ConcernsEducation />
      </div>

      <div>
        <Usage />
      </div>
    </>
  );
}