import React from 'react';
import { UnitData } from '../types';
import { MapPin, Shield, Building } from 'lucide-react';

interface DataTableProps {
  data: UnitData[];
  highlightText: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, highlightText }) => {
  const getHighlight = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 text-black font-semibold rounded px-0.5">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-slate-200">
        <Shield className="mx-auto h-12 w-12 text-slate-300 mb-3" />
        <h3 className="text-lg font-medium text-slate-900">Nenhuma unidade encontrada</h3>
        <p className="text-slate-500">Tente ajustar seus termos de busca.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-sm border border-slate-200 bg-white">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Localidade
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                OPM RAIO
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                BTL RAIO
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mr-3">
                      <MapPin size={16} />
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {getHighlight(row.localidade, highlightText)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-700 font-medium">
                    {getHighlight(row.opm_raio, highlightText)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-white">
                    {row.btl_raio}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden divide-y divide-slate-200">
        {data.map((row) => (
          <div key={row.id} className="p-4 hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                 <MapPin className="h-4 w-4 text-slate-400 mr-2" />
                 <h3 className="text-lg font-bold text-slate-900">
                   {getHighlight(row.localidade, highlightText)}
                 </h3>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-slate-800 text-white">
                {row.btl_raio}
              </span>
            </div>
            <div className="flex items-start mt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded border border-slate-100">
              <Shield className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="font-medium">{getHighlight(row.opm_raio, highlightText)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;