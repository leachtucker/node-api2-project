import axios from 'axios';
import { base_URL } from './config';

export function fetchPosts() {
    return axios.get(`${base_URL}/api/posts`);
};