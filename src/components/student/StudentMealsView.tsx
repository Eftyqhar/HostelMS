import React, { useState } from 'react';
import {
  Coffee,
  Utensils,
  Moon,
  Sparkles,
  CheckCircle2,
  Clock,
  QrCode,
  Heart,
  MessageSquare,
  AlertCircle,
  ChevronRight,
  Check,
  Send,
  X
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { MealItem } from '../../types';

export const StudentMealsView: React.FC = () => {
  const { currentStudent, meals, toggleMealTaken, showToast } = useHostel();

  const [selectedDay, setSelectedDay] = useState('Today');
  const [showQrModal, setShowQrModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState('5');
  const [feedbackText, setFeedbackText] = useState('');

  const weeklySchedule: Record<string, { breakfast: string[]; lunch: string[]; dinner: string[] }> = {
    Monday: {
      breakfast: ['Roti / Paratha', 'Vegetable Curry', 'Boiled Egg', 'Tea'],
      lunch: ['Steamed Rice', 'Fish Curry (Rui)', 'Dal', 'Seasonal Salad'],
      dinner: ['Rice', 'Chicken Curry', 'Lentil Soup', 'Mixed Vegetables']
    },
    Tuesday: {
      breakfast: ['Khichuri', 'Begun Bhaja', 'Pickle', 'Tea'],
      lunch: ['Steamed Rice', 'Chicken Korma', 'Thick Dal', 'Alu Bhorta'],
      dinner: ['Roti / Rice', 'Egg Curry', 'Vegetable Mixed Dal']
    },
    Wednesday: {
      breakfast: ['Paratha', 'Omelette', 'Chana Dal', 'Coffee / Tea'],
      lunch: ['Steamed Rice', 'Fish Fry (Tilapia)', 'Dal Palong', 'Salad'],
      dinner: ['Steamed Rice', 'Beef Curry / Chicken', 'Dal', 'Bhaji']
    },
    Thursday: {
      breakfast: ['Roti', 'Mixed Bhaji', 'Boiled Egg', 'Tea'],
      lunch: ['Steamed Rice', 'Chicken Roast', 'Lentil Soup', 'Cucumber Salad'],
      dinner: ['Rice / Roti', 'Vegetable Curry', 'Egg Bhurji', 'Dal']
    },
    Friday: {
      breakfast: ['Halwa Puri', 'Chana Masala', 'Tea'],
      lunch: ['Mutton / Chicken Kacchi Biryani', 'Borhani', 'Jali Kabab', 'Firni'],
      dinner: ['Light Rice / Roti', 'Chicken Curry', 'Plain Dal']
    },
    Saturday: {
      breakfast: ['Bhuna Khichuri', 'Fried Egg', 'Pickle'],
      lunch: ['Rice', 'Fish Dopiaza', 'Moong Dal', 'Tomato Chutney'],
      dinner: ['Rice / Roti', 'Chicken Broth / Curry', 'Mixed Veg']
    },
    Sunday: {
      breakfast: ['Paratha', 'Potato Bhaji', 'Omelette', 'Tea'],
      lunch: ['Steamed Rice', 'Chicken Do-Piyaza', 'Dal', 'Green Salad'],
      dinner: ['Rice / Roti', 'Egg Curry with Potatoes', 'Dal Tadka']
    }
  };

  const getMealIcon = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('breakfast')) return <Coffee className="w-5 h-5 text-amber-600" />;
    if (lower.includes('lunch') || lower.includes('feast')) return <Utensils className="w-5 h-5 text-emerald-600" />;
    if (lower.includes('dinner')) return <Moon className="w-5 h-5 text-purple-600" />;
    return <Sparkles className="w-5 h-5 text-blue-600" />;
  };

  const handleToggle = (meal: MealItem) => {
    toggleMealTaken(meal.type as any);
    showToast(
      meal.taken
        ? `You unselected "${meal.type}". Mess coupon marked as skipped.`
        : `"${meal.type}" pass claimed! Token verified for dining hall.`
    );
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      alert('Please provide your comments or suggestions');
      return;
    }
    setShowFeedbackModal(false);
    setFeedbackText('');
    showToast('Thank you! Your dining feedback has been forwarded to Chef Karim & Warden Office.');
  };

  const claimedCount = meals.filter((m) => m.taken).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              Student Dining Account
            </span>
            <span className="text-xs text-slate-300">• Room {currentStudent.room}</span>
            <span className="text-xs text-slate-300">• Ground Floor Dining Hall 2</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">Today's Meal Menu & Dining Passes</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            View today's freshly prepared dishes, claim or skip meal passes, flash your digital QR dining token at the counter, and browse the full weekly feast routine.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-blue-600" />
            <span>Digital Meal QR Pass</span>
          </button>
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Mess Feedback</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Today's Claimed Passes</p>
            <h4 className="text-2xl font-black text-emerald-600">
              {claimedCount} / {meals.length} Meals
            </h4>
            <span className="text-[10px] text-slate-500">Active dining status</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Dietary Profile</p>
            <h4 className="text-2xl font-black text-blue-600">Halal / Standard</h4>
            <span className="text-[10px] text-slate-400">Chicken, Rui Fish & Fresh Vegetables</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Next Upcoming Meal</p>
            <h4 className="text-2xl font-black text-amber-600">Lunch (12:30 PM)</h4>
            <span className="text-[10px] text-slate-400">Serving starts in ~1 hour</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Today's Live Meals Cards Grid */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Today's Fresh Meals</h4>
            <p className="text-xs text-slate-400">
              Click "Claim Pass" to ensure food is reserved for you at the counter
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">Student ID: {currentStudent.id}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {meals.map((meal) => {
            const isClaimed = meal.taken;
            return (
              <div
                key={meal.type}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isClaimed
                    ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-slate-100">
                        {getMealIcon(meal.type)}
                      </div>
                      <div>
                        <h5 className="font-black text-base text-slate-800">{meal.type}</h5>
                        <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {meal.time}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isClaimed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isClaimed ? 'Claimed' : 'Not Claimed'}
                    </span>
                  </div>

                  <div className="space-y-2 mt-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Dishes on Menu
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {meal.menu.map((dish, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          <span className="font-medium">{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleToggle(meal)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      isClaimed
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Pass Claimed (Click to Skip)</span>
                      </>
                    ) : (
                      <>
                        <span>Claim Meal Pass</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Day Weekly Mess Routine */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Weekly Mess Dining Routine</h4>
            <p className="text-xs text-slate-400">See what is cooking for the rest of the week</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">Central Mess Menu</span>
        </div>

        {/* Days Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {Object.keys(weeklySchedule).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Selected Day View */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-xl border border-slate-200 bg-amber-50/30 space-y-2">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-600" />
              <h5 className="font-bold text-xs text-slate-800">Breakfast (07:30 AM - 09:30 AM)</h5>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
              {weeklySchedule[selectedDay === 'Today' ? 'Friday' : selectedDay]?.breakfast.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/30 space-y-2">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-emerald-600" />
              <h5 className="font-bold text-xs text-slate-800">Lunch (12:30 PM - 02:30 PM)</h5>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
              {weeklySchedule[selectedDay === 'Today' ? 'Friday' : selectedDay]?.lunch.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-purple-50/30 space-y-2">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-600" />
              <h5 className="font-bold text-xs text-slate-800">Dinner (07:30 PM - 09:30 PM)</h5>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
              {weeklySchedule[selectedDay === 'Today' ? 'Friday' : selectedDay]?.dinner.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Friday Grand Feast Notice</p>
            <p className="text-blue-800/80 mt-0.5">
              Special lunch featuring Mutton / Chicken Kacchi Biryani, Borhani, and Firni is served exclusively on Fridays. Guests may join by purchasing a visitor coupon at the office.
            </p>
          </div>
        </div>
      </div>

      {/* QR Code Pass Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Digital Mess Token
              </span>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl inline-block mx-auto">
              <div className="w-44 h-44 bg-white border border-slate-300 rounded-xl flex flex-col items-center justify-center p-2 shadow-2xs">
                <QrCode className="w-36 h-36 text-slate-800" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-base text-slate-900">{currentStudent.name}</h4>
              <p className="text-xs text-slate-500 font-mono">ID: {currentStudent.id} • Room: {currentStudent.room}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Token: MEAL-2026-ACTIVE
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Flash this QR barcode at the cafeteria scanner before picking up your tray.
            </p>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Mess Food Feedback & Review</h3>
                  <p className="text-[11px] text-slate-400">Help the kitchen team improve food quality</p>
                </div>
              </div>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Overall Food Quality Rating</label>
                <select
                  value={feedbackRating}
                  onChange={(e) => setFeedbackRating(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="5">⭐⭐⭐⭐⭐ Excellent (Tasty & hygienic)</option>
                  <option value="4">⭐⭐⭐⭐ Good (Satisfactory)</option>
                  <option value="3">⭐⭐⭐ Average (Needs minor improvements)</option>
                  <option value="2">⭐⭐ Poor (Needs quality check)</option>
                  <option value="1">⭐ Unacceptable (Cold / undercooked)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Suggestions / Remarks</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details about spice level, portion size, cooking, or requested dishes..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
