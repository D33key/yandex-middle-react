import { useParams } from 'react-router';

export default function Ingredients() {
	const { id } = useParams();
  console.log('WTF>')
	return <div>Ingredients page</div>;
}
