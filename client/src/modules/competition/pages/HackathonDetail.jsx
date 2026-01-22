import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Trophy, Flag, Clock, ArrowLeft, Share2, CheckCircle } from 'lucide-react';
import { getEvent, registerForEvent } from '../../../services/event.service';
import { useAuth } from '../../../context/AuthContext';

const HackathonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [hackathon, setHackathon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [teamName, setTeamName] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getEvent(id);
                setHackathon(data);
                // Check local registration state or ideally fetch from backend if user is registered
                // For now assuming if they click register we try to register
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setRegistering(true);
        try {
            await registerForEvent(id, { teamName: teamName || user.name }, token);
            setRegistered(true);
            alert('Successfully registered!');
        } catch (error) {
            alert('Registration failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return <div className="text-white text-center py-20">Loading...</div>;
    if (!hackathon) return <div className="text-white text-center py-20">Hackathon not found</div>;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans pb-20">
            {/* Header / Banner */}
            <div className="relative h-96 w-full overflow-hidden">
                {hackathon.thumbnail ? (
                    <img src={hackathon.thumbnail} alt={hackathon.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-900 to-indigo-900"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent"></div>

                <div className="absolute top-6 left-6">
                    <button onClick={() => navigate('/competition')} className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur rounded-full text-white hover:bg-black/60 transition">
                        <ArrowLeft size={18} /> Back to List
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">{hackathon.status}</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">{hackathon.venue || 'Online'}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{hackathon.title}</h1>
                    <p className="text-xl text-slate-300 max-w-3xl">{hackathon.description}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Rules / Details */}
                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Flag className="text-blue-400" /> Challenge Details & Rules
                        </h2>
                        <div className="prose prose-invert max-w-none text-slate-300">
                            <p>{hackathon.rules || "No specific rules provided. Follow standard hackathon code of conduct."}</p>
                        </div>
                    </div>

                    {/* Schedule */}
                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Clock className="text-green-400" /> Schedule
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-1 bg-blue-600 rounded-full"></div>
                                <div>
                                    <p className="text-slate-400 text-sm">Start Date</p>
                                    <p className="text-lg font-semibold">{new Date(hackathon.startDate).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1 bg-purple-600 rounded-full"></div>
                                <div>
                                    <p className="text-slate-400 text-sm">End Date</p>
                                    <p className="text-lg font-semibold">{new Date(hackathon.endDate).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 p-8 rounded-3xl border border-white/10 sticky top-24">
                        <div className="text-center mb-8">
                            <p className="text-slate-300 mb-1">Prize Pool</p>
                            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                {hackathon.prizePool || 'TBD'}
                            </h3>
                        </div>

                        {!registered ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-400 font-bold uppercase ml-1 block mb-2">Team Name (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="e.g. Code Ninjas"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={handleRegister}
                                    disabled={registering}
                                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2"
                                >
                                    {registering ? 'Registering...' : 'Register Now'}
                                </button>
                                <p className="text-xs text-center text-slate-400">By registering, you agree to the rules.</p>
                            </div>
                        ) : (
                            <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
                                <CheckCircle className="mx-auto text-green-400 mb-2" size={32} />
                                <h4 className="font-bold text-green-100">You are registered!</h4>
                                <p className="text-sm text-green-200/70 mt-1">Check your email for details.</p>
                            </div>
                        )}

                        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{hackathon.participantCount || 0}</p>
                                <p className="text-xs text-slate-400">Participants</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{hackathon.maxTeams || 'Unlim'}</p>
                                <p className="text-xs text-slate-400">Team Limit</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HackathonDetail;
