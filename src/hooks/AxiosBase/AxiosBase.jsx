import axios from 'axios';

const AxiosBase = axios.create({
	baseURL: 'https://some-domain.com/api/',
	timeout: 1000,
	headers: { 'X-Custom-Header': 'foobar' },
});

export default AxiosBase;
