"use client"

import { Github } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const teamMembers = [
    {
        name: "Shohih Arrifa'i",
        role: "Backend Engineer",
        role2: "Data Engineer",
        image: "/sohih.jpeg",
        bio: "Architecting robust server-side logic while transforming raw data into actionable insights for scalability.",
        socials: {
            github: "https://github.com/XsafiD",
        },
    },
    {
        name: "Robby Dwi",
        role: "Frontend Engineer",
        role2: "UI/UX Designer",
        image: "/robby.jpeg",
        bio: "Bridging the gap between design and code to craft immersive, pixel-perfect user experiences.",
        socials: {
            github: "https://github.com/robbydwip",
        },
    },
    {
        name: "Muhammad Raihan",
        role: "Project Manager",
        role2: "Backend Engineer",
        image: "/mr.jpeg",
        bio: "Leading the vision while ensuring the engine room runs smoothly with secure systems.",
        socials: {
            github: "https://github.com/hiraihan",
        },
    },
    {
        name: "Khoirul Anwar",
        role: "Backend Engineer",
        role2: "QA Engineer",
        image: "/irul.jpeg",
        bio: "Building reliable APIs and rigorously testing every edge case to ensure zero-compromise quality.",
        socials: {
            github: "https://github.com/KHAIRONSHIKI",
        },
    },
    {
        name: "Tiara Indah",
        role: "Frontend Engineer",
        role2: "UI/UX Designer",
        image: "/tiara.jpeg",
        bio: "Designing intuitive interfaces and bringing them to life with clean, responsive frontend code.",
        socials: {
            github: "https://github.com/tiara0405indah-collab",
        },
    },
]

export function TeamSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-background/50">
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-30"></div>
                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] opacity-30"></div>
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
                    <div className="inline-flex items-center rounded-full border border-border/50 bg-card/30 px-3 py-1 text-sm backdrop-blur-xl">
                        <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                            Our Team
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gradient-primary">
                        Meet the Developers
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-[800px]">
                        The talented individuals behind Digadoin who make everything possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <Card
                            key={index}
                            className="group border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                        >
                            <CardHeader className="flex flex-col items-center p-4">
                                <div className="relative w-full aspect-square mb-4 overflow-hidden border-2 border-white/20 group-hover:border-white/50 transition-colors rounded-2xl shadow-lg">
                                    <Avatar className="w-full h-full rounded-none">
                                        <AvatarImage src={member.image} alt={member.name} className="object-cover object-top" />
                                        <AvatarFallback className="rounded-none text-xl">{member.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <CardTitle className="text-xl font-bold text-center w-full leading-tight mb-0.5">{member.name}</CardTitle>
                                <CardDescription className="text-primary text-sm font-semibold text-center w-full min-h-[48px] flex items-center justify-center leading-snug px-2">
                                    {member.role}
                                    <br />
                                    {member.role2}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center pb-4 px-3">
                                <p className="text-foreground/80 text-sm mb-3 line-clamp-4 leading-relaxed font-medium">
                                    {member.bio}
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <Link href={member.socials.github} target="_blank" className="text-foreground/70 hover:text-primary transition-colors">
                                        <Github className="w-5 h-5" />
                                        <span className="sr-only">GitHub</span>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
