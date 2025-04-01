"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export function CopyButton({ textToCopy, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      
      // 2 saniye sonra ikonu geri değiştir
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Kopyalama başarısız oldu:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className={cn("relative border-border text-foreground dark:border-white dark:text-white hover:bg-accent", className)}
      onClick={handleCopy}
    >
      <span className="flex items-center gap-2">
        {isCopied ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
        <span className={cn(isCopied ? "text-green-500" : "")}>
          {isCopied ? "Copied!" : "Copy Mail"}
        </span>
      </span>
    
    </Button>
  );
} 