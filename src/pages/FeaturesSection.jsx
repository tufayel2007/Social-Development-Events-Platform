/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  Globe,
  TreePine,
  Heart,
  BookOpen,
  Droplets,
  Stethoscope,
  Shirt,
  Utensils,
  Backpack,
  Hammer,
  Users,
  Recycle,
  Trash2,
  Building2,
  Search,
  Filter,
  X,
  ChevronDown,
  Zap,
  Home,
  Lightbulb,
  Wind,
  Sun,
  Baby,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Waves,
  Mountain,
  HandHelping,
  Soup,
  Pill,
  School,
  Church,
  Trees,
  Fish,
  Bird,
  Flower,
  Package,
  Truck,
  Shield,
  Smile,
  Sparkles,
  UsersRound,
  Calendar,
  Clock,
  MapPin,
  ArrowDown,
} from "lucide-react";

// Category List
const categories = ["সব", "পরিবেশ", "স্বাস্থ্য", "শিক্ষা", "সমাজ"];

// Features Data (45 Total)
const features = [
  {
    icon: Globe,
    title: "পরিবেশ পরিচ্ছন্নতা",
    desc: "এলাকা পরিষ্কার রাখুন",
    gradient: "from-emerald-500 to-teal-600",
    category: "পরিবেশ",
    impact: "১২০+ এলাকা",
  },
  {
    icon: TreePine,
    title: "বৃক্ষরোপণ",
    desc: "প্রতি সপ্তাহে নতুন গাছ",
    gradient: "from-lime-500 to-green-600",
    category: "পরিবেশ",
    impact: "৫০০+ গাছ",
  },
  {
    icon: Heart,
    title: "রক্তদান",
    desc: "জীবন বাঁচান",
    gradient: "from-red-500 to-pink-600",
    category: "স্বাস্থ্য",
    impact: "৩০০+ ইউনিট",
  },
  {
    icon: BookOpen,
    title: "শিক্ষা সহায়তা",
    desc: "গরিব শিশুদের পড়ান",
    gradient: "from-blue-500 to-indigo-600",
    category: "শিক্ষা",
    impact: "২০০+ শিক্ষার্থী",
  },
  {
    icon: Droplets,
    title: "পানি সরবরাহ",
    desc: "গ্রামে বিশুদ্ধ পানি",
    gradient: "from-cyan-500 to-blue-600",
    category: "সমাজ",
    impact: "৫০+ গ্রাম",
  },
  {
    icon: Stethoscope,
    title: "স্বাস্থ্য ক্যাম্প",
    desc: "ফ্রি চেকআপ",
    gradient: "from-pink-500 to-rose-600",
    category: "স্বাস্থ্য",
    impact: "১০+ ক্যাম্প",
  },
  {
    icon: Shirt,
    title: "কাপড় বিতরণ",
    desc: "শীতের কাপড়",
    gradient: "from-purple-500 to-violet-600",
    category: "সমাজ",
    impact: "৪০০+ কাপড়",
  },
  {
    icon: Utensils,
    title: "খাদ্য সহায়তা",
    desc: "ক্ষুধার্তদের খাওয়ান",
    gradient: "from-orange-500 to-red-600",
    category: "সমাজ",
    impact: "১০,০০০+ খাবার",
  },
  {
    icon: Backpack,
    title: "স্কুল সামগ্রী",
    desc: "বই-খাতা বিতরণ",
    gradient: "from-indigo-500 to-purple-600",
    category: "শিক্ষা",
    impact: "৩০০+ ব্যাগ",
  },
  {
    icon: Hammer,
    title: "ইনফ্রাস্ট্রাকচার",
    desc: "রাস্তা মেরামত",
    gradient: "from-yellow-500 to-amber-600",
    category: "সমাজ",
    impact: "১৫+ কিমি",
  },
  {
    icon: Users,
    title: "সম্প্রদায় গঠন",
    desc: "মিলনমেলা",
    gradient: "from-teal-500 to-cyan-600",
    category: "সমাজ",
    impact: "৫০+ ইভেন্ট",
  },
  {
    icon: Globe,
    title: "জলবায়ু সচেতনতা",
    desc: "পরিবেশ শিক্ষা",
    gradient: "from-green-500 to-emerald-600",
    category: "পরিবেশ",
    impact: "১০০০+ সচেতন",
  },
  {
    icon: Recycle,
    title: "রিসাইক্লিং",
    desc: "বর্জ্য পুনর্ব্যবহার",
    gradient: "from-gray-500 to-zinc-600",
    category: "পরিবেশ",
    impact: "৫০০ কেজি",
  },
  {
    icon: Trash2,
    title: "ডাস্টবিন",
    desc: "পরিচ্ছন্নতা",
    gradient: "from-zinc-500 to-gray-600",
    category: "পরিবেশ",
    impact: "১০০+ ডাস্টবিন",
  },
  {
    icon: Building2,
    title: "পাবলিক টয়লেট",
    desc: "স্বাস্থ্যবিধি",
    gradient: "from-stone-500 to-gray-600",
    category: "স্বাস্থ্য",
    impact: "১০+ টয়লেট",
  },
  // 30 New
  {
    icon: Zap,
    title: "সোলার লাইট",
    desc: "গ্রামে বিদ্যুৎ",
    gradient: "from-yellow-400 to-orange-600",
    category: "পরিবেশ",
    impact: "৮০+ বাড়ি",
  },
  {
    icon: Home,
    title: "ঘর মেরামত",
    desc: "দরিদ্রদের বাড়ি",
    gradient: "from-amber-500 to-orange-600",
    category: "সমাজ",
    impact: "৩৫+ ঘর",
  },
  {
    icon: Lightbulb,
    title: "উদ্যোক্তা প্রশিক্ষণ",
    desc: "তরুণদের স্কিল",
    gradient: "from-purple-500 to-pink-600",
    category: "শিক্ষা",
    impact: "১৫০+ প্রশিক্ষিত",
  },
  {
    icon: Wind,
    title: "পুকুর খনন",
    desc: "পানি সংরক্ষণ",
    gradient: "from-blue-400 to-cyan-600",
    category: "পরিবেশ",
    impact: "২৫+ পুকুর",
  },
  {
    icon: Sun,
    title: "সৌর প্যানেল",
    desc: "পরিবেশবান্ধব বিদ্যুৎ",
    gradient: "from-orange-400 to-yellow-600",
    category: "পরিবেশ",
    impact: "১০+ স্কুল",
  },
  {
    icon: Baby,
    title: "মাতৃ স্বাস্থ্য",
    desc: "গর্ভবতী মায়েদের সেবা",
    gradient: "from-pink-400 to-rose-600",
    category: "স্বাস্থ্য",
    impact: "২০০+ মা",
  },
  {
    icon: GraduationCap,
    title: "বৃত্তি প্রদান",
    desc: "মেধাবী ছাত্রদের",
    gradient: "from-indigo-500 to-blue-600",
    category: "শিক্ষা",
    impact: "৫০+ বৃত্তি",
  },
  {
    icon: HeartHandshake,
    title: "বয়স্ক সেবা",
    desc: "বৃদ্ধাশ্রমে সহায়তা",
    gradient: "from-teal-500 to-green-600",
    category: "সমাজ",
    impact: "১০০+ বয়স্ক",
  },
  {
    icon: Leaf,
    title: "জৈব চাষ",
    desc: "কৃষকদের প্রশিক্ষণ",
    gradient: "from-green-500 to-lime-600",
    category: "পরিবেশ",
    impact: "৩০০+ কৃষক",
  },
  {
    icon: Waves,
    title: "নদী পরিচ্ছন্নতা",
    desc: "নদীর পানি রক্ষা",
    gradient: "from-cyan-500 to-blue-700",
    category: "পরিবেশ",
    impact: "৫+ নদী",
  },
  {
    icon: Mountain,
    title: "পাহাড় সংরক্ষণ",
    desc: "বন উজাড় রোধ",
    gradient: "from-stone-600 to-gray-700",
    category: "পরিবেশ",
    impact: "১০০০+ হেক্টর",
  },
  {
    icon: HandHelping,
    title: "দুর্যোগ সহায়তা",
    desc: "বন্যা-ঘূর্ণিঝড়ে ত্রাণ",
    gradient: "from-red-500 to-orange-600",
    category: "সমাজ",
    impact: "৫০০০+ মানুষ",
  },
  {
    icon: Soup,
    title: "স্যুপ কিচেন",
    desc: "পথশিশুদের খাবার",
    gradient: "from-orange-500 to-red-600",
    category: "সমাজ",
    impact: "২০০০+ খাবার",
  },
  {
    icon: Pill,
    title: "ঔষধ বিতরণ",
    desc: "গরিবদের ফ্রি ঔষধ",
    gradient: "from-rose-500 to-pink-600",
    category: "স্বাস্থ্য",
    impact: "১৫০০+ রোগী",
  },
  {
    icon: School,
    title: "স্কুল নির্মাণ",
    desc: "প্রত্যন্ত এলাকায়",
    gradient: "from-blue-600 to-indigo-700",
    category: "শিক্ষা",
    impact: "৫+ স্কুল",
  },
  {
    icon: Church,
    title: "ধর্মীয় সহায়তা",
    desc: "মন্দির-মসজিদ সংস্কার",
    gradient: "from-violet-500 to-purple-600",
    category: "সমাজ",
    impact: "২০+ স্থান",
  },
  {
    icon: Trees,
    title: "বনায়ন প্রকল্প",
    desc: "বড় আকারে গাছ",
    gradient: "from-emerald-600 to-green-700",
    category: "পরিবেশ",
    impact: "১০,০০০+ গাছ",
  },
  {
    icon: Fish,
    title: "মৎস্য চাষ",
    desc: "কৃষকদের আয়",
    gradient: "from-teal-500 to-cyan-600",
    category: "সমাজ",
    impact: "১০০+ পুকুর",
  },
  {
    icon: Bird,
    title: "পাখি সংরক্ষণ",
    desc: "বাসা ও খাবার",
    gradient: "from-sky-400 to-blue-600",
    category: "পরিবেশ",
    impact: "৫০+ বাসা",
  },
  {
    icon: Flower,
    title: "ফুলের বাগান",
    desc: "সৌন্দর্য ও মৌমাছি",
    gradient: "from-pink-400 to-rose-600",
    category: "পরিবেশ",
    impact: "২০+ বাগান",
  },
  {
    icon: Package,
    title: "ত্রাণ প্যাকেজ",
    desc: "দুর্যোগে খাদ্য-পোশাক",
    gradient: "from-amber-500 to-orange-600",
    category: "সমাজ",
    impact: "৩০০০+ প্যাকেজ",
  },
  {
    icon: Truck,
    title: "পরিবহন সেবা",
    desc: "রোগীদের হাসপাতালে",
    gradient: "from-zinc-600 to-gray-700",
    category: "স্বাস্থ্য",
    impact: "২০০+ যাত্রা",
  },
  {
    icon: Shield,
    title: "নারী নিরাপত্তা",
    desc: "সচেতনতা ও প্রশিক্ষণ",
    gradient: "from-purple-600 to-pink-700",
    category: "সমাজ",
    impact: "৫০০+ নারী",
  },
  {
    icon: Smile,
    title: "মানসিক স্বাস্থ্য",
    desc: "কাউন্সেলিং সেবা",
    gradient: "from-lime-400 to-green-600",
    category: "স্বাস্থ্য",
    impact: "১০০+ সেশন",
  },
  {
    icon: Sparkles,
    title: "উৎসব আয়োজন",
    desc: "সম্প্রদায়ের আনন্দ",
    gradient: "from-yellow-400 to-amber-600",
    category: "সমাজ",
    impact: "৩০+ উৎসব",
  },
  {
    icon: UsersRound,
    title: "যুব সংগঠন",
    desc: "তরুণদের নেতৃত্ব",
    gradient: "from-indigo-500 to-purple-600",
    category: "শিক্ষা",
    impact: "১৫+ গ্রুপ",
  },
  {
    icon: Calendar,
    title: "স্বেচ্ছাসেবক ক্যাম্প",
    desc: "মাসিক স্বেচ্ছাসেবা",
    gradient: "from-teal-500 to-cyan-600",
    category: "সমাজ",
    impact: "১২+ ক্যাম্প",
  },
  {
    icon: Clock,
    title: "সময় ব্যাংক",
    desc: "সময় দান করে সাহায্য",
    gradient: "from-gray-500 to-zinc-600",
    category: "সমাজ",
    impact: "৫০০+ ঘন্টা",
  },
  {
    icon: MapPin,
    title: "গ্রাম ম্যাপিং",
    desc: "উন্নয়ন পরিকল্পনা",
    gradient: "from-blue-500 to-indigo-600",
    category: "সমাজ",
    impact: "২০+ গ্রাম",
  },
];

