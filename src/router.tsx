import { Route, Routes } from 'react-router';
import Constructor from './pages/Constructor';
import Login from './pages/Login';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Constructor />} />

			<Route path='/login' element={<Login />} />
		</Routes>
	);
}
