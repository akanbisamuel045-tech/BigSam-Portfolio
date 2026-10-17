"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ProjectItem } from "@/data/portfolioData";
import { usePortfolioData } from "@/context/PortfolioContext";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectItem;
  aspectClass: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, aspectClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-white p-3 md:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-[#EAEAEA] hover:border-[#E84511]/40 transition-all duration-500 rounded-sm"
      >
        {/* Image Container */}
        <div
          className={cn(
            "relative w-full overflow-hidden bg-[#111111] rounded-[2px]",
            aspectClass
          )}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 1200px"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Interactive Hover Badge matching 00:18 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-[#E84511] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 shadow-xl transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </div>
        </div>

        {/* Bottom Caption Bar */}
        <div className="pt-3.5 pb-1 px-1 flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#E84511] text-xs transition-transform duration-300 group-hover:rotate-90">
              ✦
            </span>
            <span className="font-display font-extrabold uppercase tracking-tight text-[#111111] group-hover:text-[#E84511] transition-colors duration-300">
              {project.title}
            </span>
          </div>

          <span className="text-[#7A7A7A] font-medium tracking-wide">
            {project.category}
          </span>
        </div>
      </a>
    </motion.div>
  );
};

export const ProjectsGrid: React.FC = () => {
  const { data: portfolioData } = usePortfolioData();
  const { projects } = portfolioData;

  const project1 = projects[0];
  const project2 = projects[1];
  const project3 = projects[2];
  const project4 = projects[3];
  const project5 = projects[4];

  return (
    <section
      id="portfolio"
      className="w-full bg-[#F6F6F6] py-20 md:py-28 px-6 md:px-10 border-b border-[#E2E2E2] select-none"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section Header */}
        <SectionHeader
          badge="PORTFOLIO"
          blackText="OUR"
          grayText="PROJECTS."
          align="split"
        />

        {/* Exact 3-Row Staggered Editorial Grid matching 00:14-00:19 */}
        <div className="mt-14 md:mt-20 flex flex-col gap-12 md:gap-20">
          {/* ========================================================== */}
          {/* ROW 1: GADEX NEXUS (col-span-5) & PULSE FINTECH (col-span-4 col-start-9) */}
          {/* ========================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {project1 && (
              <div className="md:col-span-5">
                <ProjectCard
                  project={project1}
                  aspectClass="aspect-[4/4.6]"
                />
              </div>
            )}

            {project2 && (
              <div className="md:col-span-4 md:col-start-9">
                <ProjectCard
                  project={project2}
                  aspectClass="aspect-[4/4.2]"
                />
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* ROW 2: ARKEO CLOUD ENGINE (full-width col-span-12) */}
          {/* ========================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            {project3 && (
              <div className="md:col-span-12">
                <ProjectCard
                  project={project3}
                  aspectClass="aspect-[16/8.5] md:aspect-[21/9]"
                />
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* ROW 3: NOVU ANALYTICS (col-span-4) & ZENTIX API HUB (col-span-6 col-start-7) */}
          {/* ========================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {project4 && (
              <div className="md:col-span-4">
                <ProjectCard
                  project={project4}
                  aspectClass="aspect-square"
                />
              </div>
            )}

            {project5 && (
              <div className="md:col-span-6 md:col-start-7">
                <ProjectCard
                  project={project5}
                  aspectClass="aspect-[4/4.5]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA Row: Anchored Bottom-Left matching 00:19 */}
        <div className="mt-12 md:mt-16 flex justify-start">
          <ArrowButton
            text="ALL PROJECTS"
            href="https://github.com/akanbisamuel045-tech"
            external
            variant="light"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
