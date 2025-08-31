// Test script to verify Google Sheets configuration
// Run this with: node test-google-sheets.js

const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function testGoogleSheets() {
  console.log('🔍 Testing Google Sheets Configuration...\n');

  // Check environment variables
  console.log('1. Checking environment variables:');
  
  if (!process.env.GOOGLE_SERVICE_ACCOUNT && !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    console.log('❌ No Google service account credentials found');
    console.log('   Please set up GOOGLE_SERVICE_ACCOUNT or individual credentials in .env.local');
    return;
  }

  if (!process.env.GOOGLE_SHEET_ID) {
    console.log('❌ No Google Sheet ID found');
    console.log('   Please set GOOGLE_SHEET_ID in .env.local');
    return;
  }

  console.log('✅ Environment variables found');

  // Parse credentials
  let credentials = {};
  try {
    if (process.env.GOOGLE_SERVICE_ACCOUNT) {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
      console.log('✅ Service account JSON parsed successfully');
    } else {
      credentials = {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID || 'portfolio-contact',
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID || '',
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || ''}`
      };
      console.log('✅ Individual credentials configured');
    }
  } catch (error) {
    console.log('❌ Failed to parse service account credentials:', error.message);
    return;
  }

  // Check required fields
  if (!credentials.client_email) {
    console.log('❌ Missing client_email in credentials');
    return;
  }

  if (!credentials.private_key) {
    console.log('❌ Missing private_key in credentials');
    return;
  }

  console.log(`✅ Service account email: ${credentials.client_email}`);

  // Initialize Google Sheets API
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Google Sheets API initialized');

    // Test sheet access
    console.log('\n2. Testing sheet access:');
    const sheetId = process.env.GOOGLE_SHEET_ID;
    console.log(`   Sheet ID: ${sheetId}`);

    try {
      const response = await sheets.spreadsheets.get({
        spreadsheetId: sheetId,
      });

      console.log('✅ Sheet access successful');
      console.log(`   Sheet title: ${response.data.properties.title}`);
      console.log(`   Sheet URL: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);

      // Test writing to sheet
      console.log('\n3. Testing write access:');
      const testData = [['Test Entry', 'test@example.com', 'This is a test message', new Date().toISOString()]];
      
      const writeResponse = await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:D',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: testData,
        },
      });

      console.log('✅ Write test successful');
      console.log(`   Updated range: ${writeResponse.data.updates.updatedRange}`);
      console.log(`   Updated rows: ${writeResponse.data.updates.updatedRows}`);

    } catch (error) {
      console.log('❌ Sheet access failed:', error.message);
      
      if (error.code === 403) {
        console.log('   💡 Make sure you shared the sheet with your service account email');
        console.log(`   💡 Service account email: ${credentials.client_email}`);
      } else if (error.code === 404) {
        console.log('   💡 Check that your Sheet ID is correct');
      }
      return;
    }

  } catch (error) {
    console.log('❌ Failed to initialize Google Sheets API:', error.message);
    return;
  }

  console.log('\n🎉 All tests passed! Your Google Sheets integration is working correctly.');
  console.log('\n📝 Next steps:');
  console.log('   1. Restart your development server: npm run dev');
  console.log('   2. Test your contact form');
  console.log('   3. Check your Google Sheet for new entries');
}

// Run the test
testGoogleSheets().catch(console.error);
