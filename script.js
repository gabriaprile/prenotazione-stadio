document.addEventListener('DOMContentLoaded', () => {
  const sectors = [
      { id: 'tribuna', className: 'tribuna', seats: 40 },
      { id: 'distinti', className: 'distinti', seats: 40 },
      { id: 'curva-nord', className: 'curva-nord', seats: 18 },
      { id: 'curva-sud', className: 'curva-sud', seats: 18 }
  ];

  // Prezzi per ciascun settore
  const prices = {
      'tribuna': 100,
      'distinti': 75,
      'curva-nord': 50,
      'curva-sud': 40
  };

  const infoBox = document.getElementById('seat-details');
  const prenotaBtn = document.getElementById('prenota-btn');
  let selectedSeat = null;
  let selectedSeatElement = null;

  // Recupera lo stato dei posti prenotati dal localStorage
  const bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];

  sectors.forEach(sector => {
      const sectorDiv = document.getElementById(sector.id);
      for (let i = 1; i <= sector.seats; i++) {
          const seat = document.createElement('div');
          seat.classList.add('seat', sector.className);
          seat.dataset.sector = sector.className;
          seat.dataset.seatNumber = i;

          // Imposta il posto come prenotato se è salvato in localStorage
          if (bookedSeats.includes(`${sector.className}-${i}`)) {
              seat.classList.add('booked');
              seat.style.backgroundColor = 'black';
              seat.classList.remove('selected');
          }

          // Gestore di click per selezionare il posto
          seat.addEventListener('click', () => {
              if (seat.classList.contains('booked')) {
                  alert("Questo posto è già prenotato.");
                  return;
              }

              document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
              seat.classList.add('selected');
              selectedSeat = `${sector.className.toUpperCase()}, Posto: ${i}`;
              selectedSeatElement = seat;

              // Mostra il prezzo corrispondente nel messaggio
              const price = prices[sector.className];
              infoBox.innerText = `Settore: ${sector.className.toUpperCase()}, Posto: ${i}, Prezzo: €${price}`;
              prenotaBtn.style.display = 'inline-block';
          });
          sectorDiv.appendChild(seat);
      }
  });

  // Gestisci il click sul pulsante "Prenota"
  prenotaBtn.addEventListener('click', () => {
      if (selectedSeat) {
          let nome, cognome, telefono;

          // Prompt per il nome con controllo e ripetizione se non valido
          while (true) {
              nome = prompt("Inserisci il tuo nome:");
              if (nome === null) {
                  alert("Prenotazione annullata.");
                  return;
              }
              if (/^[A-Za-z\s]+$/.test(nome)) break;
              alert("Errore: Nome non valido. Inserisci solo lettere.");
          }

          // Prompt per il cognome con controllo e ripetizione se non valido
          while (true) {
              cognome = prompt("Inserisci il tuo cognome:");
              if (cognome === null) {
                  alert("Prenotazione annullata.");
                  return;
              }
              if (/^[A-Za-z\s]+$/.test(cognome)) break;
              alert("Errore: Cognome non valido. Inserisci solo lettere.");
          }

          // Prompt per il telefono con controllo e ripetizione se non valido
          while (true) {
              telefono = prompt("Inserisci il tuo numero di telefono:");
              if (telefono === null) {
                  alert("Prenotazione annullata.");
                  return;
              }
              if (/^\d{10}$/.test(telefono)) break;
              alert("Errore: Numero di telefono non valido. Inserisci esattamente 10 cifre.");
          }

          const email = prompt("Inserisci il tuo indirizzo email:");
          if (email === null) {
              alert("Prenotazione annullata.");
              return;
          }

          // Conferma la prenotazione se tutti i campi sono validi
          selectedSeatElement.classList.add('booked');
          selectedSeatElement.classList.remove('selected');
          selectedSeatElement.style.backgroundColor = 'black';

          // Aggiungi il posto prenotato al localStorage
          const seatId = `${selectedSeatElement.dataset.sector}-${selectedSeatElement.dataset.seatNumber}`;
          bookedSeats.push(seatId);
          localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));

          alert(`Prenotazione confermata per:\nNome: ${nome} ${cognome}\nTelefono: ${telefono}\nEmail: ${email}\n${selectedSeat}`);

          // Simulazione invio email
          console.log(`Email inviata a ${email}: Prenotazione ricevuta. Dettagli: ${selectedSeat}`);
      }
  });
});


