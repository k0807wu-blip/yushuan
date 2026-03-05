import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import {
  MapPin, TrendingUp, ArrowRight, Menu, X,
  ChevronRight, Globe, Box, BarChart3, RefreshCcw, DollarSign,
  Quote, ShieldCheck, Sparkles
} from 'lucide-react';

// --- 模擬數據與常數 ---
const businessPillars = [
  {
    icon: <Box className="text-orange-500" />,
    title: "技術革新",
    desc: "導入 Rhino 3D 建模與 3D 列印，結合手工拋光，大幅降低開模成本並縮短開發週期。",
    detail: "減少 70% 傳統蠟雕工時，實現快速打樣。"
  },
  {
    icon: <BarChart3 className="text-orange-500" />,
    title: "財務結構",
    desc: "建立自有工作室，將毛利率提升至 65% 以上，打破低毛利代工困境，建立品牌溢價。",
    detail: "直接銷售模型 (D2C) 確保最大化公益分配。"
  },
  {
    icon: <RefreshCcw className="text-orange-500" />,
    title: "永續循環",
    desc: "承諾提撥 25% 利潤至「返鄉基金」，按月撥款至合作 NGO 專戶，確保財務透明度。",
    detail: "每售出 4 件飾品，即可資助一戶家庭局部旅費。"
  },
  {
    icon: <ShieldCheck className="text-orange-500" />,
    title: "零庫存營運",
    desc: "採接單生產與群眾募資預購模式，精準控制金流，將庫存風險降至最低。",
    detail: "動態調整產能，避免資源浪費與資金積壓。"
  }
];

const portfolioItems = [
  {
    title: "寄「夢」於「藍」",
    type: "銅胎掐絲琺瑯",
    meaning: "指引她們乘風破浪、踏上歸途的微光。",
    img: "https://k0807wu.zeabur.app/i/dab82ca5-0c85-423b-b822-c90fa05bc379.jpg"
  },
  {
    title: "花聲什麼事?",
    type: "純銀與琺瑯",
    meaning: "無論身在何處，思念終將如花香飄蕩。",
    img: "https://k0807wu.zeabur.app/i/82edd479-5508-46f3-a712-12329e0bb8b0.jpg"
  },
  {
    title: "Claire.",
    type: "蠟雕純銀飾",
    meaning: "守護她們心底最渴望回家的聲音。",
    img: "https://k0807wu.zeabur.app/i/35809318-c3ee-49f6-8f30-738de4188089.jpg"
  }
];

// --- 組件設計 ---

