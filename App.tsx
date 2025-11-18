import React, { useState, useMemo } from 'react';
import { RAIO_DATA } from './constants';
import DataTable from './components/DataTable';
import StatsDashboard from './components/StatsDashboard';
import { Search, LayoutGrid, List, Menu, X, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredData = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return RAIO_DATA.filter(item => 
      item.localidade.toLowerCase().includes(lowerTerm) ||
      item.opm_raio.toLowerCase().includes(lowerTerm) ||
      item.btl_raio.toLowerCase().includes(lowerTerm)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="bg-slate-900 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2 text-white">
                  <Shield className="h-8 w-8 text-yellow-500" />
                  <span className="font-bold text-xl tracking-tight">RAIO<span className="text-slate-400 font-light">EXPLORER</span></span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() => setActiveTab('list')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'list' 
                        ? 'bg-slate-800 text-white' 
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <List size={18} />
                      Lista de Unidades
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'stats' 
                        ? 'bg-slate-800 text-white' 
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LayoutGrid size={18} />
                      Estatísticas
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => { setActiveTab('list'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'list' ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Lista de Unidades
              </button>
              <button
                onClick={() => { setActiveTab('stats'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'stats' ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Estatísticas
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:text-3xl sm:truncate">
              {activeTab === 'list' ? 'Consulta de Unidades' : 'Painel Analítico'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Comando de Policiamento de Rondas de Ações Intensivas e Ostensivas
            </p>
          </div>
        </div>

        {/* Search Bar - Sticky on mobile only if needed, but putting here for general use */}
        {activeTab === 'list' && (
          <div className="mb-6 sticky top-20 z-30 md:static">
            <div className="relative max-w-xl shadow-sm rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="focus:ring-2 focus:ring-slate-800 focus:border-slate-800 block w-full pl-10 sm:text-sm border-slate-300 rounded-md p-3 shadow-sm border outline-none"
                placeholder="Buscar por Localidade, OPM ou Batalhão..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="mt-2 text-xs text-slate-500 flex justify-between px-1">
              <span>Mostrando {filteredData.length} resultados</span>
              {searchTerm && <span>Filtro ativo: "{searchTerm}"</span>}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="animate-fadeIn">
          {activeTab === 'list' ? (
            <DataTable data={filteredData} highlightText={searchTerm} />
          ) : (
            <StatsDashboard data={RAIO_DATA} />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;