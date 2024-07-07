import { Badge } from "./ui/badge";

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((lang) => (
        <Badge className="w-fit" key={lang.toUpperCase()}>
          {lang}
        </Badge>
      ))}
    </div>
  );
}

export function splitTag(tags: string) {
  return tags.split(",").map((tag) => tag.trim());
}
