"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"

export function Component({ movies, handleSearch, resetSearch }) {

  console.log(movies)

  const [query, setQuery] = useState('');

  function getUniqueCategories(categories) {
    return [...new Set(categories)];
  }

  function handleReset() {
    setQuery('');
    resetSearch();
  }

  return (
    <div
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Movie Search</h1>
        <Button className="flex items-center gap-2" variant="outline" onClick={() => handleReset()}>
          <RefreshCwIcon className="w-5 h-5" />
          Reset Search
        </Button>
      </div>
      <div className="mb-8">
        <Input
          className="w-full max-w-md"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={() => handleSearch(query)}
        />
        <Button className="ml-4" onClick={() => handleSearch(query)}>Search</Button>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          movies.map((movie, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{movie.m.properties.title}</h3>
                  <div
                    className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">{getUniqueCategories(movie.categories).join(', ')}</div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Starring: {movie.actors.join(', ')}</p>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                  {movie.m.properties.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">{movie.m.properties.rating}</span>
                  </div>
                  <div
                    className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400">
                    {movie.m.properties.awarded ? 'awarded' : 'No awarded'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

function RefreshCwIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>)
  );
}


function StarIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>)
  );
}
