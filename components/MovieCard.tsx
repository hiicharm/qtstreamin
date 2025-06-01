import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { MovieProps } from "@/lib/tmdbApi"
import { imageUrlPrefix } from "@/utils/constants"
import { vote } from "@/utils/helpers"


export default function MovieCard({ movie }: { movie: MovieProps }) {
  return (
    <Link href={`/movies/${movie.id}`} className="group">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
        <Image
          src={movie.poster_path ? `${imageUrlPrefix}w500${movie.poster_path}` : "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mocha-base/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h3 className="font-bold text-xl line-clamp-2">{movie.title}</h3>
          <div className="flex items-center mt-1">
            <Star className="h-3 w-3 text-mocha-yellow mr-1" />
            <span className="text-s text-mocha-subtext1">{vote(movie.vote_average)}/10</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
