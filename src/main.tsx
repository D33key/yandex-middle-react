import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Providers from './components/providers/Providers.tsx';
import Router from './router.tsx';
import './style/global.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<Router />
		</Providers>
	</StrictMode>,
);
