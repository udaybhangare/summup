
import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const DEFAULT_PROMPT = 'Please provide a systematic short summary of the following content:';

const SummarizeRequestSchema = z.object({
  input: z.string().nonempty('Input must be a non-empty string.'),
  output_language: z.string().optional().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    console.log('Processing request for summarization API...');

    // Validate environment variable
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: API key is missing.' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = SummarizeRequestSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((err) => err.message).join(', ');
      return NextResponse.json(
        { error: `Validation failed: ${errorMessages}` },
        { status: 400 }
      );
    }

    const { input, output_language } = validationResult.data;

    // Prepare API payload
    const payload = {
      contents: [
        {
          parts: [{ text: `${DEFAULT_PROMPT}\nLanguage: ${output_language}\n${input}` }],
        },
      ],
    };

    // Send request to Gemini API
    const apiResponse = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('Gemini API Response:', apiResponse.data);

    const candidate = apiResponse.data?.candidates?.[0];
    const summary = candidate?.content?.text || candidate?.content; // Adjust based on the actual object structure

    if (!summary) {
        console.error('Invalid response structure:', apiResponse.data);
        return NextResponse.json(
            { error: 'Unexpected response format from Gemini API.', details: apiResponse.data },
            { status: 500 }
        );
    }

    // Return the summarized content
    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    console.error('Error occurred while processing the request:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error: { message: string } }>;
      return NextResponse.json(
        {
          error: axiosError.response?.data?.error?.message || 'Failed to fetch summary from Gemini.',
        },
        { status: axiosError.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
