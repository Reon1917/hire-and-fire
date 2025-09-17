import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Initialize Gemini AI
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Load mock data
const loadMockData = () => {
  const dataDir = path.join(process.cwd(), 'data');
  const candidates = JSON.parse(fs.readFileSync(path.join(dataDir, 'candidates.json'), 'utf8'));
  const jobDescription = JSON.parse(fs.readFileSync(path.join(dataDir, 'job-description.json'), 'utf8'));
  return { candidates, jobDescription };
};

// Define the structured response schema for resume analysis
const resumeAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "Full name of the candidate"
    },
    total_experience_years: {
      type: Type.NUMBER,
      description: "Total years of professional experience"
    },
    overall_score: {
      type: Type.NUMBER,
      description: "Overall candidate score from 0-100"
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          level: { 
            type: Type.STRING,
            description: "Skill level: beginner, intermediate, or expert"
          },
          years_experience: { type: Type.NUMBER }
        },
        propertyOrdering: ["name", "level", "years_experience"]
      }
    },
    education: {
      type: Type.OBJECT,
      properties: {
        degree: { type: Type.STRING },
        field: { type: Type.STRING },
        institution: { type: Type.STRING },
        graduation_year: { type: Type.NUMBER }
      },
      propertyOrdering: ["degree", "field", "institution", "graduation_year"]
    },
    key_strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Top 3-5 key strengths of the candidate"
    },
    areas_for_improvement: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Areas where the candidate could improve"
    },
    recommended_roles: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Recommended job roles based on profile"
    },
    job_suitability_score: {
      type: Type.NUMBER,
      description: "Job suitability score from 0-100 based on job requirements"
    },
    job_match_analysis: {
      type: Type.OBJECT,
      properties: {
        matching_skills: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Skills that match job requirements"
        },
        missing_skills: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Required skills the candidate lacks"
        },
        experience_match: {
          type: Type.STRING,
          description: "How candidate's experience aligns with job"
        },
        recommendation: {
          type: Type.STRING,
          description: "Hiring recommendation: Strong Match, Good Match, Weak Match, or Poor Match"
        }
      },
      propertyOrdering: ["matching_skills", "missing_skills", "experience_match", "recommendation"]
    },
    summary: {
      type: Type.STRING,
      description: "Brief professional summary"
    }
  },
  propertyOrdering: ["name", "total_experience_years", "overall_score", "job_suitability_score", "job_match_analysis", "skills", "education", "key_strengths", "areas_for_improvement", "recommended_roles", "summary"]
};

const createAnalysisPrompt = (candidateProfile, jobDescription) => {
  return `You are an expert HR professional and resume analyzer. Analyze this candidate profile for the Machine Learning Engineer position and provide a comprehensive evaluation.

CANDIDATE PROFILE:
Name: ${candidateProfile.name}
Experience: ${candidateProfile.total_experience_years} years
Education: ${candidateProfile.education.degree} in ${candidateProfile.education.field} from ${candidateProfile.education.institution} (${candidateProfile.education.graduation_year})

WORK EXPERIENCE:
${candidateProfile.work_experience.map(exp => `• ${exp.company} - ${exp.position} (${exp.duration}): ${exp.description}`).join('\n')}

SKILLS:
${candidateProfile.skills.map(skill => `• ${skill.name} (${skill.level}, ${skill.years_experience} years)`).join('\n')}

KEY PROJECTS:
${candidateProfile.projects.map(project => `• ${project}`).join('\n')}

JOB CONTEXT:
Position: ${jobDescription.title}
Type: ${jobDescription.type}
Location: ${jobDescription.location}

JOB DESCRIPTION:
${jobDescription.description}

JOB REQUIREMENTS:
${jobDescription.requirements}

PREFERRED SKILLS: ${jobDescription.preferred_skills.join(', ')}

Please provide a comprehensive analysis including:
1. Overall candidate score (0-100) based on:
   - Relevant experience (30%)
   - Skills and expertise (25%)
   - Education and certifications (20%)
   - Career progression and achievements (15%)
   - Project quality and impact (10%)

2. Job suitability score (0-100) specifically for this Machine Learning Engineer position

3. Job match analysis:
   - Skills that match job requirements
   - Required skills the candidate lacks
   - How the candidate's experience aligns with the role
   - Hiring recommendation (Strong Match, Good Match, Weak Match, or Poor Match)

4. Key strengths and standout qualities
5. Areas for improvement or skill gaps
6. Recommended job roles that would be a good fit
7. Professional summary

Be objective and realistic with scores. Consider both technical skills and practical experience. Scores above 85 should be reserved for truly exceptional candidates who exceed requirements.`;
};

export async function POST(request) {
  try {
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Load mock data
    const { candidates, jobDescription } = loadMockData();
    
    // Find a candidate based on filename or use random selection
    let selectedCandidate;
    const filename = file.name.toLowerCase();
    
    // Try to match by filename first
    selectedCandidate = candidates.find(candidate => 
      candidate.filename.toLowerCase() === filename ||
      candidate.profile.name.toLowerCase().replace(/\s+/g, '_') + '_resume.pdf' === filename
    );
    
    // If no match found, select randomly based on file size or name hash
    if (!selectedCandidate) {
      const fileSize = file.size || 1000;
      const index = fileSize % candidates.length;
      selectedCandidate = candidates[index];
    }

    // Generate analysis using Gemini
    const analysisPrompt = createAnalysisPrompt(selectedCandidate.profile, jobDescription);
    
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{
        text: analysisPrompt
      }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: resumeAnalysisSchema
      }
    });

    const analysisText = result.text;

    // Parse the JSON response
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('Failed to parse analysis response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse analysis results' },
        { status: 500 }
      );
    }

    // Add metadata
    const enrichedAnalysis = {
      ...analysis,
      metadata: {
        filename: file.name,
        fileSize: file.size,
        analyzedAt: new Date().toISOString(),
        model: 'gemini-2.0-flash-exp',
        hasJobContext: true,
        jobTitle: jobDescription.title,
        demoMode: true,
        candidateId: selectedCandidate.id
      }
    };

    return NextResponse.json(enrichedAnalysis);

  } catch (error) {
    console.error('Demo resume analysis error:', error);
    
    // Handle specific Gemini API errors
    if (error.message?.includes('API_KEY_INVALID')) {
      return NextResponse.json(
        { error: 'Invalid Gemini API key' },
        { status: 401 }
      );
    }
    
    if (error.message?.includes('QUOTA_EXCEEDED')) {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to analyze resume. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}