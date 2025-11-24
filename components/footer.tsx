import Link from "next/link"
import { Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      {/* Increased container width and padding to match the new full-scale layout */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg">
                N
                <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold tracking-tight font-heading text-white">NexusDev</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Premium web development agency specializing in scalable digital products. Building the future of the web,
              one pixel at a time.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Products</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">
                  LMS Platforms
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">
                  Marketplace Kits
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">
                  SaaS Starters
                </Link>
              </li>
              <li>
                <Link href="/start-project" className="hover:text-blue-400 transition-colors">
                  Custom Solution
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-blue-400 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 NexusDev Agency. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
