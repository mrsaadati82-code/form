import { useEffect, useState } from 'react';
import { FormData } from '../types';
import { calculateScore, getRecommendedPackage, packages, formatPrice } from '../utils/pricing';

interface Props {
  data: FormData;
}

function Confetti() {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  const pieces = Array.from({ length: 30 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((_, i) => (
        <div
          key={i}
          className="confetti-piece absolute w-2 h-3 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px',
            backgroundColor: colors[i % colors.length],
            animationDuration: `${1.5 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 1}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function StepResult({ data }: Props) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [animatePrice, setAnimatePrice] = useState(false);

  const score = calculateScore(data);
  const recommended = getRecommendedPackage(score);
  const recIndex = packages.findIndex(p => p.name === recommended.name);

  useEffect(() => {
    const t1 = setTimeout(() => setShowConfetti(false), 3000);
    const t2 = setTimeout(() => setAnimatePrice(true), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {showConfetti && <Confetti />}

      <div className="text-center mb-6">
        <div className="text-6xl mb-3 animate-bounce">🎉</div>
        <h2 className="text-2xl font-bold text-slate-800">فرم شما ارسال شد!</h2>
        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          با تشکر از وقتی که گذاشتید.<br />
          بزودی امیرحسین سعادتی با شما تماس خواهد گرفت.
        </p>
      </div>

      {/* Estimated Price */}
      <div className={`rounded-2xl bg-gradient-to-br ${recommended.color} p-1 shadow-xl transition-all duration-700 ${animatePrice ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{recommended.emoji}</span>
            <div>
              <div className="text-xs text-slate-400 font-medium">پکیج پیشنهادی برای شما</div>
              <div className="text-xl font-bold text-slate-800">{recommended.name}</div>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-4">{recommended.description}</p>

          <div className="bg-slate-50 rounded-xl p-4 mb-4">
            <div className="text-xs text-slate-400 mb-1">برآورد قیمت تقریبی:</div>
            <div className="text-2xl font-bold text-indigo-600">
              {formatPrice(recommended.priceMin)} — {formatPrice(recommended.priceMax)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              * این قیمت تخمینی است و پس از مشاوره دقیق‌تر خواهد شد
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-600 mb-2">✨ شامل می‌شود:</div>
            <div className="grid grid-cols-1 gap-1">
              {recommended.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-green-500 text-xs">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All packages */}
      <div>
        <h3 className="text-sm font-bold text-slate-600 mb-3">مقایسه پکیج‌ها:</h3>
        <div className="grid grid-cols-2 gap-2">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 border-2 transition-all ${
                i === recIndex
                  ? 'border-indigo-400 bg-indigo-50 shadow-md'
                  : 'border-slate-100 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{pkg.emoji}</span>
                <span className={`text-xs font-bold ${i === recIndex ? 'text-indigo-700' : 'text-slate-600'}`}>
                  {pkg.name}
                </span>
                {i === recIndex && (
                  <span className="mr-auto text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full">پیشنهادی</span>
                )}
              </div>
              <div className="text-xs text-slate-500">
                {formatPrice(pkg.priceMin).replace(' تومان', '')} ~
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact info */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-5 text-white text-center">
        <div className="text-2xl mb-2">📞</div>
        <h3 className="font-bold text-lg mb-1">امیرحسین سعادتی</h3>
        <p className="text-indigo-200 text-sm mb-3">طراح و توسعه‌دهنده وب</p>
        <div className="bg-white/20 rounded-xl p-3">
          <p className="text-sm leading-relaxed">
            در اسرع وقت با شما تماس گرفته خواهد شد.<br />
            میانگین زمان پاسخ: <strong>۲ تا ۴ ساعت</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
