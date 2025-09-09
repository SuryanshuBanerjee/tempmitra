from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import random
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mitra.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mitra-secret-key-2024'

db = SQLAlchemy(app)
CORS(app)

# Database Models
class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(20))
    college = db.Column(db.String(200))
    course = db.Column(db.String(100))
    year = db.Column(db.String(20))
    phone = db.Column(db.String(20))
    emergency_contact = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_active = db.Column(db.DateTime, default=datetime.utcnow)
    is_counselor = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)
    
    # Mental health specific fields
    phq9_score = db.Column(db.Integer, default=0)
    gad7_score = db.Column(db.Integer, default=0)
    ghq_score = db.Column(db.Integer, default=0)
    risk_level = db.Column(db.String(20), default='low')  # low, medium, high, crisis
    last_screening = db.Column(db.DateTime)

class Counselor(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(200))
    qualifications = db.Column(db.Text)
    experience_years = db.Column(db.Integer)
    languages = db.Column(db.String(200))  # JSON string
    availability = db.Column(db.Text)  # JSON string of available slots
    rating = db.Column(db.Float, default=4.5)
    total_sessions = db.Column(db.Integer, default=0)
    bio = db.Column(db.Text)
    is_available = db.Column(db.Boolean, default=True)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))

class Appointment(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    counselor_id = db.Column(db.String(36), db.ForeignKey('counselor.id'), nullable=False)
    scheduled_datetime = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Integer, default=60)  # minutes
    type = db.Column(db.String(50))  # individual, group, crisis
    mode = db.Column(db.String(20))  # video, phone, in-person
    status = db.Column(db.String(20), default='scheduled')  # scheduled, completed, cancelled, no-show
    notes = db.Column(db.Text)
    student_notes = db.Column(db.Text)
    counselor_notes = db.Column(db.Text)
    rating = db.Column(db.Integer)  # 1-5 rating by student
    feedback = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

class ChatSession(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'))
    session_type = db.Column(db.String(20), default='ai')  # ai, peer, counselor
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    ended_at = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='active')  # active, ended, escalated
    crisis_detected = db.Column(db.Boolean, default=False)
    sentiment_score = db.Column(db.Float, default=0.0)
    topics = db.Column(db.Text)  # JSON string of detected topics

