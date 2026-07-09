import { cn } from "@/lib/utils";

/**
 * Minimal, dependency-free charts. Values scale to fit; render as inline SVG.
 */

export function LineChart({
  series,
  labels,
  height = 180,
  className,
}: {
  series: { name: string; values: number[]; color: string; dashed?: boolean }[];
  labels: string[];
  height?: number;
  className?: string;
}) {
  const width = 600;
  const padding = { top: 12, right: 12, bottom: 24, left: 32 };
  const max = Math.max(...series.flatMap((s) => s.values), 1);
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const stepX = innerW / Math.max(labels.length - 1, 1);

  const pointsOf = (values: number[]) =>
    values
      .map((v, i) => {
        const x = padding.left + i * stepX;
        const y = padding.top + innerH - (v / max) * innerH;
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("h-auto w-full", className)}>
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padding.top + innerH * t;
        return (
          <line
            key={t}
            x1={padding.left}
            x2={width - padding.right}
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeOpacity={0.08}
          />
        );
      })}
      {series.map((s, i) => (
        <g key={i}>
          <polyline
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={s.dashed ? "4 4" : undefined}
            points={pointsOf(s.values)}
          />
          {!s.dashed &&
            s.values.map((v, j) => {
              const x = padding.left + j * stepX;
              const y = padding.top + innerH - (v / max) * innerH;
              return <circle key={j} cx={x} cy={y} r={3} fill={s.color} />;
            })}
        </g>
      ))}
      {labels.map((l, i) => (
        <text
          key={i}
          x={padding.left + i * stepX}
          y={height - 6}
          fontSize={10}
          textAnchor="middle"
          fill="currentColor"
          className="text-muted-foreground"
          opacity={0.6}
        >
          {l}
        </text>
      ))}
    </svg>
  );
}

export function BarChart({
  data,
  height = 180,
  className,
}: {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  className?: string;
}) {
  const width = 600;
  const padding = { top: 12, right: 12, bottom: 24, left: 32 };
  const max = Math.max(...data.map((d) => d.value), 1);
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const bw = innerW / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("h-auto w-full", className)}>
      {data.map((d, i) => {
        const h = (d.value / max) * innerH;
        const x = padding.left + i * bw + bw * 0.15;
        const y = padding.top + innerH - h;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={bw * 0.7}
              height={h}
              rx={4}
              fill={d.color ?? "var(--primary)"}
              opacity={0.85}
            />
            <text
              x={x + (bw * 0.7) / 2}
              y={height - 6}
              fontSize={10}
              textAnchor="middle"
              fill="currentColor"
              className="text-muted-foreground"
              opacity={0.6}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DonutChart({
  segments,
  size = 140,
  thickness = 18,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={thickness}
        />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeLinecap="butt"
            />
          );
          offset += len;
          return el;
        })}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-foreground"
          fontSize={20}
          fontWeight={600}
        >
          {total}
        </text>
      </svg>
      <div className="space-y-2 text-xs">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-muted-foreground">{s.label}</span>
            <span className="ml-auto font-semibold">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
