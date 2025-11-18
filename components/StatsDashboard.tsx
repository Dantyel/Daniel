import React, { useMemo } from 'react';
import { UnitData } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Building2, Map, ShieldCheck } from 'lucide-react';

interface StatsDashboardProps {
  data: UnitData[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ data }) => {
  
  const stats = useMemo(() => {
    const battalionCounts: Record<string, number> = {};
    
    data.forEach(item => {
      battalionCounts[item.btl_raio] = (battalionCounts[item.btl_raio] || 0) + 1;
    });

    const chartData = Object.entries(battalionCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      totalLocalities: data.length,
      totalBattalions: Object.keys(battalionCounts).length,
      chartData
    };
  }, [data]);

  const colors = ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8'];

  return (
    <div className="space-y-6 mb-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
            <Map size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium uppercase">Total Localidades</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalLocalities}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-slate-100 text-slate-700 mr-4">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium uppercase">Batalhões Ativos</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalBattalions}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
           <div className="p-3 rounded-full bg-indigo-50 text-indigo-600 mr-4">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium uppercase">Maior Cobertura</p>
            <p className="text-xl font-bold text-slate-900">
              {stats.chartData.reduce((max, current) => (current.count > max.count ? current : max), stats.chartData[0])?.name || '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Distribuição de Unidades por Batalhão</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {stats.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;