// Skeleton
const SkeletonCard = () => (
  <div className="bg-base-200 p-6 rounded-2xl animate-pulse border border-base-300">
    <div className="w-12 h-12 bg-base-300 rounded-xl mb-4" />
    <div className="h-6 bg-base-300 rounded mb-2 w-3/4" />
    <div className="h-4 bg-base-300 rounded w-full mb-2" />
    <div className="h-4 bg-base-300 rounded w-1/2" />
  </div>
);

// Memoized Card with 3D Tilt + Glow
const FeatureCard = memo(({ f, index, onClick }) => {
  const Icon = f.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: -15 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
          : { opacity: 0, y: 80, scale: 0.8, rotateX: -15 }
      }
      exit={{ opacity: 0, scale: 0.8, y: -40 }}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        scale: 1.08,
        rotateY: 8,
        rotateX: 5,
        z: 100,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
      onClick={() => onClick(f)}
      className="group relative bg-base-100 p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 border border-base-300 cursor-pointer overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-1000 blur-xl`}
      />

      {/* Category Badge */}
      <div className="absolute top-3 right-3 badge badge-sm badge-primary text-xs font-medium opacity-80">
        {f.category}
      </div>

      {/* Floating Icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.5, rotate: 360 }}
        className="inline-flex p-3 rounded-xl bg-gradient-to-br from-base-200 to-base-300 mb-4 shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 animate-pulse" />
        <Icon className="w-8 h-8 text-primary relative z-10" />
      </motion.div>

      <h3 className="text-xl font-bold text-base-content mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
        {f.title}
      </h3>
      <p className="text-sm text-base-content/70 line-clamp-2 mb-3">{f.desc}</p>

      {/* Impact Counter */}
      {f.impact && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-bold text-primary flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 animate-pulse" />
          {f.impact}
        </motion.p>
      )}

      {/* Glow + Ripple */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-primary opacity-0 group-hover:opacity-40 blur-3xl -z-10"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.div>
  );
});

