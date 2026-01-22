import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Mail, BookOpen, Trophy, Shield } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const ManageUsers = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useAuth(); // Assuming useAuth provides the token

    useEffect(() => {
        if (token) {
            fetchUsers();
        }
    }, [token]);

    const fetchUsers = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get('http://localhost:5000/api/admin/users', config);
            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <main className={`transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'} p-8`}>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Manage Users</h1>
                        <p className="text-slate-400">View and manage all registered users on the platform</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-slate-900 border border-slate-700 text-slate-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 w-64 md:w-80"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-700 transition-all">
                            <Filter size={18} />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/80">
                                    <th className="p-4 pl-6 text-slate-400 font-medium font-sans">User Info</th>
                                    <th className="p-4 text-slate-400 font-medium font-sans">Role</th>
                                    <th className="p-4 text-slate-400 font-medium font-sans">Enrolled Courses</th>
                                    <th className="p-4 text-slate-400 font-medium font-sans">Hackathons</th>
                                    <th className="p-4 text-slate-400 font-medium font-sans">Joined Date</th>
                                    <th className="p-4 pr-6 text-slate-400 font-medium font-sans text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-slate-500">Loading users...</td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-slate-500">No users found matching your search.</td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="p-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-white">{user.name}</h3>
                                                        <div className="flex items-center gap-1.5 text-sm text-slate-400">
                                                            <Mail size={14} />
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${user.role === 'admin'
                                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                    : user.role === 'organiser'
                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                    }`}>
                                                    {user.role === 'admin' && <Shield size={12} />}
                                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-300">
                                                <div className="flex flex-col gap-1">
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <BookOpen size={14} className="text-slate-500" />
                                                        {user.courses.length} Active
                                                    </span>
                                                    {user.courses.length > 0 && (
                                                        <span className="text-xs text-slate-500 truncate max-w-[150px]">
                                                            {user.courses[0]}
                                                            {user.courses.length > 1 && ` +${user.courses.length - 1} more`}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-300">
                                                <div className="flex flex-col gap-1">
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Trophy size={14} className="text-slate-500" />
                                                        {user.events.length} Events
                                                    </span>
                                                    {user.events.length > 0 && (
                                                        <span className="text-xs text-slate-500 truncate max-w-[150px]">
                                                            {user.events[0]}
                                                            {user.events.length > 1 && ` +${user.events.length - 1} more`}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-400 text-sm">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 pr-6 text-right">
                                                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-900/30">
                        <span className="text-sm text-slate-500">Showing {filteredUsers.length} users</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 text-sm border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManageUsers;
