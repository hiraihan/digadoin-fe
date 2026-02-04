// --- Original Interfaces ---

export interface HeroSection {
    badge: string
    titleLine1: string
    titleLine2: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    stats: {
        label: string
        value: string
    }[]
}

export interface ServiceItem {
    title: string
    description: string
    icon: string
    colSpan: string
}

export interface ServicesSection {
    title: string
    subtitle: string
    items: ServiceItem[]
}

// --- New Interfaces ---

export interface ProjectItem {
    title: string
    category: string
    image: string
    description: string
    tags: string[]
}

export interface ProjectsSection {
    title: string
    subtitle: string
    items: ProjectItem[]
}

export interface TestimonialItem {
    quote: string
    author: string
    role: string
    image: string
}

export interface TestimonialsSection {
    title: string
    items: TestimonialItem[]
}

export interface FAQItem {
    question: string
    answer: string
}

export interface FAQSectionContent {
    title: string
    subtitle: string
    items: FAQItem[]
}

export interface LandingPageContent {
    hero: HeroSection
    services: ServicesSection
    projects: ProjectsSection
    testimonials: TestimonialsSection
    faq: FAQSectionContent
}

export const initialContent: LandingPageContent = {
    hero: {
        badge: "Accepting New Projects for Q1",
        titleLine1: "Digital Empires",
        titleLine2: "Built to Scale",
        description: "We craft high-performance LMS platforms, Marketplaces, and Custom Web Applications that define the future of digital business.",
        ctaPrimary: "Start Your Project",
        ctaSecondary: "View Our Work",
        stats: [
            { label: "Projects Delivered", value: "150+" },
            { label: "Client Satisfaction", value: "99%" },
            { label: "Team Experts", value: "25+" },
            { label: "Years Experience", value: "8+" },
        ]
    },
    services: {
        title: "Our Core Solutions",
        subtitle: "Pre-built and custom engineered solutions designed to accelerate your business growth.",
        items: [
            {
                title: "E-Learning Platforms (LMS)",
                description: "Complete education ecosystems with course management, student progress tracking, and interactive quizzes.",
                icon: "GraduationCap",
                colSpan: "md:col-span-2",
            },
            {
                title: "Multi-Vendor Marketplaces",
                description: "Scalable platforms connecting buyers and sellers with secure payment processing and vendor dashboards.",
                icon: "ShoppingCart",
                colSpan: "md:col-span-1",
            },
            {
                title: "SaaS Applications",
                description: "Subscription-based software solutions built for scale and recurring revenue.",
                icon: "LayoutTemplate",
                colSpan: "md:col-span-1",
            },
            {
                title: "Mobile-First Web Apps",
                description: "Responsive web applications that feel native on every device.",
                icon: "Smartphone",
                colSpan: "md:col-span-2",
            },
        ]
    },
    projects: {
        title: "Karya Terbaik Kami",
        subtitle: "Lihat bagaimana kami membantu bisnis bertransformasi melalui solusi digital yang inovatif dan scalable.",
        items: [
            {
                title: "EduPrime LMS",
                category: "Learning Management System",
                image: "/modern-lms-dashboard-dark-mode.jpg",
                description: "Platform pembelajaran komprehensif dengan fitur live class, kuis interaktif, dan sertifikat otomatis.",
                tags: ["Next.js", "Supabase", "Live Streaming"],
            },
            {
                title: "MarketHub Pro",
                category: "E-Commerce Marketplace",
                image: "/ecommerce-marketplace-ui-design.jpg",
                description: "Marketplace multi-vendor dengan sistem pembayaran terintegrasi dan manajemen stok real-time.",
                tags: ["React", "Node.js", "Payment Gateway"],
            },
            {
                title: "TechCorp Profile",
                category: "Company Profile",
                image: "/modern-corporate-website.png",
                description: "Website korporat futuristik dengan animasi 3D dan performa SEO tinggi.",
                tags: ["Framer Motion", "WebGL", "SEO"],
            },
            {
                title: "HealthCare App",
                category: "Custom Web App",
                image: "/healthcare-dashboard-app.jpg",
                description: "Aplikasi manajemen pasien dan rekam medis elektronik yang aman dan compliant.",
                tags: ["TypeScript", "PostgreSQL", "Security"],
            },
        ]
    },
    testimonials: {
        title: "Dipercaya oleh Industri",
        items: [
            {
                quote: "Sistem LMS yang dibangun sangat membantu operasional kursus kami. UI-nya intuitif dan performanya sangat cepat.",
                author: "Budi Santoso",
                role: "CEO, EduTech Indonesia",
                image: "/diverse-group-avatars.png",
            },
            {
                quote: "Marketplace kami berjalan lancar dengan ribuan transaksi per hari. Tim support sangat responsif menangani kendala.",
                author: "Sarah Wijaya",
                role: "Founder, LocalMarket",
                image: "/diverse-group-avatars.png",
            },
            {
                quote: "Website company profile baru kami meningkatkan konversi klien hingga 200%. Desainnya benar-benar world-class.",
                author: "Michael Chen",
                role: "Director, Creative Agency",
                image: "/diverse-group-avatars.png",
            },
        ]
    },
    faq: {
        title: "Frequently Asked Questions",
        subtitle: "Jawaban untuk pertanyaan yang sering diajukan oleh klien kami.",
        items: [
            {
                question: "Berapa lama waktu pengerjaan website?",
                answer: "Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Untuk Company Profile biasanya 1-2 minggu, sedangkan untuk LMS atau Marketplace bisa memakan waktu 4-8 minggu.",
            },
            {
                question: "Apakah saya mendapatkan akses ke CMS/Admin Panel?",
                answer: "Ya, semua website yang kami buat dilengkapi dengan CMS (Content Management System) atau Admin Panel yang user-friendly, sehingga Anda bisa mengelola konten sendiri tanpa perlu coding.",
            },
            {
                question: "Apakah ada garansi atau maintenance?",
                answer: "Kami memberikan garansi bug fix selama 3 bulan setelah launch. Kami juga menyediakan paket maintenance bulanan untuk update keamanan dan backup data.",
            },
            {
                question: "Apakah website sudah termasuk domain dan hosting?",
                answer: "Paket kami sudah termasuk domain (.com/.id) dan hosting cloud server gratis untuk tahun pertama. Untuk tahun berikutnya, Anda hanya perlu membayar biaya perpanjangan.",
            },
            {
                question: "Bisakah saya request fitur custom?",
                answer: "Tentu saja! Kami spesialis dalam pengembangan custom software. Tim kami akan menganalisis kebutuhan bisnis Anda dan membangun solusi yang tepat.",
            },
        ]
    }
}
