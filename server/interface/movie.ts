interface MovieItem {
  title: string;
  link: string;
  image: string;
  subtitle: string;
  pubDate: string;
  director: string;
  actor: string;
  userRating: string;
}

interface MovieResponse {
  data: {
    total: number;
    start: number;
    display: number;
    items: MovieItem[];
  };
}

interface MovieItemResponse {
  title: string;
  subtitle: string;
  link: string;
  pubYear: string;
  directors: string[];
  actors: string[];
  userRating: string;
  image?: string;
}

interface MovieDetail {
  story: string;
  posterUrl: string;
  thumnailUrl: string;
  genres: string[];
  countries: string[];
  runningTime: string;
  pubDate: string;
}

interface MovieResponseDetail extends MovieDetail, MovieItemResponse {
  basket: boolean;
  watched: boolean;
  userEmail: string;
}

export { MovieResponse, MovieDetail, MovieResponseDetail, MovieItemResponse };
