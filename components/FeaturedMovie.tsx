import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Star } from 'lucide-react'
import { imageUrlPrefix } from '@/utils/constants'
import { MovieProps } from '@/lib/tmdbApi'
import { Button } from './ui/button'
import { vote } from '@/utils/helpers'

const FeaturedMovie = ({ movie }: { movie: MovieProps }) => {
  return (
    <div className=' w-full h-[80vh]'>
      <div className="h-[100vh] w-full overflow-hidden aspect-[2/3] absolute inset-0">
        <Image src={movie.backdrop_path ? `${imageUrlPrefix}original${movie.backdrop_path}` : "https://placehold.co/600x400"}
          alt={movie.title}
          fill
          className="object-cover"
          priority />
        <div className="absolute inset-0 bg-gradient-to-r from-mocha-crust to-transparent" />
      </div>


      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 container mx-auto">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl text-mocha-text md:text-5xl font-bold">{movie.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-mocha-yellow mr-1" />
              <span className="text-mocha-subtext1">{vote(movie.vote_average)}/10</span>
            </div>
            <span className="text-mocha-subtext1">{movie.release_date}</span>
          </div>
          <p className="text-mocha-subtext1 line-clamp-3 md:line-clamp-none">{movie.overview}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/movies/${movie.id}`}>
              <Button className="bg-mocha-crust hover:bg-mocha-teal/80">
                <Play className="h-4 w-4 mr-2" /> Watch Now
              </Button>
            </Link>
            {/*<Button className="add-to-list-btn">
              <Plus className="h-4 w-4 mr-2" /> Add to List
            </Button>
            */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default FeaturedMovie
