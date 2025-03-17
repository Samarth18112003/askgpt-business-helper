
import React from 'react';
import Header from '@/components/Header';
import BusinessForm from '@/components/BusinessForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <BusinessForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
