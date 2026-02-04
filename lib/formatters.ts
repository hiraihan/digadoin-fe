export function formatCurrency(amount: number, style: 'full' | 'short' | 'compact' = 'full'): string {
    if (style === 'short') {
        if (amount >= 1000000000) {
            return `${(amount / 1000000000).toFixed(amount % 1000000000 === 0 ? 0 : 1)}M`
        }
        if (amount >= 1000000) {
            return `${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}jt`
        }
        if (amount >= 1000) {
            return `${(amount / 1000).toFixed(0)}rb`
        }
        return amount.toString()
    }

    if (style === 'compact') {
        if (amount >= 1000000000) {
            return `Rp ${(amount / 1000000000).toFixed(amount % 1000000000 === 0 ? 0 : 1)}M`
        }
        if (amount >= 1000000) {
            return `Rp ${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}jt`
        }
        if (amount >= 1000) {
            return `Rp ${(amount / 1000).toFixed(0)}rb`
        }
        return `Rp ${amount}`
    }

    return `Rp ${amount.toLocaleString('id-ID')}`
}

export function formatDate(dateString: string, style: 'short' | 'long' = 'short'): string {
    const date = new Date(dateString)
    if (style === 'long') {
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'Baru saja'
    if (diffMins < 60) return `${diffMins} menit lalu`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} jam lalu`

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays} hari lalu`

    const diffWeeks = Math.floor(diffDays / 7)
    if (diffWeeks < 4) return `${diffWeeks} minggu lalu`

    return formatDate(dateString)
}
