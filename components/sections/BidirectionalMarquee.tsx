
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

  // Premium fallback images exactly matching khitishpicture.com for track 1
  const fallbackTrack1 = [
    { url: "https://www.khitishpicture.com/assets/img/p_001.jpg", label: "Bridal Vogue · Studio Session" },
    { url: "https://www.khitishpicture.com/assets/img/p_002.jpg", label: "Beauty Defined · Bridal Portraits" },
    { url: "https://www.khitishpicture.com/assets/img/p_003.jpg", label: "Bridal Elegance · Detail Shots" },
    { url: "https://www.khitishpicture.com/assets/img/p_004.jpg", label: "Royal Bride · Lehenga Portrait" },
    { url: "https://www.khitishpicture.com/assets/img/p_005.jpg", label: "Bridal Grace · Close Portrait" },
    { url: "https://www.khitishpicture.com/assets/img/p_006.jpg", label: "Silhouette · Cinematic Bridal" },
    { url: "https://www.khitishpicture.com/assets/img/p_007.jpg", label: "Joyful Bride · Reception Night" },
    { url: "https://www.khitishpicture.com/assets/img/p_008.jpg", label: "Bridal Smile · Event Candid" },
  ];

  // Premium fallback images exactly matching khitishpicture.com for track 2
  const fallbackTrack2 = [
    { url: "https://www.khitishpicture.com/assets/img/p_016.jpg", label: "Portrait Studio · Client Session" },
    { url: "https://www.khitishpicture.com/assets/img/p_015.jpg", label: "Royal Bride · Dark Cinematic" },
    { url: "https://www.khitishpicture.com/assets/img/p_014.jpg", label: "VOGUE Edit · Mirror Reflection" },
    { url: "https://www.khitishpicture.com/assets/img/p_013.jpg", label: "Golden Ring · Bridal Film Look" },
    { url: "https://www.khitishpicture.com/assets/img/p_012.jpg", label: "Ring Light Bridal · Dark Edit" },
    { url: "https://www.khitishpicture.com/assets/img/p_011.jpg", label: "Wedding Couple · B&W Cinematic" },
    { url: "https://www.khitishpicture.com/assets/img/p_010.jpg", label: "Bridal Joy · Flower Arrangement" },
    { url: "https://www.khitishpicture.com/assets/img/p_009.jpg", label: "The Bride · Bokeh Portrait" },
  ];

  // Assign track items dynamically if database images exist
  let track1Items = fallbackTrack1;
  let track2Items = fallbackTrack2;

  if (images.length > 0) {
    const formatted = images.map((img, i) => ({
      url: img.url,
      label: `${img.category} · Shot ${i + 1}`
    }));
    const half = Math.ceil(formatted.length / 2);
    track1Items = formatted.slice(0, half);
    track2Items = formatted.slice(half);
  }

  // Helper to ensure continuous seamless loop with duplication
  const prepareTrackItems = (items: { url: string; label: string }[]) => {
    let base = [...items];
    while (base.length > 0 && base.length < 8) {
      base = [...base, ...base];
    }
    return [...base, ...base];
  };

  const finalTrack1 = prepareTrackItems(track1Items);
  const finalTrack2 = prepareTrackItems(track2Items);

  return (
    <section 
      className={`photo-strip my-12 md:my-16 transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Track 1 - Right to Left */}
      <div className="ms-track">
        {finalTrack1.map((item, index) => (
          <div key={`track1-${index}`} className="ms-item group">
            <img
              src={item.url}
              alt={item.label}
              loading="lazy"
            />
            <div className="ms-lbl">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Track 2 - Left to Right */}
      <div className="ms-track-2">
        {finalTrack2.map((item, index) => (
          <div key={`track2-${index}`} className="ms-item group">
            <img
              src={item.url}
              alt={item.label}
              loading="lazy"
            />
            <div className="ms-lbl">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
