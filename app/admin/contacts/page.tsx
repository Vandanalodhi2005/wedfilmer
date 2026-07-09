
'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, MessageSquare } from 'lucide-react';

type ContactInquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export default function ManageContacts() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      if (data.success) setInquiries(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDeleteInquiry = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      try {
        const res = await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          setInquiries(inquiries.filter(inq => inq._id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Contact Inquiries</h1>
        <p className="text-slate-400">View and manage all contact form submissions</p>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="text-center py-16 bg-slate-800 rounded-2xl border border-slate-700">
            <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No inquiries yet. Check back later!</p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{inquiry.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {inquiry.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {inquiry.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(inquiry.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteInquiry(inquiry._id)}
                    className="p-2 text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4">
                <p className="text-slate-300">{inquiry.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
