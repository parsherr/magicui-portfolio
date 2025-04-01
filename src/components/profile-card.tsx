import React from "react";
import Link from "next/link";
import { X, Github } from "lucide-react";

interface ProfileCardProps {
  name: string;
  title: string;
  avatarUrl?: string;
  xUrl?: string;
  githubUrl?: string;
}

export function ProfileCard({ name, title, avatarUrl, xUrl, githubUrl }: ProfileCardProps) {
  return (
    <div className="bg-accent dark:bg-black text-foreground dark:text-white p-3 rounded-lg flex items-center justify-between w-full border border-border dark:border-gray-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted dark:bg-gray-700">
          <img src={avatarUrl || "/avatar.png"} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="font-medium text-base">{name}</h3>
          <p className="text-xs text-muted-foreground dark:text-gray-400">{title}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {xUrl && (
          <Link href={xUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-background dark:bg-black p-1.5 border border-border dark:border-gray-800 hover:bg-accent dark:hover:bg-gray-900 transition-colors">
            <X size={14} className="text-foreground dark:text-white" />
          </Link>
        )}
        {githubUrl && (
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-background dark:bg-black p-1.5 border border-border dark:border-gray-800 hover:bg-accent dark:hover:bg-gray-900 transition-colors">
            <Github size={14} className="text-foreground dark:text-white" />
          </Link>
        )}
      </div>
    </div>
  );
} 