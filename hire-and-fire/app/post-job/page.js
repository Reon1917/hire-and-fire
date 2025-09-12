"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { JobPostingForm } from "@/components/ui/job-posting-form";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdJob, setCreatedJob] = useState(null);

  const handleJobCreated = (job) => {
    setCreatedJob(job);
    setShowSuccess(true);
  };

  const proceedToAnalysis = () => {
    router.push('/analyze');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="bg-card border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold text-foreground">Hire & Fire</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </nav>

        {/* Success Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Job Posted Successfully! 🎉
            </h1>
            
            <div className="bg-card border border-border rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold text-foreground mb-4">{createdJob?.title}</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Type:</strong> {createdJob?.type}</p>
                {createdJob?.location && <p><strong>Location:</strong> {createdJob.location}</p>}
                <p><strong>Created:</strong> {new Date(createdJob?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-8">
              Your job posting is ready! Now you can upload and analyze candidate resumes 
              to find the perfect match for this position.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={proceedToAnalysis}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Start Analyzing Resumes
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0" />
                  </svg>
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-foreground">Hire & Fire</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Post a New Job</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create your job posting to start receiving and analyzing candidate applications. 
            Our AI will help you find the best matches for your requirements.
          </p>
        </div>

        <JobPostingForm onJobCreated={handleJobCreated} />
      </div>
    </div>
  );
}