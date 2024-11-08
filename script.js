document.addEventListener('DOMContentLoaded', () => {
    const sectors = [
        { id: 'tribuna', className: 'tribuna', seats: 40 },
        { id: 'distinti', className: 'distinti', seats: 40 },
        { id: 'curva-nord', className: 'curva-nord', seats: 18 },
        { id: 'curva-sud', className: 'curva-sud', seats: 18 }
    ];

    const infoBox = document.getElementById('seat-details');
    const prenotaBtn = document.getElementById('prenota-btn');
    let selectedSeat = null;
    let selectedSeatElement = null;

    sectors.forEach(sector => {
        const sectorDiv = document.getElementById(sector.id);
        for (let i = 1; i <= sector.seats; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat', sector.className);
            seat.dataset.sector = sector.className;
            seat.dataset.seatNumber = i;

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
                infoBox.innerText = `Settore: ${sector.className.toUpperCase()}, Posto: ${i}`;
                prenotaBtn.style.display = 'inline-block';
            });
            sectorDiv.appendChild(seat);
        }
    });

    // Gestisci il click sul pulsante "Prenota"
    prenotaBtn.addEventListener('click', () => {
        if (selectedSeat) {
            const nome = prompt("Inserisci il tuo Nome:");
            const cognome = prompt ("Inserisci il tuo Cognome:");
            const telefono = prompt("Inserisci il tuo numero di telefono:");
            const email = prompt("Inserisci il tuo indirizzo email:");

            if (nome && cognome && telefono && email) {
                // Marcare il posto come prenotato
                selectedSeatElement.classList.add('booked');
                selectedSeatElement.classList.remove('selected');
                selectedSeatElement.style.backgroundColor = 'black';
                alert(`Prenotazione confermata per:\nNome: ${nome}\nTelefono: ${telefono}\nEmail: ${email}\n${selectedSeat}`);

                // Simulazione invio email
                console.log(`Email inviata a ${email}: Prenotazione ricevuta. Dettagli: ${selectedSeat}`);

                // Opzionalmente, per implementare l'invio effettivo di email lato server, 
                // potresti usare un backend con nodemailer o un servizio come EmailJS
            } else {
                alert("Prenotazione annullata. Tutti i campi sono obbligatori.");
            }
        }
    });
});
