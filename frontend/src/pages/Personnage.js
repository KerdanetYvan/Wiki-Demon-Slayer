import { useParams } from 'react-router-dom';

function Personnage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Personnages Page</h1>
      <p>This is the {id}th personnages page content.</p>
    </div>
  );
}

export default Personnage;