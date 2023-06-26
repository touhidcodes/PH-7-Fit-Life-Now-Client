import axios from 'axios';

const AxiosBase = axios.create({
	baseURL: 'http://localhost:5000/',
});

export default AxiosBase;
