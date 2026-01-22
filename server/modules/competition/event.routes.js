const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middlewares/authMiddleware');
const {
    getEvents,
    getAllEventsAdmin,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getEventRegistrations
} = require('./event.controller');

// Public Routes
router.get('/', getEvents);
router.get('/:id', getEvent);

// Protected Routes (User/Organizer)
router.post('/', protect, createEvent); // Create Event (Organizer)
router.put('/:id', protect, updateEvent); // Update (Organizer/Admin)
router.delete('/:id', protect, deleteEvent); // Delete (Organizer/Admin)
router.post('/:id/register', protect, registerForEvent); // Register (User)
router.get('/:id/registrations', protect, getEventRegistrations); // View Registrations (Organizer/Admin)

// Admin Routes (Specific God Mode lists if needed, but getAllEventsAdmin is specialized)
router.get('/admin/all', protect, authorize('admin'), getAllEventsAdmin);

module.exports = router;
