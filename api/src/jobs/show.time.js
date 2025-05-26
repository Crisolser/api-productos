const showTime = async () => {
  console.log("⏰ Cron job iniciado: showTime");

  // Ejecuta la primera vez al iniciar
  console.log("La hora actual es: "+new Date());

  // Ejecuta cada 5 horas (5 * 60 * 60 * 1000 milisegundos)
  setInterval(async () => {
    console.log("La hora actual es: "+new Date());
  }, 10 * 1000);
}

export default showTime