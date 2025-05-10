
const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const auth = require('../middleware/auth');

// Create a new session
router.post('/', auth, async (req, res) => {
  try {
    const { duration } = req.body;
    
    if (!duration || duration <= 0) {
      return res.status(400).json({ error: 'Valid duration is required' });
    }
    
    const session = new Session({
      userId: req.userId,
      duration,
      startTime: new Date()
    });
    
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all sessions for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId })
      .sort({ startTime: -1 });
    
    res.json(sessions);
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Complete a session
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      userId: req.userId
    });
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    session.endTime = new Date();
    session.completed = true;
    
    await session.save();
    res.json(session);
  } catch (error) {
    console.error('Complete session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a session
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Session.deleteOne({
      _id: req.params.id,
      userId: req.userId
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;