import { Brain, Zap, Target, Lightbulb, Sparkles, Code2 } from 'lucide-react';

export function FloatingOrbs() {
  const orbs = [
    { Icon: Brain, color: 'from-[#7C6CF6] to-[#6558d3]', position: 'top-20 left-10', delay: '0s', size: 'w-16 h-16' },
    { Icon: Zap, color: 'from-[#22D3EE] to-[#0ea5e9]', position: 'top-40 right-20', delay: '1s', size: 'w-20 h-20' },
    { Icon: Target, color: 'from-[#22C55E] to-[#16a34a]', position: 'bottom-32 left-20', delay: '2s', size: 'w-14 h-14' },
    { Icon: Lightbulb, color: 'from-[#FACC15] to-[#f59e0b]', position: 'bottom-20 right-32', delay: '0.5s', size: 'w-18 h-18' },
    { Icon: Sparkles, color: 'from-[#7C6CF6] to-[#22D3EE]', position: 'top-1/2 left-5', delay: '1.5s', size: 'w-12 h-12' },
    { Icon: Code2, color: 'from-[#1F3C88] to-[#3b5ba5]', position: 'top-1/3 right-10', delay: '2.5s', size: 'w-16 h-16' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes float-rotate {
            0%, 100% {
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            25% {
              transform: translateY(-20px) rotate(5deg) scale(1.05);
            }
            50% {
              transform: translateY(-15px) rotate(-5deg) scale(1);
            }
            75% {
              transform: translateY(-25px) rotate(3deg) scale(1.02);
            }
          }

          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
              opacity: 0.6;
            }
            50% {
              box-shadow: 0 0 40px currentColor, 0 0 80px currentColor;
              opacity: 0.8;
            }
          }

          .floating-orb {
            animation: float-rotate 6s ease-in-out infinite, glow-pulse 4s ease-in-out infinite;
          }
        `}
      </style>

      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`absolute ${orb.position} ${orb.size} floating-orb`}
          style={{ animationDelay: orb.delay }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${orb.color} rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl`}>
            <orb.Icon className="w-1/2 h-1/2 text-white" />
          </div>
        </div>
      ))}
    </div>
  );
}
