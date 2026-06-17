import { Header } from '../components/home/Header';
import { UpdateUser } from '../components/user/UpdateUser';
// import { useFetch } from '../hooks/useFetch';

function User() {
  // const { data } = useFetch('/example');

  return (
    <div>
      <Header />
      <UpdateUser />

      {/* // {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Carregando...'} */}
    </div>
  );
}

export default User;