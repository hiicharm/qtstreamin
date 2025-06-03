import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { User } from "lucide-react"

export default function Header() {

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-sm header">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-mocha-teal">
            qtStream.in
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-mocha-teal transition-colors  active:text-mocha-green">
              Home
            </Link>
            <Link href="/movies" className="hover:text-mocha-teal  transition-colors  active:text-mocha-green">
              Movies
            </Link>
            {/*<Link href="/tvShows" className="hover:text-mocha-teal  transition-colors  active:text-mocha-green">
              TV Shows
            </Link>
            */}
          </nav>
        </div>

        {/* right section*/}
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Button variant="ghost" size="icon" className=" hover:bg-mocha-teal active:bg-mocha-green">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="icon" className=" hover:bg-mocha-teal active:bg-mocha-green">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )

}
