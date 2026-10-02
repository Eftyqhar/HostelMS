import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Coffee,
  Utensils,
  Moon,
  Sparkles,
  ChefHat,
  Package,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { MealItem } from '../../types';

export const AdminMealsView: React.FC = () => {
  const { meals, addMeal, updateMeal, deleteMeal, showToast } = useHostel();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMealType, setEditingMealType] = useState<string | null>(null);

  // Form state
  const [mealType, setMealType] = useState('Breakfast');
  const [servingTime, setServingTime] = useState('07:30 AM - 09:30 AM');
  const [menuItemsText, setMenuItemsText] = useState('Paratha, Scrambled Eggs, Mixed Dal, Milk Tea');

  // Weekly planner sample state
  const [selectedDay, setSelectedDay] = useState('Friday');

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

  const getMealBadgeColor = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('breakfast')) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (lower.includes('lunch') || lower.includes('feast')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (lower.includes('dinner')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  const handleOpenAdd = () => {
    setEditingMealType(null);
    setMealType('Snacks');
    setServingTime('05:00 PM - 06:00 PM');
    setMenuItemsText('Singara, Samosa, Special Cardamom Milk Tea');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (meal: MealItem) => {
    setEditingMealType(meal.type);
    setMealType(meal.type);
    setServingTime(meal.time);
    setMenuItemsText(meal.menu.join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = (type: string) => {
    if (confirm(`Are you sure you want to remove "${type}" from today's active menu?`)) {
      deleteMeal(type);
    }
  };

  const handleSaveMeal = (e: React.FormEvent) => {
    e.preventDefault();
    const items = menuItemsText
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (items.length === 0) {
      alert('Please enter at least one dish in the menu');
      return;
    }

    if (editingMealType) {
      updateMeal(editingMealType, {
        type: mealType,
        time: servingTime,
        menu: items
      });
    } else {
      addMeal({
        type: mealType,
        time: servingTime,
        menu: items,
        taken: false
      });
    }

    setIsModalOpen(false);
  };

  const pantryStock = [
    { item: 'Miniket Rice (Aman)', stock: '350 kg', status: 'Sufficient (7 Days)' },
    { item: 'Broiler Chicken', stock: '85 kg', status: 'Fresh Daily Supply' },
    { item: 'Masoor Dal (Lentils)', stock: '65 kg', status: 'Sufficient (12 Days)' },
    { item: 'Soybean Cooking Oil', stock: '45 Liters', status: 'Optimal' },
    { item: 'Farm Fresh Eggs', stock: '480 Pieces', status: 'In Cold Storage' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              Kitchen & Mess Management
            </span>
            <span className="text-xs text-slate-300">• Central Dining Hall</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">Hostel Mess Dining & Menu Operations</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Configure daily meal schedules, update breakfast, lunch, and dinner menus, supervise kitchen inventory, and adjust weekly feasting routines.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Meal / Schedule</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Today's Meal Attendance</p>
            <h4 className="text-2xl font-black text-emerald-600">89.4%</h4>
            <span className="text-[10px] text-slate-500">429 / 480 Students Fed</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Head Mess Supervisor</p>
            <h4 className="text-lg font-black text-slate-800">Chef M. Karim</h4>
            <span className="text-[10px] text-slate-400">8 Kitchen Staff On Duty</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ChefHat className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Avg Cost / Plate</p>
            <h4 className="text-2xl font-black text-blue-600">৳ 48.50</h4>
            <span className="text-[10px] text-slate-400">Within monthly budget</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Hygiene & Audit Rating</p>
            <h4 className="text-2xl font-black text-purple-600">Grade A+</h4>
            <span className="text-[10px] text-emerald-600 font-bold">Passed Sanitation Check</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Today's Active Meals with Edit & Delete Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Today's Live Mess Menu & Serving Times</h4>
            <p className="text-xs text-slate-400">
              Active meals displayed directly on student dashboards and kitchen serving boards
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs border border-blue-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Meal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meals.map((meal) => (
            <div
              key={meal.type}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-white flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-100">
                      {getMealIcon(meal.type)}
                    </div>
                    <div>
                      <h5 className="font-black text-sm text-slate-800">{meal.type}</h5>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getMealBadgeColor(meal.type)}`}>
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(meal)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Edit Menu"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(meal.type)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Meal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{meal.time}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Served Items
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {meal.menu.map((dish, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Kitchen: Ready</span>
                <button
                  onClick={() => handleOpenEdit(meal)}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Edit Dishes →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Menu Planner & Kitchen Pantry Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Weekly Master Planner */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Weekly Master Mess Routine</h4>
              <p className="text-xs text-slate-400">Pre-scheduled menu rotation for the full 7-day academic cycle</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">Cycle: Fall Semester 2026</span>
          </div>

          {/* Weekday Selector Pills */}
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

          {/* Schedule for Selected Day */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-amber-50/40 space-y-2">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-600" />
                <h6 className="font-bold text-xs text-slate-800">Breakfast</h6>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                {weeklySchedule[selectedDay]?.breakfast.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-emerald-50/40 space-y-2">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-600" />
                <h6 className="font-bold text-xs text-slate-800">Lunch</h6>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                {weeklySchedule[selectedDay]?.lunch.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-purple-50/40 space-y-2">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-600" />
                <h6 className="font-bold text-xs text-slate-800">Dinner</h6>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                {weeklySchedule[selectedDay]?.dinner.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              * Friday features the weekly grand hostel banquet lunch (Biryani & Borhani).
            </span>
            <button
              onClick={() => showToast('Weekly master routine changes saved successfully!')}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Save Schedule Updates
            </button>
          </div>
        </div>

        {/* Kitchen Pantry Stock & Supplies */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-slate-800 text-sm">Pantry Provisions</h4>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              In Stock
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {pantryStock.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{item.item}</p>
                  <p className="text-[10px] text-slate-400">{item.status}</p>
                </div>
                <span className="font-black text-slate-900 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-[11px]">
                  {item.stock}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => showToast('Pantry requisition purchase order generated for Central Market!')}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Create Purchase Requisition
          </button>
        </div>
      </div>

      {/* Add / Edit Meal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {editingMealType ? `Edit Meal: ${editingMealType}` : 'Add New Meal Schedule'}
                  </h3>
                  <p className="text-[11px] text-slate-400">Configure timing and served dishes</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMeal} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Meal Type / Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Breakfast, Lunch, Evening Snacks, Dinner, Friday Feast"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Serving Time Window</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 07:30 AM - 09:30 AM"
                  value={servingTime}
                  onChange={(e) => setServingTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Menu Dishes (Comma separated)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Paratha, Egg Omelette, Mixed Vegetables, Milk Tea"
                  value={menuItemsText}
                  onChange={(e) => setMenuItemsText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <p className="text-[10px] text-slate-400 mt-1">Separate each dish name with a comma (,)</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-blue-600" />
                <span>Changes will immediately reflect on all resident student portals and the kitchen board.</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md cursor-pointer"
                >
                  {editingMealType ? 'Update Meal' : 'Add Meal to Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
