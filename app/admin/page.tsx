
'use client';

import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Video,
  Mail,
  TrendingUp
} from 'lucide-react';

type Stats = {
  images: number;
  videos: number;
  contacts: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ images: 0, videos: 0, contacts: 0 });

  const fetchStats = async () => {
    try {
      const [imagesRes, videosRes, contactsRes] = await Promise.all([
        fetch('/api/images'),
        fetch('/api/videos'),
        fetch('/api/contacts')
      ]);
      const imagesData = await imagesRes.json();
      const videosData = await videosRes.json();
      const contactsData = await contactsRes.json();
      setStats({
        images: imagesData.data?.length || 0,
        videos: videosData.data?.length || 0,
        contacts: contactsData.data?.length || 0
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Images', value: stats.images, icon: ImageIcon, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Videos', value: stats.videos, icon: Video, color: 'from-purple-500 to-pink-500' },
    { label: 'Contact Inquiries', value: stats.contacts, icon: Mail, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{card.value}</p>
                <p className="text-slate-400 text-sm mt-1">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/admin/images" className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity text-left block">
            Add New Image
          </a>
          <a href="/admin/videos" className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity text-left block">
            Add New Video
          </a>
        </div>
      </div>
    </div>
  );
}
