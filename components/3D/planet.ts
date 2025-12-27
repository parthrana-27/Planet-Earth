import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants";
import * as THREE from "three"
import earthVertex from "./shaders/earth/vertex.glsl"
import earthFragment from "./shaders/earth/fragment.glsl"
import atmosphereVertex from "./shaders/atmosphere/vertex.glsl"
import atmosphereFragment from "./shaders/atmosphere/fragment.glsl"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const initPlanet3D = ({ rotationSpeed = 0.2 }: { rotationSpeed?: number } = {}): { scene: THREE.Scene } => {
    const canvas = document.querySelector('canvas.planet-3D') as HTMLCanvasElement

    // scene
    const scene = new THREE.Scene()

    // camera 
    const size = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio
    }

    const camera = new THREE.PerspectiveCamera(15, size.width / size.height, 0.1, 10000)
    camera.position.set(0, 2.15, 4.5)
    scene.add(camera)

    // renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(size.pixelRatio)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    // texture 
    const TL = new THREE.TextureLoader();
    const dayTexture = TL.load('/earth/day.jpg');
    const nightTexture = TL.load('/earth/night.jpg');
    const specularCloudsTexture = TL.load('/earth/specularClouds.jpg');

    dayTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    const baseAnisotropy = renderer.capabilities.getMaxAnisotropy();

    dayTexture.anisotropy = baseAnisotropy;
    nightTexture.anisotropy = baseAnisotropy;
    specularCloudsTexture.anisotropy = baseAnisotropy;

    //geometry
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64)
    const uAtmosphereDayColor = 0x4a96e8;
    const uAtmosphereTwilightColor = 0x1950E5;
    const atmosphereGeometry = new THREE.SphereGeometry(2, 64, 64);

    // material
    const earthMaterial = new THREE.ShaderMaterial({
        vertexShader: earthVertex,
        fragmentShader: earthFragment,
        uniforms: {
            uDayTexture: new THREE.Uniform(dayTexture),
            uNightTexture: new THREE.Uniform(nightTexture),
            uSpecularCloudsTexture: new THREE.Uniform(specularCloudsTexture),
            uSunDirection: new THREE.Uniform(new THREE.Vector3(-1.0, 0.0, 0.0)),
            uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(uAtmosphereDayColor)),
            uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(uAtmosphereTwilightColor))
        },
        transparent: true,
    })
    const atmosphereMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        uniforms: {
            uOpacity: { value: 1 },
            uSunDirection: new THREE.Uniform(new THREE.Vector3(-1.0, 0.0, 0.0)),
            uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(uAtmosphereDayColor)),
            uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(uAtmosphereTwilightColor))
        },
        depthWrite: false,
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.04, 1.04, 1.04);

    const earthGroup = new THREE.Group();
    earthGroup.add(earth);
    earthGroup.add(atmosphere);
    scene.add(earthGroup);

    gsap.registerPlugin(ScrollTrigger);
    gsap
        .timeline({
            scrollTrigger: {
                trigger: '.hero_main',
                start: () => 'top top',
                scrub: 3,
                pin: true,
                anticipatePin: 1,
            }
        })
        .to(
            ".hero_main .content",
            {
                filter: "blur(40px)",
                autoAlpha: 0,
                scale: 0.5,
                duration: 2,
                ease: "power3.inOut"
            },
            "setting",
        )
        .to(
            camera.position,
            {
                x: window.innerWidth > 768 ? 0 : 0.1,
                y: 0.1,
                z: window.innerWidth > 768 ? 19 : 30,
                duration: 2,
                ease: "power3.inOut"
            },
            "setting",
        );

    let sunSpherical = new THREE.Spherical(1, Math.PI * 0.48, -1.8);
    const sunDirection = new THREE.Vector3();

    sunDirection.setFromSpherical(sunSpherical);
    earthMaterial.uniforms.uSunDirection.value.copy(sunDirection);
    atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);
    // animation loop
    gsap.ticker.add((time, deltaTime) => {
        const dt = deltaTime ? deltaTime / 1000 : 0.016;
        earth.rotation.y += dt * rotationSpeed;
        renderer.render(scene, camera)
    })
    gsap.ticker.lagSmoothing(0)
    window.addEventListener('resize', () => {
        // Update sizes
        size.width = window.innerWidth;
        size.height = window.innerHeight;
        size.pixelRatio = window.devicePixelRatio;

        // Update camera
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(size.width, size.height);
        renderer.setPixelRatio(size.pixelRatio);
    })

    return { scene };
};

export default initPlanet3D;
