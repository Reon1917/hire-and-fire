"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AnalyzePage() {
  const [analysisResults, setAnalysisResults] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  // Load current job from session storage
  useEffect(() => {
    const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    
    if (demoMode) {
      setCurrentJob({
        title: "Machine Learning Engineer",
        type: "Full-time",
        location: "San Francisco, CA (Hybrid)",
        description: "We are seeking a talented Machine Learning Engineer to join our AI team...",
        requirements: "• 3+ years of experience in machine learning and data science\n• Strong programming skills in Python..."
      });
    } else {
      const jobData = sessionStorage.getItem('currentJob');
      if (jobData) {
        setCurrentJob(JSON.parse(jobData));
      }
    }
  }, []);

  const candidateFileNames = [
    'sarah_chen_resume.pdf',
    'marcus_rodriguez_resume.pdf',
    'aisha_patel_resume.pdf',
    'james_kim_resume.pdf',
    'elena_volkov_resume.pdf'
  ];

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    const results = [];

    try {
      // Analyze all 5 mock candidates
      for (let i = 0; i < candidateFileNames.length; i++) {
        const fileName = candidateFileNames[i];
        
        // Create a mock file object
        const mockFile = new File(['mock content'], fileName, { type: 'application/pdf' });
        const formData = new FormData();
        formData.append('file', mockFile);

        // Add a small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 800));

        const response = await fetch('/api/analyze-resume-demo', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Analysis failed for ${fileName}`);
        }

        const result = await response.json();
        results.push({
          filename: fileName,
          analysis: result,
          timestamp: new Date().toISOString()
        });
      }

      // Sort by job match score (descending)
      results.sort((a, b) => (b.analysis.job_suitability_score || 0) - (a.analysis.job_suitability_score || 0));
      
      setAnalysisResults(results);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleCardExpansion = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(analysisResults, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ml-engineer-analysis-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Dashboard
                </Link>
              </Button>
              {analysisResults.length > 0 && (
                <Button variant="outline" size="sm" onClick={exportResults}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export Results
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">AI Candidate Analysis</h1>
          <p className="text-muted-foreground mt-1">
            {currentJob ? `Analyzing candidates for ${currentJob.title}` : 'Instant AI-powered candidate evaluation'}
          </p>
        </div>

        {/* Job Context Display */}
        {currentJob && (
          <Card className="bg-blue-50 border-blue-200 mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-blue-900">
                Analyzing for: {currentJob.title}
                <Badge className="ml-2 bg-green-600">DEMO MODE</Badge>
              </CardTitle>
              <div className="text-sm text-blue-700 space-y-1">
                {currentJob.location && <p><strong>Location:</strong> {currentJob.location}</p>}
                <p><strong>Type:</strong> {currentJob.type}</p>
                <p className="mt-2">
                  <strong>Key Requirements:</strong> 3+ years ML experience, Python, TensorFlow/PyTorch, Cloud platforms...
                </p>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Analysis Button or Results */}
        {analysisResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Analyze Candidates</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Click the button below to instantly analyze and compare 5 Machine Learning Engineer candidates using AI.
            </p>
            <Button
              onClick={startAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing {candidateFileNames.length} Candidates...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start AI Analysis
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Results Section */}
            <div className="lg:col-span-3">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{analysisResults.length}</p>
                    <p className="text-sm text-muted-foreground">Candidates</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {analysisResults.length > 0 
                        ? Math.round(analysisResults.reduce((sum, r) => sum + (r.analysis.job_suitability_score || 0), 0) / analysisResults.length)
                        : 0
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Match Score</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {analysisResults.filter(r => (r.analysis.job_suitability_score || 0) >= 75).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Strong Matches</p>
                  </CardContent>
                </Card>
              </div>

              {/* Candidate Cards */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground mb-6">Candidate Analysis Results</h2>
                {analysisResults.map((result, index) => (
                  <Card key={index} className="overflow-hidden">
                    {/* Compact Header */}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {getInitials(result.analysis.name || 'Unknown')}
                          </div>
                          
                          {/* Basic Info */}
                          <div>
                            <CardTitle className="text-lg">
                              {result.analysis.name || `Candidate ${index + 1}`}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {result.analysis.total_experience_years} years experience
                            </p>
                          </div>
                        </div>
                        
                        {/* Scores */}
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${getScoreColor(result.analysis.job_suitability_score || 0)}`}>
                              {result.analysis.job_suitability_score || 0}/100
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {result.analysis.job_match_analysis?.recommendation || getScoreLabel(result.analysis.overall_score)}
                            </p>
                          </div>
                          
                          {/* Expand Button */}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleCardExpansion(index)}
                          >
                            <svg 
                              className={`w-4 h-4 transition-transform ${expandedCards[index] ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                      
                      {/* Compact Skills Preview */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {result.analysis.skills?.slice(0, 4).map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex}
                            variant={skill.level === 'expert' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                        {result.analysis.skills?.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{result.analysis.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    {/* Expandable Details */}
                    {expandedCards[index] && (
                      <CardContent className="border-t space-y-6">
                        {/* Summary */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Professional Summary</h4>
                          <p className="text-muted-foreground text-sm">{result.analysis.summary}</p>
                        </div>

                        {/* All Skills */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Skills & Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {result.analysis.skills?.map((skill, skillIndex) => (
                              <Badge 
                                key={skillIndex}
                                variant={skill.level === 'expert' ? 'default' : 'secondary'}
                                className="flex items-center space-x-1"
                              >
                                <span>{skill.name}</span>
                                <span className="text-xs">
                                  ({skill.level})
                                </span>
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Education */}
                        {result.analysis.education && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Education</h4>
                            <p className="text-muted-foreground text-sm">
                              {result.analysis.education.degree} in {result.analysis.education.field}
                              {result.analysis.education.institution && ` - ${result.analysis.education.institution}`}
                              {result.analysis.education.graduation_year && ` (${result.analysis.education.graduation_year})`}
                            </p>
                          </div>
                        )}

                        {/* Job Match Analysis */}
                        {result.analysis.job_match_analysis && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-3">Job Match Analysis</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {result.analysis.job_match_analysis.matching_skills && result.analysis.job_match_analysis.matching_skills.length > 0 && (
                                <div>
                                  <p className="font-medium text-green-700 text-sm mb-2">✓ Matching Skills</p>
                                  <div className="flex flex-wrap gap-1">
                                    {result.analysis.job_match_analysis.matching_skills.map((skill, skillIndex) => (
                                      <Badge key={skillIndex} className="bg-green-100 text-green-800 border-green-300 text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {result.analysis.job_match_analysis.missing_skills && result.analysis.job_match_analysis.missing_skills.length > 0 && (
                                <div>
                                  <p className="font-medium text-orange-700 text-sm mb-2">⚠ Missing Skills</p>
                                  <div className="flex flex-wrap gap-1">
                                    {result.analysis.job_match_analysis.missing_skills.map((skill, skillIndex) => (
                                      <Badge key={skillIndex} className="bg-orange-100 text-orange-800 border-orange-300 text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            {result.analysis.job_match_analysis.experience_match && (
                              <div className="mt-4">
                                <p className="font-medium text-blue-700 text-sm mb-1">Experience Match</p>
                                <p className="text-sm text-blue-600">{result.analysis.job_match_analysis.experience_match}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Key Strengths */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Key Strengths</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                            {result.analysis.key_strengths?.map((strength, strengthIndex) => (
                              <li key={strengthIndex}>{strength}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4 border-t">
                          <Button variant="outline" size="sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Schedule Interview
                          </Button>
                          <Button variant="outline" size="sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Shortlist
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={exportResults}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setAnalysisResults([])}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    New Analysis
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              {analysisResults.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Top Candidates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysisResults.slice(0, 3).map((result, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded border">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {getInitials(result.analysis.name || 'Unknown')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{result.analysis.name}</p>
                          <p className="text-xs text-muted-foreground">{result.analysis.job_suitability_score || 0}/100 match</p>
                        </div>
                        <Badge className={getScoreColor(result.analysis.job_suitability_score || 0)} variant="secondary">
                          #{index + 1}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}