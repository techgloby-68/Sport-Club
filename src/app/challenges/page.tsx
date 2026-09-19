'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Challenge, SportType } from '@/types';
import { Trophy, PlusCircle, Users, CheckCircle2, Calendar, Target, ArrowRight } from 'lucide-react';

export default function ChallengesPage() {
  const { challenges, createChallenge, joinChallenge, currentUser, activities, t } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [chTitle, setChTitle] = useState('');
  const [chDesc, setChDesc] = useState('');
  const [chType, setChType] = useState<SportType>('Run');
  const [chTargetKm, setChTargetKm] = useState('100');
  const [chStartDate, setChStartDate] = useState('2026-10-01');
  const [chEndDate, setChEndDate] = useState('2026-10-31');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chTitle.trim()) return;

    createChallenge({
      title: chTitle,
      description: chDesc,
      type: chType,
      target_km: parseFloat(chTargetKm) || 100,
      start_date: chStartDate,
      end_date: chEndDate,
      banner_url: '/images/cisco_sports_hero.jpg',
    });

    setShowCreateModal(false);
    setChTitle('');
    setChDesc('');
  };

  const getParticipantProgress = (ch: Challenge, userId?: string) => {
    if (!userId) return { km: '0.0', pct: 0 };
    const userActs = activities.filter(
      (a) => a.profile_id === userId && (ch.type === 'All' || a.type.toLowerCase() === ch.type.toLowerCase())
    );
    const totalKm = userActs.reduce((acc, a) => acc + a.distance, 0) / 1000;
    const pct = Math.min(100, Math.round((totalKm / ch.target_km) * 100));
    return { km: totalKm.toFixed(1), pct };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[#00BCEB] font-extrabold text-xs uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-[#CCFF00]" />
            <span>{t('challenges', 'tag')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{t('challenges', 'title')}</h1>
          <p className="text-sm text-slate-400">{t('challenges', 'desc')}</p>
        </div>

        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FC4C02] to-orange-500 hover:from-orange-500 hover:to-[#FC4C02] text-white font-extrabold text-sm shadow-lg shadow-[#FC4C02]/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('challenges', 'createRaceBtn')}</span>
          </button>
        )}
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((ch) => {
          const isJoined = currentUser ? ch.participant_ids.includes(currentUser.id) : false;
          const userProgress = getParticipantProgress(ch, currentUser?.id);

          return (
            <div
              key={ch.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between hover:border-[#00BCEB]/50 transition-all group"
            >
              <div
                className="h-44 bg-cover bg-center relative p-4 flex flex-col justify-between"
                style={{ backgroundImage: `url(${ch.banner_url || '/images/cisco_sports_hero.jpg'})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-slate-900/90 text-xs font-bold text-[#CCFF00] border border-slate-700">
                    {ch.type === 'Run' ? '🏃 Chạy bộ' : ch.type === 'Ride' ? '🚴 Đạp xe' : '🚶 Đi bộ'}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-[#00BCEB]/20 text-[#00BCEB] border border-[#00BCEB]/40 text-xs font-bold uppercase">
                    {ch.status === 'active' ? t('challenges', 'activeStatus') : t('challenges', 'upcomingStatus')}
                  </span>
                </div>

                <div className="relative z-10 space-y-1">
                  <h3 className="font-extrabold text-lg text-white group-hover:text-[#00BCEB] transition-colors">{ch.title}</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>{ch.start_date} → {ch.end_date}</span>
                  </p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{ch.description}</p>

                <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-[#FC4C02]" /> {t('challenges', 'targetKm')}: {ch.target_km} km
                    </span>
                    <span className="text-[#CCFF00] font-extrabold">
                      {isJoined ? `${userProgress.km} km (${userProgress.pct}%)` : t('challenges', 'notJoined')}
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00BCEB] via-[#CCFF00] to-[#FC4C02] rounded-full transition-all duration-500"
                      style={{ width: `${isJoined ? userProgress.pct : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-500" />
                    <strong className="text-white font-bold">{ch.participant_ids.length}</strong> VĐV
                  </span>

                  {isJoined ? (
                    <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4" /> {t('challenges', 'joinedBadge')}
                    </span>
                  ) : (
                    <button
                      onClick={() => joinChallenge(ch.id)}
                      className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-[#00BCEB] hover:bg-[#00a3cc] text-slate-950 font-extrabold text-xs shadow-md transition-all"
                    >
                      <span>{t('challenges', 'joinNowBtn')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Create Race */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xl text-white">{t('challenges', 'modalTitle')}</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">{t('challenges', 'raceTitleLabel')}</label>
                <input
                  type="text"
                  required
                  placeholder="CISCO MARATHON 🏆"
                  value={chTitle}
                  onChange={(e) => setChTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00BCEB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">{t('challenges', 'raceDescLabel')}</label>
                <textarea
                  rows={2}
                  placeholder="Rules..."
                  value={chDesc}
                  onChange={(e) => setChDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00BCEB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">{t('challenges', 'sportTypeLabel')}</label>
                  <select
                    value={chType}
                    onChange={(e) => setChType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00BCEB]"
                  >
                    <option value="Run">🏃 Run</option>
                    <option value="Ride">🚴 Ride</option>
                    <option value="Walk">🚶 Walk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">{t('challenges', 'targetKmLabel')}</label>
                  <input
                    type="number"
                    required
                    value={chTargetKm}
                    onChange={(e) => setChTargetKm(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00BCEB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">{t('challenges', 'startDateLabel')}</label>
                  <input
                    type="date"
                    value={chStartDate}
                    onChange={(e) => setChStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00BCEB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">{t('challenges', 'endDateLabel')}</label>
                  <input
                    type="date"
                    value={chEndDate}
                    onChange={(e) => setChEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#00BCEB]"
                  />
                </div>
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
                  {t('challenges', 'publishBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