class ChatMessage(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = db.Column(db.String(36), db.ForeignKey('chat_session.id'), nullable=False)
    sender_type = db.Column(db.String(20), nullable=False)  # user, ai, counselor
    sender_id = db.Column(db.String(36))
    message = db.Column(db.Text, nullable=False)
    message_type = db.Column(db.String(20), default='text')  # text, resource, crisis_alert
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    crisis_keywords = db.Column(db.Text)  # JSON array of detected keywords
    sentiment = db.Column(db.String(20))  # positive, negative, neutral

class Resource(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    content_type = db.Column(db.String(20), nullable=False)  # video, audio, article, guide
    category = db.Column(db.String(50))  # anxiety, depression, stress, sleep, etc.
    language = db.Column(db.String(20), default='en')
    url = db.Column(db.String(500))
    file_path = db.Column(db.String(500))
    duration = db.Column(db.Integer)  # for videos/audio in seconds
    difficulty_level = db.Column(db.String(20), default='beginner')  # beginner, intermediate, advanced
    tags = db.Column(db.Text)  # JSON array
    view_count = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float, default=0.0)
    created_by = db.Column(db.String(36), db.ForeignKey('user.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_featured = db.Column(db.Boolean, default=False)

class ForumPost(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    author_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50))
    tags = db.Column(db.Text)  # JSON array
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)
    view_count = db.Column(db.Integer, default=0)
    reply_count = db.Column(db.Integer, default=0)
    is_anonymous = db.Column(db.Boolean, default=True)
    is_moderated = db.Column(db.Boolean, default=False)
    moderator_id = db.Column(db.String(36), db.ForeignKey('user.id'))
    status = db.Column(db.String(20), default='active')  # active, hidden, deleted
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

class ForumReply(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    post_id = db.Column(db.String(36), db.ForeignKey('forum_post.id'), nullable=False)
    author_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)
    is_anonymous = db.Column(db.Boolean, default=True)
    is_helpful = db.Column(db.Boolean, default=False)
    replied_to = db.Column(db.String(36), db.ForeignKey('forum_reply.id'))  # For nested replies
    status = db.Column(db.String(20), default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ScreeningResponse(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    screening_type = db.Column(db.String(20), nullable=False)  # phq9, gad7, ghq
    responses = db.Column(db.Text, nullable=False)  # JSON of question-answer pairs
    total_score = db.Column(db.Integer, nullable=False)
    risk_level = db.Column(db.String(20), nullable=False)
    recommendations = db.Column(db.Text)  # JSON array of recommendations
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)

class Analytics(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    date = db.Column(db.Date, nullable=False)
    metric_type = db.Column(db.String(50), nullable=False)
    metric_name = db.Column(db.String(100), nullable=False)
    value = db.Column(db.Float, nullable=False)
    additional_data = db.Column(db.Text)  # JSON additional data

# AI Chat Response System
class MentalHealthChatBot:
    def __init__(self):
        self.crisis_keywords = [
            'suicide', 'kill myself', 'end my life', 'self-harm', 'hurt myself', 
            'crisis', 'emergency', 'death', 'die', 'hopeless', 'worthless',
            'cut myself', 'overdose', 'jump', 'hanging'
        ]
        
        self.anxiety_keywords = [
            'anxious', 'anxiety', 'panic', 'worry', 'nervous', 'stressed',
            'fear', 'scared', 'overwhelmed', 'racing heart', 'can\'t breathe'
        ]
        
        self.depression_keywords = [
            'depressed', 'depression', 'sad', 'empty', 'hopeless', 'tired',
            'lonely', 'worthless', 'guilt', 'sleep problems', 'no energy'
        ]
        
        self.stress_keywords = [
            'stressed', 'stress', 'pressure', 'overwhelmed', 'busy', 'exam',
            'deadlines', 'workload', 'burnout', 'exhausted'
        ]

    def detect_crisis(self, message):
        message_lower = message.lower()
        detected_keywords = []
        
        for keyword in self.crisis_keywords:
            if keyword in message_lower:
                detected_keywords.append(keyword)
        
        return len(detected_keywords) > 0, detected_keywords

    def analyze_sentiment(self, message):
        # Simple sentiment analysis
        positive_words = ['good', 'better', 'happy', 'great', 'fine', 'okay', 'well']
        negative_words = ['bad', 'worse', 'terrible', 'awful', 'horrible', 'sad', 'angry']
        
        message_lower = message.lower()
        positive_count = sum(1 for word in positive_words if word in message_lower)
        negative_count = sum(1 for word in negative_words if word in message_lower)
        
        if negative_count > positive_count:
            return 'negative'
        elif positive_count > negative_count:
            return 'positive'
        return 'neutral'

    def get_response(self, message, user_id=None):
        message_lower = message.lower()
        is_crisis, crisis_keywords = self.detect_crisis(message)
        sentiment = self.analyze_sentiment(message)
        
        response_data = {
            'message': '',
            'type': 'normal',
            'resources': [],
            'crisis_detected': is_crisis,
            'crisis_keywords': crisis_keywords,
            'sentiment': sentiment,
            'follow_up_questions': []
        }
        
        if is_crisis:
            response_data.update({
                'message': "I'm very concerned about your safety. Please reach out for immediate help: Call National Suicide Prevention Helpline at 9152987821 or Emergency Services at 112. Would you like me to connect you with a crisis counselor right now?",
                'type': 'crisis',
                'resources': [
                    {'type': 'hotline', 'name': 'Kashmir Helpline', 'number': '01942506062'},
                    {'type': 'emergency', 'name': 'Emergency Services', 'number': '112'}
                ]
            })
        elif any(keyword in message_lower for keyword in self.anxiety_keywords):
            response_data.update({
                'message': "I can hear that you're feeling anxious. Let's try a grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This can help bring you back to the present moment.",
                'type': 'support',
                'resources': [
                    {'type': 'exercise', 'name': 'Breathing Exercise', 'description': '4-7-8 breathing technique'},
                    {'type': 'audio', 'name': 'Relaxation Audio (Hindi)', 'url': '/resources/relaxation-hindi.mp3'}
                ],
                'follow_up_questions': [
                    "Would you like to try the breathing exercise?",
                    "Can you tell me what's making you feel anxious?",
                    "Would you like to book a session with a counselor?"
                ]
            })
        elif any(keyword in message_lower for keyword in self.depression_keywords):
            response_data.update({
                'message': "I understand you're going through a difficult time. Depression can make everything feel overwhelming, but you're not alone. Small steps matter - even reaching out here shows your strength.",
                'type': 'support',
                'resources': [
                    {'type': 'article', 'name': 'Understanding Depression (Urdu)', 'url': '/resources/depression-urdu'},
                    {'type': 'video', 'name': 'Daily Mood Lifting Activities', 'url': '/resources/mood-activities'}
                ],
                'follow_up_questions': [
                    "When did you start feeling this way?",
                    "Have you been able to talk to anyone about this?",
                    "Would you like help connecting with a counselor?"
                ]
            })
        elif any(keyword in message_lower for keyword in self.stress_keywords):
            response_data.update({
                'message': "Academic stress is very common among students in J&K. You're not alone in feeling this way. Let's work on some strategies to manage this stress effectively.",
                'type': 'support',
                'resources': [
                    {'type': 'guide', 'name': 'Study Stress Management (Kashmir)', 'url': '/resources/study-stress-kashmir'},
                    {'type': 'video', 'name': 'Time Management for Students', 'url': '/resources/time-management'}
                ],
                'follow_up_questions': [
                    "What specific aspects of your studies are most stressful?",
                    "How are you currently managing your workload?",
                    "Would you like tips specific to your course?"
                ]
            })
        else:
            response_data.update({
                'message': "Thank you for sharing with me. I'm here to listen and support you. Can you tell me more about what's on your mind today?",
                'type': 'normal',
                'follow_up_questions': [
                    "How has your day been so far?",
                    "Is there something specific you'd like to talk about?",
                    "How can I best support you right now?"
                ]
            })
        
        return response_data

# Initialize chatbot
chatbot = MentalHealthChatBot()

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'MITRA Backend is running'})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    # Create new user
    user = User(
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        name=data['name'],
        age=data.get('age'),
        gender=data.get('gender'),
        college=data.get('college'),
        course=data.get('course'),
        year=data.get('year'),
        phone=data.get('phone'),
        emergency_contact=data.get('emergency_contact')
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'message': 'User registered successfully',
        'user_id': user.id,
        'name': user.name
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        user.last_active = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Login successful',
            'user_id': user.id,
            'name': user.name,
            'is_counselor': user.is_counselor,
            'is_admin': user.is_admin
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/chat/send', methods=['POST'])
def send_chat_message():
    data = request.json
    user_id = data.get('user_id')
    message = data['message']
    session_id = data.get('session_id')
    
    # Create new session if not provided
    if not session_id:
        session = ChatSession(user_id=user_id)
        db.session.add(session)
        db.session.flush()
        session_id = session.id
    
    # Save user message
    user_message = ChatMessage(
        session_id=session_id,
        sender_type='user',
        sender_id=user_id,
        message=message
    )
    db.session.add(user_message)
    
    # Get AI response
    response_data = chatbot.get_response(message, user_id)
    
    # Save AI message
    ai_message = ChatMessage(
        session_id=session_id,
        sender_type='ai',
        message=response_data['message'],
        message_type=response_data['type'],
        crisis_keywords=json.dumps(response_data['crisis_keywords']),
        sentiment=response_data['sentiment']
    )
    db.session.add(ai_message)
    
    # Update session if crisis detected
    if response_data['crisis_detected']:
        session = ChatSession.query.get(session_id)
        session.crisis_detected = True
        session.status = 'escalated'
    
    db.session.commit()
    
    return jsonify({
        'session_id': session_id,
        'response': response_data['message'],
        'type': response_data['type'],
        'resources': response_data['resources'],
        'follow_up_questions': response_data['follow_up_questions'],
        'crisis_detected': response_data['crisis_detected']
    })

@app.route('/api/counselors', methods=['GET'])
def get_counselors():
    counselors = Counselor.query.filter_by(is_available=True).all()
    
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'specialization': c.specialization,
        'languages': json.loads(c.languages or '[]'),
        'experience_years': c.experience_years,
        'rating': c.rating,
        'total_sessions': c.total_sessions,
        'bio': c.bio,
        'availability': json.loads(c.availability or '[]')
    } for c in counselors])

