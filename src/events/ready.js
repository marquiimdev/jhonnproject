module.exports = {
  name: 'ready',
  once: true,
  execute() {
    var activevar = ["tim maia e lembrando dela.", "legião urbana e tendo uma crise existencial.", "lofi e programando.", "tim maia e sentindo falta dela."];
    var activities = activevar[Math.floor(Math.random()*activevar.length)];
    
    console.log('O pai está online.')
  }
}
