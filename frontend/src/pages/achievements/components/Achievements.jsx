import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Search,
  Grid,
  Maximize2,
  X,
  Download,
  Share2,
  SlidersHorizontal,
  Info,
  Layers,
  Heart,
} from "lucide-react";

const CustomStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(1deg); }
    }
    @keyframes goldGlowPulse {
      0%, 100% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.2), 0 0 30px rgba(110, 50, 154, 0.05); }
      50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.6), 0 0 40px rgba(110, 50, 154, 0.15); }
    }
    @keyframes sparkleLight {
      0%, 100% { transform: scale(0.8) rotate(0deg); opacity: 0.6; }
      50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
    }
    @keyframes shimmerSwipe {
      0% { transform: translateX(-150%) skewX(-25deg); }
      100% { transform: translateX(150%) skewX(-25deg); }
    }
    .animate-float {
      animation: float 5s ease-in-out infinite;
    }
    .gold-glow-hover:hover {
      border-color: rgba(212, 175, 55, 0.8) !important;
      animation: goldGlowPulse 3s infinite ease-in-out;
    }
    .text-purple-primary {
      color: #6e329a;
    }
    .bg-purple-primary {
      background-color: #6e329a;
    }
    .border-purple-primary {
      border-color: #6e329a;
    }
    .text-gold {
      background: linear-gradient(135deg, #b8860b 0%, #ffdf00 50%, #d4af37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .shimmer-layer::after {
      content: '';
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transform: translateX(-100%) skewX(-25deg);
      transition: 0.75s;
    }
    .shimmer-layer:hover::after {
      animation: shimmerSwipe 1.2s ease-in-out infinite;
    }
    /* Smooth transition for category buttons */
    .filter-btn {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `,
    }}
  />
);

const ACHIEVEMENT_IMAGES = [
  {
    id: "img-1",
    title: "Elite Developer Emblem",
    category: "engineering",
    ratio: "aspect-square",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    tags: ["Tech", "Core Web"],
    author: "Aurea Tech Lab",
  },
  {
    id: "img-2",
    title: "Architect of Universal Design",
    category: "creative",
    ratio: "aspect-video",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1000",
    tags: ["UI/UX", "Figma Mastery"],
    author: "Studio Design",
  },
  {
    id: "img-3",
    title: "Pillar of the Community",
    category: "community",
    ratio: "aspect-[4/5]",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
    tags: ["Mentorship", "Impact"],
    author: "Global Alliance",
  },
  {
    id: "img-4",
    title: "Pioneering Horizon Badge",
    category: "innovation",
    ratio: "aspect-square",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    tags: ["Web3", "Three.js"],
    author: "Horizon Lab",
  },
  {
    id: "img-5",
    title: "Speed & Precision Mastery",
    category: "engineering",
    ratio: "aspect-[4/3]",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    tags: ["Performance", "Rust"],
    author: "Quantum Cloud",
  },
  {
    id: "img-6",
    title: "Infinite Scaler Seal",
    category: "engineering",
    ratio: "aspect-video",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
    tags: ["Systems", "Redis"],
    author: "Arch Scale",
  },
  {
    id: "img-7",
    title: "Global Brand Symphony",
    category: "creative",
    ratio: "aspect-square",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
    tags: ["Brand", "Vector Art"],
    author: "Synergy Co.",
  },
  {
    id: "img-8",
    title: "Theoretical Grand Master",
    category: "innovation",
    ratio: "aspect-[3/4]",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000",
    tags: ["Algorithms", "Logic"],
    author: "Aurea Tech Lab",
  },
];

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState({});
  const [gridCols, setGridCols] = useState("standard"); // standard (adaptive masonry-like), compact (smaller grid), dynamic (mixed aspect ratios)

  const filteredImages = useMemo(() => {
    return ACHIEVEMENT_IMAGES.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedImages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="h-screen bg-[#faf8fc] text-slate-800 font-sans relative overflow-x-hidden pb-20">
      <CustomStyles />
       {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-2 h-2 bg-accent-400 rounded-full opacity-60 animate-pulse"
          style={{
            top: "20%",
            left: "10%",
            transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
          }}
        />
        <div
          className="absolute w-3 h-3 bg-accent-500 rounded-full opacity-40 animate-pulse"
          style={{
            top: "60%",
            right: "15%",
            transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
            animationDelay: "200ms",
          }}
        />
        <div
          className="absolute w-1 h-1 bg-accent-300 rounded-full opacity-80 animate-pulse"
          style={{
            top: "40%",
            left: "80%",
            transform: `translate3d(0, ${scrollY * 0.08}px, 0)`,
            animationDelay: "400ms",
          }}
        />
        <div
          className="absolute w-32 h-32 border border-primary-200 opacity-10 rounded-full"
          style={{
            top: "30%",
            left: "5%",
            transform: `translate3d(0, ${scrollY * 0.2}px, 0) rotate(${scrollY * 0.1}deg)`,
          }}
        />
        <div
          className="absolute w-24 h-24 border border-accent-300 opacity-15 rounded-royal"
          style={{
            top: "70%",
            right: "10%",
            transform: `translate3d(0, ${scrollY * 0.12}px, 0) rotate(${-scrollY * 0.08}deg)`,
          }}
        />
      </div>

      {/* Background Soft Purple/Gold ambient blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[40%] bg-[#6e329a]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-10%] w-[50%] h-[50%] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[15%] w-[40%] h-[40%] bg-[#6e329a]/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Header section with brand insignia */}
      {/* <header className="relative z-10 border-b border-purple-100 bg-white/70 backdrop-blur-md sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#6e329a]/5 border border-[#6e329a]/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-primary animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-purple-primary">
                AUREA <span className="font-light text-slate-500">GALLERY</span>
              </span>
              <span className="text-[10px] block text-amber-600 font-bold tracking-widest uppercase">
                Premium Visual Exhibition
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping mr-1" />
            <span className="text-xs font-bold text-amber-700">Gold Light Engine Enabled</span>
          </div>

        </div>
      </header> */}

      {/* Main exhibition framework */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        {/* Intro Info Banner */}
        <div className="text-center pt-20 max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Curated <span className="text-purple-primary">Achievement</span>{" "}
            Artifacts
          </h1>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="bg-white/85 rounded-2xl border border-purple-100 p-5 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {["all", "engineering", "creative", "community", "innovation"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`filter-btn px-4.5 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border ${
                    selectedCategory === cat
                      ? "bg-purple-primary text-white border-purple-primary shadow-md shadow-purple-950/10"
                      : "bg-[#faf8fc] text-slate-600 border-purple-100 hover:bg-[#6e329a]/5 hover:text-[#6e329a]"
                  }`}
                >
                  {cat}
                </button>
              ),
            )}
          </div>

          {/* Search Bar & Grid Layout Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:w-60">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search art tags..."
                className="w-full bg-[#faf8fc] text-slate-800 pl-9 pr-4 py-2 rounded-xl text-xs border border-purple-100 focus:outline-none focus:border-[#6e329a] focus:ring-1 focus:ring-[#6e329a] transition-all"
              />
            </div>

            <div className="flex bg-[#faf8fc] p-1 rounded-xl border border-purple-100">
              <button
                onClick={() => setGridCols("standard")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${gridCols === "standard" ? "bg-white text-purple-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                title="Standard Aspect Grid"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[10px]">Uniform</span>
              </button>
              <button
                onClick={() => setGridCols("dynamic")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${gridCols === "dynamic" ? "bg-white text-purple-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                title="Visual Masonry-style"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[10px]">Masonry</span>
              </button>
            </div>
          </div>
        </div>

        {}
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-purple-100 shadow-sm">
            <Layers className="w-12 h-12 text-purple-200 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">
              No Artifacts Match
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
              Try choosing another category tab or clearing the search query
              input.
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              gridCols === "standard"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {filteredImages.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-purple-100/60 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer gold-glow-hover"
                style={{ borderBottomWidth: "4px" }}
              >
                {/* Image Container with aspect ratio settings */}
                <div
                  className={`relative overflow-hidden w-full ${
                    gridCols === "standard" ? "aspect-[5/4]" : item.ratio
                  } bg-slate-100 shimmer-layer`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Absolute Top Overlays */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                    <span className="px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-extrabold uppercase text-purple-primary tracking-wider shadow-sm border border-purple-100">
                      {item.category}
                    </span>

                    {/* Floating animated gold star */}
                    <div
                      className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-md animate-float pointer-events-auto"
                      style={{ boxShadow: "0 0 10px rgba(212,175,55,0.4)" }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
                    </div>
                  </div>

                  {/* Absolute bottom overlay frame gradient */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-black tracking-wide truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold">
                      Inspect Details
                    </span>
                  </div>
                </div>

                {/* Minimal card bottom section featuring title, tags and quick actions */}
                <div className="p-4 flex flex-col justify-between bg-white border-t border-purple-50/50">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-slate-800 text-sm leading-tight hover:text-purple-primary transition-colors">
                      {item.title}
                    </h3>
                    {/* <button
                      onClick={(e) => toggleLike(item.id, e)}
                      className="text-slate-300 hover:text-rose-500 transition-colors shrink-0"
                    >
                      <Heart
                        className={`w-4.5 h-4.5 ${likedImages[item.id] ? "fill-rose-500 text-rose-500" : "text-slate-400"}`}
                      />
                    </button> */}
                  </div>

                  <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold bg-[#faf8fc] text-slate-500 px-1.5 py-0.5 rounded border border-purple-100"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                      {item.author}
                    </span>
                  </div>
                </div>

                {/* Subtle gold line accent strip at the very bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-[#6e329a]" />
              </div>
            ))}
          </div>
        )}
      </main>

      {}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          {/* Modal Overlay Close triggers */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedImage(null)}
          />

          <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300 flex flex-col md:flex-row transform scale-up-anim max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-slate-600 hover:text-purple-primary transition-colors shadow-md border border-purple-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Image Side */}
            <div className="w-full md:w-1/2 bg-[#faf8fc] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-purple-100/60 relative">
              <div className="absolute top-4 left-4 flex space-x-1">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <span className="text-[10px] font-extrabold text-amber-600 tracking-wider uppercase">
                  HQ Display
                </span>
              </div>

              {/* Gold light frame display */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white transition-all duration-300 max-w-xs md:max-w-none w-full aspect-square"
                style={{
                  boxShadow:
                    "0 0 30px rgba(212,175,55,0.4), 0 10px 25px rgba(110,50,154,0.1)",
                }}
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-[10px] text-slate-400 mt-4 italic text-center">
                Interactive rendering of achievement catalog artifact.
              </p>
            </div>

            {/* Information Details Side */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded bg-[#6e329a]/10 text-xs font-bold uppercase tracking-wider text-purple-primary border border-purple-100 inline-block mb-3">
                  {selectedImage.category}
                </span>

                <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-2">
                  {selectedImage.title}
                </h3>

                <p className="text-xs text-amber-600 font-bold tracking-wide uppercase flex items-center space-x-1.5 mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gold Premium Certification Standard</span>
                </p>

                {/* Technical Specification Box */}
                <div className="bg-[#faf8fc] p-4.5 rounded-2xl border border-purple-100/80 mb-6">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                    <Info className="w-3.5 h-3.5 text-purple-primary" />
                    <span>Display Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        Created By
                      </span>
                      <span className="text-xs font-bold text-slate-700 mt-1 block">
                        {selectedImage.author}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        Image Format
                      </span>
                      <span className="text-xs font-bold text-slate-700 mt-1 block">
                        Vector Enhanced High-Res
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tag Pills */}
                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                    Image Associations
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedImage.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold bg-[#6e329a]/5 text-purple-primary px-3 py-1 rounded-lg border border-purple-100"
                      >
                        #{tag}
                      </span>
                    ))}
                    <span className="text-xs font-bold bg-amber-500/10 text-amber-700 px-3 py-1 rounded-lg border border-amber-500/10">
                      #GoldGlow
                    </span>
                  </div>
                </div>
              </div>

              {/* Share & Actions Bottom Block */}
              <div className="flex items-center space-x-3 mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => console.log("Copied image link to clipboard!")}
                  className="flex-1 py-3.5 rounded-xl bg-purple-primary text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#5b2582] transition-colors shadow-md shadow-purple-950/10 active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Image</span>
                </button>

                <button
                  onClick={() =>
                    console.log(
                      "Preparing high resolution image file download...",
                    )
                  }
                  className="px-4 py-3.5 rounded-xl bg-[#faf8fc] text-slate-600 hover:text-purple-primary border border-purple-100 hover:bg-purple-50 transition-colors active:scale-95"
                  title="Download File"
                >
                  <Download className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
