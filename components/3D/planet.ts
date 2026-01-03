import * as THREE from "three"
import earthVertex from "./shaders/earth/vertex.glsl"
import earthFragment from "./shaders/earth/fragment.glsl"
import atmosphereVertex from "./shaders/atmosphere/vertex.glsl"
import atmosphereFragment from "./shaders/atmosphere/fragment.glsl"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const initPlanet3D = (canvas: HTMLCanvasElement, { rotationSpeed = 0.2 }: { rotationSpeed?: number } = {}): {
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    earthGroup: THREE.Group,
    stars: THREE.Points,
    destroy: () => void
} => {

    // scene
    const scene = new THREE.Scene()

    // camera
    const size = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio
    }

    const camera = new THREE.PerspectiveCamera(15, size.width / size.height, 0.1, 10000)
    camera.position.set(0, 0, 15)
    scene.add(camera)

    // renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

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
    // Hero Section Initial State
    earthGroup.scale.set(2, 2, 2);
    earthGroup.position.y = -3;
    scene.add(earthGroup);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 50; // Spread stars wide
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.05,
        sizeAttenuation: true,
        color: 0xffffff,
        transparent: true,
        opacity: 0, // Start hidden, fade in later
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);


    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initial sun position
    let sunSpherical = new THREE.Spherical(1, Math.PI * 0.48, -1.8);
    const sunDirection = new THREE.Vector3();

    sunDirection.setFromSpherical(sunSpherical);
    earthMaterial.uniforms.uSunDirection.value.copy(sunDirection);
    atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);

    // animation loop
    const tick = (time: number, deltaTime: number) => {
        const dt = deltaTime ? deltaTime / 1000 : 0.016;
        earth.rotation.y += dt * rotationSpeed;

        // Smooth mouse rotation
        gsap.to(earthGroup.rotation, {
            x: -mouse.y * 0.3,
            y: mouse.x * 0.5,
            duration: 2,
            ease: "power2.out"
        });

        renderer.render(scene, camera)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const handleResize = () => {
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
    }
    window.addEventListener('resize', handleResize)

    return {
        scene,
        camera,
        earthGroup,
        stars,
        destroy: () => {
            gsap.ticker.remove(tick);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            renderer.dispose();
        }
    };
};

export default initPlanet3D;
