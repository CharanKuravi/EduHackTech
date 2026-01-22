const Event = require('./event.model');
const Registration = require('./registration.model');

// @desc    Get all public events (upcoming/live)
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: { $in: ['upcoming', 'live', 'past'] } })
            .populate('createdBy', 'name')
            .sort({ startDate: 1 });
        res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Get all events (Admin - includes drafts)
// @route   GET /api/admin/events
// @access  Private/Admin
exports.getAllEventsAdmin = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'name');
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Create new event (Organizer)
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res) => {
    try {
        req.body.createdBy = req.user.id;
        // Default to 'upcoming' if not specified, or let validating logic handle it
        req.body.status = 'upcoming';

        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid data', error: error.message });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Organizer/Admin)
exports.updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Check ownership or admin
        if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Update failed', error: error.message });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Organizer/Admin)
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Check ownership or admin
        if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
        }

        await event.deleteOne();
        res.status(200).json({ success: true, message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Delete failed', error: error.message });
    }
};

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
exports.registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        // Check if already registered
        const existing = await Registration.findOne({ event: req.params.id, user: req.user.id });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Already registered' });
        }

        const registration = await Registration.create({
            event: req.params.id,
            user: req.user.id,
            teamName: req.body.teamName || req.user.name
        });

        // Increment count
        event.participantCount = (event.participantCount || 0) + 1;
        await event.save();

        res.status(201).json({ success: true, data: registration });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
    }
};

// @desc    Get event registrations
// @route   GET /api/events/:id/registrations
// @access  Private (Organizer/Admin)
exports.getEventRegistrations = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        // Check auth
        if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const registrations = await Registration.find({ event: req.params.id }).populate('user', 'name email');
        res.status(200).json({ success: true, data: registrations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fetch failed', error: error.message });
    }
};

