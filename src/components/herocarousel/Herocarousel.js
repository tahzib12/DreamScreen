import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Herocarousel.css";

const HeroCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const autoPlayDelay = 2000;

  // TMDB URL builder
  const tmdbImageUrl = (path, size = "original") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

  // Responsive image sets
  const buildImgSources = (path) => {
    if (!path) return { src: "", srcSet: "", sizes: "" };
    const src = tmdbImageUrl(path, "w780");
    const srcSet = [
      `${tmdbImageUrl(path, "w780")} 780w`,
      `${tmdbImageUrl(path, "w1280")} 1280w`,
      `${tmdbImageUrl(path, "original")} 2000w`,
    ].join(", ");
    const sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 96vw, 96vw";
    return { src, srcSet, sizes };
  };

  // Helper URLs
  const tmdbMovieUrl = (id) => `https://www.themoviedb.org/movie/${id}`;
  const ytSearchUrl = (title) =>
    `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} official trailer`)}`;
  const ytWatchUrl = (key) => `https://www.youtube.com/watch?v=${key}`;

  // Fetch trailer URL
  const fetchTrailerUrl = async (movieId) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
      );
      if (data?.results?.length) {
        const preferred =
          data.results.find(
            (v) => v.site === "YouTube" && /trailer/i.test(v.type) && /official/i.test(v.name || "")
          ) ||
          data.results.find((v) => v.site === "YouTube" && /trailer/i.test(v.type)) ||
          data.results.find((v) => v.site === "YouTube");
        if (preferred?.key) return ytWatchUrl(preferred.key);
      }
    } catch {}
    return null;
  };

  // Fetch popular movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const movies = (res.data?.results || []).slice(0, 5);

        const slidesWithExtras = await Promise.all(
          movies.map(async (m) => {
            const backdrop = m.backdrop_path || m.poster_path;
            const trailer = await fetchTrailerUrl(m.id);
            const title = m.title || m.name || "Untitled";
            return {
              id: m.id,
              backdrop,
              title,
              text: m.overview || "",
              playUrl: trailer || ytSearchUrl(title),
              infoUrl: tmdbMovieUrl(m.id),
            };
          })
        );

        setSlides(slidesWithExtras);
      } catch (e) {
        console.error("Error fetching movies:", e);
      }
    };
    fetchMovies();
  }, [API_KEY]);

  // Autoplay (always on)
  const timerRef = useRef(null);
  useEffect(() => {
    if (!slides.length) return;

    const tick = () => setCurrent((p) => (p + 1) % slides.length);
    timerRef.current = setInterval(tick, autoPlayDelay);

    const visHandler = () => {
      if (document.hidden && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      } else if (!document.hidden && !timerRef.current) {
        timerRef.current = setInterval(tick, autoPlayDelay);
      }
    };

    document.addEventListener("visibilitychange", visHandler);
    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", visHandler);
    };
  }, [slides, autoPlayDelay]);

  // Prefetch next image
  useEffect(() => {
    if (!slides.length) return;
    const nextIndex = (current + 1) % slides.length;
    const nextPath = slides[nextIndex]?.backdrop;
    if (nextPath) {
      const img = new Image();
      img.src = tmdbImageUrl(nextPath, "w1280");
    }
  }, [current, slides]);

  if (!slides.length) return <p className="loading-text">Loading movies...</p>;

  return (
    <div
      className="carousel-container hero-bleed"
      aria-roledescription="carousel"
    >
      <div className="carousel">
        {slides.map((slide, index) => {
          const isActive = index === current;
          const { src, srcSet, sizes } = buildImgSources(slide.backdrop);

          // low-quality preview for blur
          const blurSrc = tmdbImageUrl(slide.backdrop, "w300");

          return (
            <div
              key={slide.id}
              className={`carousel-slide ${isActive ? "active" : ""}`}
              aria-hidden={isActive ? "false" : "true"}
            >
              <div className="carousel-img-wrapper">
                <img
                  className="carousel-image blur-preview"
                  src={blurSrc}
                  alt=""
                  aria-hidden="true"
                />
                <img
                  className="carousel-image main-image"
                  alt={slide.title}
                  src={src}
                  srcSet={srcSet}
                  sizes={sizes}
                  loading={isActive && index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchpriority={isActive && index === 0 ? "high" : "auto"}
                  onLoad={(e) => e.target.classList.add("loaded")}
                />
              </div>

              <div className="carousel-caption">
                <h3>{slide.title}</h3>
                <p>{slide.text.length > 250 ? slide.text.slice(0, 150) + "..." : slide.text}</p>

                <div className="carousel-buttons">
                  <a
                    href={slide.playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-play"
                  >
                    ▶ Play
                  </a>
                  <a
                    href={slide.infoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-info"
                  >
                    ℹ More Info
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
