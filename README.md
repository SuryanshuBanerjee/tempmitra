# MITRA - J&K Mental Health Support Platform

A comprehensive digital psychological intervention system for college students, specifically designed for the Jammu & Kashmir region. MITRA provides AI-guided support, counselor booking, resource hub, peer community, and crisis intervention in a culturally sensitive, multilingual environment.

## Features

### 🤖 AI-Guided First-Aid Support
- Interactive chatbot with mental health expertise
- Crisis detection and immediate intervention
- Context-aware responses in multiple languages
- Automatic escalation for high-risk situations

### 📅 Confidential Booking System
- Book appointments with qualified counselors
- Multiple session types (individual, group, crisis)
- Video, phone, and in-person options
- Counselor profiles with specializations and language support

### 📚 Psychoeducational Resource Hub
- Videos, audio content, and articles
- Available in English, Hindi, Urdu, and Kashmiri
- Categorized by mental health topics
- Difficulty levels and user ratings

### 👥 Peer Support Platform
- Moderated peer-to-peer support forum
- Anonymous posting options
- Category-based discussions
- Community guidelines and safety features

### 📊 Admin Dashboard
- Real-time analytics and insights
- Crisis monitoring and response tracking
- User engagement metrics
- Risk level distribution analysis

### 🧠 Psychological Screening Tools
- PHQ-9 (Depression screening)
- GAD-7 (Anxiety screening)
- GHQ (General health questionnaire)
- Automated risk assessment and recommendations

## Technology Stack

