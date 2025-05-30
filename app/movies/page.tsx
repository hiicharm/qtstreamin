"use client"
import Header from '@/components/Header'
import MovieCard from '@/components/MovieCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { MovieProps } from '@/lib/tmdbApi'
import { allGenres } from '@/utils/constants'
import { SlidersHorizontal, Search, X, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [genres, setGenres] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [genreString, setGenreString] = useState("");
  const [loading, setLoading] = useState(true);
  function gen(genre: string) {
    const x = allGenres.find((g) => g.name === genre);
    const str = x?.id;
    setGenreString(genreString + '%7C' + str);
  }
  // const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/movies/trending-movies`);
      const movies = await res.json();
      setFilteredMovies(movies.results);
      setLoading(false);
    }
    fetchData().catch(console.error)
      ;
  }, [])
  //implement searching by genres
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/movies/discover?genres=${genreString}`);
      const movies = await res.json();
      setFilteredMovies(movies.results);
      setLoading(false);
    }
    fetchData().catch(console.error);
  }, [genreString])
  //search by title

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/movies/search?title=${searchQuery}`);
      const movies = await res.json();
      setFilteredMovies(movies.results);
      setLoading(false);
    }
    if (searchQuery)
      fetchData().catch(console.error);
  }, [searchQuery])
  return (

    <div className="">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Explore Movies</h1>
            <Button
              variant="ghost"
              size="icon"
              className=" text-mocha-text hover:bg-mocha-teal"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5 " />
            </Button>
          </div>

          {/* Search and Filters - Desktop */}
          <div className="hidden md:flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search movies..."
                className="pl-10 bg-gray-900 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedGenre} onValueChange={(genre) => {
                setSelectedGenre(genre);
                setGenres(prev => [...prev, genre]);
                gen(genre);
              }}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="all">All Genres</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre.id} value={genre.name}
                    >
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search and Filters - Mobile */}
          {showFilters && (
            <div className="md:hidden flex flex-col gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search movies..."
                  className="pl-10 bg-gray-900 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Select value={selectedGenre} onValueChange={(genre) => {
                    setSelectedGenre(genre);
                    setGenres(prev => [...prev, genre]);
                    gen(genre);
                  }}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      {allGenres.map((genre) => (
                        <SelectItem key={genre.id} value={genre.name}>;
                          {genre.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {(searchQuery || genres.length !== 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1 text-sm">
                  <span>Search: {searchQuery}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 text-gray-400 hover:text-mocha-text hover:bg-mocha-blue"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {genres.length > 0 && genres.map((genre) => (
                <div
                  key={genre}
                  className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1 text-sm"
                >
                  <span>{genre}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 text-gray-400 hover:text-white"
                    onClick={() => {
                      setGenres(prev => prev.filter(g => g !== genre));
                      if (selectedGenre === genre) setSelectedGenre(''); // optional
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              <Button
                className="text-mocha-overlay2 bg-mocha-base hover:bg-mocha-base hover:text-mocha-blue text-sm p-4 h-6"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("");
                  setGenres([]);
                  setGenreString("");
                }}
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Movies Grid */}
          {loading
            ? <div className='flex items-center justify-center py-12'>
              <Loader />
              <span className='text-xl font-medium'>Hold Up BBG!</span>
            </div>
            : filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {filteredMovies.map((movie: MovieProps) => (
                  <div key={movie!.id} className="flex flex-col">
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-400 mb-4">No movies found matching your criteria</p>
                <Button
                  variant="outline"
                  className="bg-mocha-surface0 hover:bg-mocha-blue border border-mocha-text"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedGenre("")
                    setGenres([]);
                    setGenreString("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
        </div>
      </main >
    </div >
  )
}

export default Page
