import * as THREE from 'three';
import { HF_TOKEN, HF_MODEL } from './config.js';

// -------- 3D ASHOKA CHAKRA --------
const canvas = document.getElementById("chakra");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight,0.1,100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
renderer.setSize(innerWidth, innerHeight);

// ring
const geo = new THREE.TorusGeometry(1,0.1,30,100);
const mat = new THREE.MeshBasicMaterial({color:0x1e3a8a});
const ring = new THREE.Mesh(geo, mat);
scene.add(ring);

// animation
function animate(){
  requestAnimationFrame(animate);
  ring.rotation.z += 0.01;
  renderer.render(scene,camera);
}
animate();

// -------- AI CHAT --------
window.askAI = async function(){
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  output.innerHTML = "सोच रहा हूँ...";

  const res = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`,{
    method:"POST",
    headers:{
      "Authorization":"Bearer "+HF_TOKEN,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({inputs:input})
  });

  const data = await res.json();

  if(Array.isArray(data)){
    output.innerHTML = data[0]?.generated_text || "No response";
  }else{
    output.innerHTML = "Error";
  }
}