@app.route('/api/appointments/book', methods=['POST'])
def book_appointment():
    data = request.json
    
    appointment = Appointment(
        student_id=data['student_id'],
        counselor_id=data['counselor_id'],
        scheduled_datetime=datetime.fromisoformat(data['scheduled_datetime'].replace('Z', '+00:00')),
        type=data.get('type', 'individual'),
        mode=data.get('mode', 'video'),
        notes=data.get('notes', '')
    )
    
    db.session.add(appointment)
    db.session.commit()
    
    return jsonify({
        'message': 'Appointment booked successfully',
        'appointment_id': appointment.id,
        'scheduled_datetime': appointment.scheduled_datetime.isoformat()
    })

@app.route('/api/appointments/<user_id>', methods=['GET'])
def get_appointments(user_id):
    appointments = db.session.query(Appointment, Counselor).join(
        Counselor, Appointment.counselor_id == Counselor.id
    ).filter(Appointment.student_id == user_id).all()
    
    return jsonify([{
        'id': apt.id,
        'counselor_name': counselor.name,
        'counselor_specialization': counselor.specialization,
        'scheduled_datetime': apt.scheduled_datetime.isoformat(),
        'duration': apt.duration,
        'type': apt.type,
        'mode': apt.mode,
        'status': apt.status,
        'notes': apt.notes
    } for apt, counselor in appointments])

