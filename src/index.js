import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import '@neocoast/semantic-ui-less/semantic.less';
import App from './App';

const root = document.getElementById('root');
render(
	<Router basename='/dummy-ecommerce'>
		<App />
	</Router>
	, root);
