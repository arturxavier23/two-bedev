import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Book, Search } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import { glossaryData, categories } from "@/data/glossary";

// tela do glossario de termos tecnicos
const Glossary = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState<string | null>(null);

  // filtra os termos pela busca e categoria
  const termosFiltrados = glossaryData.filter((t) => {
    const matchBusca = busca === "" ||
      t.term.toLowerCase().includes(busca.toLowerCase()) ||
      t.translation.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoria === null || t.category === categoria;
    return matchBusca && matchCategoria;
  });

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col bg-slate-950 pb-16">
        {/* header */}
        <div className="px-5 pt-10 pb-3 flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Book className="h-4 w-4 text-primary" />
            Glossário ({glossaryData.length} termos)
          </h1>
        </div>

        {/* campo de busca */}
        <div className="px-5 mb-3">
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar termo..."
              className="bg-transparent text-sm text-white outline-none flex-1"
            />
          </div>
        </div>

        {/* filtro por categoria */}
        <div className="px-5 mb-4 flex gap-2 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setCategoria(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              categoria === null
                ? "bg-primary text-white"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                categoria === cat
                  ? "bg-primary text-white"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* lista de termos */}
        <div className="px-5 space-y-2">
          {termosFiltrados.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              Nenhum termo encontrado
            </p>
          ) : (
            termosFiltrados.map((t, i) => (
              <div
                key={i}
                className="rounded-xl bg-slate-800 p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-white">{t.term}</p>
                  <span className="text-[10px] text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">
                    {t.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{t.translation}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </MobileShell>
  );
};

export default Glossary;