@app.route('/api/resources', methods=['GET'])
def get_resources():
    category = request.args.get('category')
    language = request.args.get('language', 'en')
    
    query = Resource.query
    if category:
        query = query.filter_by(category=category)
    query = query.filter_by(language=language)
    
    resources = query.order_by(Resource.created_at.desc()).all()
    
    return jsonify([{
        'id': r.id,
        'title': r.title,
        'description': r.description,
        'content_type': r.content_type,
        'category': r.category,
        'language': r.language,
        'url': r.url,
        'duration': r.duration,
        'difficulty_level': r.difficulty_level,
        'rating': r.rating,
        'view_count': r.view_count,
        'is_featured': r.is_featured,
        'tags': json.loads(r.tags or '[]')
    } for r in resources])

@app.route('/api/forum/posts', methods=['GET'])
def get_forum_posts():
    category = request.args.get('category')
    
    query = ForumPost.query.filter_by(status='active')
    if category:
        query = query.filter_by(category=category)
    
    posts = query.order_by(ForumPost.created_at.desc()).all()
    
    result = []
    for post in posts:
        author = User.query.get(post.author_id)
        result.append({
            'id': post.id,
            'title': post.title,
            'content': post.content[:500] + '...' if len(post.content) > 500 else post.content,
            'category': post.category,
            'author_name': 'Anonymous' if post.is_anonymous else author.name,
            'upvotes': post.upvotes,
            'downvotes': post.downvotes,
            'reply_count': post.reply_count,
            'view_count': post.view_count,
            'created_at': post.created_at.isoformat(),
            'tags': json.loads(post.tags or '[]')
        })
    
    return jsonify(result)

