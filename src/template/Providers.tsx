import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router';
import { store } from '@/services/store';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<DndProvider backend={HTML5Backend}>{children}</DndProvider>
			</Provider>
		</BrowserRouter>
	);
}
