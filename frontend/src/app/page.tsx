import Hero from "../app/(pages)/Landing/components/Hero";
import Flow from "./(pages)/Landing/components/Flow";
import Guide from "./(pages)/Landing/components/Guide"
import Transparent from "./(pages)/Landing/components/Transparent";
import OpenSource from "./(pages)/Landing/components/OpenSource";
import HelpCenter from "./(pages)/Landing/components/HelpCentre";
import Metrics from "./(pages)/Landing/components/Metrics";
import GettingStarted from "./(pages)/Landing/components/GettingStarted";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <>
      <section>
        <Hero />
      </section>

      <section>
        <Flow />
      </section>

      <section>
        <Guide />
      </section>

      <section>
        <Transparent />
      </section>

      <section>
        <OpenSource />
      </section>

      <section>
        <HelpCenter />
      </section>

      <section>
        <Metrics />
      </section>

      <section>
        <GettingStarted />
      </section>

      <Footer />
    </>
  );
}