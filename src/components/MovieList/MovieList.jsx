import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MovieList.module.css';

export const MovieList = ({ movieList }) => {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {Array.isArray(movieList) &&
        movieList?.map(({ id, name, title }) => {
          return (
            <Link
              state={{ from: location }}
              key={id}
              className={css.item}
              to={`/movies/${id}`}
            >
              <h3>{name || title}</h3>
            </Link>
          );
        })}
    </ul>
  );
};

MovieList.propTypes = {
  movieList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
};