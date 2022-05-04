import React from 'react'
import Particles from "react-tsparticles";

const ParticlesLoign = (porps) => {
    return (
        <Particles
                id="tsparticles"
                options={{
                    background: {
                    color: {
                        value: "#140D4F",
                    },
                    },
                    fpsLimit: 30,
                    interactivity: {
                    events: {
                        onHover: {
                        enable: true,
                        mode: "repulse",
                        },
                        resize: false,
                    },
                    modes: {
                        bubble: {
                            distance: 400,
                            duration: 0,
                            opacity: 0.8,
                            size: 80,
                        },
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 1,
                        },
                    },
                    },
                    particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: true,
                        speed: 4,
                        straight: false,
                    },
                    number: {
                        density: {
                        enable: true,
                        area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        random: true,
                        value: 5,
                    },
                    },
                    detectRetina: true,
                }}
                />
        
    )
}

export default ParticlesLoign