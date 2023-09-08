import { Component, OnInit } from '@angular/core';
import { Clienti } from 'src/app/models/clienti.interface';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {

  showAggiungiForm: boolean = false;

  clienti: Clienti[] = [];
  nuovoCliente: Clienti = {
    "idCliente":"",
     "ragioneSociale": "",
  "partitaIva":"",
  "emailCliente":"",
  "pec":"",
  "telefonoCliente":null!,
  "tipoCliente":"",
  "nomeContatto":"",
  "cognomeContatto":"",
  "emailContatto":"",
  "telefonoContatto":"",
  "viaUno":"",
  "civicoUno":null!,
  "localitaUno":"",
  "capUno":"",
  "comuneUno":"",
  "viaDue":"",
  "civicoDue":null!,
  "localitaDue":"",
  "capDue":"",
  "comuneDue":"",
  "dataInserimento":"",
  "ultimoContatto":"",
  "fatturatoAnnuale":null!,
"fatture":"",
"indirizzoSedeLegale": undefined,
"civico":""
};

  constructor(private provinciaService: AppService) {}

  ngOnInit(): void {
    this.loadClienti();
  }

  loadClienti() {
    this.provinciaService.getClienti(0, 'ragioneSociale').subscribe(
      (clienti: Clienti[]) => {
        console.log(clienti);
        this.clienti = clienti;
      },
      (error) => {
        console.error('Error fetching province:', error);
      }
    );
  }


  creaNuovoCliente() {
    this.provinciaService.creaCliente(this.nuovoCliente).subscribe(
      (clienteCreato: Clienti) => {
        console.log('Cliente creato:', clienteCreato);
        // Resetta i campi del nuovo cliente
        this.nuovoCliente = {
          "idCliente":"",
           "ragioneSociale": "",
        "partitaIva":"",
        "emailCliente":"",
        "pec":"",
        "telefonoCliente":null!,
        "tipoCliente":"",
        "nomeContatto":"",
        "cognomeContatto":"",
        "emailContatto":"",
        "telefonoContatto":"",
        "viaUno":"",
        "civicoUno":null!,
        "localitaUno":"",
        "capUno":"",
        "comuneUno":"",
        "viaDue":"",
        "civicoDue":null!,
        "localitaDue":"",
        "capDue":"",
        "comuneDue":"",
        "dataInserimento":"",
        "ultimoContatto":"",
        "fatturatoAnnuale":null!,
      "fatture":"",
      "indirizzoSedeLegale": undefined,
      "civico":""
      };
        // Ricarica la lista dei clienti dopo la creazione
        this.loadClienti();
      },
      (error) => {
        console.error('Errore durante la creazione del cliente:', error);
      }
    );
  }
}








