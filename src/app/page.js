"use client";

import { Component } from "@/components/component/component"
import './globals.css';
import { useState, useEffect } from 'react';

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [request, setRequest] = useState('');

  useEffect(() => {
    // Fetch movies data from API
    const fetchMovies = async () => {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request }),
      });
      const data = await response.json();
      console.log(data);
      setMovies(data);
    };

    fetchMovies();
  }, [request]);

  const handleSearch = (query) => {
    console.log(query)
    setRequest(query); // Actualiza la consulta en el estado
    
  };

  const resetSearch = () => {
    setRequest('');
  };

  return (
    <Component
      movies={movies}
      handleSearch={handleSearch}
      resetSearch={resetSearch}
    />
  )
}
