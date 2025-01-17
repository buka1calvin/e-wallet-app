import AboutApp from "@/components/home/AboutApp";
import FQA from "@/components/home/FQA";
import HeroPage from "@/components/home/HeroPage";

export default function Home() {
  return (
    <main className="">
      <HeroPage/>
      <AboutApp/>
      <FQA/>
    </main>
  );
}