FeatureCard.displayName = "FeatureCard";

const FeaturesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("সব");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(30); // First 30
  const [loading, setLoading] = useState(false);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  // Filter
  const filteredFeatures = features.filter((f) => {
    const matchesCategory =
      selectedCategory === "সব" || f.category === selectedCategory;
    const matchesSearch =
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedFeatures = filteredFeatures.slice(0, visibleCount);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 9, filteredFeatures.length));
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    setVisibleCount(30);
  }, [selectedCategory, searchTerm]);

  return (
    <>
      <section
        ref={sectionRef}
        id="features"
        className="py-20 px-4 sm:px-6 bg-base-200 relative overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 opacity-15 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 130 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-pulse">
              আমাদের <span className="text-primary">সেবাসমূহ</span>
            </h2>
            <p className="mt-4 text-base-content/70 max-w-3xl mx-auto text-base md:text-lg font-medium">
              আমরা সমাজের জন্য কাজ করি – পরিবেশ, শিক্ষা, স্বাস্থ্য ও সম্প্রদায়
              গঠনে
            </p>
          </motion.div>

          {/* Search + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 mb-14 items-center justify-center"
          >
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/60" />
              <input
                type="text"
                placeholder="সেবা খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-12 rounded-2xl text-sm focus:ring-4 focus:ring-primary/30 transition-all"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="btn btn-outline rounded-2xl flex items-center gap-2 text-sm hover:bg-primary/10"
              >
                <Filter className="w-4 h-4" />
                {selectedCategory}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="absolute top-full mt-3 w-full bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden z-50"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3.5 hover:bg-primary/10 transition-all text-sm font-semibold ${
                          selectedCategory === cat
                            ? "bg-primary/10 text-primary"
                            : "text-base-content"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7"
          >
            <AnimatePresence mode="popLayout">
              {displayedFeatures.map((f, i) => (
                <FeatureCard
                  key={f.title}
                  f={f}
                  index={i}
                  onClick={setSelectedCard}
                />
              ))}
            </AnimatePresence>

            {/* Skeleton */}
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))}
          </motion.div>

          {/* No Results */}
          {filteredFeatures.length === 0 && !loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-base-content/60 mt-20 text-xl font-medium"
            >
              কোনো সেবা পাওয়া যায়নি।
            </motion.p>
          )}

          {/* Load More with Wave Animation */}
          {visibleCount < filteredFeatures.length && (
            <div className="text-center mt-20">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMore}
                disabled={loading}
                className="btn btn-primary rounded-full px-10 py-4 shadow-2xl hover:shadow-3xl text-lg font-bold relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      লোড হচ্ছে...
                    </>
                  ) : (
                    <>
                      আরো দেখুন
                      <ArrowDown className="w-5 h-5 animate-bounce" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-50 transition-opacity" />
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Modal with 3D Flip */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotateY: -180, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-base-100 rounded-3xl shadow-3xl max-w-lg w-full p-10 relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl -z-10" />

              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-5 right-5 btn btn-ghost btn-circle hover:bg-base-300"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -360 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-6"
              >
                <selectedCard.icon className="w-20 h-20 text-primary" />
              </motion.div>

              <h3 className="text-3xl font-bold mb-4 text-base-content">
                {selectedCard.title}
              </h3>
              <p className="text-base-content/70 mb-6">{selectedCard.desc}</p>
              {selectedCard.impact && (
                <p className="text-lg font-bold text-primary mb-8 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  {selectedCard.impact}
                </p>
              )}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary flex-1 rounded-2xl text-lg"
                >
                  যোগ দিন
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline flex-1 rounded-2xl text-lg"
                >
                  বিস্তারিত
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeaturesSection;
