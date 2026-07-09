
"use client";

import { useState, useEffect } from "react";
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

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos', { credentials: 'include' });
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

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">Our Videos</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Video Highlights</h2>
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
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100"
                >
                  {/* Video Player */}
                  <div className="relative aspect-video bg-black">
                    <video
                      src={video.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Video Info */}
                  <div className="p-6">
                    <p className="text-gray-500 text-sm capitalize">{video.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Show More Button */}
            {videos.length > 6 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllVideos(!showAllVideos)}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  {showAllVideos ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <ScrollReveal>
            <div className="text-center py-24 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="text-gray-500 text-lg">No videos yet</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for our latest video highlights</p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
