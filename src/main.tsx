import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './router.tsx';
import './style/global.css';
import Providers from './template/Providers.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<Router />
		</Providers>
	</StrictMode>,
);
