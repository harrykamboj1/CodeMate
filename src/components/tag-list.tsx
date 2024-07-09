"use client";
import { useRouter } from "next/navigation";
import { badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";

export function TagList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((lang) => (
        <button
          onClick={() => {
            router.push(`/?search=${lang}`);
          }}
          className={cn(badgeVariants({}))}
          key={lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