@app.route('/api/forum/posts', methods=['POST'])
def create_forum_post():
    data = request.json
    
    post = ForumPost(
        author_id=data['author_id'],
        title=data['title'],
        content=data['content'],
        category=data.get('category'),
        tags=json.dumps(data.get('tags', [])),
        is_anonymous=data.get('is_anonymous', True)
    )
    
    db.session.add(post)
    db.session.commit()
    
    return jsonify({
        'message': 'Post created successfully',
        'post_id': post.id
    })

@app.route('/api/screening/<screening_type>', methods=['POST'])
def submit_screening(screening_type):
    data = request.json
    user_id = data['user_id']
    responses = data['responses']
    
    # Calculate scores based on screening type
    total_score = sum(responses.values())
    
    # Determine risk level based on standard cutoffs
    if screening_type == 'phq9':
        if total_score <= 4:
            risk_level = 'minimal'
        elif total_score <= 9:
            risk_level = 'mild'
        elif total_score <= 14:
            risk_level = 'moderate'
        elif total_score <= 19:
            risk_level = 'moderately_severe'
        else:
            risk_level = 'severe'
    elif screening_type == 'gad7':
        if total_score <= 4:
            risk_level = 'minimal'
        elif total_score <= 9:
            risk_level = 'mild'
        elif total_score <= 14:
            risk_level = 'moderate'
        else:
            risk_level = 'severe'
    else:  # ghq
        if total_score <= 3:
            risk_level = 'low'
        else:
            risk_level = 'high'
    
    # Save screening response
    screening = ScreeningResponse(
        user_id=user_id,
        screening_type=screening_type,
        responses=json.dumps(responses),
        total_score=total_score,
        risk_level=risk_level
    )
    
    db.session.add(screening)
    
    # Update user profile
    user = User.query.get(user_id)
    if screening_type == 'phq9':
        user.phq9_score = total_score
    elif screening_type == 'gad7':
        user.gad7_score = total_score
    elif screening_type == 'ghq':
        user.ghq_score = total_score
    
    user.risk_level = risk_level
    user.last_screening = datetime.utcnow()
    
    db.session.commit()
    
    # Generate recommendations
    recommendations = []
    if risk_level in ['moderate', 'moderately_severe', 'severe', 'high']:
        recommendations.extend([
            "Consider booking a session with a counselor",
            "Join our peer support community",
            "Practice daily mindfulness exercises"
        ])
    
    if risk_level in ['moderately_severe', 'severe']:
        recommendations.append("Urgent: Please contact mental health services immediately")
    
    return jsonify({
        'total_score': total_score,
        'risk_level': risk_level,
        'recommendations': recommendations,
        'need_immediate_help': risk_level in ['severe', 'high']
    })

