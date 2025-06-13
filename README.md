Job Application Portal with React & Google Sheets
This project is a modern, responsive job application portal built with React on the frontend. It allows users to browse job listings, view detailed descriptions, and submit applications directly through a web form. The backend is powered by Google Apps Script, which seamlessly integrates with Google Sheets and Google Drive to create a powerful, free-to-use applicant tracking system (ATS).

✨ Key Features
Dynamic Job Pages: Fetches job data and generates detailed pages for each opening using React Router.
Tabbed Interface: Cleanly organizes job information into sections like Summary, Requirements, and Benefits.
Interactive Application Form:
Handles text inputs, radio buttons, and checkboxes.
Client-side validation for file size (under 2MB).
PDF CV/Resume upload functionality.
User-friendly loading states and success/error feedback.
Google Sheets Backend: All text-based application data is instantly saved as a new row in a designated Google Sheet.
Google Drive Integration: Uploaded CVs are automatically saved to a specific Google Drive folder, and a link to the file is added to the corresponding row in the Google Sheet.
Seamless User Experience: After a successful submission, the form is replaced by a "Thank You" message within the same page layout, creating a smooth, professional flow.
🚀 Tech Stack
Frontend:
React
React Router for routing.
Tailwind CSS for styling.
React Icons for UI icons.
Backend:
Google Apps Script
Google Sheets as the database.
Google Drive for file storage.
