import React from 'react';
import { Coffee, Utensils, Moon } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const MealMenuView: React.FC = () => {
  const { meals } = useHostel();

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
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          View Kitchen
        </button>
      </div>

      <div className="space-y-3.5 my-auto">
        {meals.map((meal) => (
          <div
            key={meal.type}
            className="flex items-center justify-between gap-4 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${getMealBg(
                  meal.type
                )}`}
              >
                {getMealIcon(meal.type)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{meal.type}</h4>
                <p className="text-[11px] text-slate-400 font-medium">{meal.time}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium text-slate-600 max-w-[180px] sm:max-w-[210px] truncate">
                • {meal.menu.join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
