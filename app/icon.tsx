import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <svg width="32" height="32" viewBox="0 0 100 100">
                    <rect x="44" y="10" width="12" height="25" rx="6" fill="#64ffda" transform="rotate(0 50 50)" />
                    <rect x="44" y="10" width="12" height="25" rx="6" fill="#64ffda" transform="rotate(60 50 50)" />
                    <rect x="44" y="10" width="12" height="25" rx="6" fill="#64ffda" transform="rotate(120 50 50)" />
                    <rect x="44" y="10" width="12" height="25" rx="6" fill="#64ffda" transform="rotate(180 50 50)" />
                    <rect x="44" y="10" width="12" height="25" rx="6" fill="#64ffda" transform="rotate(240 50 50)" />
                    <rect x="44" y="10" width="12" height="25" rx="6" fill="#64ffda" transform="rotate(300 50 50)" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
