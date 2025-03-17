
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ResultProps {
  response: string;
}

const Result: React.FC<ResultProps> = ({ response }) => {
  useEffect(() => {
    // Animation timing helpers
    const timeout = setTimeout(() => {
      document.querySelectorAll('.highlight-animate').forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('bg-blue-50');
        }, index * 200);
      });
    }, 800);

    return () => clearTimeout(timeout);
  }, [response]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    toast.success("Copied to clipboard");
  };

  const downloadAsPDF = () => {
    // In a real implementation, we'd generate a PDF here
    // This is a placeholder to demonstrate the UI flow
    toast.info("Preparing PDF download...");
    setTimeout(() => {
      toast.success("PDF downloaded successfully");
    }, 1500);
  };

  // Parse the response into sections
  const parsedResponse = () => {
    return response.split('\n\n').map((paragraph, i) => {
      // Apply special styling to headings (assuming headings are short paragraphs)
      if (paragraph.length < 60 && (paragraph.includes(':') || paragraph.trim().endsWith(':'))) {
        return (
          <h3 key={i} className="text-lg font-semibold mb-2 mt-4 text-gray-800 highlight-animate transition-all duration-300 px-2 py-1 rounded">
            {paragraph}
          </h3>
        );
      }
      
      // Handle lists and bullet points
      if (paragraph.includes('- ')) {
        const items = paragraph.split('- ').filter(Boolean);
        return (
          <ul key={i} className="list-disc pl-5 space-y-1 my-3">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700 highlight-animate transition-all duration-300 px-1 rounded">
                {item.trim()}
              </li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={i} className="mb-3 text-gray-700 leading-relaxed highlight-animate transition-all duration-300 px-2 py-1 rounded">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-xl shadow-soft p-6 sm:p-8 max-w-3xl mx-auto"
    >
      <div className="mb-6 flex items-center">
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <CheckCircle2 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900">
            Business Analysis Results
          </h2>
          <p className="text-gray-500 text-sm">
            AI-generated insights based on your question
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-6">
        <div className="prose max-w-none">
          {parsedResponse()}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button 
          variant="outline" 
          className="flex items-center justify-center"
          onClick={copyToClipboard}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy to Clipboard
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center justify-center"
          onClick={downloadAsPDF}
        >
          <Download className="mr-2 h-4 w-4" />
          Download as PDF
        </Button>
      </div>
    </motion.div>
  );
};

export default Result;
