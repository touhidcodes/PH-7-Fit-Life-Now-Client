import axios from 'axios';

const AxiosBase = axios.create({
	baseURL: 'https://ph-7-fit-life-now-server.vercel.app',
});

export default AxiosBase;
