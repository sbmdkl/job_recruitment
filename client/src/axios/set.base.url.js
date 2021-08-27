import axios from 'axios';

const setBaseUrl = () => {
   // axios.defaults.baseURL = 'https://recruiter.ifotechservice.com';
   axios.defaults.baseURL = 'http://159.89.175.16';
};

export default setBaseUrl;
