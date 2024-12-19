import { Route, Routes } from 'react-router';
import Constructor from './pages/Constructor';
import Login from './pages/Login';
import Register from './pages/Register';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Constructor />} />

			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
}
