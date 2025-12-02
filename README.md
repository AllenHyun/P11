# Práctica Semana 11 IG

## Autora

María Cabrera Vérgez

# Añadir vídeo y link a codesandbox

## Tareas a realizar

La tarea consiste en proponer un prototipo three.js de temática libre que integre la biblioteca tween.js y/o el motor de física ammo.js. La entrega se llevará a cabo a través del campus virtual, debiendo incluir enlace githubm incluyendo una descripción en el README del trabajo realizado, así como un vídeo, preferentemente de no más de un minuto de duración, con un extracto seleccionado de la animación desarrollada y que identifique la autoría. Resolución recomendada: 1920 × 1080 (Full HD, 16:9)

## Índice de contenidos

- [Init](#init)

## Init

En la función init(), se jugará con la luz para iluminar la diferentes figuras que se van a ir formando. Para ello, se crearán 4 luces diferentes. La primera es una luz direccional que tendrá un color azulado pálido. Se normaliza su posición y se añade a la escena.

``` javascript
    const dirLight = new THREE.DirectionalLight(0x9090aa);
    dirLight.position.set(-300, -300, -500).normalize();
    scene.add(dirLight);
```

## Webgrafía

https://sbcode.net/threejs/tween/
https://www.youtube.com/watch?v=vIbrIORmtswhttps://discourse.threejs.org/t/tween-js-how-to-do-a-yoyo-animation/23073



