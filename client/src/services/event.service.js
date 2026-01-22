import { get, post, put, del } from './api.client';

const BASE_URL = '/events';

/**
 * Get public events
 */
export const getEvents = async () => {
    try {
        const response = await get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return [];
    }
};

/**
 * Get single event
 */
export const getEvent = async (id) => {
    try {
        const response = await get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch event:', error);
        return null;
    }
};

/**
 * Create event
 */
export const createEvent = async (eventData, token) => {
    const response = await post(BASE_URL, eventData, token);
    return response.data;
};

/**
 * Update event
 */
export const updateEvent = async (id, eventData, token) => {
    const response = await put(`${BASE_URL}/${id}`, eventData, token);
    return response.data;
};

/**
 * Delete event
 */
export const deleteEvent = async (id, token) => {
    await del(`${BASE_URL}/${id}`, token);
    return true;
};

/**
 * Register for event
 */
export const registerForEvent = async (id, teamData, token) => {
    const response = await post(`${BASE_URL}/${id}/register`, teamData, token);
    return response.data;
};

/**
 * Get event registrations (Organizer/Admin)
 */
export const getEventRegistrations = async (id, token) => {
    const response = await get(`${BASE_URL}/${id}/registrations`, token);
    return response.data;
};

/**
 * Get all events for Admin
 */
export const getAdminEvents = async (token) => {
    const response = await get(`${BASE_URL}/admin/all`, token);
    return response.data;
};
