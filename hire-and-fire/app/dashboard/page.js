"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [jobs] = useState([
    { 
      id: 1, 
      title: "Machine Learning Engineer", 
      applicants: 47, 
      status: "Active", 
      created: "3 days ago",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      description: "We are seeking a talented Machine Learning Engineer to join our AI team and help build cutting-edge ML systems that power our products. You will work on designing, implementing, and deploying machine learning models at scale, collaborating with cross-functional teams to solve complex business problems through data-driven solutions.",
      requirements: "• 3+ years of experience in machine learning and data science\n• Strong programming skills in Python, with experience in ML frameworks (TensorFlow, PyTorch, scikit-learn)\n• Experience with cloud platforms (AWS, GCP, or Azure) and MLOps tools\n• Solid understanding of statistics, linear algebra, and machine learning algorithms\n• Experience with data preprocessing, feature engineering, and model evaluation\n• Knowledge of deep learning architectures (CNNs, RNNs, Transformers)",
      salary_range: "$120,000 - $180,000",
      preferred_skills: ["Python", "TensorFlow", "PyTorch", "AWS", "GCP", "Deep Learning", "MLOps"]
    }
  ]);

  const [recentActivity] = useState([
    { id: 1, action: "New application received", job: "Machine Learning Engineer", time: "30 minutes ago" },
    { id: 2, action: "AI screening completed", job: "Machine Learning Engineer", time: "2 hours ago" },
    { id: 3, action: "Candidate shortlisted", job: "Machine Learning Engineer", time: "4 hours ago" },
    { id: 4, action: "Resume analysis completed", job: "Machine Learning Engineer", time: "6 hours ago" },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetail, setShowJobDetail] = useState(false);

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowJobDetail(true);
  };

  const handleAnalyzeResumes = () => {
    // Store job data in session storage for the analyze page
    if (selectedJob) {
      sessionStorage.setItem('currentJob', JSON.stringify(selectedJob));
    }
    setShowJobDetail(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-foreground">Hire & Fire</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-8h4v8z" />
                </svg>
                Export Data
              </Button>
              <div className="w-8 h-8 bg-muted rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening with your ML Engineer hiring.</p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
              <Link href="/post-job">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Post Job & Analyze Resumes
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/analyze">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Quick Analysis
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Jobs</p>
                  <p className="text-2xl font-bold text-foreground">1</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Applicants</p>
                  <p className="text-2xl font-bold text-foreground">47</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Shortlisted</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">AI Analyzed</p>
                  <p className="text-2xl font-bold text-foreground">35</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Jobs */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-foreground">{job.title}</h3>
                          <Badge className="bg-green-100 text-green-800">HOT</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{job.applicants} applicants • {job.created}</p>
                        <p className="text-xs text-muted-foreground mt-1">{job.location} • {job.type}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => handleViewJob(job)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.job} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" onClick={() => handleViewJob(jobs[0])}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-8h4v8z" />
                  </svg>
                  Analyze ML Resumes
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/analyze">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Quick Upload
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {showJobDetail && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.location} • {selectedJob.type}</p>
                </div>
                <Button variant="outline" onClick={() => setShowJobDetail(false)}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Job Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-gray-700 whitespace-pre-line font-sans">{selectedJob.requirements}</pre>
                </div>
              </div>

              {/* Preferred Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferred Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.preferred_skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Salary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Compensation</h3>
                <p className="text-xl font-bold text-green-600">{selectedJob.salary_range}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedJob.applicants}</p>
                  <p className="text-sm text-blue-600">Total Applicants</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">12</p>
                  <p className="text-sm text-green-600">Shortlisted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">5</p>
                  <p className="text-sm text-orange-600">In Demo</p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t p-6">
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                  asChild
                  onClick={handleAnalyzeResumes}
                >
                  <Link href="/analyze">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Analyze Resumes for this Job
                  </Link>
                </Button>
                <Button variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}