import { cn } from "@/lib/utils";
import type { User } from "@/lib/team-it/data";

interface Props {
  user: Pick<User, "initials" | "color" | "name">;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  xs: "size-5 text-[9px]",
  sm: "size-7 text-[10px]",
  md: "size-9 text-xs",
  lg: "size-12 text-sm",
};

export function UserAvatar({ user, size = "sm", className }: Props) {
  return (
    <span
      title={user.name}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-surface shrink-0",
        sizes[size],
        className,
      )}
      style={{ backgroundColor: user.color }}
    >
      {user.initials}
    </span>
  );
}
