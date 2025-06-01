

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft } from "lucide-react"
import MovieCard from "@/components/MovieCard"
import { MovieProps } from "@/lib/tmdbApi"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [genre, setGenre] = useState("all")
  const [year, setYear] = useState([1990, 2024])
  const [rating, setRating] = useState([0, 5])

  // Mock search results
  const searchResults: MovieProps[] = [
    {
      id: 1,
      title: "The Batman",
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: 4.5,
      release_date: "2022",
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: 4.7,
      release_date: "2022",
    },
    {
      id: 3,
      title: "Everything Everywhere All at Once",
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: 4.9,
      release_date: "2022",
    },
    {
      id: 4,
      title: "The Whale",
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: 4.3,
      release_date: "2022",
    },
    {
      id: 5,
      title: "Black Panther: Wakanda Forever",
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: 4.4,
      release_date: "2022",
    },
    {
      id: 6,
      title: "Oppenheimer",
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: 4.8,
      release_date: "2023",
    },
    {
      id: 7,
      title: "Barbie",
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: 4.2,
      release_date: "2023",
    },
    {
      id: 8,
      title: "Poor Things",
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: 4.6,
      release_date: "2023",
    },
  ]

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:text-[#00BFFF]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Search</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search for movies or TV shows..."
            className="bg-gray-900 border-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block mb-2 text-sm font-medium">Genre</label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="horror">Horror</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Year Range</label>
            <div className="px-2">
              <Slider
                defaultValue={[1990, 2024]}
                max={2024}
                min={1950}
                step={1}
                onValueChange={(value) => setYear(value)}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>{year[0]}</span>
                <span>{year[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Rating</label>
            <div className="px-2">
              <Slider defaultValue={[0, 5]} max={5} min={0} step={0.1} onValueChange={(value) => setRating(value)} />
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>{rating[0].toFixed(1)}</span>
                <span>{rating[1].toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
