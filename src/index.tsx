import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App/';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
		<App />
	</StrictMode>,
);