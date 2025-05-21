"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  path: string;
  color?: string;
  className?: string;
}

export default function ModuleCard({
  title,
  description,
  icon,
  path,
  color = "bg-purple-600",
  className,
}: ModuleCardProps) {
  // Map icon names to components will be handled by the parent component

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="p-4 pb-0">
        <div
          className={cn(
            "mb-2 flex h-10 w-10 items-center justify-center rounded-md",
            color,
          )}
        >
          {/* Icon will be passed from parent */}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {/* Content can be added here */}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={path} className="w-full">
          <Button variant="outline" className="w-full justify-between">
            <span>Open {title}</span>
            <ArrowRight size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
