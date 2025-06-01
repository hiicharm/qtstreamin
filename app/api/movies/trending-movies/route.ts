import { NextResponse } from "next/server";

export async function GET() {
  const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PRIVATE_TMDB_AUTH_HEADER!
    }
  };

  try {

    const res = await fetch(url, options);
    if (!res.ok) {
      return NextResponse.json(
        { error: `API request failed with status ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {

    console.error('Error fetching popular movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular movies' },
      { status: 500 }
    );
  }
}
