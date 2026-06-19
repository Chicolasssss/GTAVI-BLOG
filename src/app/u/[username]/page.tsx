import { getUserProfile } from "@/app/actions/forum"
import { ShieldCheck, MessageSquare, Code2, Server, ArrowBigUp, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const decodedUsername = decodeURIComponent(username)
  
  const res = await getUserProfile(decodedUsername)
  
  if (!res.ok || !res.stats) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white/50 text-xl font-black">
        <div>CITIZEN NOT FOUND</div>
        {res.error && <div className="text-red-500 text-sm mt-4 font-mono max-w-lg text-center break-words">{res.error}</div>}
      </div>
    )
  }

  const { stats, badges, recentActivity } = res

  // Gamification Algorithm
  const totalExp = (stats.totalPosts + stats.totalScripts + stats.totalServers) * 10 + (stats.totalUpvotes * 2);
  
  function getGamification(exp: number) {
    let level = 1;
    let nextLevelExp = 50;
    let currentTierExp = 0;
    
    while (exp >= currentTierExp + nextLevelExp) {
      currentTierExp += nextLevelExp;
      level++;
      nextLevelExp = 50 * level;
    }
    
    const progress = exp - currentTierExp;
    const progressPercent = Math.min(100, Math.max(0, (progress / nextLevelExp) * 100));

    let rankName = "Tourist";
    let rankColor = "from-gray-400 to-gray-600";
    let rankText = "text-gray-400";
    
    if (level >= 5 && level < 15) {
      rankName = "Resident";
      rankColor = "from-[#00ffff] to-blue-500";
      rankText = "text-[#00ffff]";
    } else if (level >= 15 && level < 30) {
      rankName = "Associate";
      rankColor = "from-[#ffd740] to-orange-500";
      rankText = "text-[#ffd740]";
    } else if (level >= 30) {
      rankName = "Kingpin";
      rankColor = "from-[#ff007f] to-purple-600";
      rankText = "text-[#ff007f]";
    }

    return { level, rankName, rankColor, rankText, progressPercent, progress, nextLevelExp };
  }

  const gami = getGamification(totalExp);

  return (
    <div className="min-h-screen pt-24 px-4 pb-20 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <div className={`absolute inset-0 bg-gradient-to-r ${gami.rankColor} opacity-20`} />
          <div className="absolute inset-0 bg-[url('/bg-noise.png')] opacity-20 mix-blend-overlay" />
          
          <div className="relative p-10 md:p-14 flex flex-col md:flex-row items-center md:items-end gap-8 backdrop-blur-xl bg-black/60 border border-white/10">
            {/* Avatar */}
            <div className={`w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-gradient-to-br ${gami.rankColor} flex items-center justify-center text-5xl md:text-7xl font-black text-white shadow-[0_0_50px_rgba(255,255,255,0.1)] ring-4 ring-black relative`}>
              {decodedUsername.charAt(0).toUpperCase()}
              
              {/* Level Badge */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 md:w-14 md:h-14 bg-black border-4 border-black rounded-full flex items-center justify-center">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${gami.rankColor} flex items-center justify-center`}>
                  <span className="text-white text-sm md:text-base font-black">{gami.level}</span>
                </div>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left min-w-0 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-3 shadow-inner">
                <ShieldCheck size={14} className={gami.rankText} /> {gami.rankName}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight truncate mb-4">
                {decodedUsername}
              </h1>
              
              {/* EXP Progress Bar */}
              <div className="w-full max-w-md mx-auto md:mx-0 bg-black/50 border border-white/5 rounded-full h-3 mb-2 overflow-hidden shadow-inner relative">
                <div 
                  className={`h-full bg-gradient-to-r ${gami.rankColor} relative`}
                  style={{ width: `${gami.progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-white/40 max-w-md mx-auto md:mx-0 uppercase tracking-widest px-1">
                <span>{gami.progress} EXP</span>
                <span>{gami.nextLevelExp} EXP TO NEXT</span>
              </div>
              
              {/* Badges */}
              {badges.length > 0 && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-5">
                  {badges.map((badge: any) => (
                    <div 
                      key={badge.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-black/50 text-xs font-bold shadow-lg"
                      style={{ color: badge.color }}
                    >
                      <span>{badge.icon}</span> {badge.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#121216] border border-white/5 rounded-2xl p-6 text-center hover:border-white/20 transition-all">
            <MessageSquare size={24} className="mx-auto mb-3 text-white/40" />
            <div className="text-3xl font-black text-white">{stats.totalPosts}</div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">Forum Posts</div>
          </div>
          <div className="bg-[#121216] border border-white/5 rounded-2xl p-6 text-center hover:border-[#00ffff]/30 transition-all">
            <Code2 size={24} className="mx-auto mb-3 text-[#00ffff]/60" />
            <div className="text-3xl font-black text-white">{stats.totalScripts}</div>
            <div className="text-xs font-bold text-[#00ffff]/60 uppercase tracking-widest mt-1">Scripts</div>
          </div>
          <div className="bg-[#121216] border border-white/5 rounded-2xl p-6 text-center hover:border-[#ffd740]/30 transition-all">
            <Server size={24} className="mx-auto mb-3 text-[#ffd740]/60" />
            <div className="text-3xl font-black text-white">{stats.totalServers}</div>
            <div className="text-xs font-bold text-[#ffd740]/60 uppercase tracking-widest mt-1">Servers</div>
          </div>
          <div className="bg-[#121216] border border-white/5 rounded-2xl p-6 text-center hover:border-[#ff007f]/30 transition-all">
            <ArrowBigUp size={24} className="mx-auto mb-3 text-[#ff007f]/60" />
            <div className="text-3xl font-black text-white">{stats.totalUpvotes}</div>
            <div className="text-xs font-bold text-[#ff007f]/60 uppercase tracking-widest mt-1">Upvotes</div>
          </div>
        </div>

        {/* Recent Activity */}
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest px-2 border-l-4 border-[#ff007f]">
          Recent Activity
        </h2>
        
        <div className="bg-[#121216] border border-white/5 rounded-3xl overflow-hidden">
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-white/30 font-semibold">No activity found.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {recentActivity.map((post: any) => (
                <a 
                  key={post.id} 
                  href={`/foro/${post.id}`}
                  className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0">
                    {post.category === 'scripts' ? (
                      <Code2 size={20} className="text-[#00ffff]" />
                    ) : post.category === 'server' ? (
                      <Server size={20} className="text-[#ffd740]" />
                    ) : (
                      <MessageSquare size={20} className="text-white/50" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white/90 group-hover:text-[#ff007f] transition-colors truncate">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm mt-1">
                      <span className={`font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${
                        post.category === 'scripts' ? 'bg-[#00ffff]/10 text-[#00ffff]' : 
                        post.category === 'server' ? 'bg-[#ffd740]/10 text-[#ffd740]' : 
                        'bg-white/10 text-white/50'
                      }`}>
                        {post.category}
                      </span>
                      <span className="text-white/40 flex items-center gap-1">
                        <Clock size={12} /> {formatDistanceToNow(new Date(post.created_at), { locale: enUS, addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-center justify-center bg-black/50 border border-white/5 rounded-lg w-16 h-12 shrink-0">
                    <ArrowBigUp size={16} className="text-[#00e676]" />
                    <span className="text-xs font-bold text-white">{post.upvotes}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
