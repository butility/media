export * from '@/core/full-screen';
import {
    detectFullscreenSupport,
    enterFullscreen,
    exitFullscreen,
    getFullscreenElement
} from '@/core/full-screen';
  
const FullScreen = {
    detectFullscreenSupport,
    enterFullscreen,
    exitFullscreen,
    getFullscreenElement
}
  
export default FullScreen;