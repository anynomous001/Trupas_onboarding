'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RequestDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your request! We will get back to you shortly.');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 dark:bg-slate-950 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Request a Demo</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">See how TruePas can transform your business. Fill out the form below to schedule a personalized demo.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  onChange={handleChange} 
                  value={formData.name} 
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Work Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  onChange={handleChange} 
                  value={formData.email} 
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white" 
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
                <input 
                  type="text" 
                  name="company" 
                  id="company" 
                  required 
                  onChange={handleChange} 
                  value={formData.company} 
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows={4} 
                  onChange={handleChange} 
                  value={formData.message} 
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              <div className="text-center">
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
