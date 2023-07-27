# Image Generator API

Welcome to the Image Generator API! This project allows you to take screenshots of web pages using the "chrome-aws-lambda" package. By passing a URL as a query parameter, you can capture screenshots of the specified webpage. The API provides the flexibility to capture either a specific element on the page or the entire page.

## Prerequisites

Before running the project, ensure you have the following prerequisites installed:

1. **Chromium**: The project relies on Chromium to function correctly. Make sure you have Chromium installed on your operating system. Without it, the project will not work as expected.

2. **Environment Variables**: Two environment variables must be configured:

   - `CONTAINER_ID`: This variable holds the element ID that will be targeted for capturing a screenshot. If this variable is omitted, the entire web page will be captured.

   - `NODE_ENV`: This variable is used to specify the execution environment. When running the project locally, set `NODE_ENV` to "loca". For production deployment, set it to "production".

## Installation and Setup

Follow these steps to get the project up and running:

1. Clone the repository:

   ```bash
   git clone https://github.com/eduardylopes/image-generator
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set environment variables:
   ```bash
   # Element ID of the desired container
   CONTAINER_ID=<element-id>
   # If you want to run locally use "local"
   NODE_ENV=<environment>
   ```
4. Running the project
   ```bash
   npm run dev
   ```

## Usage

### Api Endpoint

- The API exposes a single endpoint to capture web page screenshots:
- Endpoint: /api/image-generator
- Method: GET
- Query Parameter:
- url (required): The URL of the web page you want to capture.

### Example Request

To take a screenshot of a webpage, make a GET request to the following url:

```bash
https://your-api-hostname.com/api/screenshot?url=https://example.com
```
