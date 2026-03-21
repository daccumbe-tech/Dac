import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ShoppingBag, Menu, X, ArrowRight, Instagram, MessageCircle, Facebook, ChevronRight, Calendar, Trash2, CheckCircle } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Gallery from './components/Gallery';

interface CartItem {
  id: number;
  name: string;
  price: string;
  color: string;
  image: string;
  size: string;
  quantity: number;
}

const PRODUCTS = [
  {
    id: 1,
    name: "D@C be the one",
    price: "Em breve",
    color: "Branco",
    image: "/product1.png", // input_file_0.png
    category: "Premium",
    description: "100% algodão"
  },
  {
    id: 2,
    name: "D@C be the one",
    price: "Em breve",
    color: "Preto & Branco",
    image: "/product2.png", // input_file_1.png
    category: "premium",
    description: "100% algodão"
  },
  {
    id: 3,
    name: "D@C be the one",
    price: "Em breve",
    color: "Azul Escuro",
    image: "/product3.png", // input_file_2.png
    category: "Premium",
    description: "100% algodão"
  }
];

function Home({ onImageClick, onAddToCart }: { onImageClick: (url: string) => void, onAddToCart: (product: any, size: string, quantity: number) => void }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [productStates, setProductStates] = useState<Record<number, { size: string, quantity: number }>>({});

  const getProductState = (id: number) => productStates[id] || { size: 'M', quantity: 1 };
  const updateProductState = (id: number, updates: any) => {
    setProductStates(prev => ({
      ...prev,
      [id]: { ...getProductState(id), ...updates }
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-600 px-4 py-1 rounded-full font-bold tracking-[0.2em] uppercase text-[10px] mb-6 shadow-lg shadow-blue-600/20"
          >
            <Calendar className="w-3 h-3" />
            Lançamento em Março
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none mb-8"
          >
            MARÇO JÁ <br />
            <span className="text-blue-500">TEM DONO.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-zinc-300 max-w-xl mx-auto mb-10 text-balance"
          >
            Não é só uma camiseta. É posicionamento. Minimalista. Poderoso. Direto.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/gallery" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group">
              EU SOU O UM
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="bg-transparent text-white border border-white/30 px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Ver Manifesto
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-zinc-500">
            BE THE ONE
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className="text-xs font-bold text-blue-500 tracking-[0.2em] uppercase mb-4">A Coleção</h3>
            <h2 className="text-4xl font-display font-bold tracking-tight">Agendadas para Março</h2>
          </div>
          <Link to="/gallery" className="text-sm font-bold flex items-center gap-2 border-b border-white/30 pb-1 hover:text-blue-400 hover:border-blue-400 transition-all">
            Ver Todos os Detalhes <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="group bg-slate-900/50 p-4 rounded-3xl border border-white/5"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 rounded-2xl mb-6 border border-white/5 cursor-zoom-in" onClick={() => onImageClick(product.image!)}>
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
                  <span className="font-display font-bold text-blue-500">{product.price}</span>
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
                    { id: product.id, name: product.name, price: product.price, color: product.color, image: product.image },
                    getProductState(product.id).size,
                    getProductState(product.id).quantity
                  )}
                  className="w-full bg-blue-600 hover:bg-white hover:text-blue-600 text-white py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  RESERVAR PARA MARÇO
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Philosophy */}
      <section id="manifesto" className="bg-slate-900 text-white py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <h3 className="text-blue-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">Manifesto D@C</h3>
            <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-8 leading-tight">
              Se você entende a mensagem, você já sabe o que fazer.
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Produção limitada. Sem repetição para todos. D@C não é apenas vestuário, é uma declaração de quem você é. Branco, Azul Escuro e Preto - as cores do poder minimalista.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border-l-2 border-blue-600 pl-6">
                <h4 className="text-xl font-display font-bold mb-2">Poderoso</h4>
                <p className="text-zinc-500 text-sm">Feito para quem lidera, não para quem segue.</p>
              </div>
              <div className="border-l-2 border-zinc-700 pl-6">
                <h4 className="text-xl font-display font-bold mb-2">Direto</h4>
                <p className="text-zinc-500 text-sm">Sem distrações. Apenas o essencial.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-800 rounded-2xl relative z-10 shadow-2xl border border-white/10 flex items-center justify-center">
              <span className="text-zinc-600 font-display font-bold text-4xl">BE THE ONE</span>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-2xl z-20 hidden md:block shadow-xl shadow-blue-600/20">
              <p className="text-2xl font-display font-bold">BE THE ONE</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="sobre" className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 group">
              <img 
                src="https://picsum.photos/seed/about/800/1000" 
                alt="Sobre a D@C" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <p className="text-3xl font-display font-bold text-white mb-2">D@C</p>
                <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">Vista com Ousadia</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-blue-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">Sobre Nós</h3>
            <h2 className="text-5xl font-display font-bold tracking-tight mb-8 leading-tight">
              Mais do que uma marca — somos uma identidade.
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                A <span className="text-white font-bold">D@C Vista com Ousadia</span> nasceu com a missão de transformar a forma de vestir em uma verdadeira expressão de ousadia, estilo e personalidade.
              </p>
              <p>
                Trabalhamos com foco na qualidade, nas tendências e na satisfação dos nossos clientes, oferecendo produtos que combinam elegância e autenticidade.
              </p>
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-2">Qualidade</h4>
                  <p className="text-sm">Materiais selecionados para durabilidade e conforto superior.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Autenticidade</h4>
                  <p className="text-sm">Design exclusivo que reflete sua verdadeira essência.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-8">Comenta: EU SOU O UM</h2>
          <p className="text-blue-100 text-lg mb-10">Segue a página. Fica pronto para março. O estoque é limitado e não haverá reposição.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-slate-950 hover:text-white transition-all flex items-center gap-2 shadow-lg">
              <Instagram className="w-5 h-5" />
              Seguir no Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const location = useLocation();

  const addToCart = (product: any, size: string, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-lg' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6 text-white" />
            </button>
            <div className="hidden lg:flex gap-6 text-xs font-medium uppercase tracking-widest">
              <Link to="/gallery" className="hover:text-blue-400 transition-colors">Lançamentos</Link>
              <a href="#sobre" className="hover:text-blue-400 transition-colors">Sobre Nós</a>
              <a href="#manifesto" className="hover:text-blue-400 transition-colors">Manifesto</a>
              <a href="mailto:daccumbe@gmail.com" className="hover:text-blue-400 transition-colors">Contato</a>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="D@C Logo" className="h-12 w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCartOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full text-[10px] flex items-center justify-center font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[110] bg-slate-950 border-l border-white/10 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-display font-bold">Minhas Reservas</h2>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag className="w-10 h-10 text-zinc-700" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Sua sacola está vazia</h3>
                    <p className="text-zinc-500 text-sm mb-8">Você ainda não adicionou nenhum item para reserva.</p>
                    <button 
                      onClick={() => {
                        setCartOpen(false);
                        location.pathname !== '/gallery' && window.location.assign('/gallery');
                      }}
                      className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all"
                    >
                      Explorar Coleção
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                        <div className="w-24 h-32 bg-slate-900 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-sm">{item.name}</h4>
                              <button 
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-zinc-500 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">{item.color} • Tam: {item.size}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-bold text-blue-500">Qtd: {item.quantity}</p>
                            <p className="text-sm font-display font-bold">{item.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-slate-900/50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-zinc-400 text-sm uppercase tracking-widest font-bold">Total Estimado</span>
                    <span className="text-xl font-display font-bold text-blue-500">Em breve</span>
                  </div>
                  <a 
                    href={`mailto:daccumbe@gmail.com?subject=Reserva de Pedido&body=Olá, gostaria de confirmar a reserva dos seguintes itens:%0D%0A%0D%0A${cartItems.map(item => `- ${item.name} (${item.color}, Tam: ${item.size}, Qtd: ${item.quantity})`).join('%0D%0A')}`}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white hover:text-blue-600 transition-all shadow-lg shadow-blue-600/20"
                  >
                    <CheckCircle className="w-5 h-5" />
                    CONFIRMAR RESERVA POR E-MAIL
                  </a>
                  <p className="text-[10px] text-center text-zinc-500 mt-4 uppercase tracking-widest leading-relaxed">
                    Ao confirmar, você será redirecionado para o seu e-mail para finalizar o contato conosco.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-lg lg:hidden"
            />
            
            {/* Menu Content */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm z-[70] bg-slate-950 p-8 flex flex-col text-white shadow-2xl lg:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                  <img src="/logo.png" alt="D@C Logo" className="h-10 w-auto" />
                </Link>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-8 h-8 text-zinc-400 hover:text-white transition-colors" />
                </button>
              </div>
              <div className="flex flex-col gap-8">
                <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold tracking-tight hover:text-blue-500 transition-colors">Lançamentos</Link>
                <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold tracking-tight hover:text-blue-500 transition-colors">Sobre Nós</a>
                <a href="#manifesto" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold tracking-tight hover:text-blue-500 transition-colors">Manifesto</a>
                <a href="mailto:daccumbe@gmail.com" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold tracking-tight hover:text-blue-500 transition-colors">Contato</a>
              </div>
              <div className="mt-auto pt-12 border-t border-white/5">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Siga-nos</p>
                <div className="flex gap-6">
                  <a href="https://www.instagram.com/da_cumbe?igsh=MTE4ZG5jeWloOThjaw==" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><Instagram className="w-6 h-6" /></a>
                  <a href="https://wa.me/258833950740" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><MessageCircle className="w-6 h-6" /></a>
                  <a href="https://www.facebook.com/share/18VY1GmVej/" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><Facebook className="w-6 h-6" /></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home onImageClick={setSelectedImage} onAddToCart={addToCart} />} />
        <Route path="/gallery" element={<Gallery onImageClick={setSelectedImage} onAddToCart={addToCart} />} />
      </Routes>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button 
              className="absolute top-8 right-8 text-white hover:text-blue-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="col-span-1 lg:col-span-1">
              <Link to="/" className="mb-6 block">
                <img src="/logo.png" alt="D@C Logo" className="h-10 w-auto" />
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Minimalista. Poderoso. Direto. A marca que define o seu posicionamento através do essencial.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/da_cumbe?igsh=MTE4ZG5jeWloOThjaw==" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 rounded-full hover:text-blue-500 transition-colors border border-white/5"><Instagram className="w-4 h-4" /></a>
                <a href="https://wa.me/258833950740" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 rounded-full hover:text-blue-500 transition-colors border border-white/5"><MessageCircle className="w-4 h-4" /></a>
                <a href="https://www.facebook.com/share/18VY1GmVej/" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 rounded-full hover:text-blue-500 transition-colors border border-white/5"><Facebook className="w-4 h-4" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-zinc-400">Coleção</h4>
              <ul className="flex flex-col gap-4 text-sm text-zinc-500">
                <li><Link to="/gallery" className="hover:text-white transition-colors">Lançamento Março</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition-colors">Essential White</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition-colors">Midnight Navy</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition-colors">Classic Black</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-zinc-400">Contato</h4>
              <ul className="flex flex-col gap-4 text-sm text-zinc-500">
                <li><a href="mailto:daccumbe@gmail.com" className="hover:text-white transition-colors">daccumbe@gmail.com</a></li>
                <li><a href="https://wa.me/258833950740" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">+258 83 395 0740</a></li>
                <li><a href="#" className="hover:text-white transition-colors">O Manifesto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-zinc-400">Newsletter</h4>
              <p className="text-zinc-500 text-xs mb-4">Seja o primeiro a saber quando o cronômetro parar.</p>
              <form className="flex gap-2">
                <input type="email" placeholder="E-mail" className="bg-slate-900 border border-white/5 rounded-full px-4 py-2 text-xs flex-1 focus:ring-1 focus:ring-blue-600 text-white" />
                <button className="bg-blue-600 p-2 rounded-full hover:bg-white hover:text-blue-600 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
            <p className="text-xs text-zinc-600">© 2024 D@Cvistacomousadia. Todos os direitos reservados.</p>
            <div className="flex gap-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              <span>#BeTheOne</span>
              <span>#VistaComOusadia</span>
              <span>#LançamentoMarço</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/258833950740?text=Olá,%20visitei%20o%20site%20D@CVistacomOusadia%20e%20gostaria%20de%20fazer%20uma%20compra." 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#128C7E] transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.048c0 2.123.554 4.197 1.608 6.037L0 24l6.105-1.602a11.832 11.832 0 005.937 1.598h.005c6.637 0 12.048-5.414 12.052-12.05a11.824 11.824 0 00-3.545-8.503z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Fale Conosco
        </span>
      </a>
    </div>
  );
}
