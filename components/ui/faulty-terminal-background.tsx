import React from 'react';
import FaultyTerminal from './FaultyTerminal';

interface FaultyTerminalBackgroundProps {
    className?: string;
    style?: React.CSSProperties;
}


export default function FaultyTerminalBackground({
    className = '',
    style = {}
}: FaultyTerminalBackgroundProps) {

    return (
        <div
            className={`w-full h-full ${className}`}
            style={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                ...style
            }}
        >
            <FaultyTerminal
                scale={1.5}
                gridMul={[2, 1]}
                digitSize={1.2}
                timeScale={1}
                pause={false}
                scanlineIntensity={1}
                glitchAmount={1}
                flickerAmount={1}
                noiseAmp={1}
                chromaticAberration={0.8}
                dither={0}
                curvature={0.1}
                tint="#b341ed"
                mouseReact={true}
                mouseStrength={0.5}
                pageLoadAnimation={true}
                brightness={1}
            />
        </div>
    );
}
