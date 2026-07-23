'use client';

const BUBBLES = [
  { size: 28, left: '8%',  delay: '0s',    duration: '14s', drift: '20px'  },
  { size: 18, left: '15%', delay: '2.5s',  duration: '11s', drift: '-15px' },
  { size: 38, left: '24%', delay: '1s',    duration: '17s', drift: '10px'  },
  { size: 14, left: '33%', delay: '4s',    duration: '10s', drift: '-20px' },
  { size: 24, left: '45%', delay: '0.5s',  duration: '13s', drift: '15px'  },
  { size: 32, left: '55%', delay: '3s',    duration: '16s', drift: '-12px' },
  { size: 16, left: '63%', delay: '1.8s',  duration: '9s',  drift: '18px'  },
  { size: 42, left: '72%', delay: '5s',    duration: '18s', drift: '-8px'  },
  { size: 20, left: '80%', delay: '2s',    duration: '12s', drift: '22px'  },
  { size: 12, left: '88%', delay: '3.5s',  duration: '8s',  drift: '-18px' },
  { size: 26, left: '92%', delay: '6s',    duration: '15s', drift: '12px'  },
  { size: 10, left: '4%',  delay: '7s',    duration: '10s', drift: '-10px' },
];

export default function SoapBubbles() {
  return (
    <div className="bubbles-container" aria-hidden="true">
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration,
            '--drift': b.drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
