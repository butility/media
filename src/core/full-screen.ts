export function detectFullscreenSupport(): boolean {
    return (
        document.fullscreenEnabled ||
        (document as any).webkitFullscreenEnabled ||
        (document as any).mozFullScreenEnabled ||
        (document as any).msFullscreenEnabled
    );
}

export function enterFullscreen(element: HTMLElement): void {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
        (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
    }
}

export function exitFullscreen(): void {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
    }
}

export function getFullscreenElement(): Element | null {
    return (
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement ||
        null
    );
}
