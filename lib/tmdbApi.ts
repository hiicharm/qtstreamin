
export interface MovieProps {
  id: number,
  title: string,
  vote_average: number,
  overview: string,
  backdrop_path: string,
  genre_ids: number[],
  release_date: string,
  poster_path: string,

  runtime?: number,
  genres?: genre[],
}
export interface genre {
  id: number,
  name: string,
}
export async function getFeaturedMovie(): Promise<MovieProps> {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PRIVATE_TMDB_AUTH_HEADER!
    }
  };
  try {

    const res = await fetch(url, options)
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return {} as MovieProps;
    }
    return data.results[0];
  } catch (error) {
    console.error("Failed to fetch featured movie details:", error);
    return {} as MovieProps;
  }
}

export async function getTrendingMovies(): Promise<MovieProps[]> {

  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PRIVATE_TMDB_AUTH_HEADER!
    }
  };
  try {

    const res = await fetch(url, options)
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return [] as MovieProps[];
    }
    return data.results;
  } catch (error) {
    console.error("Failed to fetch featured movie details:", error);
    return [] as MovieProps[];
  }
}
