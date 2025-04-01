"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Star, GitFork } from "lucide-react";
import Link from "next/link";

interface Repository {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
}

interface GitHubReposProps {
  username: string;
  limit?: number;
}

export function GitHubRepos({ username, limit = 4 }: GitHubReposProps) {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchRepos() {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`);
        
        if (!response.ok) {
          throw new Error('GitHub API isteği başarısız oldu');
        }
        
        const data = await response.json();
        
        // Repoları yıldız sayısına göre sırala ve limit kadar al
        const formattedRepos = data
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || 'Açıklama yok',
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
          }))
          .sort((a: Repository, b: Repository) => b.stars - a.stars)
          .slice(0, limit);
        
        setRepos(formattedRepos);
      } catch (err) {
        setError('Repolar yüklenirken bir hata oluştu');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepos();
  }, [username, limit]);

  // Tarihi "X gün önce" formatına dönüştür
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 gün önce';
    if (diffDays < 30) return `${diffDays} gün önce`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 ay önce';
    if (diffMonths < 12) return `${diffMonths} ay önce`;
    
    const diffYears = Math.floor(diffDays / 365);
    if (diffYears === 1) return '1 yıl önce';
    return `${diffYears} yıl önce`;
  }

  // Dil için renk belirle
  function getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-blue-600',
      HTML: 'bg-orange-500',
      CSS: 'bg-purple-500',
      Go: 'bg-cyan-500',
      C: 'bg-gray-600',
      'C#': 'bg-green-600',
      'C++': 'bg-pink-600',
      Java: 'bg-red-600',
      PHP: 'bg-indigo-600',
      Ruby: 'bg-red-500',
      Rust: 'bg-orange-600',
      Shell: 'bg-green-500',
    };
    
    return colors[language] || 'bg-gray-500';
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Repositories</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href={`https://github.com/${username}?tab=repositories`} target="_blank" className="flex items-center gap-2">
            <Github size={16} />
            <span>View All Repos</span>
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <Link 
            href={`https://github.com/${username}/${repo.name}`} 
            key={repo.name}
            target="_blank"
            className="border border-border dark:border-gray-800 rounded-lg p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Github size={18} className="mr-2 text-foreground dark:text-white" />
                  <h3 className="font-medium text-foreground dark:text-white truncate">{repo.name}</h3>
                </div>
                <span className="text-xs text-muted-foreground dark:text-gray-400">{repo.updatedAt}</span>
              </div>
              
              <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2 line-clamp-2">
                {repo.description}
              </p>
              
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="flex items-center">
                  {repo.language && (
                    <div className="flex items-center mr-4">
                      <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)} mr-1`}></span>
                      <span className="text-xs text-muted-foreground dark:text-gray-400">{repo.language}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Star size={14} className="mr-1 text-muted-foreground dark:text-gray-400" />
                    <span className="text-xs text-muted-foreground dark:text-gray-400">{repo.stars}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <GitFork size={14} className="mr-1 text-muted-foreground dark:text-gray-400" />
                    <span className="text-xs text-muted-foreground dark:text-gray-400">{repo.forks}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 