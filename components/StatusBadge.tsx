interface StatusBadgeProps {
  status: string;
}

interface StatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
  emoji: string;
  pulse: boolean;
}

function getStatusConfig(status: string): StatusConfig {
  const s = status.toLowerCase().trim();

  if (
    s.includes("đang giặt") || s.includes("dang giat") ||
    s.includes("đang xử lý") || s.includes("dang xu ly") ||
    s.includes("đang sấy") || s.includes("dang say") ||
    s.includes("tiếp nhận") || s.includes("tiep nhan") ||
    s.includes("chờ giặt") || s.includes("cho giat")
  ) {
    return {
      label: status,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      dotColor: "bg-blue-500",
      emoji: "🫧",
      pulse: true,
    };
  }

  if (
    s.includes("hoàn thành") || s.includes("hoan thanh") ||
    s.includes("sẵn sàng") || s.includes("san sang") ||
    s.includes("chờ nhận") || s.includes("cho nhan") ||
    s.includes("đã xử lý") || s.includes("da xu ly")
  ) {
    return {
      label: status,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      dotColor: "bg-emerald-500",
      emoji: "✅",
      pulse: false,
    };
  }

  if (
    s.includes("đã nhận") || s.includes("da nhan") ||
    s.includes("đã giao") || s.includes("da giao") ||
    s.includes("hoàn tất") || s.includes("hoan tat")
  ) {
    return {
      label: status,
      bgColor: "bg-slate-100",
      textColor: "text-slate-600",
      dotColor: "bg-slate-400",
      emoji: "✓",
      pulse: false,
    };
  }

  if (
    s.includes("hủy") || s.includes("huy") ||
    s.includes("cancel") ||
    s.includes("từ chối") || s.includes("tu choi")
  ) {
    return {
      label: status,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      dotColor: "bg-red-500",
      emoji: "✕",
      pulse: false,
    };
  }

  // Default: pending/unknown
  return {
    label: status || "Không rõ",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    dotColor: "bg-amber-500",
    emoji: "⏳",
    pulse: true,
  };
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dotColor} ${config.pulse ? "status-dot-pulse" : ""}`}
      />
      {config.emoji} {config.label || "Đang xử lý"}
    </span>
  );
}
