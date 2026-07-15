
'use client';

import { useState, useEffect } from 'react';
import { adminFetch } from '@/lib/adminApi';
import { Plus, Trash2, Image as ImageIcon, Upload } from 'lucide-react';

// Compress image using canvas before uploading to Cloudinary (10MB limit)
const compressImage = (file: File, maxSizeMB = 8, maxWidth = 1920): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Resize if too wide
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);

        // Try decreasing quality until under limit
        let quality = 0.85;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        while (dataUrl.length > maxSizeMB * 1024 * 1024 * 1.37 && quality > 0.1) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

type ImageItem = {
  _id: string;
  url: string;
  publicId: string;
  category: 'Wedding' | 'Pre-Wedding' | 'Corporate' | 'Family';
  createdAt: string;
  updatedAt: string;
};

const categories = [
  { value: 'Wedding', label: 'Wedding' },
  { value: 'Pre-Wedding', label: 'Pre-Wedding' },
  { value: 'Corporate', label: 'Corporate Events' },
  { value: 'Family', label: 'Family' },
];

export default function ManageImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'Wedding' | 'Pre-Wedding' | 'Corporate' | 'Family' | 'all'>('all');
  const [formData, setFormData] = useState({
    category: 'Wedding' as const,
    url: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await adminFetch('/api/images');
      const data = await res.json();
      if (data.success) setImages(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log('Checking cookies:', document.cookie);
    fetchImages();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      // Compress and preview at the same time
      compressImage(selectedFile)
        .then((dataUrl) => setPreviewUrl(dataUrl))
        .catch((err) => {
          console.error('Compression failed:', err);
          // Fallback to raw file
          const reader = new FileReader();
          reader.onload = (e) => setPreviewUrl(e.target?.result as string);
          reader.readAsDataURL(selectedFile);
        });
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl && !formData.url) return;
    setLoading(true);
    try {
      const payload: any = { category: formData.category };
      if (previewUrl) payload.base64 = previewUrl;
      if (formData.url) payload.url = formData.url;
      const res = await adminFetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log('API response:', data);
      if (data.success) {
        setImages([data.data, ...images]);
        resetForm();
      } else {
        alert(data.message || 'Failed to upload');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        const res = await adminFetch(`/api/images?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setImages(images.filter(img => img._id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ category: 'Wedding', url: '' });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Images</h1>
        <p className="text-slate-400">Add, view, and delete portfolio images</p>
      </div>

      {/* Add Image Form */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Image
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Upload Image</label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center justify-center gap-2 px-4 py-6 bg-slate-700 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer transition-colors" style={{ '--hover-border': '#B8A796' } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#B8A796')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '')}>
                  <Upload className="w-6 h-6 text-slate-400" />
                  <span className="text-slate-400">
                    {selectedFile ? selectedFile.name : 'Click to select or drag and drop'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {previewUrl && (
                  <div className="relative w-full max-w-xs mx-auto">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Or URL Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Or enter Image URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ '--tw-ring-color': '#B8A796' } as React.CSSProperties}
                placeholder="https://example.com/image.jpg"
                disabled={!!previewUrl}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ '--tw-ring-color': '#B8A796' } as React.CSSProperties}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || (!previewUrl && !formData.url)}
            className="px-8 py-3 text-slate-900 font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ background: '#B8A796' }}
          >
            {loading ? 'Uploading...' : 'Add Image'}
          </button>
        </form>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === 'all'
              ? 'text-slate-900'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          style={selectedCategory === 'all' ? { background: '#B8A796' } : undefined}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat.value
                ? 'text-slate-900'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            style={selectedCategory === cat.value ? { background: '#B8A796' } : undefined}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div key={image._id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 group">
            <div className="aspect-square bg-slate-700 relative">
              <img
                src={image.url}
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDeleteImage(image._id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-slate-400 text-sm capitalize">{image.category}</p>
            </div>
          </div>
        ))}
        {filteredImages.length === 0 && (
          <div className="col-span-full text-center py-16">
            <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No images yet. Add your first image above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