### Frontend
- **Next.js 13.5.1** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database (development)
- **Flask-CORS** - Cross-origin resource sharing

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ and pip

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the Flask server**
   ```bash
   python app.py
   ```

   The backend will be available at [http://localhost:5000](http://localhost:5000)

### Demo Credentials

For testing the complete system:

- **Admin Access**: 
  - Email: `admin@mitra.ac.in`
  - Password: `admin123`
  - Access: Admin dashboard with analytics and crisis monitoring

- **Student Access**: 
  - Email: `student1@gmail.com`
  - Password: `password123`
  - Access: User dashboard with assessments and booking

### Health Check

Run the health check script to verify all services:

```bash
node health-check.js
```

This will verify that both frontend and backend services are running correctly.

## Project Structure

```
mitra/
├── app/                    # Next.js App Router pages
│   ├── booking/           # Counselor booking system
│   ├── chat/              # AI chat interface
│   ├── community/         # Peer support forum
│   ├── dashboard/         # Admin analytics
│   ├── resources/         # Resource hub
│   └── screening/         # Psychological assessments
├── components/
│   ├── layout/            # Navigation, footer
│   ├── sections/          # Homepage sections
│   └── ui/                # Reusable UI components
├── backend/
│   ├── app.py             # Flask application
│   └── requirements.txt   # Python dependencies
└── lib/
    ├── api.ts             # API client utilities
    └── utils.ts           # Helper functions
```

## Key Features Implementation

### Regional Customization
- **Jammu & Kashmir specific data**: Local colleges, counselors, and resources
- **Multilingual support**: English, Hindi, Urdu, and Kashmiri languages
- **Cultural sensitivity**: Contextually appropriate responses and recommendations
- **Local emergency contacts**: Regional helpline numbers and services

### Crisis Detection & Response
- **Keyword monitoring**: Automatic detection of crisis-related language
- **Immediate escalation**: Direct connection to crisis counselors
- **Emergency contacts**: Integration with local mental health services
- **Response time tracking**: Analytics on crisis intervention effectiveness

### Privacy & Security
- **Anonymous interactions**: Optional anonymous posting and chat
- **Data encryption**: Secure handling of sensitive information
- **Confidentiality**: No personally identifiable information required
- **Moderated community**: Safe space with trained volunteer moderators

## Sample Data

The system includes comprehensive sample data for demonstration:

### Users & Counselors
- Sample students from Kashmir University, NIT Srinagar, and Government College
- Qualified counselors with regional language support
- Realistic user profiles with varied mental health screening scores

### Resources
- Multilingual mental health resources
- Audio meditations in local languages
- Video content addressing common student issues
- Articles on stress, anxiety, and depression

### Forum Content
- Authentic student discussion topics
- Academic stress and social isolation themes
- Success stories and peer support examples

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Chat System
- `POST /api/chat/send` - Send message and get AI response

### Appointments
- `GET /api/counselors` - Get available counselors
- `POST /api/appointments/book` - Book counselor session
- `GET /api/appointments/:userId` - Get user appointments

### Resources
- `GET /api/resources` - Get resources (filterable)

### Community Forum
- `GET /api/forum/posts` - Get forum posts
- `POST /api/forum/posts` - Create new post

### Screening
- `POST /api/screening/:type` - Submit screening responses

### Analytics (Admin)
- `GET /api/admin/analytics` - Get platform analytics

## Development Notes

- **Hot reload**: Both frontend and backend support hot reload for development
- **API fallback**: Frontend includes fallback logic when backend is unavailable
- **Responsive design**: Fully responsive across desktop, tablet, and mobile
- **Accessibility**: Following WCAG guidelines with proper ARIA labels
- **Performance**: Optimized images, lazy loading, and efficient data fetching

## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
npm run start
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy using platform-specific instructions
```

## Contributing

1. Follow the existing code style and patterns
2. Test both frontend and backend changes
3. Ensure accessibility and responsive design
4. Add appropriate error handling
5. Update documentation as needed

## License

This project is developed for educational and social good purposes. Please use responsibly and ensure compliance with local mental health regulations.

## Support

For technical support or questions about the platform, please refer to the documentation or create an issue in the project repository.

---

**MITRA** - *Supporting student mental health in Jammu & Kashmir through technology and community.*


1) High-level, ELI5 overview — “what is this thing?”

Think of MITRA as two teams that talk to each other:

Frontend (Next.js + TypeScript + Tailwind) — this is the app the user sees: pages, buttons, forms, dashboards, chat window, booking UI.
Analogy: the shopfront and cashier where users click and type.

Backend (Flask + SQLAlchemy + SQLite) — this stores data, runs logic, and answers requests from the frontend.
Analogy: the store manager and storeroom who keep the products, handle bookings, run the chatbot, and check the rules.

They talk over HTTP (API endpoints). Frontend calls endpoints like /api/auth/login, /api/counselors, /api/appointments/book, /api/chat/send to do stuff.

2) Big picture data & flows (simple step-by-step)
A — User opens the app

Browser loads Next.js pages.

Pages call a small client API helper (likely lib/api.ts) to talk to Flask endpoints.

B — Authentication

User submits email/password to POST /api/auth/login.

Backend checks credentials (SQLAlchemy -> users table), issues a session token or JWT, and returns user details.

Frontend stores token (in memory or localStorage) and includes it in future requests (Authorization header).

C — Chat / AI-guided first-aid

User types a message and clicks send.

Frontend sends POST /api/chat/send with text + user id/token.

Backend receives message, runs some logic: either a small rules-based reply, calls an AI model (or mock), does crisis detection (keyword match), and returns a chat response.

If crisis detected, backend escalates (flag in DB / notify admin).

D — Booking a counselor

Frontend shows list of counselors (GET /api/counselors).

When user books, frontend POST /api/appointments/book with user id, counselor id, timeslot.

Backend creates appointment entry in DB and returns confirmation.

E — Screening (PHQ-9, GAD-7)

Frontend shows a form of questions.

When submitted, frontend POST /api/screening/:type with answers.

Backend computes a score, saves it, and returns recommended action.

F — Community / Forum

Frontend GET /api/forum/posts and POST /api/forum/posts for reading/creating posts (anonymous option supported).

Backend stores posts, enforces moderation rules.

G — Admin dashboard

Admin logs in (admin credentials).

Admin pages GET /api/admin/analytics, see metrics, crisis alerts, user distribution, etc.

3) Core files you should open (and what to teach from each)

These are the files/folders listed in the README. Open each and use the surrounding code to explain the concept below.

Frontend (Next.js app)

app/ — the top-level app pages (booking, chat, community, dashboard, resources, screening).

Teach: Next.js App Router basics; how a page maps to a URL.

components/ — reusable UI (navigation, layout, forms, cards).

Teach: React components, props, state, composition.

lib/api.ts — the client-side wrapper for making API calls.

Teach: how to centralize fetch logic, set Authorization header, handle errors.

contexts/ — likely React Context providers (auth, theme).

Teach: global state management (user auth, tokens).

hooks/ — custom hooks for data fetching.

Teach: useEffect, useState, and abstracting logic into hooks.

Backend (Flask)

backend/app.py — main Flask app and API endpoints.

Teach: route definitions, request handling, returning JSON responses.

backend/requirements.txt — packages used (Flask, SQLAlchemy, Flask-CORS).

Teach: dependencies & why each is needed.

Database models file(s) — (likely in backend folder or models.py).

Teach: SQLAlchemy models -> how Python classes map to DB tables.

Any utils files — helpers for screening logic or crisis detection.

Teach: where business logic lives (scoring algorithms, keyword lists).

Other

lib/utils.ts — helper functions used by frontend.

Teach: formatting, client-side validations.

If you want, paste the contents of these specific files and I’ll go line-by-line with ELI5 explanations.

4) ELI5 for the most important technical pieces
What is a Next.js page? (ELI5)

“A page file is like a recipe card. The file says: when someone goes to /booking, show this layout, fetch these counselor details, and put the booking form here.”

Key points to teach:

Pages run in the browser (React); they can also have server components if using Next.js app router.

Components are small building blocks like LEGO pieces — combine them to make a page.

What is Flask app.py? (ELI5)

“app.py is the manager who listens at the door (port 5000). When the frontend knocks with a request (GET, POST), the manager reads it, asks the storage (DB) for info or saves something, and sends back a reply in JSON.”

Key points to teach:

@app.route('/api/whatever', methods=['POST']) defines an endpoint.

Use request.json to read incoming JSON; use jsonify() or return {...}, status to reply.

Security: check Authorization header for protected routes.

What is SQLAlchemy? (ELI5)

“SQLAlchemy lets you treat database tables like Python objects. Instead of writing SQL strings, you say User(name='A') and SQLAlchemy turns it into a row in the users table.”

Key points:

Define classes: class User(Base): id = Column(Integer, primary_key=True) etc.

Querying: session.query(User).filter_by(email=...) returns Python objects.

How chat/crisis detection probably works (ELI5)

Chat message arrives.

The backend scans for urgent keywords (e.g., “suicide”, “hurt myself”) — think of it like a red-flag detector.

If red-flag found → mark message, escalate, return urgent resources and maybe route to a counselor.

Otherwise → reply via canned answers or call an AI model.
