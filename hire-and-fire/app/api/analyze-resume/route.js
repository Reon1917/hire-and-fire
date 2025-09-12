import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

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

const createAnalysisPrompt = (jobData) => {
  let basePrompt = `You are an expert HR professional and resume analyzer. Analyze the provided resume PDF thoroughly and extract detailed information.`;

  if (jobData) {
    basePrompt += `

JOB CONTEXT:
- Position: ${jobData.title}
- Job Type: ${jobData.type}
${jobData.location ? `- Location: ${jobData.location}` : ''}

JOB DESCRIPTION:
${jobData.description}

${jobData.requirements ? `JOB REQUIREMENTS:
${jobData.requirements}` : ''}

ADDITIONAL ANALYSIS REQUIRED:
- Provide a job suitability score (0-100) specifically for this position
- Compare candidate's skills against job requirements
- Identify matching skills and missing skills
- Assess experience relevance to this specific role
- Provide hiring recommendation: Strong Match, Good Match, Weak Match, or Poor Match`;
  }

  basePrompt += `

Please provide a comprehensive analysis including:
1. Candidate's name and contact information
2. Total years of professional experience
3. Skills assessment with proficiency levels
4. Education background
5. Key strengths and standout qualities
6. Areas for improvement or skill gaps
7. Recommended job roles that would be a good fit
8. Overall candidate score (0-100) based on:
   - Relevant experience (30%)
   - Skills and expertise (25%)
   - Education and certifications (20%)
   - Career progression and achievements (15%)
   - Communication and presentation quality (10%)

${jobData ? `9. Job suitability score (0-100) for the specific position
10. Job match analysis with matching/missing skills and recommendation` : ''}

Be objective, professional, and focus on both strengths and areas for development. 
For scores, be realistic - scores above 85 should be reserved for truly exceptional candidates.
${jobData ? 'Consider how well the candidate fits the specific job requirements when providing the suitability score.' : ''}`;

  return basePrompt;
};

export async function POST(request) {
  try {
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    console.log('API Key configured:', process.env.GEMINI_API_KEY ? 'Yes' : 'No');
    console.log('API Key length:', process.env.GEMINI_API_KEY?.length || 0);

    const formData = await request.formData();
    const file = formData.get('file');
    const jobDataString = formData.get('jobData');
    
    let jobData = null;
    if (jobDataString) {
      try {
        jobData = JSON.parse(jobDataString);
      } catch (e) {
        console.error('Invalid job data:', e);
      }
    }

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Validate file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 50MB' },
        { status: 400 }
      );
    }

    // Convert file to base64 for inline processing (for files under 20MB)
    const fileBuffer = await file.arrayBuffer();
    const fileBase64 = Buffer.from(fileBuffer).toString('base64');

    // Generate analysis using the correct API structure
    const analysisPrompt = createAnalysisPrompt(jobData);
    
    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          text: analysisPrompt
        },
        {
          inlineData: {
            mimeType: 'application/pdf',
            data: fileBase64
          }
        }
      ],
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
        model: 'gemini-2.5-flash',
        hasJobContext: !!jobData,
        jobTitle: jobData?.title || null
      }
    };

    return NextResponse.json(enrichedAnalysis);

  } catch (error) {
    console.error('Resume analysis error:', error);
    
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

    if (error.message?.includes('SAFETY')) {
      return NextResponse.json(
        { error: 'Content safety check failed. Please ensure the resume contains appropriate content.' },
        { status: 400 }
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