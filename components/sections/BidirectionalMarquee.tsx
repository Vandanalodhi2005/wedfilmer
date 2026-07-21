"use client";

import { useState, useEffect } from "react";

type ImageItem = {
  _id: string;
  url: string;
  publicId: string;
  category: 'Wedding' | 'Pre-Wedding' | 'Corporate' | 'Family';
  createdAt: string;
  updatedAt: string;
};

export function BidirectionalMarquee() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/images', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setImages(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Clean fallback images - no duplicates!
  const fallbackImages = [
    { url: "/hero-services.jpg" },
    { url: "https://www.khitishpicture.com/assets/img/p_002.jpg", category: "Wedding", label: "Wedding · Shot 2" },
    { url: "https://www.khitishpicture.com/assets/img/p_003.jpg", category: "Pre-Wedding", label: "Pre-Wedding · Shot 3" },
    { url: "https://www.khitishpicture.com/assets/img/p_004.jpg", category: "Pre-Wedding", label: "Pre-Wedding · Shot 4" },
    { url: "https://www.khitishpicture.com/assets/img/p_005.jpg", category: "Pre-Wedding", label: "Pre-Wedding · Shot 5" },
    { url: "https://www.khitishpicture.com/assets/img/p_006.jpg", category: "Wedding", label: "Wedding · Shot 6" },
    { url: "https://www.khitishpicture.com/assets/img/p_007.jpg", category: "Family", label: "Family · Shot 7" },
    { url: "https://www.khitishpicture.com/assets/img/p_008.jpg", category: "Family", label: "Family · Shot 8" },
  ];

  // Format admin images if available
  let displayImages = fallbackImages;
  if (images.length > 0) {
    displayImages = images.map((img, i) => ({
      url: img.url,
      category: img.category,
      label: `${img.category} · Shot ${i + 1}`
    }));
  }

  // Split into two tracks for bidirectional scrolling
  const track1 = [...displayImages, ...displayImages]; // duplicate for seamless loop (scroll left)
  const track2 = [...displayImages, ...displayImages]; // duplicate for seamless loop (scroll right)

  return (
    <section 
      className={`photo-strip my-12 md:my-16 transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Track 1 - Left to Right */}
      <div className="ms-track-container">
        <div className="ms-track">
          {track1.map((item, index) => (
            <div key={`t1-${index}`} className="ms-item group">
              <img
                src={item.url}
                alt={item.label}
                loading="lazy"
              />
              <div className="ms-lbl">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Track 2 - Right to Left */}
      <div className="ms-track-container">
        <div className="ms-track-2">
          {track2.map((item, index) => (
            <div key={`t2-${index}`} className="ms-item group">
              <img
                src={item.url}
                alt={item.label}
                loading="lazy"
              />
              <div className="ms-lbl">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
