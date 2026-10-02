import React from 'react';
import { Coffee, Utensils, Moon, CheckCircle2, Circle } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentMealCard: React.FC = () => {
  const { meals, toggleMealTaken, setActiveSidebarTab } = useHostel();

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'Breakfast':
        return <Coffee className="w-4 h-4 text-amber-600" />;
      case 'Lunch':
        return <Utensils className="w-4 h-4 text-emerald-600" />;
      case 'Dinner':
        return <Moon className="w-4 h-4 text-purple-600" />;
      default:
        return <Utensils className="w-4 h-4 text-blue-600" />;
    }
  };

  const getMealBg = (type: string) => {
    switch (type) {
      case 'Breakfast':
        return 'bg-amber-100 text-amber-700';
      case 'Lunch':
        return 'bg-emerald-100 text-emerald-700';
      case 'Dinner':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-800">Today's Meal Menu</h3>
        <button
          onClick={() => setActiveSidebarTab('Meal Menu')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Full Menu
        </button>
      </div>

      <div className="space-y-3 my-auto">
        {meals.map((meal) => (
          <div
            key={meal.type}
            onClick={() => toggleMealTaken(meal.type)}
            className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            title="Click to toggle meal attendance"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${getMealBg(
                  meal.type
                )}`}
              >
                {getMealIcon(meal.type)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-800">{meal.type}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{meal.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate max-w-[170px] sm:max-w-[200px]">
                  • {meal.menu.join(', ')}
                </p>
              </div>
            </div>

            {/* Checkmark indicator */}
            <div className="shrink-0">
              {meal.taken ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 group-hover:text-slate-400 group-hover:scale-110 transition-all" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
