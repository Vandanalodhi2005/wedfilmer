
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type VideoItem = {
  _id: string;
  url: string;
  publicId: string;
  category: 'Wedding' | 'Pre-Wedding' | 'Corporate' | 'Family';
  createdAt: string;
  updatedAt: string;
};

export function VideoGallerySection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setVideos(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const displayedVideos = showAllVideos ? videos : videos.slice(0, 6);

  const playVideo = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => undefined);
    }
  };

  const pauseVideo = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-muted mb-4">Our Videos</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-text">Video Highlights</h2>
          </div>
        </ScrollReveal>

        {videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedVideos.map((video, idx) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="overflow-hidden rounded-xl glass-card group transition-transform duration-300 hover:-translate-y-1"
                  onMouseEnter={() => playVideo(video._id)}
                  onMouseLeave={() => pauseVideo(video._id)}
                >
                  {/* Video Player */}
                  <div className="relative aspect-video bg-black">
                    <video
                      ref={(el) => {
                        videoRefs.current[video._id] = el;
                      }}
                      src={video.url}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      controls
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Video Info */}
                  <div className="p-6">
                    <p className="text-muted text-sm capitalize">{video.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Show More Button */}
            {videos.length > 6 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllVideos(!showAllVideos)}
                  className="px-8 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent-light transition-colors"
                >
                  {showAllVideos ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <ScrollReveal>
            <div className="text-center py-24 glass-card rounded-2xl">
              <p className="text-muted text-lg">No videos yet</p>
              <p className="text-muted/70 text-sm mt-2">Check back soon for our latest video highlights</p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
