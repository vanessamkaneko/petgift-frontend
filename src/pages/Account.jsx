import { Header } from '../components/account/Header';
import { LoginRegisterSection } from '../components/account/LoginRegisterSection';
// import { useFetch } from '../hooks/useFetch';

function Account() {
  // const { data } = useFetch('/example');

  return (
    <div>
      <Header />
      <LoginRegisterSection />

      {/* // {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Carregando...'} */}
    </div>
  );
}

export default Account;