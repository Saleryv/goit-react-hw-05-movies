import axios from 'axios';

const moviesAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'c9d4617970f7c11d502d08245809af34',
    language: 'en-US',
    include_adult: false,
  },
});

export const getCast = async id => {
    const { data } = await moviesAPI.get(`/movie/${id}/credits`);
    return data.cast;
  };



export const getMoviesByQuery = async query => {
  const { data } = await moviesAPI.get('/search/movie', {
    params: { query },
  });
  return data.results;
};

export const getTrends = async () => {
    const { data } = await moviesAPI.get('/trending/movie/week');
    return data.results;
  };

export const getMovieDetails = async id => {
  const { data } = await moviesAPI.get(`/movie/${id}`);
  return data;
};

export const getReviews = async id => {
  const { data } = await moviesAPI.get(`/movie/${id}/reviews`);
  return data.results;
};