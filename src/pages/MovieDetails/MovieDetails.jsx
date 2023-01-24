import  Loader  from 'components/Loader/Loader';
import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, Link, Route, Routes, useLocation } from 'react-router-dom';
import { getMovieDetails } from 'services/API';
import { Notify } from 'notiflix';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import css from './MovieDetails.module.css';

const Cast = lazy(() => import('pages/Cast/Cast'));
const Reviews = lazy(() => import('pages/Reviews/Reviews'));

function MovieDetails() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async id => {
      try {
        setIsLoading(true);
        const receivedTrends = await getMovieDetails(id);
        setMovieInfo(receivedTrends);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails(movieId);
  }, [movieId]);

  useEffect(() => {
    if (error === null) return;
    Notify.failure(`some error occured ${error}`);
  }, [error]);

  return (
    <div className={css.wrapper}>
      <Link className={css.goBack} to={location?.state?.from ?? '/'}>
        <BsFillArrowLeftSquareFill size="30px" />
      </Link>
      {isLoading && <Loader />}
      {movieInfo !== null && (
        <div className={css.box}>
          <img
            className={css.img}
            src={
              movieInfo?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieInfo?.poster_path}`
                : 'https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png'
            }
            alt={movieInfo.title}
          />
          <div className={css.info}>
            <h1 className={css.title}>
              {movieInfo.title} ({movieInfo?.release_date.slice(0, 4)})
            </h1>
            <p>User Score: {movieInfo?.vote_average}</p>
            <h2>Overview</h2>
            <p className={css.overview}>{movieInfo.overview}</p>
            <h2>Genres</h2>
            <ul className={css.genre}>
              {movieInfo?.genres?.map(({ id, name }) => {
                return (
                  <li key={id} className={css.genreItem}>
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <div className={css.moreInfo}>
        <Link
          state={{ from: location?.state?.from ?? '/' }}
          className={css.moreInfoLink}
          to="reviews"
        >
          Reviews
        </Link>
        <Link
          state={{ from: location?.state?.from ?? '/' }}
          className={css.moreInfoLink}
          to="cast"
        >
          Cast
        </Link>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default MovieDetails;