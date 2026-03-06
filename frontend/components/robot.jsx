"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Robot() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // ── SCENE + CAMERA ──
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 7);
    camera.lookAt(0, 0.2, 0);

    // ── LIGHTS ──
    scene.add(new THREE.AmbientLight(0x1a2744, 0.8));
    const kL = new THREE.DirectionalLight(0xffffff, 2.8);
    kL.position.set(4, 8, 6); kL.castShadow = true; scene.add(kL);
    const fL = new THREE.DirectionalLight(0x4285f4, 2.2);
    fL.position.set(-5, 2, 4); scene.add(fL);
    const rL = new THREE.DirectionalLight(0xa78bfa, 1.4);
    rL.position.set(1, -3, -4); scene.add(rL);
    const pL1 = new THREE.PointLight(0x4285f4, 4, 10);
    pL1.position.set(0, 1.5, 5); scene.add(pL1);
    const pL2 = new THREE.PointLight(0xa78bfa, 2.5, 7);
    pL2.position.set(-3, 3, 2); scene.add(pL2);
    const pL3 = new THREE.PointLight(0x00d4ff, 3, 8);
    pL3.position.set(3, -1, 3); scene.add(pL3);

    // ── MATERIALS ──
    const mGun   = new THREE.MeshPhysicalMaterial({ color: 0x1c2535, metalness: .95, roughness: .08, clearcoat: .9 });
    const mSteel = new THREE.MeshPhysicalMaterial({ color: 0x0e1520, metalness: .98, roughness: .04, clearcoat: 1  });
    const mPlate = new THREE.MeshPhysicalMaterial({ color: 0x0a1428, metalness: .85, roughness: .12 });
    const mCyan  = new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: new THREE.Color(0x00d4ff), emissiveIntensity: 4, transparent: true, opacity: .95 });
    const mBlue  = new THREE.MeshStandardMaterial({ color: 0x4285f4, emissive: new THREE.Color(0x4285f4), emissiveIntensity: 3, transparent: true, opacity: .95 });
    const mPurp  = new THREE.MeshStandardMaterial({ color: 0xa78bfa, emissive: new THREE.Color(0xa78bfa), emissiveIntensity: 2.5, transparent: true, opacity: .9  });
    const mAmber = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: new THREE.Color(0xf59e0b), emissiveIntensity: 2.5 });
    const mWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: new THREE.Color(0xffffff), emissiveIntensity: 5   });

    // ── ROBOT GROUP ──
    const robot = new THREE.Group();
    scene.add(robot);
    robot.position.y = -0.1;

    // helper
    const mesh = (geo, mat) => new THREE.Mesh(geo, mat);

    // ── PLATFORM ──
    const plat = new THREE.Group();
    robot.add(plat); plat.position.y = -2.65;

    plat.add(mesh(new THREE.CylinderGeometry(2.4, 2.15, .38, 32),
      new THREE.MeshPhysicalMaterial({ color: 0x070c18, metalness: .98, roughness: .04 })));
    const oBevel = mesh(new THREE.TorusGeometry(2.25, .08, 8, 64), mSteel);
    oBevel.rotation.x = Math.PI / 2; oBevel.position.y = .19; plat.add(oBevel);
    const oRing = mesh(new THREE.TorusGeometry(2.12, .06, 10, 64), mAmber);
    oRing.rotation.x = Math.PI / 2; oRing.position.y = .2; plat.add(oRing);

    for (let i = 0; i < 5; i++) {
      const r = mesh(new THREE.TorusGeometry(1.9 - i * .3, .018, 8, 64),
        new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: new THREE.Color(0x00d4ff), emissiveIntensity: 3.5 - i * .45, transparent: true, opacity: .9 - i * .12 }));
      r.rotation.x = Math.PI / 2; r.position.y = .42 + i * .014; plat.add(r);
    }
    const pTop = mesh(new THREE.CylinderGeometry(1.88, 1.88, .025, 32),
      new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: new THREE.Color(0x00d4ff), emissiveIntensity: .6, transparent: true, opacity: .15 }));
    pTop.position.y = .44; plat.add(pTop);

    for (let i = 0; i < 10; i++) {
      const p = mesh(new THREE.BoxGeometry(.28, .24, .14),
        new THREE.MeshPhysicalMaterial({ color: 0x0c1525, metalness: .92, roughness: .08 }));
      const a = (i / 10) * Math.PI * 2;
      p.position.set(Math.sin(a) * 2.22, 0, Math.cos(a) * 2.22);
      p.rotation.y = -a; plat.add(p);
    }
    for (let i = 0; i < 5; i++) {
      const l = mesh(new THREE.BoxGeometry(.36, .055, .04), mCyan.clone());
      const a = (i / 5) * Math.PI * 2 + .3;
      l.position.set(Math.sin(a) * 1.95, .06, Math.cos(a) * 1.95);
      l.rotation.y = -a; plat.add(l);
    }

    // ── TORSO ──
    robot.add(mesh(new THREE.CylinderGeometry(.72, .54, 1.4, 16), mGun));
    const chestPlate = mesh(new THREE.BoxGeometry(.72, .9, .06), mPlate);
    chestPlate.position.set(0, .08, .69); robot.add(chestPlate);
    const cLine = mesh(new THREE.BoxGeometry(.028, .7, .05), mBlue.clone());
    cLine.position.set(0, .08, .74); robot.add(cLine);

    for (let s of [-1, 1]) {
      const cp = mesh(new THREE.BoxGeometry(.26, .5, .06),
        new THREE.MeshPhysicalMaterial({ color: 0x0d1828, metalness: .88, roughness: .1 }));
      cp.position.set(s * .24, .12, .71); robot.add(cp);
      const pe = mesh(new THREE.BoxGeometry(.022, .42, .04), s === 1 ? mBlue.clone() : mPurp.clone());
      pe.position.set(s * .36, .12, .73); robot.add(pe);
    }

    // Core reactor
    const coreOut = mesh(new THREE.CylinderGeometry(.16, .16, .06, 6), mSteel);
    coreOut.rotation.y = Math.PI / 6; coreOut.position.set(0, .08, .73); robot.add(coreOut);
    const gem = mesh(new THREE.CylinderGeometry(.11, .11, .08, 6), mCyan.clone());
    gem.rotation.y = Math.PI / 6; gem.position.set(0, .08, .76); robot.add(gem);
    const coreInner = mesh(new THREE.SphereGeometry(.065, 12, 12), mCyan.clone());
    coreInner.position.set(0, .08, .78); robot.add(coreInner);

    const sRidge = mesh(new THREE.BoxGeometry(1.5, .065, .55), mSteel);
    sRidge.position.set(0, .74, 0); robot.add(sRidge);
    const wRing = mesh(new THREE.TorusGeometry(.62, .032, 8, 32), mSteel);
    wRing.rotation.x = Math.PI / 2; wRing.position.y = -1.28; robot.add(wRing);
    const lb = mesh(new THREE.CylinderGeometry(.48, .42, .5, 16), mGun);
    lb.position.y = -1.05; robot.add(lb);

    // ── NECK ──
    const nb = mesh(new THREE.CylinderGeometry(.22, .26, .12, 16), mSteel);
    nb.position.y = .78; robot.add(nb);
    const nm = mesh(new THREE.CylinderGeometry(.17, .2, .18, 16), mGun);
    nm.position.y = .94; robot.add(nm);
    const nt = mesh(new THREE.CylinderGeometry(.21, .17, .1, 16), mSteel);
    nt.position.y = 1.08; robot.add(nt);

    // ── HEAD ──
    const hG = new THREE.Group();
    hG.position.y = 1.52; robot.add(hG);

    hG.add(mesh(new THREE.BoxGeometry(1.06, .88, .9), mGun));
    const hTop = mesh(new THREE.CylinderGeometry(.5, .53, .24, 16), mGun);
    hTop.position.y = .52; hG.add(hTop);
    const hDome = mesh(new THREE.SphereGeometry(.52, 18, 12), mGun);
    hDome.scale.set(1, .62, 1); hDome.position.y = .62; hG.add(hDome);

    for (let s of [-1, 1]) {
      const hs = mesh(new THREE.BoxGeometry(.08, .72, .76), mPlate);
      hs.position.set(s * .56, .06, 0); hG.add(hs);
      const sg = mesh(new THREE.BoxGeometry(.04, .52, .04), s === 1 ? mBlue.clone() : mPurp.clone());
      sg.position.set(s * .62, .06, .24); hG.add(sg);
      const er = mesh(new THREE.TorusGeometry(.14, .045, 10, 20),
        new THREE.MeshStandardMaterial({ color: 0x4285f4, emissive: new THREE.Color(0x4285f4), emissiveIntensity: 2.8 }));
      er.position.set(s * .61, .08, 0); er.rotation.y = Math.PI / 2; hG.add(er);
      const ed = mesh(new THREE.CircleGeometry(.055, 12), mCyan.clone());
      ed.position.set(s * .68, .08, 0); ed.rotation.y = s * Math.PI / 2; hG.add(ed);
    }

    // Visor
    const vFrame = mesh(new THREE.BoxGeometry(.88, .44, .09), mSteel);
    vFrame.position.set(0, .1, .47); hG.add(vFrame);
    const vScreen = mesh(new THREE.BoxGeometry(.78, .34, .06),
      new THREE.MeshPhysicalMaterial({ color: 0x000508, metalness: .1, roughness: 0, transparent: true, opacity: .98 }));
    vScreen.position.set(0, .1, .51); hG.add(vScreen);

    // Eyes — sharp glowing slits
    for (let s of [-1, 1]) {
      const eb = mesh(new THREE.BoxGeometry(.26, .1, .06), mSteel);
      eb.position.set(s * .2, .14, .54); hG.add(eb);
      const eg = mesh(new THREE.BoxGeometry(.2, .06, .04), mCyan.clone());
      eg.position.set(s * .2, .14, .57); hG.add(eg);
      const ec = mesh(new THREE.BoxGeometry(.12, .04, .04), mWhite.clone());
      ec.position.set(s * .2, .14, .59); hG.add(ec);
    }

    // Mouth line
    const mouth = mesh(new THREE.BoxGeometry(.32, .022, .04), mBlue.clone());
    mouth.position.set(0, -.14, .54); hG.add(mouth);

    // Antenna
    const ant = mesh(new THREE.CylinderGeometry(.025, .03, .38, 8), mSteel);
    ant.position.set(.15, .92, 0); hG.add(ant);
    const antTip = mesh(new THREE.SphereGeometry(.048, 10, 10), mCyan.clone());
    antTip.position.set(.15, 1.13, 0); hG.add(antTip);

    // ── ARMS ──
    for (let s of [-1, 1]) {
      const aG = new THREE.Group();
      aG.position.set(s * .9, .32, 0); robot.add(aG);

      aG.add(mesh(new THREE.SphereGeometry(.26, 14, 12), mGun));
      const sCap = mesh(new THREE.CylinderGeometry(.28, .24, .14, 14), mPlate);
      sCap.position.y = .12; aG.add(sCap);

      const uA = mesh(new THREE.CylinderGeometry(.17, .15, .75, 12), mGun);
      uA.position.y = -.42; aG.add(uA);
      const uAP = mesh(new THREE.BoxGeometry(.2, .52, .08), mPlate);
      uAP.position.set(0, -.42, .15); aG.add(uAP);

      const elJ = mesh(new THREE.SphereGeometry(.17, 12, 12), mSteel);
      elJ.position.y = -.82; aG.add(elJ);
      const elR = mesh(new THREE.TorusGeometry(.16, .028, 8, 20), mBlue.clone());
      elR.position.y = -.82; aG.add(elR);

      const lA = mesh(new THREE.CylinderGeometry(.15, .12, .68, 12), mGun);
      lA.position.y = -1.2; aG.add(lA);

      const wr = mesh(new THREE.CylinderGeometry(.13, .13, .09, 12), mSteel);
      wr.position.y = -1.56; aG.add(wr);
      const wrR = mesh(new THREE.TorusGeometry(.13, .024, 8, 20), mBlue.clone());
      wrR.position.y = -1.56; aG.add(wrR);

      const palm = mesh(new THREE.BoxGeometry(.26, .22, .18), mGun);
      palm.position.y = -1.74; aG.add(palm);
      const pGlow = mesh(new THREE.SphereGeometry(.045, 10, 10), mCyan.clone());
      pGlow.position.set(0, -1.74, .14); aG.add(pGlow);

      for (let f = 0; f < 4; f++) {
        const fo = (f - 1.5) * .075;
        const f1 = mesh(new THREE.BoxGeometry(.055, .2, .055), mGun);
        f1.position.set(fo, -1.96, .02); aG.add(f1);
        const f2 = mesh(new THREE.BoxGeometry(.046, .14, .046), mSteel);
        f2.position.set(fo, -2.14, .02); aG.add(f2);
        const ft = mesh(new THREE.BoxGeometry(.03, .05, .03), f % 2 === 0 ? mCyan.clone() : mBlue.clone());
        ft.position.set(fo, -2.22, .02); aG.add(ft);
      }

      aG.rotation.z = s * .38;
      aG.rotation.x = -.18;
      aG.rotation.y = s * .1;
    }

    // ── SPARKLES ──
    const spkArr = [];
    const spkColors = [0x4285f4, 0xa78bfa, 0x00d4ff];
    for (let i = 0; i < 28; i++) {
      const col = spkColors[i % spkColors.length];
      const sm  = new THREE.MeshStandardMaterial({
        color: col, emissive: new THREE.Color(col),
        emissiveIntensity: 5, transparent: true, opacity: .8,
      });
      const geo = i % 4 === 0
        ? new THREE.BoxGeometry(.015, .08, .015)
        : new THREE.SphereGeometry(.022, 6, 6);
      const sp  = new THREE.Mesh(geo, sm);
      const a   = Math.random() * Math.PI * 2;
      const r   = 1.8 + Math.random() * 1.5;
      sp.position.set(Math.cos(a) * r, (Math.random() - .5) * 4, Math.sin(a) * r);
      sp.userData = { a, r, spd: .2 + Math.random() * .5, yO: Math.random() * Math.PI * 2, oy: sp.position.y };
      scene.add(sp); spkArr.push(sp);
    }

    // ── HOVER CONE ──
    const hvCone = new THREE.Mesh(
      new THREE.CylinderGeometry(.65, .18, .85, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: new THREE.Color(0x00d4ff), emissiveIntensity: 2, transparent: true, opacity: .1, side: THREE.DoubleSide })
    );
    hvCone.position.y = -1.4; robot.add(hvCone);

    // ── DRAG TO ROTATE ──
    let dragging = false, pX = 0, autoRot = true, manualY = .25;
    const onDown  = (e) => { dragging = true; pX = e.clientX; autoRot = false; };
    const onUp    = ()  => { dragging = false; setTimeout(() => autoRot = true, 2500); };
    const onMove2 = (e) => { if (dragging) { manualY += (e.clientX - pX) * .009; pX = e.clientX; } };
    renderer.domElement.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove2);

    // ── SCROLL ──
    let scroll = 0;
    const onScroll = () => { scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1); };
    window.addEventListener("scroll", onScroll);

    // ── ANIMATE ──
    let t = 0, animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += .016;

      robot.position.y = -.1 + Math.sin(t * .7) * .1;
      robot.rotation.y = autoRot
        ? manualY + t * .28 + scroll * Math.PI * 1.8
        : manualY + scroll * Math.PI * 1.8;
      robot.rotation.x = scroll * .22;

      hG.rotation.y = Math.sin(t * .38) * .15;
      hG.rotation.x = Math.sin(t * .26) * .05;

      mCyan.emissiveIntensity = 2.8 + Math.sin(t * 2.2) * .8;
      coreInner.scale.setScalar(1 + Math.sin(t * 2.2) * .12);
      antTip.material.emissiveIntensity = 2.5 + Math.sin(t * 3.5) * .8;

      plat.children.forEach((c, i) => {
        if (c.geometry?.type === "TorusGeometry")
          c.rotation.z += .006 * (i % 2 === 0 ? 1 : -1);
      });

      hvCone.material.opacity = .07 + Math.sin(t * 1.2) * .05;
      hvCone.scale.set(1 + Math.sin(t * 1.2) * .06, 1, 1 + Math.sin(t * 1.2) * .06);

      spkArr.forEach(sp => {
        sp.userData.a += sp.userData.spd * .013;
        sp.position.x  = Math.cos(sp.userData.a) * sp.userData.r;
        sp.position.z  = Math.sin(sp.userData.a) * sp.userData.r;
        sp.position.y  = sp.userData.oy + Math.sin(t * 1.1 + sp.userData.yO) * .42;
        sp.material.opacity = .25 + Math.sin(t * 1.6 + sp.userData.yO) * .5;
      });

      pL1.position.x = Math.sin(t * .42) * 3;
      pL1.position.z = Math.cos(t * .42) * 3 + 2;
      pL2.position.x = Math.cos(t * .3) * 2.5;
      pL2.position.z = Math.sin(t * .3) * 2.5;

      renderer.render(scene, camera);
    };
    animate();

    // ── RESIZE ──
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── CLEANUP ──
    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ cursor: "grab" }}
    />
  );
}