const StatCounter = ({ target, label, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    let start = 0;
    let timer = null;
    const duration = 2000;
    const increment = target / (duration / 16);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            if (timer) clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      }
    });

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [target]);

  return (
    <div ref={nodeRef} className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50">
      <div className="text-4xl font-black text-orange-600 mb-2 tabular-nums">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-bold text-stone-600 tracking-wider uppercase">{label}</div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-stone-900 font-sans selection:bg-orange-200 overflow-x-hidden">

      {/* 頂部進度條 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-orange-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 導航欄 */}
      <nav className={`fixed top-0 w-full z-[90] transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <MapPin size={22} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-stone-900 leading-none">歸途</span>
              <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase">Team Guítú</span>
            </div>
          </div>

          <div className="hidden md:flex gap-10 items-center">
            {['理念', '企劃', '作品', '影響力'].map((item, idx) => (
              <a key={item} href={`#section-${idx}`} className="text-sm font-bold text-stone-600 hover:text-orange-500 transition-colors tracking-widest">
                {item}
              </a>
            ))}
            <button className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-all">
              競賽提案書
            </button>
          </div>

          <button className="md:hidden p-2 text-stone-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="section-0" className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        {/* 背景漸層動畫 */}
        <div className="absolute inset-0 -z-10 bg-[#FFFDF7]">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-100 rounded-full blur-[120px] opacity-60"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-100 rounded-full blur-[100px] opacity-40"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white shadow-sm border border-orange-100 text-orange-600 rounded-full text-xs font-black mb-8 tracking-widest uppercase">
              <Sparkles size={14} /> 社會企業創意提案
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-stone-900 leading-[0.9] mb-8">
              每一件飾品，<br />
              <span className="text-orange-500">都是回家的路。</span>
            </h1>
            <p className="text-xl text-stone-600 mb-10 leading-relaxed font-medium max-w-xl">
              我們透過導入 3D 建模技術，將「金工設計」轉化為新住民跨越「返鄉經濟壁壘」的推動力。讓消費者的每一分支持，都化作具象的歸家信物。
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#section-1" className="px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-orange-200 flex items-center gap-3">
                探索商業企劃 <ArrowRight size={20} />
              </a>
              <div className="flex -space-x-3 items-center">
                {['陳郁璇', '陳彥閎', '吳定軒'].map((name) => (
                  <div key={name} className="w-10 h-10 rounded-full border-2 border-white bg-stone-200 overflow-hidden flex items-center justify-center">
                    <span className="text-[10px] font-bold text-stone-600">{name.slice(0, 1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 aspect-[4/5] bg-stone-200 rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white ring-1 ring-stone-100">
              <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-stone-400 italic">
                [Image of 3D Printing Jewelry Process]
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl border border-stone-50 z-20"
            >
              <div className="text-3xl font-black text-orange-500">65%+</div>
              <div className="text-xs font-bold text-stone-400">預期毛利率</div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* 商業模式與企劃 */}
      <section id="section-1" className="py-32 px-6 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 skew-x-12 translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">
                解構現狀：<br />
                <span className="text-orange-500">看不見的返鄉高牆</span>
              </h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">乘數效應：經濟負擔</h4>
                    <p className="text-stone-400 leading-relaxed">單次返鄉成本（含全家機票與伴手禮）常高達新住民 3-4 個月的全額薪資，造成返鄉意願的自我抑制。</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 bg-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center">
                    <Quote size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">面子文化：情感阻隔</h4>
                    <p className="text-stone-400 leading-relaxed">無法體面回鄉往往導致心理隔閡。傳統公益多偏向急難救助，缺乏對「回歸家庭情感」的長期支持。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {businessPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 hover:border-orange-500/50 transition-all group"
                >
                  <div className="mb-6 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-sm text-stone-400 mb-6 leading-relaxed">{pillar.desc}</p>
                  <div className="pt-4 border-t border-white/10 text-[10px] font-black text-orange-500 uppercase tracking-tighter">
                    {pillar.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 賦權作品集 */}
      <section id="section-2" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-4">信物 —— 將思念具象化</h2>
              <p className="text-stone-500 max-w-xl font-medium">我們不只是製作飾品，我們在打造一座橫跨海峽的橋樑，將工藝轉化為權力與歸屬感。</p>
            </div>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="min-w-[320px] md:min-w-[420px] snap-center bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-stone-100 border border-stone-50 flex flex-col group"
              >
                <div className="aspect-square relative flex items-center justify-center bg-stone-100">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-stone-900 uppercase">
                    {item.type}
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-stone-900 mb-2">{item.title}</h3>
                  <div className="text-orange-500 text-sm font-bold italic">「{item.meaning}」</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 即時影響力儀表板 */}
      <section id="section-3" className="py-32 px-6 bg-orange-50 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-orange-200/30 rounded-full blur-[100px]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-stone-900 mb-4">您與我們共同創造的改變</h2>
            <p className="text-stone-500 font-bold tracking-widest uppercase text-xs">Real-time Impact Dashboard</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <StatCounter target={342} label="累計影響人數" suffix=" 人" />
            <StatCounter target={136800} label="返鄉基金餘額" prefix="NT$ " />
            <StatCounter target={6} label="成功圓夢家庭" suffix=" 戶" />
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-orange-100 border border-white">
            <div className="space-y-12">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                      <DollarSign size={18} />
                    </div>
                    <span className="font-black text-stone-800 tracking-tight">年度募資目標達成率</span>
                  </div>
                  <span className="text-2xl font-black text-orange-600">68%</span>
                </div>
                <div className="h-4 bg-stone-100 rounded-full overflow-hidden p-1">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '68%' }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                      <Globe size={18} />
                    </div>
                    <span className="font-black text-stone-800 tracking-tight">資助家庭點亮進度</span>
                  </div>
                  <span className="text-2xl font-black text-amber-600">60%</span>
                </div>
                <div className="h-4 bg-stone-100 rounded-full overflow-hidden p-1">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-stone-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center text-white">
                  <ShieldCheck size={20} />
                </div>
                <div className="text-sm">
                  <div className="font-black text-stone-900 underline decoration-orange-300 decoration-2 underline-offset-4">合作夥伴：賽珍珠基金會</div>
                  <div className="text-stone-400">專款專用，按季產出財務報告</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                <MapPin size={24} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter">歸途</span>
                <span className="text-xs font-bold text-orange-500 tracking-[0.3em] uppercase">Guítú Team Portfolio</span>
              </div>
            </div>
            <p className="text-stone-500 max-w-sm leading-relaxed mb-8">
              我們在金屬與烈火中鍛造的不只是飾品，更是對尊嚴、夢想與家庭團聚的堅定承諾。
            </p>
          </div>

          <div>
            <h4 className="font-black mb-6 tracking-widest text-orange-500 uppercase text-sm">快速連結</h4>
            <ul className="space-y-4 text-stone-400 text-sm font-medium">
              <li><a href="#section-0" className="hover:text-white transition-colors">關於團隊</a></li>
              <li><a href="#section-1" className="hover:text-white transition-colors">商業模式</a></li>
              <li><a href="#section-2" className="hover:text-white transition-colors">工藝系列</a></li>
              <li><a href="#section-3" className="hover:text-white transition-colors">數據看板</a></li>
            </ul>
          </div>
        </div>

        {/* 聯絡方式 */}
        <div className="max-w-7xl mx-auto mt-16 pt-12 border-t border-white/10">
          <h4 className="font-black mb-6 tracking-widest text-orange-500 uppercase text-sm">聯絡方式</h4>
          <p className="text-stone-400 text-sm font-medium mb-8 max-w-md">
            歡迎透過 Line 與我們聯繫，一起支持新住民返鄉圓夢。
          </p>
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-xl">
              <img
                src="https://k0807wu.zeabur.app/i/077e33c4-0638-451e-a952-5886f4dfb7fd.jpg"
                alt="Line QR Code 加入好友"
                className="w-40 h-40 md:w-48 md:h-48 object-contain"
              />
              <p className="text-center text-stone-600 text-xs font-bold mt-2">掃描加入 Line 好友</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-600 text-xs font-bold">
          <p>© 2025 TEAM GUÍTÚ. 創業競賽提案專用網頁.</p>
          <div className="flex gap-8">
            <span className="hover:text-stone-400 cursor-pointer">隱私權政策</span>
            <span className="hover:text-stone-400 cursor-pointer">財務揭露</span>
          </div>
        </div>
      </footer>

      {/* 手機導航抽屜 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-black text-2xl">歸途選單</span>
              <button type="button" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {['理念', '企劃', '作品', '影響力'].map((item, idx) => (
                <a
                  key={item}
                  href={`#section-${idx}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black text-stone-900 hover:text-orange-500 transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <button type="button" className="w-full py-5 bg-orange-500 text-white rounded-3xl font-black text-xl">
                下載競賽提案書
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
