
import React, { useState } from 'react';
import { analyzePayrollData } from '../services/geminiService';
import { Sparkles, TrendingUp, DollarSign, BrainCircuit, Loader2 } from 'lucide-react';

const WorkPlan: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Sample data for analysis
      const data = {
        monthlyBudget: 2500000000,
        currentSpend: 2450000000,
        overtimeCount: 450,
        lateArrivals: 120,
        productivityIndex: 0.85
      };
      const result = await analyzePayrollData(data);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Sparkles size={32} /> AI Payroll Strategist
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Optimalkan rencana pengeluaran upah dan tingkatkan efisiensi kerja dengan analisis cerdas Gemini.
          </p>
          <button 
            onClick={runAiAnalysis}
            disabled={isAnalyzing}
            className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-xl shadow-black/10"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <BrainCircuit size={20} />}
            {isAnalyzing ? 'Menganalisis Data...' : 'Mulai Analisis Biaya'}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-emerald-500" /> Ringkasan Strategis
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {analysis.summary}
              </p>
              <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <DollarSign size={18} className="text-indigo-500" /> Rekomendasi Anggaran
                </h4>
                <p className="text-slate-600">{analysis.budgetAdvice}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Langkah Tindak Lanjut Utama</h3>
              <div className="space-y-4">
                {analysis.topActionItems.map((item: string, idx: number) => (
                  <div key={idx} className="flex gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 py-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <h3 className="text-slate-500 font-medium mb-4">Skor Efisiensi Operasional</h3>
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="#f1f5f9"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (analysis.efficiencyScore / 100) * 364}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-slate-800">{analysis.efficiencyScore}%</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400 font-medium">Berdasarkan data kehadiran dan payroll bulan ini.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkPlan;
