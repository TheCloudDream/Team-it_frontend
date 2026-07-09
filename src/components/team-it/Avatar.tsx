import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

interface Props {
  user: Pick<User, "id" | "firstName" | "lastName" | "avatar">;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  xs: "size-5 text-[9px]",
  sm: "size-7 text-[10px]",
  md: "size-9 text-xs",
  lg: "size-12 text-sm",
};

// A fixed palette, deterministically chosen from the user's id, since the
// real User model has no stored `color` field (that was mock-only).
const palette = [
  "#3b82f6", "#ec4899", "#10b981", "#f59e0b",
  "#8b5cf6", "#ef4444", "#06b6d4", "#84cc16",
];

function colorFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return palette[hash % palette.length];
}

export function UserAvatar({ user, size = "sm", className }: Props) {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "?";

  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={fullName}
        title={fullName}
        className={cn("rounded-full object-cover ring-2 ring-surface shrink-0", sizes[size], className)}
      />
    );
  }

  return (
    <span
      title={fullName}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-surface shrink-0",
        sizes[size],
        className,
      )}
      style={{ backgroundColor: colorFor(user.id) }}
    >
      {initials}
    </span>
  );
}
