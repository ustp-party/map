export function prefersDarkMode(): boolean {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
}