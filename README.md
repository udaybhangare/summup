### Documentation: Gemini Summarization API (Version 2)

This API provides systematic summaries of the input content using the Gemini language model. The following documentation outlines the endpoints, request structure, and response format.

---

#### **Base URL**
`/api/v2/summarize`

---

### **HTTP Method**
`POST`

---

### **Request Headers**
- `Content-Type: application/json`

---

### **Environment Variables**
- `GEMINI_API_KEY`: The API key required to authenticate with the Gemini API.

---

### **Request Body**
The request body should be a JSON object validated against the following schema:

| Field             | Type    | Required | Default | Description                           |
|-------------------|---------|----------|---------|---------------------------------------|
| `input`           | String  | Yes      | N/A     | The text content to summarize. Must be non-empty. |
| `output_language` | String  | No       | `en`    | The desired output language for the summary. |

#### **Example Request Body**
```json
{
  "input": "Explain how AI works",
  "output_language": "en"
}
```

---

### **Response**
The response is a JSON object containing the summarized content.

| Field     | Type   | Description                                   |
|-----------|--------|-----------------------------------------------|
| `summary` | String | The generated summary of the provided input.  |

#### **Example Response**
```json
{
  "summary": "Artificial Intelligence (AI) is the simulation of human intelligence by machines, enabling them to perform tasks such as learning, reasoning, and decision-making."
}
```

---

### **Error Handling**
Errors are returned as JSON objects with an appropriate HTTP status code.

| HTTP Status Code | Description                                                                                   |
|------------------|-----------------------------------------------------------------------------------------------|
| 400              | Validation error in the request body.                                                        |
| 500              | Server-side error (e.g., missing API key, unexpected response from Gemini API, or other issues). |

#### **Example Error Response**
```json
{
  "error": "Validation failed: Input must be a non-empty string."
}
```

---

### **Detailed Workflow**
1. **Request Validation**:
   - Validates the input using `zod` to ensure the request contains the required fields and values are properly formatted.

2. **Prepare Payload**:
   - Combines the default prompt and input text, including the specified `output_language`.

3. **API Call to Gemini**:
   - Sends a POST request to the Gemini API using `axios` with the constructed payload.

4. **Handle Response**:
   - Parses and extracts the summary from the API response.
   - Returns the summary to the client or an error if the response format is invalid.

5. **Error Handling**:
   - Distinguishes between client-side validation errors and server-side or network issues.
   - Logs unexpected errors for debugging.

---

### **Example Usage with cURL**
```bash
curl -X POST https://yourdomain.com/api/v2/summarize \
-H "Content-Type: application/json" \
-d '{
  "input": "Explain how AI works",
  "output_language": "en"
}'
```

---
