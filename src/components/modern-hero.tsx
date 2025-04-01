import { Star } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/profile-card";
import { CopyButton } from "@/components/copy-button";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
  profileCard?: {
    name: string;
    title: string;
    avatarUrl?: string;
    xUrl?: string;
    githubUrl?: string;
  };
}

const Hero7 = ({
  heading = "A Collection of Components Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Discover all components",
    url: "https://www.shadcnblocks.com",
  },
  reviews = {
    count: 200,
    avatars: [
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
  profileCard,
}: Hero7Props) => {
  return (
    <section className="py-10 relative">
      <div className="container mx-auto max-w-3xl bg-background dark:bg-black rounded-lg p-8">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-4 text-center">
          <h1 className="text-3xl font-extrabold lg:text-5xl text-foreground dark:text-white">{heading}</h1>
          
          {profileCard && (
            <div className="max-w-[400px] mx-auto w-full my-4">
              <ProfileCard 
                name={profileCard.name}
                title={profileCard.title}
                avatarUrl={profileCard.avatarUrl}
                xUrl={profileCard.xUrl}
                githubUrl={profileCard.githubUrl}
              />
            </div>
          )}
          
          <p className="text-balance text-muted-foreground dark:text-gray-400 lg:text-lg">
            Im a backend developer and security penetration testing. <br />
            contact me at <span className="text-primary underline">rasperon@proton.me</span>
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={button.url}>{button.text}</a>
          </Button>
          <CopyButton textToCopy="rasperon@proton.me" />

        </div>
        <div className="mx-auto mt-6 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <div key={index} className="size-12 border border-border dark:border-gray-800 rounded-full overflow-hidden relative">
                <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </span>
          <div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="size-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-left font-medium text-muted-foreground dark:text-gray-400 text-sm">
              from {reviews.count}+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
