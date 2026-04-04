import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ChevronDown, X, ShoppingBag } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  priceDisplay: string;
  color: string;
  image?: string;
  category: string;
  description?: string;
}

const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "D@C be the one",
    price: 750,
    priceDisplay: "750mt",
    color: "Branco",
    image: "/product1.png",
    category: "Premium",
    description: "100% algodão"
  },
  {
    id: 2,
    name: "D@C be the one",
    price: 1300,
    priceDisplay: "1300mt",
    color: "Preto & Branco",
    image: "/product2.png",
    category: "premium",
    description: "100% algodão"
  },
  {
    id: 3,
    name: "D@C be the one",
    price: 750,
    priceDisplay: "750mt",
    color: "Azul Escuro",
    image: "/product3.png",
    category: "Premium",
    description: "100% algodão"
  }
];

export default function Gallery({ onImageClick, onAddToCart }: { onImageClick: (url: string) => void, onAddToCart: (product: any, size: string, quantity: number) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedColor, setSelectedColor] = useState("Todas");
  const [sortBy, setSortBy] = useState("featured"); // featured, price-low, price-high, name
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [productStates, setProductStates] = useState<Record<number, { size: string, quantity: number }>>({});

  const getProductState = (id: number) => productStates[id] || { size: 'M', quantity: 0 };
  const updateProductState = (id: number, updates: any) => {
    setProductStates(prev => ({
      ...prev,
      [id]: { ...getProductState(id), ...updates }
    }));
  };

  const categories = ["Todos", ...Array.from(new Set(ALL_PRODUCTS.map(p => p.category)))];
  const colors = ["Todas", ...Array.from(new Set(ALL_PRODUCTS.map(p => p.color)))];

  const filteredProducts = useMemo(() => {
    let result = ALL_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesColor = selectedColor === "Todas" || product.color === selectedColor;
      return matchesSearch && matchesCategory && matchesColor;
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - keep original order
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedColor, sortBy]);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-5xl font-display font-bold tracking-tight mb-4">Galeria de Produtos</h1>
        <p className="text-zinc-400 max-w-2xl">Explore nossa coleção completa de peças essenciais, desenhadas para o seu posicionamento.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-white/10 rounded-full text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all text-sm font-bold ${isFilterOpen ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-900 border-white/10 text-zinc-400 hover:border-white/30'}`}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>

          <div className="relative flex-1 lg:flex-none">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full lg:w-48 appearance-none bg-slate-900 border border-white/10 rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="featured">Destaques</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="name">Nome (A-Z)</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Categorias</h4>
                <div className="flex flex-wrap gap-3">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-800 text-zinc-400 hover:bg-slate-700'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Cores</h4>
                <div className="flex flex-wrap gap-3">
                  {colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedColor === color ? 'bg-blue-600 text-white' : 'bg-slate-800 text-zinc-400 hover:bg-slate-700'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div 
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              className="group bg-slate-900/50 p-4 rounded-3xl border border-white/5"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 rounded-2xl mb-6 border border-white/5 cursor-zoom-in" onClick={() => onImageClick(product.image!)}>
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageClick(product.image!);
                    }}
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-white">{product.name}</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-zinc-500 text-sm">{product.color}</p>
                      <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                      <p className="text-zinc-500 text-sm">{product.description}</p>
                    </div>
                  </div>
                  <span className="font-display font-bold text-blue-500">{product.priceDisplay}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Tamanho</label>
                    <select 
                      value={getProductState(product.id).size}
                      onChange={(e) => updateProductState(product.id, { size: e.target.value })}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option>P</option>
                      <option>M</option>
                      <option>G</option>
                      <option>GG</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Qtd</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={getProductState(product.id).quantity}
                      onChange={(e) => updateProductState(product.id, { quantity: parseInt(e.target.value) || 1 })}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                </div>

                <button 
                  onClick={() => onAddToCart(
                    { id: product.id, name: product.name, price: product.priceDisplay, color: product.color, image: product.image },
                    getProductState(product.id).size,
                    getProductState(product.id).quantity
                  )}
                  disabled={getProductState(product.id).quantity === 0}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    getProductState(product.id).quantity === 0 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-white hover:text-blue-600 text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  COMPRAR
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-zinc-500 text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Todos");
              setSelectedColor("Todas");
            }}
            className="mt-6 text-blue-500 font-bold hover:underline"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
}
