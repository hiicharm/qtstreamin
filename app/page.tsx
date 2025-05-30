import FeaturedMovie from "@/components/FeaturedMovie";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import ScrollableSection from "@/components/ScrollableSection";
import { getFeaturedMovie, getTrendingMovies } from "@/lib/tmdbApi";

export default async function Home() {
  const featuredMovie = await getFeaturedMovie();
  const trendingMovies = await getTrendingMovies();
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <FeaturedMovie movie={featuredMovie} />
        {/*trending movies*/}
        <ScrollableSection
          title="Trending Movies"
          seeAllLink="/movies"
        >
          {
            trendingMovies.map((movie) => {
              return (
                <div key={movie.id} className="min-w-[150px] sm:min-w-[180px] flex-shrink-0" >
                  <MovieCard movie={movie} />
                </div >
              )
            })
          }
        </ScrollableSection>
      </main>
    </div>
  );
}
