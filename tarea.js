import "./styles.css";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

let scene, camera, renderer;
let models = [];
let materials = [];
const COUNT = 135;

init();
tweenModels();
animationLoop();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00);
    scene.fog = new THREE.Fog(0xff0000, 50, 2000);

    const canvas = document.querySelector("canvas");
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        50,
        10000
    );

    camera.position.set(500, 600, 200);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const ambientLight = new THREE.DirectionalLight(0x9090aa);
    ambientLight.position.set(-300, -300, -500).normalize();
    scene.add(ambientLight);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(1, 1, 1);
    scene.add(light);

    const softLight = new THREE.PointLight(0xffffff, 0.7, 2000);
    softLight.position.set(200, 300, 200);
    scene.add(softLight);

    scene.add(new THREE.AmbientLight(0x222223, 0.6));

    const f = 0xff / COUNT;
    
    for(let i = 0; i < COUNT; i++){
        let color;

        if(i < COUNT/3){
            color = new THREE.Color().setHSL(0, 1, 0.5);
        } else if(i < 2*COUNT/3) {
            color = new THREE.Color().setHSL(0.66, 1, 0.5);
        } else{
            color = new THREE.Color().setHSL(0.8, 1, 0.5);
        }
        materials.push(new THREE.MeshStandardMaterial({color, roughness: 0.4, metalness: 0.6}));
    }

    const geometry = new THREE.BoxGeometry(20, 20, 20);
    for(let i = 0; i < COUNT; i++){
        const mesh = new THREE.Mesh(geometry, materials[i]);
        models.push(mesh);
        scene.add(mesh);
    }

    window.addEventListener("resize", resize);


}

function tweenModels(){
    TWEEN.removeAll();
    const time = Math.random() * 1000 + 250;
    const sx = Math.random() * 3;
    const sy = Math.random() * 3;
    const sz = Math.random() * 2;
    const yaw = Math.random() * 1000;
    const pitch = Math.random() * 1200;
    const dist = Math.random() * 500 + 250;
    const lookAtZero = Math.random() > 0.5;

    for(let i = 0; i < models.length; i++){
        const model = models[i];
        const n = i / models.length - 0.5;

        const t = new THREE.Object3D();
        t.rotateX((pitch * n *Math.PI)/180);
        t.rotateY((yaw * n *Math.PI) / 180);
        t.rotateZ((yaw*n*Math.PI)/180);
        t.translateZ(dist);
        t.scale.set(sx * Math.random() + 0.5, sy * Math.random() + 0.5, sz * Math.random() + 0.5);


        if(lookAtZero) t.lookAt(new THREE.Vector3(1, 0, 0));

        new TWEEN.Tween(model.position)
            .to(t.position, time - 100)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
        new TWEEN.Tween(model.scale)
            .to(t.scale, time-100)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
        new TWEEN.Tween(model.rotation)
            .to(t.rotation, time- 100)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
    }

    setTimeout(tweenModels, time);
}

function animationLoop(time){

    requestAnimationFrame(animationLoop);

    const radius = 700 + Math.sin(time/5000)* 200;
    const height = 50 + Math.sin(time/2500) * 50;

    camera.position.set(Math.sin(time/3000)*radius, height, Math.cos(time/3000)*radius);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    TWEEN.update();
    renderer.render(scene, camera);
}


function resize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

