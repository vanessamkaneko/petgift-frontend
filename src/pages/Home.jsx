
import { AboutSection } from '../components/home/AboutSection';
import { AdoptionSection } from '../components/home/AdoptionSection';
import { FAQSection } from '../components/home/FAQSection';
import { Footer } from '../components/home/Footer';
import { Header } from '../components/home/Header';
// import { useFetch } from '../hooks/useFetch';

function Home() {
  // const { data } = useFetch('/example');

  return (
    <div>
      <Header />
      <AboutSection />
      <AdoptionSection />
      <FAQSection />
      <Footer />
      {/* // {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Carregando...'} */}
    </div>
  );
}

export default Home;