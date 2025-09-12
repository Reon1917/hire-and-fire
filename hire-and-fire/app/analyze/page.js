"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResumeUpload } from "@/components/ui/resume-upload";
import Link from "next/link";

export default function AnalyzePage() {
  const [analysisResults, setAnalysisResults] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
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
    link.download = `resume-analysis-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
          <h1 className="text-3xl font-bold text-foreground">AI Resume Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Upload PDF resumes and get instant AI-powered candidate insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            {analysisResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {analysisResults.length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Resume{analysisResults.length > 1 ? 's' : ''} Analyzed
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {analysisResults.length > 0 
                          ? Math.round(analysisResults.reduce((sum, r) => sum + r.analysis.overall_score, 0) / analysisResults.length)
                          : 0
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Average Score
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {analysisResults.filter(r => r.analysis.overall_score >= 70).length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Strong Candidates
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysisResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={exportResults}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter Results
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Detailed Results */}
        {analysisResults.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Detailed Analysis Results</h2>
            <div className="grid gap-6">
              {analysisResults.map((result, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {result.analysis.name || `Candidate ${index + 1}`}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm mt-1">
                          {result.analysis.total_experience_years} years experience • 
                          Analyzed {new Date(result.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex flex-col space-y-1">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${getScoreColor(result.analysis.overall_score)}`}>
                            Overall: {result.analysis.overall_score}/100
                          </div>
                          {result.analysis.job_suitability_score && (
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${getScoreColor(result.analysis.job_suitability_score)} bg-opacity-90`}>
                              Job Match: {result.analysis.job_suitability_score}/100
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {result.analysis.job_match_analysis?.recommendation || getScoreLabel(result.analysis.overall_score)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Summary */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Professional Summary</h4>
                      <p className="text-muted-foreground">{result.analysis.summary}</p>
                    </div>

                    {/* Skills */}
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
                        <p className="text-muted-foreground">
                          {result.analysis.education.degree} in {result.analysis.education.field}
                          {result.analysis.education.institution && ` - ${result.analysis.education.institution}`}
                          {result.analysis.education.graduation_year && ` (${result.analysis.education.graduation_year})`}
                        </p>
                      </div>
                    )}

                    {/* Key Strengths */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Strengths</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {result.analysis.key_strengths?.map((strength, strengthIndex) => (
                          <li key={strengthIndex}>{strength}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Job Match Analysis */}
                    {result.analysis.job_match_analysis && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-3">Job Match Analysis</h4>
                        <div className="space-y-3">
                          {result.analysis.job_match_analysis.matching_skills && result.analysis.job_match_analysis.matching_skills.length > 0 && (
                            <div>
                              <p className="font-medium text-green-700 text-sm mb-2">✓ Matching Skills</p>
                              <div className="flex flex-wrap gap-1">
                                {result.analysis.job_match_analysis.matching_skills.map((skill, skillIndex) => (
                                  <Badge key={skillIndex} className="bg-green-100 text-green-800 border-green-300">
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
                                  <Badge key={skillIndex} className="bg-orange-100 text-orange-800 border-orange-300">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {result.analysis.job_match_analysis.experience_match && (
                            <div>
                              <p className="font-medium text-blue-700 text-sm mb-1">Experience Match</p>
                              <p className="text-sm text-blue-600">{result.analysis.job_match_analysis.experience_match}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Recommended Roles */}
                    {result.analysis.recommended_roles && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Recommended Roles</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.analysis.recommended_roles.map((role, roleIndex) => (
                            <Badge key={roleIndex} variant="outline">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

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
                        Save to Favorites
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}