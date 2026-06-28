import { About } from '../components/About';
import { CallForAbstracts } from '../components/CallForAbstracts';
import { Committee } from '../components/Committee';
import { Hero } from '../components/Hero';
import { ImportantDates } from '../components/ImportantDates';
import { Registration } from '../components/Registration';
import { Topics } from '../components/Topics';
import { Venue } from '../components/Venue';

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Topics />
      <Committee />
      <CallForAbstracts />
      <ImportantDates />
      <Registration />
      <Venue />
    </>
  );
}
