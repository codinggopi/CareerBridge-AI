from sqlalchemy.orm import Session

def get_user_notifications(db: Session, student_id: int):
    # In a real app, we would query the models.Notification table.
    # Currently returning structured data required by frontend.
    return {
        "filters": ["All", "System", "Interviews", "Learning", "Jobs"],
        "today": [
            {
                "icon": "message-square",
                "color": "bg-blue-500/20 border-blue-500/30 text-blue-400",
                "title": "Mock Interview Feedback Ready",
                "time": "10:30 AM",
                "desc": "Your AI Coach has generated feedback for your recent System Design mock interview. Review your performance.",
                "unread": True,
                "action": "View Feedback",
                "dismissable": True
            },
            {
                "icon": "trending-up",
                "color": "bg-primary/20 border-primary/30 text-primary",
                "title": "Placement Score Improved",
                "time": "09:15 AM",
                "desc": "Great job! Your readiness score went up by 5 points after completing the backend module.",
                "unread": True,
                "action": "View Score",
                "dismissable": False
            }
        ],
        "thisWeek": [
            {
                "icon": "file-text",
                "color": "bg-purple-500/20 border-purple-500/30 text-purple-400",
                "title": "Resume Parse Completed",
                "time": "Mon, 2:00 PM",
                "desc": "We successfully analyzed your newly uploaded resume. A few keywords are missing for DevOps roles.",
                "unread": False
            },
            {
                "icon": "settings",
                "color": "bg-gray-500/20 border-gray-500/30 text-gray-400",
                "title": "System Update",
                "time": "Sun, 11:00 AM",
                "desc": "CareerBridge AI has been updated with new market intelligence data for 2026 Q3.",
                "unread": False
            }
        ],
        "earlier": [
            {
                "icon": "award",
                "color": "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
                "title": "Achievement Unlocked",
                "time": "Jun 15",
                "desc": "You hit a 7-day learning streak!",
                "unread": False
            }
        ]
    }
