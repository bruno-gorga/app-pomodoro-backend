const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const openai = require('../config/openai');
const Session = require('../models/session');

// Get AI suggestions based on user's sessions
router.post('/suggestions', auth, async (req, res) => {
  try {
    // Get user's recent sessions
    const sessions = req.body.sessions || await Session.find({ 
      userId: req.userId,
      completed: true 
    }).sort({ startTime: -1 }).limit(10);

    if (sessions.length === 0) {
      return res.json({ 
        suggestion: "Complete a few Pomodoro sessions to get personalized suggestions."
      });
    }

    // Analyze session patterns
    const totalSessions = sessions.length;
    const averageDuration = sessions.reduce((sum, session) => sum + session.duration, 0) / totalSessions;
    
    // Calculate completion times
    const completionTimes = sessions
      .filter(s => s.startTime && s.endTime)
      .map(s => {
        const start = new Date(s.startTime).getTime();
        const end = new Date(s.endTime).getTime();
        return (end - start) / (1000 * 60); // minutes
      });
    
    // Extract patterns like time of day, day of week
    const timeOfDayDistribution = {};
    const dayOfWeekDistribution = {};
    
    sessions.forEach(session => {
      const date = new Date(session.startTime);
      const hour = date.getHours();
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      // Count sessions by hour of day
      timeOfDayDistribution[hour] = (timeOfDayDistribution[hour] || 0) + 1;
      
      // Count sessions by day of week
      dayOfWeekDistribution[dayOfWeek] = (dayOfWeekDistribution[dayOfWeek] || 0) + 1;
    });
    
    // Prepare data for OpenAI
    const sessionData = {
      totalSessions,
      averageDuration,
      completionTimes: completionTimes.length > 0 ? completionTimes : [],
      timeOfDayDistribution,
      dayOfWeekDistribution,
      recentSessions: sessions.slice(0, 5).map(s => ({
        duration: s.duration,
        startTime: s.startTime,
        completed: s.completed
      }))
    };
    
    // Generate AI suggestions
    const prompt = `
      Based on this user's Pomodoro session data:
      ${JSON.stringify(sessionData, null, 2)}
      
      Please provide helpful, personalized productivity suggestions for this user.
      Focus on:
      1. Optimal session duration based on their patterns
      2. Best times of day for their focus sessions
      3. Realistic productivity improvements
      4. Work/break balance recommendations
      
      Respond in a concise, friendly tone with actionable advice.
      Limit your response to 3-4 short paragraphs.
    `;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a productivity coach specializing in the Pomodoro Technique." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7
    });
    
    const suggestion = response.choices[0].message.content.trim();
    
    res.json({ suggestion });
  } catch (error) {
    console.error('AI suggestions error:', error);
    res.status(500).json({ 
      error: 'Could not generate AI suggestions',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;