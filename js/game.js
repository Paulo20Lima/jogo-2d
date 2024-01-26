document.addEventListener('DOMContentLoaded', (event) => {

    const robo1 = document.getElementById('robo1');
    const robo2 = document.getElementById('robo2');
    const robo1LifeElement = document.getElementById('robo1Life');
    const robo2LifeElement = document.getElementById('robo2Life');
    
    let collisions = 0;
    let robo1Life = 100;
    let robo2Life = 100;

    const keys = {};

    document.addEventListener('keydown', (e) => {
        keys[e.keyCode] = true;
        moveRobos();
        
    });

    document.addEventListener('keyup', (e) => {
        keys[e.keyCode] = false;
        moveRobos(); 
    });

    function moveRobos() {
        moveRobo(robo1, 37, 38, 39, 40); 
        moveRobo(robo2, 65, 87, 68, 83); 
        checkObstaculoCollision(robo1);
        checkObstaculoCollision(robo2);
    }

    setInterval(checkCollision, 100);

    function moveRobo(robo, left, up, right, down) {
        let top = parseInt(window.getComputedStyle(robo).getPropertyValue('top'));
        let leftPos = parseInt(window.getComputedStyle(robo).getPropertyValue('left'));
        const stepSize = 30;

        if (keys[left] && leftPos > 0) {
            robo.style.left = Math.max(leftPos - stepSize, 0) + "px";
        }
        if (keys[up] && top > 0) {
            robo.style.top = Math.max(top - stepSize, 0) + "px";
        }
        if (keys[right] && leftPos < 700) {
            robo.style.left = Math.min(leftPos + stepSize, 700) + "px";
        }
        if (keys[down] && top < 540) {
            robo.style.top = Math.min(top + stepSize, 540) + "px";
        }
    }

    function moveRobos() {
        moveRobo(robo1, 37, 38, 39, 40);
        moveRobo(robo2, 65, 87, 68, 83);
        checkObstaculoCollision(robo1);
        checkObstaculoCollision(robo2); // Verificar colisões com o obstáculo para ambos os robôs
      }
      
      function checkObstaculoCollision(robo) {
        const r1 = robo.getBoundingClientRect();
        const obstaculo = document.getElementById('obstaculo');
        const r2 = obstaculo.getBoundingClientRect();
      
        if (
          !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top)
        ) {
          // Colisão entre o robô e o obstáculo
      
          // Reverter o movimento do robô
          const stepSize = 30;
          const top = parseInt(window.getComputedStyle(robo).getPropertyValue('top'));
          const leftPos = parseInt(window.getComputedStyle(robo).getPropertyValue('left'));
      
          // Verificar a direção da colisão e reverter o movimento apenas na direção da colisão
          if (r1.right > r2.left && r1.left < r2.left) {
            // Colisão pela esquerda
            if (leftPos > 0) {
              robo.style.left = Math.max(leftPos - stepSize, 0) + 'px';
            }
          }
          
          if (r1.bottom > r2.top && r1.top < r2.top) {
            // Colisão por cima
            if (top > 0) {
              robo.style.top = Math.max(top - stepSize, 0) + 'px';
            }
          }
          
          if (r1.left < r2.right && r1.right > r2.right) {
            // Colisão pela direita
            if (leftPos < 700) {
              robo.style.left = Math.min(leftPos + stepSize, 700) + 'px';
            }
          }
          
          if (r1.top < r2.bottom && r1.bottom > r2.bottom) {
            // Colisão por baixo
            if (top < 540) {
              robo.style.top = Math.min(top + stepSize, 540) + 'px';
            }
          }
        }
      }
      
      
      
    function checkCollision() {
        const r1 = robo1.getBoundingClientRect();
        const r2 = robo2.getBoundingClientRect();

        if (!(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top)) {
            collisions++;

            const collisionDamage = Math.floor(Math.random() * 20); // Valor aleatório entre 0 e 20
            const collisionDamage2 = Math.floor(Math.random() * 20); 
            robo1Life -= collisionDamage;
            robo2Life -= collisionDamage2;

            robo1Life = Math.max(robo1Life, 0);
            robo2Life = Math.max(robo2Life, 0);

            robo1LifeElement.textContent = 'Vida: ' + robo1Life;
            robo2LifeElement.textContent = 'Vida: ' + robo2Life;

            if (collisions === 5) { // Verifique se houve 5 colisões
                alert('Game Over! ' + (robo1Life > robo2Life ? 'Robô 1' : 'Robô 2') + ' ganhou com ' +
                    (robo1Life > robo2Life ? robo1Life : robo2Life) + ' de vida!');
                location.reload();
            }
            else { 
                robo1.style.left = "-9px";
                robo1.style.top = "1px";
                robo2.style.left = "700px";
                robo2.style.top = "540px";
            }
        }
    }

});
