'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Users, PlusCircle, UserPlus, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';

export default function TeamsPage() {
  const { teams, currentUser, createTeam, joinTeam, t } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const [teamName, setTeamName] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    const newTeam = createTeam({ name: teamName, description: teamDesc });
    setShowCreateModal(false);
    setTeamName('');
    setTeamDesc('');
    setMessage({ type: 'success', text: `Đã tạo team "${newTeam.name}" thành công! Mã gia nhập: ${newTeam.code}` });
  };

  const handleJoinTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;

    const success = joinTeam(joinCode);
    if (success) {
      setShowJoinModal(false);
      setJoinCode('');
      setMessage({ type: 'success', text: 'Bạn đã gia nhập đội nhóm Cisco GSC thành công!' });
    } else {
      setMessage({ type: 'error', text: 'Mã gia nhập không đúng hoặc không tồn tại!' });
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cisco Team Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[#00BCEB]/30 shadow-2xl bg-slate-900 group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: "url('/images/cisco_team_victory.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/80 to-transparent"></div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2 text-[#00BCEB] font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
              <span>{t('teams', 'tag')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{t('teams', 'title')}</h1>
            <p className="text-slate-300 text-sm leading-relaxed">{t('teams', 'desc')}</p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={() => setShowJoinModal(true)}
              className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 backdrop-blur-md transition-all"
            >
              <UserPlus className="w-4 h-4 text-[#00BCEB]" />
              <span>{t('teams', 'joinCodeBtn')}</span>
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FC4C02] to-orange-500 hover:from-orange-500 hover:to-[#FC4C02] text-white font-extrabold text-sm shadow-lg shadow-[#FC4C02]/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('teams', 'createTeamBtn')}</span>
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between border ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          <span className="text-sm font-semibold">{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs underline font-bold">
            Đóng
          </button>
        </div>
      )}

      {/* User Current Team */}
      {currentUser?.team && (
        <div className="glass-card p-6 rounded-3xl border-2 border-[#00BCEB]/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-1 bg-[#00BCEB] text-slate-950 font-black text-xs rounded-bl-2xl uppercase tracking-wider">
            {t('teams', 'myTeamBadge')}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={currentUser.team.avatar_url || 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=150'}
                alt={currentUser.team.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00BCEB]"
              />
              <div>
                <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
                  <span>{currentUser.team.name}</span>
                  {currentUser.role === 'captain' && (
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold">
                      {t('teams', 'captain')}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{currentUser.team.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800">
              <div>
                <p className="text-xs text-slate-400">{t('teams', 'joinCodeLabel')}</p>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="font-mono font-extrabold text-[#CCFF00] tracking-wider text-sm">
                    {currentUser.team.code}
                  </span>
                  <button
                    onClick={() => copyCode(currentUser.team!.code)}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                  >
                    {copiedCode === currentUser.team.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400">{t('teams', 'membersCountLabel')}</p>
                <p className="font-bold text-white text-sm mt-0.5">{currentUser.team.member_count} VĐV</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Team list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => {
          const isMyTeam = currentUser?.team_id === team.id;
          return (
            <div
              key={team.id}
              className={`glass-card p-6 rounded-3xl flex flex-col justify-between space-y-4 border transition-all hover:border-slate-700 ${
                isMyTeam ? 'border-[#00BCEB]/50 bg-[#00BCEB]/5' : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={team.avatar_url || 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=150'}
                    alt={team.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="font-bold text-base text-white">{team.name}</h3>
                    <p className="text-xs text-slate-400">{team.member_count} VĐV Cisco</p>
                  </div>
                </div>

                {isMyTeam && (
                  <span className="px-2.5 py-1 rounded-full bg-[#00BCEB]/20 text-[#00BCEB] text-[11px] font-bold border border-[#00BCEB]/30">
                    {t('teams', 'joinedBadge')}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{team.description}</p>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <p className="text-slate-400">{t('table', 'points')}</p>
                  <p className="font-extrabold text-base text-[#CCFF00]">{team.total_points || 0} pts</p>
                </div>

                <div>
                  <p className="text-slate-400">{t('table', 'distance')}</p>
                  <p className="font-bold text-slate-200">{((team.total_distance || 0) / 1000).toFixed(1)} km</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Create Team */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xl text-white">{t('teams', 'createModalTitle')}</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">{t('teams', 'teamNameLabel')}</label>
                <input
                  type="text"
                  required
                  placeholder="Cisco Cyber Runners ⚡"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00BCEB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">{t('teams', 'teamDescLabel')}</label>
                <textarea
                  rows={3}
                  placeholder="Slogan team..."
                  value={teamDesc}
                  onChange={(e) => setTeamDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00BCEB]"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 text-sm font-semibold hover:bg-slate-800"
                >
                  {t('teams', 'cancelBtn')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FC4C02] to-orange-500 text-white text-sm font-bold shadow-lg shadow-[#FC4C02]/20"
                >
                  {t('teams', 'submitCreateBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Join Team */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xl text-white">{t('teams', 'joinModalTitle')}</h3>
              <button onClick={() => setShowJoinModal(false)} className="text-slate-400 hover:text-white text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleJoinTeam} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">{t('teams', 'joinCodeInputLabel')}</label>
                <input
                  type="text"
                  required
                  placeholder="TECH2026"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono tracking-widest uppercase focus:outline-none focus:border-[#00BCEB]"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 text-sm font-semibold hover:bg-slate-800"
                >
                  {t('teams', 'cancelBtn')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00BCEB] text-slate-950 text-sm font-extrabold shadow-lg shadow-[#00BCEB]/20"
                >
                  {t('teams', 'submitJoinBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
