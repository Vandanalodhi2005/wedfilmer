
'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Video as VideoIcon, Upload } from 'lucide-react';

type VideoItem = {
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

export default function ManageVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'Wedding' | 'Pre-Wedding' | 'Corporate' | 'Family' | 'all'>('all');
  const [formData, setFormData] = useState({
    category: 'Wedding' as const,
    url: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos');
      const data = await res.json();
      if (data.success) setVideos(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.onerror = () => {
        alert('Failed to read file. Please try again.');
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        alert('Please upload a valid video file');
        return;
      }
      setSelectedFile(file);
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
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setVideos([data.data, ...videos]);
        resetForm();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        const res = await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setVideos(videos.filter(vid => vid._id !== id));
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

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(vid => vid.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Videos</h1>
        <p className="text-slate-400">Add, view, and delete video content</p>
      </div>

      {/* Add Video Form */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Video
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Video Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Video
              </label>
              <div className="space-y-3">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer bg-slate-700 hover:bg-slate-600 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-slate-400" />
                    <p className="mb-1 text-sm text-slate-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">MP4, WebM, or MOV</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={handleFileUpload}
                  />
                </label>
                {/* Preview if file uploaded */}
                {previewUrl && (
                  <div className="bg-slate-700 rounded-xl p-3">
                    <p className="text-sm text-slate-300 mb-2">Video uploaded successfully!</p>
                    <video
                      src={previewUrl}
                      controls
                      className="w-full max-h-48 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Or URL Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Or enter Video URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/video.mp4"
                disabled={!!previewUrl}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Add Video'}
          </button>
        </form>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat.value
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Videos List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVideos.map((video) => (
          <div key={video._id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden group">
            <div className="aspect-video bg-slate-700 relative">
              <video
                src={video.url}
                className="w-full h-full object-cover"
                controls
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDeleteVideo(video._id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-400 text-sm capitalize">{video.category}</p>
            </div>
          </div>
        ))}
        {filteredVideos.length === 0 && (
          <div className="col-span-full text-center py-16">
            <VideoIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No videos yet. Add your first video above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
