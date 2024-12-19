import { Route, Routes } from 'react-router';
import Constructor from './pages/Constructor';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedLayout from './template/ProtectedLayout';

export default function Router() {
	return (
		<Routes>
			<Route element={<ProtectedLayout />}>
				<Route path='/' element={<Constructor />} />
			</Route>

			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
}
