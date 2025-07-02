import React from "react";
import BackButton from "../../../components/Generic/BackButton/BackButton";

const CookieEST = () => {
  return (
    <div>
      {/* <h1>Küpsiste kasutamise poliitika</h1> */}
      <BackButton pageTitle={"Küpsiste kasutamise poliitika"} />
      <p>
        Veebisait „wow!dropbox“ (
        <a href="https://www.wowdropbox.eu" target="_blank">
          https://www.wowdropbox.eu
        </a>
        ), mis kuulub Whalepartners OÜ-le (registrikood 14674044, KMKR
        EE102141508, aadress: Tornimäe 5, Tallinn 10145, Eesti), kasutab
        küpsiseid ja sarnaseid tehnoloogiaid. Käesolev poliitika kirjeldab,
        milliseid küpsiseid meie veebisaidil kasutatakse, kuidas ja miks me neid
        kasutame ning kuidas saate neid hallata. Dokument on koostatud vastavalt
        Euroopa Liidu üldandmekaitsemäärusele (GDPR) ja 2002/58/EÜ direktiivile
        (ePrivacy), mis kehtivad Euroopa Liidu territooriumil. Veebisait on
        kättesaadav ainult EL-i kasutajatele ning küpsiste kasutamine on
        nimetatud Euroopa õigusaktidega reguleeritud.
      </p>

      <h2>Mis on küpsised?</h2>
      <p>
        Küpsised on väikesed tekstifailid, mis salvestatakse teie seadmesse
        (arvutisse, nutitelefoni või tahvelarvutisse) veebilehe külastamisel.
        Need sisaldavad infot teie tegevuste ja seadete kohta saidil. Näiteks
        võivad küpsised salvestada, milliseid tooteid olete lisanud ostukorvi,
        valitud liidese keelt või muid eelistusi. Need andmed aitavad parandada
        saidi tööd, muuta selle kiiremaks ning pakkuda kasutajale paremat ja
        isikupärasemat kogemust.
      </p>

      <h2>Milliseid küpsiseid me kasutame</h2>
      <p>
        Me kasutame küpsiseid veebisaidi töö tagamiseks ja kasutajakogemuse
        parandamiseks. Järgnevalt on toodud küpsiste kategooriad, mida meie
        veebisaidil kasutatakse:
      </p>

      <ul>
        <li>
          <strong>Tehnilised (vajalikud) küpsised:</strong> need küpsised on
          vajalikud saidi nõuetekohaseks toimimiseks. Näiteks võimaldavad need
          säilitada tooted ostukorvis ostu sooritamise ajal, tagada kasutaja
          autentimise ja sessioonide säilitamise. Ilma nende küpsisteta võivad
          mõned saidi funktsioonid olla kättesaamatud.
        </li>
        <li>
          <strong>Funktsionaalsed küpsised:</strong> need küpsised võimaldavad
          salvestada teie valitud saidi seadeid (näiteks liidese keel) ja
          pakuvad täiendavat mugavust. Tänu nendele küpsistele mäletab sait teie
          eelistusi ning tagab sujuvama sirvimiskogemuse korduvkülastustel.
        </li>
        <li>
          <strong>Analüütilised (tööefektiivsed) küpsised:</strong> meie saidil
          neid küpsiseid ei kasutata, kuna me ei rakenda
          veebianalüütikasüsteeme.
        </li>
        <li>
          <strong>Reklaami- (turundus-)küpsised:</strong> meie saidil ei
          kasutata reklaamiküpsiseid ja me ei kuva isikupärastatud reklaame, mis
          põhinevad saidi külastustel.
        </li>
      </ul>

      <h2>Küpsiste haldamine</h2>
      <p>
        Saate igal ajal muuta küpsiste seadeid oma brauseris või seadmes. Enamik
        brausereid võimaldab blokeerida küpsiste salvestamist, kustutada
        üksikuid küpsiseid või teavitada teid enne nende salvestamist.
      </p>
      <p>
        Üksikasjalikud juhised küpsiste seadete haldamiseks leiate oma brauseri
        kasutusjuhendist või abikeskusest.
      </p>
      <p>
        Kui lülitate vajalikud küpsised välja või kustutate need, võivad mõned
        veebisaidi osad olla kättesaamatud või mitte töötada korralikult
        (näiteks peate ostukorvi tooted uuesti lisama). Kui lülitate
        funktsionaalsed küpsised välja, lõpetab sait teie isiklike seadete
        meeldejätmise ja mõned mugavused (näiteks salvestatud liidese keel)
        võivad olla kättesaamatud.
      </p>

      <h2>Käesoleva poliitika muudatused</h2>
      <p>
        Käesolevat küpsiste kasutamise poliitikat võidakse aeg-ajalt uuendada,
        et kajastada veebisaidi funktsionaalsuse või seadusandluse muudatusi.
        Poliitika ajakohane versioon on alati kättesaadav meie veebisaidil.
        Soovitame aeg-ajalt seda lehte üle vaadata. Kui muudatused on olulised,
        teavitame kasutajaid neist meie veebisaidil.
      </p>

      <h2>Kontaktandmed</h2>
      <p>
        Küsimuste korral, mis on seotud küpsiste kasutamisega saidil
        „wow!dropbox“, võite pöörduda e-posti aadressil{" "}
        <a href="mailto:info@wowdropbox.eu">info@wowdropbox.eu</a>.
      </p>
      <p>
        <strong>Veebisaidi haldaja:</strong> Whalepartners OÜ (registrikood
        14674044, KMKR EE102141508)
      </p>
      <p>
        <strong>Aadress:</strong> Tornimäe 5, Tallinn 10145, Eesti
      </p>
      <p>
        <strong>E-posti aadress:</strong>{" "}
        <a href="mailto:info@wowdropbox.eu">info@wowdropbox.eu</a>
      </p>
    </div>
  );
};

export default CookieEST;
