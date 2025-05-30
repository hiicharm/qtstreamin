import config from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: config.env.tmdb.tmdbAuthHeader!
    }
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) console.error("failed to get movie details from tmdb");
    const movie = await res.json();
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular movies' },
      { status: 500 }
    );
  }
}


