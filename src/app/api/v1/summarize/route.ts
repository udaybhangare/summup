
import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';

type SummarizeResponse = {
  data: {
    summary: string;
  };
};

const APYHUB_API_TEXT_URL = 'https://api.apyhub.com/ai/summarize-text';
const APYHUB_API_URL_URL = 'https://api.apyhub.com/ai/summarize-url';
const APYHUB_API_TOKEN = process.env.APYHUB_API_TOKEN;


const SummarizeRequestSchema = z.object({
  input: z.string().nonempty('Input must be a non-empty string.'),
  summary_length: z.enum(['short', 'medium', 'long']).default('short'),
  output_language: z.string().optional().default('en'),
});


const isValidUrl = (input: string): boolean => {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
};

export async function POST(request: NextRequest) {
  try {
    console.log('Request received:', request.body);

    if (!APYHUB_API_TOKEN) {
      return NextResponse.json(
        { error: 'Server misconfiguration: API token is missing.' },
        { status: 500 }
      );
    }


    const body = await request.json();
    const parsedBody = SummarizeRequestSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.errors.map((e) => e.message).join(', ') },
        { status: 400 }
      );
    }

    const { input, summary_length, output_language } = parsedBody.data;


    const apiUrl = isValidUrl(input) ? APYHUB_API_URL_URL : APYHUB_API_TEXT_URL;


    const payload = isValidUrl(input)
      ? { url: input, summary_length, output_language }
      : { text: input, summary_length, output_language };


    const response = await axios.post<SummarizeResponse>(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'apy-token': APYHUB_API_TOKEN,
      },
    });

    return NextResponse.json({ summary: response.data.data.summary }, { status: 200 });
  } catch (error: unknown) {
    console.error('Unexpected error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error: { message: string } }>;
      return NextResponse.json(
        {
          error: axiosError.response?.data?.error?.message || 'Failed to fetch summary from ApyHub.',
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
