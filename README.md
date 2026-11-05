# Appointment Studio

A responsive appointment booking demo built with HTML, CSS and JavaScript. Select a date and 30-minute slot (9:00–17:00), book an appointment, see saved bookings, and cancel bookings. Double bookings are prevented within the browser's local dataset.

## Run

Start a local server: `python -m http.server 8000`, then open http://localhost:8000. This project uses native ES modules.

## Test

Install Node.js 18+ and run `npm test`. GitHub Actions runs the scheduler tests on every pull request.

## Limitations

Bookings are saved in browser localStorage only. There is no shared calendar, multi-user concurrency, email notification, or backend authentication. Do not use this demo for real client appointments or sensitive data without a server-side booking system.
