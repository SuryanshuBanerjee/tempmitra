# MITRA - J&K Mental Health Support Platform

THIS IS ONLY THE FIRST DEMO PROTOTYPE BUILT IN 24 HOURS. A comprehensive digital psychological intervention system for college students, specifically designed for the Jammu & Kashmir region. MITRA provides AI-guided support, counselor booking, resource hub, peer community, and crisis intervention in a culturally sensitive, multilingual environment.

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
