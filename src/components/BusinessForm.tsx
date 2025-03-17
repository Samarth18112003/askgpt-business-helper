import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ImagePlus, LoaderCircle, Send, Trash2 } from 'lucide-react';
import { generateAIResponse } from '@/lib/openai';
import { sendEmail } from '@/lib/email';
import Result from './Result';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  question: z.string().min(10, "Question must be at least 10 characters long"),
  sendEmail: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const BusinessForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [businessImage, setBusinessImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sendEmail: false
    }
  });

  const sendEmailValue = watch('sendEmail');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBusinessImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setBusinessImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      toast.info("Analyzing your business question...");

      // Generate AI response
      const response = await generateAIResponse(data.question, data.name);
      setResult(response);

      // Send email if requested
      if (data.sendEmail) {
        await sendEmail({
          to: data.email,
          name: data.name,
          question: data.question,
          response: response
        });
        toast.success("Results sent to your email!");
      }

      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-soft p-6 sm:p-8 md:p-10 max-w-3xl mx-auto"
      >
        <div className="space-y-8">
          <div className="stagger-animation space-y-6">
            {/* Form Header */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">
                Business Consultation Form
              </h2>
              <p className="text-gray-500 text-sm">
                Fill out the form below to receive AI-generated business insights.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name here"
                  className="w-full"
                  {...register('name')}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name.message}</span>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email here"
                  className="w-full"
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number here"
                  className="w-full"
                  {...register('phone')}
                />
              </div>

              {/* Business Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="businessImage">Business Image (Optional)</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="businessImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                
                {!imagePreview ? (
                  <div 
                    className="image-upload-placeholder h-40"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload an image of your business</span>
                    <span className="text-xs text-gray-400 mt-1">(Max size: 5MB)</span>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden h-40">
                    <img 
                      src={imagePreview} 
                      alt="Business preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                )}
              </div>

              {/* Business Question */}
              <div className="space-y-2">
                <Label htmlFor="question">Your Business Question</Label>
                <Textarea
                  id="question"
                  placeholder="Describe your business and what you'd like advice on. For example: I run a small bakery and want to improve my online presence."
                  className="w-full min-h-[120px]"
                  {...register('question')}
                />
                {errors.question && (
                  <span className="text-red-500 text-sm">{errors.question.message}</span>
                )}
              </div>

              {/* Send Email Option */}
              <div className="flex items-center space-x-2">
                <Checkbox id="sendEmail" {...register('sendEmail')} />
                <Label htmlFor="sendEmail" className="text-sm cursor-pointer">
                  Send the results to my email address
                </Label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Get Business Insights
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
      
      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <div id="result-section" className="mt-12">
            <Result response={result} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessForm;

