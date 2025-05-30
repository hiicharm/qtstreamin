"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Home, Clock, Calendar, Star } from "lucide-react"
import { useParams } from "next/navigation"
import { imageUrlPrefix } from "@/utils/constants"
import Header from "@/components/Header"
import { DEFAULT_SOURCE, getMovieUrl, SOURCES } from "@/utils/sources"
import { MovieProps } from "@/lib/tmdbApi"

export default function MovieWatchPage() {

  const params = useParams<{ id: string }>();
  const id = params.id
  const parsedId = Number(id);
  const sources = SOURCES;
  const [movie, setMovie] = useState<MovieProps>();
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        if (!res.ok) {
          console.log(`Error getting movie details: ${res.status}`);
          return;
        }
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    getMovie();
  }, [id]);

  const defaultUrl = getMovieUrl(DEFAULT_SOURCE.id, parsedId)
  // const [isMuted, setIsMuted] = useState(false)
  const [selectedSource, setSelectedSource] = useState("movies-club")
  const [isLoading, setIsLoading] = useState(true)
  const [movieUrl, setMovieUrl] = useState(defaultUrl)
  // Simulate video loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [selectedSource])

  return (
    <div className="">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 pt-30">
        <div className="flex items-center text-xl">
          <Link href="/" className="hover:text-mocha-teal flex items-center">
            <Home className="h-3.5 w-3.5 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <Link href="/movies" className="hover:text-mocha-teal">
            Movies
          </Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <Link href={`/movies/${params.id}`} className="">
            {movie?.title}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Movie Info Sidebar */}
          <div className="w-full md:w-72 bg-mocha-mantle rounded-lg overflow-hidden">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={`${imageUrlPrefix}w500${movie?.poster_path}`}
                alt={"movie title"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mocha-crust to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="font-bold text-xl">{movie?.title}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-mocha-subtext0">
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {movie?.release_date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {movie?.runtime}
                  </span>
                  <span className="flex items-center">
                    <Star className="h-3.5 w-3.5 text-mocha-yellow mr-1" />
                    {movie?.vote_average}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1 mb-4">
                {movie?.genres?.map((genre) => (
                  <Badge key={genre.id} variant="outline" className="border-mocha-overlay0 text-mocha-text text-sm">
                    {genre.name}
                  </Badge>
                ))}
              </div>
              <p className="text-md text-mocha-text">{movie?.overview}</p>

              {/* Quality Selection */}

              {/* Related Movies */}
              {/*
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">You May Also Like</h3>
                <div className="space-y-3">
                  {relatedMovies.map((relatedMovie) => (
                    <Link
                      key={relatedMovie.id}
                      href={`/movies/${relatedMovie.id}`}
                      className="flex items-center gap-3 hover:bg-gray-800/50 p-2 rounded-lg"
                    >
                      <div className="relative w-12 h-16 flex-shrink-0">
                        <Image
                          src={relatedMovie.imageUrl || "/placeholder.svg"}
                          alt={relatedMovie.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{relatedMovie.title}</p>
                        <p className="text-xs text-gray-400">{relatedMovie.year}</p>
                      </div>
                    </Link>
                  ))}
                </div>
            </div>
              */}
            </div>
          </div>

          {/* Video Player */}
          <div className="flex-1">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <iframe
                    id='player-video'
                    title="e"
                    allowFullScreen={true}
                    className='aspect-video w-full rounded-2xl bg-transparent'
                    src={defaultUrl}
                  />
                </>
              )}
            </div>

            {/* Sources */}
            <div className="mt-8">
              <h3 className="text-md font-medium mb-4">Sources</h3>
              <div className="flex flex-wrap gap-2">
                {sources.map((source) => (
                  <Button
                    key={source.id}
                    variant={selectedSource === source.id ? "default" : "outline"}
                    className={
                      selectedSource === source.id
                        ? "bg-mocha-crust border border-mocha-teal  hover:bg-mocha-teal/90"
                        : "bg-mocha-mantle border-mocha-overlay0 hover:bg-mocha-teal"
                    }
                    onClick={() => {
                      setSelectedSource(source.id);
                      setMovieUrl(getMovieUrl(source.id, parsedId));
                      console.log(movieUrl)
                    }

                    }
                  >
                    {source.name}
                  </Button>
                ))}
                {/*<Button variant="outline" className="hover:bg-gray-800 hover:text-white">
                  More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                */}
              </div>
            </div>

            {/* Download Options */}
          </div>
        </div>
      </div>
    </div >
  )
}