@app.route('/api/admin/analytics', methods=['GET'])
def get_analytics():
    # Get various metrics for admin dashboard
    total_users = User.query.count()
    total_sessions = ChatSession.query.count()
    crisis_sessions = ChatSession.query.filter_by(crisis_detected=True).count()
    total_appointments = Appointment.query.count()
    
    # Recent activity (last 7 days)
    week_ago = datetime.utcnow() - timedelta(days=7)
    new_users_week = User.query.filter(User.created_at >= week_ago).count()
    
    # Risk level distribution
    risk_levels = db.session.query(User.risk_level, db.func.count(User.risk_level)).group_by(User.risk_level).all()
    
    # Most common issues (from chat analysis)
    anxiety_sessions = ChatMessage.query.filter(
        ChatMessage.message.contains('anxious') | 
        ChatMessage.message.contains('anxiety')
    ).count()
    
    depression_sessions = ChatMessage.query.filter(
        ChatMessage.message.contains('depressed') | 
        ChatMessage.message.contains('depression')
    ).count()
    
    return jsonify({
        'overview': {
            'total_users': total_users,
            'total_sessions': total_sessions,
            'crisis_sessions': crisis_sessions,
            'total_appointments': total_appointments,
            'new_users_week': new_users_week
        },
        'risk_distribution': {level: count for level, count in risk_levels},
        'common_issues': {
            'anxiety': anxiety_sessions,
            'depression': depression_sessions
        }
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Create sample data if database is empty
        if User.query.count() == 0:
            # Create sample admin user
            admin = User(
                email='admin@mitra.ac.in',
                password_hash=generate_password_hash('admin123'),
                name='MITRA Admin',
                college='Kashmir University',
                is_admin=True
            )
            
            # Create sample counselor user
            counselor_user = User(
                email='dr.sharma@mitra.ac.in',
                password_hash=generate_password_hash('counselor123'),
                name='Dr. Priya Sharma',
                college='Kashmir University',
                is_counselor=True
            )
            
            # Create sample students
            students = [
                {
                    'email': 'student1@gmail.com',
                    'name': 'Aamir Khan',
                    'college': 'Kashmir University',
                    'course': 'Computer Science',
                    'year': '3rd Year',
                    'age': 21,
                    'gender': 'Male'
                },
                {
                    'email': 'student2@gmail.com', 
                    'name': 'Fatima Sheikh',
                    'college': 'Government College Srinagar',
                    'course': 'Psychology',
                    'year': '2nd Year',
                    'age': 20,
                    'gender': 'Female'
                },
                {
                    'email': 'student3@gmail.com',
                    'name': 'Rohit Pandita',
                    'college': 'NIT Srinagar',
                    'course': 'Engineering',
                    'year': '4th Year', 
                    'age': 22,
                    'gender': 'Male'
                }
            ]
            
            db.session.add(admin)
            db.session.add(counselor_user)
            
            student_users = []
            for student_data in students:
                student = User(
                    email=student_data['email'],
                    password_hash=generate_password_hash('password123'),
                    name=student_data['name'],
                    college=student_data['college'],
                    course=student_data['course'],
                    year=student_data['year'],
                    age=student_data['age'],
                    gender=student_data['gender'],
                    phq9_score=random.randint(0, 20),
                    gad7_score=random.randint(0, 15),
                    risk_level=random.choice(['low', 'mild', 'moderate'])
                )
                db.session.add(student)
                student_users.append(student)
            
            db.session.flush()  # Get IDs
            
            # Create counselor profile
            counselor = Counselor(
                user_id=counselor_user.id,
                name='Dr. Priya Sharma',
                specialization='Clinical Psychology, Anxiety Disorders, Student Counseling',
                qualifications='PhD Clinical Psychology, M.Phil Counseling Psychology',
                experience_years=8,
                languages=json.dumps(['English', 'Hindi', 'Urdu', 'Kashmiri']),
                availability=json.dumps([
                    'Monday 9:00-17:00', 'Tuesday 9:00-17:00', 
                    'Wednesday 9:00-17:00', 'Thursday 9:00-17:00', 
                    'Friday 9:00-15:00'
                ]),
                bio='Specialized in student mental health with focus on anxiety, depression, and academic stress. Fluent in local languages and culturally sensitive approaches.',
                phone='+91-9419-123456',
                email='dr.sharma@mitra.ac.in'
            )
            db.session.add(counselor)
            
            # Add more counselors
            counselor2 = User(
                email='dr.ahmed@mitra.ac.in',
                password_hash=generate_password_hash('counselor123'),
                name='Dr. Mohd Ahmed',
                college='Kashmir University',
                is_counselor=True
            )
            db.session.add(counselor2)
            db.session.flush()
            
            counselor2_profile = Counselor(
                user_id=counselor2.id,
                name='Dr. Mohd Ahmed',
                specialization='Trauma Counseling, PTSD, Crisis Intervention',
                qualifications='MD Psychiatry, Trauma Specialist Certification',
                experience_years=12,
                languages=json.dumps(['English', 'Urdu', 'Kashmiri', 'Hindi']),
                availability=json.dumps([
                    'Monday 10:00-18:00', 'Wednesday 10:00-18:00', 
                    'Friday 10:00-18:00', 'Saturday 9:00-13:00'
                ]),
                bio='Expert in trauma and crisis counseling, particularly experienced with conflict-related stress and student mental health issues.',
                phone='+91-9419-789012',
                email='dr.ahmed@mitra.ac.in'
            )
            db.session.add(counselor2_profile)
            
            # Create sample resources
            resources_data = [
                {
                    'title': 'Anxiety Management Techniques (Urdu)',
                    'description': 'Comprehensive guide to managing anxiety with techniques explained in Urdu',
                    'content_type': 'article',
                    'category': 'anxiety',
                    'language': 'ur',
                    'url': '/resources/anxiety-urdu-guide',
                    'difficulty_level': 'beginner',
                    'tags': json.dumps(['anxiety', 'urdu', 'breathing', 'relaxation'])
                },
                {
                    'title': 'Sleep Better Tonight - Hindi Audio',
                    'description': 'Relaxing sleep meditation and tips in Hindi',
                    'content_type': 'audio',
                    'category': 'sleep',
                    'language': 'hi',
                    'url': '/resources/sleep-hindi-audio.mp3',
                    'duration': 900,  # 15 minutes
                    'difficulty_level': 'beginner',
                    'tags': json.dumps(['sleep', 'hindi', 'meditation', 'relaxation'])
                },
                {
                    'title': 'Study Stress Management for Kashmir Students',
                    'description': 'Specific techniques for academic stress common in J&K educational system',
                    'content_type': 'video',
                    'category': 'stress',
                    'language': 'en',
                    'url': '/resources/study-stress-kashmir.mp4',
                    'duration': 1200,  # 20 minutes
                    'difficulty_level': 'intermediate',
                    'tags': json.dumps(['stress', 'academic', 'kashmir', 'students'])
                },
                {
                    'title': 'Depression Support Guide (Kashmiri)',
                    'description': 'Understanding and coping with depression - explained in Kashmiri language',
                    'content_type': 'guide',
                    'category': 'depression',
                    'language': 'ks',
                    'url': '/resources/depression-kashmiri-guide',
                    'difficulty_level': 'beginner',
                    'tags': json.dumps(['depression', 'kashmiri', 'support', 'coping'])
                }
            ]
            
            for resource_data in resources_data:
                resource = Resource(**resource_data, created_by=admin.id)
                db.session.add(resource)
            
            # Create sample forum posts
            forum_posts = [
                {
                    'author_id': student_users[0].id if len(student_users) > 0 else admin.id,
                    'title': 'Dealing with Exam Anxiety',
                    'content': 'Hi everyone, I\'m struggling with severe anxiety before exams. My heart races and I can\'t concentrate. Any tips from fellow students?',
                    'category': 'academic_stress',
                    'tags': json.dumps(['anxiety', 'exams', 'help'])
                },
                {
                    'author_id': student_users[1].id if len(student_users) > 1 else admin.id,
                    'title': 'Feeling Isolated After Moving to Srinagar',
                    'content': 'I moved from a small town to Srinagar for college and feeling very lonely. How do others cope with homesickness?',
                    'category': 'social_support',
                    'tags': json.dumps(['loneliness', 'college', 'homesickness'])
                }
            ]
            
            for post_data in forum_posts:
                post = ForumPost(**post_data)
                db.session.add(post)
            
            db.session.commit()
            print("Sample data created successfully!")
    
    print("MITRA Backend starting on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)