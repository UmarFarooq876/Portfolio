# Google Sheets Contact Form Setup

This project includes a fully functional contact form that saves submissions to Google Sheets.

## Features

- ✅ Form validation (required fields, email format)
- ✅ Google Sheets integration
- ✅ Success/error messaging
- ✅ Loading states
- ✅ Clean Tailwind styling
- ✅ TypeScript support

## Setup Instructions

### 1. Environment Variables

Make sure your `.env` file contains:

```env
GOOGLE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
GOOGLE_SHEET_ID=1CE0hNOjWtsIIP6-VY8fp_Wq3x7PZn5l8s0e56GrLado
```

### 2. Google Sheets Setup

1. Create a new Google Sheet or use an existing one
2. Make sure the sheet has columns for: Name, Email, Message, Timestamp
3. Share the sheet with your service account email (found in `client_email` from your service account JSON)
4. Give the service account "Editor" permissions

### 3. Google Service Account Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create a Service Account
5. Download the JSON key file
6. Copy the entire JSON content to your `GOOGLE_SERVICE_ACCOUNT` environment variable

## Usage

### Using the Contact Form Component

```tsx
import ContactForm from './components/ContactForm';

export default function MyPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

### API Endpoint

The form submits to `/api/contact` with the following data:

```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "message": "Hello, I'd like to discuss a project."
}
```

### Response Format

**Success:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully!",
  "data": { ... }
}
```

**Error:**
```json
{
  "error": "All fields are required",
  "details": "Additional error details"
}
```

## File Structure

```
app/
├── api/
│   └── contact/
│       └── route.ts          # API endpoint
├── components/
│   └── ContactForm.tsx       # React form component
└── contact/
    └── page.tsx              # Demo contact page
```

## Customization

### Styling
The form uses Tailwind CSS classes. You can customize the appearance by modifying the className props in `ContactForm.tsx`.

### Google Sheets Range
By default, the form appends to `Sheet1!A:D`. To change this, modify the `range` parameter in `app/api/contact/route.ts`.

### Form Fields
To add/remove fields:
1. Update the `FormData` interface in `ContactForm.tsx`
2. Add/remove form elements in the JSX
3. Update the validation logic in the API route
4. Modify the Google Sheets range if needed

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Check that your `GOOGLE_SERVICE_ACCOUNT` JSON is valid
   - Ensure the service account has access to the Google Sheet

2. **"Sheet not found" error**
   - Verify your `GOOGLE_SHEET_ID` is correct
   - Make sure the sheet is shared with your service account

3. **CORS errors**
   - This is a server-side API, so CORS shouldn't be an issue
   - If you're calling from a different domain, you may need to configure CORS

4. **Form not submitting**
   - Check browser console for JavaScript errors
   - Verify the API route is accessible at `/api/contact`

### Testing

1. Start your development server: `npm run dev`
2. Navigate to `/contact` to see the form
3. Fill out and submit the form
4. Check your Google Sheet for new entries

## Security Notes

- Never commit your `.env` file to version control
- The service account should have minimal required permissions
- Consider rate limiting for production use
- Validate and sanitize all input data (already implemented)
