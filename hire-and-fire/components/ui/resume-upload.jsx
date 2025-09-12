"use client";

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ResumeUpload({ onAnalysisComplete }) {
  const [files, setFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);

  // Load current job from session storage
  useEffect(() => {
    const jobData = sessionStorage.getItem('currentJob');
    if (jobData) {
      setCurrentJob(JSON.parse(jobData));
    }
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true,
    maxSize: 50 * 1024 * 1024, // 50MB limit
  });

  const analyzeResumes = async () => {
    if (files.length === 0) return;
    
    setIsAnalyzing(true);
    const results = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        
        // Add job context if available
        if (currentJob) {
          formData.append('jobData', JSON.stringify(currentJob));
        }

        const response = await fetch('/api/analyze-resume', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Analysis failed for ${file.name}`);
        }

        const result = await response.json();
        results.push({
          filename: file.name,
          analysis: result,
          timestamp: new Date().toISOString()
        });
      }

      setAnalysisResults(results);
      onAnalysisComplete?.(results);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
    setAnalysisResults([]);
  };

  return (
    <div className="space-y-6">
      {/* Job Context Display */}
      {currentJob && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-blue-900">
              Analyzing for: {currentJob.title}
            </CardTitle>
            <div className="text-sm text-blue-700 space-y-1">
              {currentJob.location && <p><strong>Location:</strong> {currentJob.location}</p>}
              <p><strong>Type:</strong> {currentJob.type}</p>
              {currentJob.requirements && (
                <p className="mt-2">
                  <strong>Key Requirements:</strong> {currentJob.requirements.split('\n')[0]}...
                </p>
              )}
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Upload Area */}
      <Card className="border-dashed border-2">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`text-center cursor-pointer transition-colors ${
              isDragActive ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Upload PDF Resumes
                </h3>
                <p className="text-gray-600 mt-2">
                  {isDragActive
                    ? "Drop PDF files here..."
                    : "Drag & drop PDF files here, or click to browse"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports multiple files • Max 50MB per file • PDF format only
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Selected Files ({files.length})
              </h3>
              <Button variant="outline" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            </div>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Button */}
      {files.length > 0 && (
        <div className="flex justify-center">
          <Button
            onClick={analyzeResumes}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Analyzing {files.length} resume{files.length > 1 ? 's' : ''}...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Analyze Resume{files.length > 1 ? 's' : ''} with AI
              </>
            )}
          </Button>
        </div>
      )}

      {/* Analysis Results Preview */}
      {analysisResults.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Analysis Complete
              </h3>
              <Badge variant="secondary">
                {analysisResults.length} candidate{analysisResults.length > 1 ? 's' : ''} analyzed
              </Badge>
            </div>
            <div className="space-y-3">
              {analysisResults.map((result, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg bg-green-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {result.analysis.name || result.filename}
                      </p>
                      <p className="text-sm text-gray-600">
                        Overall: {result.analysis.overall_score}/100 • 
                        {result.analysis.job_suitability_score && (
                          <>Job Match: {result.analysis.job_suitability_score}/100 • </>
                        )}
                        Experience: {result.analysis.total_experience_years} years
                      </p>
                    </div>
                    <Badge>
                      {result.analysis.overall_score >= 80 ? 'Excellent' :
                       result.analysis.overall_score >= 60 ? 'Good' :
                       result.analysis.overall_score >= 40 ? 'Fair' : 'Poor'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}