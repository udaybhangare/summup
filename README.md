# Summarize API Endpoint

This documentation provides an overview of the `POST` endpoint for summarizing text or URL content using the ApyHub API. The endpoint is implemented in Next.js with proper validation and error handling.

## Folder Structure
The route is located at:
```
/src/app/api/v1/summarize/route.ts
```

---

## Endpoint
### URL
```
/api/v1/summarize
```

### Method
```
POST
```

### Request Body
The request body must be a JSON object with the following structure:

| Field           | Type   | Required | Description                                           |
|------------------|--------|----------|-------------------------------------------------------|
| `input`         | string | Yes      | The text or URL to summarize. Must be non-empty.     |
| `summary_length`| string | No       | Desired length of the summary (`short`, `medium`, or `long`). Defaults to `short`. |
| `output_language` | string | No     | ISO code for the output language (e.g., `en`, `fr`). Defaults to `en`. |

#### Example Request Body
```json
{
  "input": "https://example.com/article",
  "summary_length": "medium",
  "output_language": "en"
}
```

---

## Response
### Success Response
On success, the server responds with a JSON object containing the summary:

| Field     | Type   | Description                       |
|-----------|--------|-----------------------------------|
| `summary` | string | The summarized text or URL content. |

#### Example Success Response
```json
{
  "summary": "This is a concise summary of the provided content."
}
```

### Error Responses
| HTTP Code | Message                                             |
|-----------|-----------------------------------------------------|
| 400       | Input validation failed.                           |
| 500       | Server misconfiguration or unexpected error.       |

#### Example Error Response
```json
{
  "error": "Input must be a non-empty string."
}
```

---

## Features
### 1. **Validation**
- Uses Zod for schema validation to ensure the input is structured correctly.
- Validates that the `input` is non-empty and the `summary_length` is within allowed values (`short`, `medium`, `long`).
- Defaults are provided for optional fields.

### 2. **Error Handling**
- Handles Axios errors to return meaningful messages from the ApyHub API.
- Handles missing API tokens with a `500` status code.
- Distinguishes between Axios errors and unexpected errors.

### 3. **Dynamic Endpoint Selection**
- Automatically determines whether the `input` is a URL or text.
- Uses appropriate ApyHub API endpoints based on the `input` type.

---

## Environment Variables
### Required Environment Variables
| Variable            | Description                  |
|---------------------|------------------------------|
| `APYHUB_API_TOKEN`  | The API token for ApyHub.    |

---

## Example Setup
### Install Dependencies
```bash
pnpm install axios zod
```

### Start Development Server
Run the Next.js development server:
```bash
pnpm dev
```

---

## Notes
- Ensure that the `APYHUB_API_TOKEN` is stored securely in a `.env` file.
- The API handles a maximum input size of 16,385 tokens (~12,000 words) for text-based summaries.
- The API respects ISO language codes for output summaries.

---

## Potential Improvements
- Add rate limiting to avoid API misuse.
- Implement caching for frequently requested inputs.
- Extend support for additional summary output formats.

