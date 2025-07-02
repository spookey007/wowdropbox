import BackButton from "../../../components/Generic/BackButton/BackButton";

const PFEST = () => {
  return (
    <div>
      <BackButton pageTitle={"Kuidas WOW!Dropbox Tagab Õigluse"} />
      {/* <h1>Kuidas WOW!Dropbox Tagab Õigluse</h1> */}

      <h2>Tõestatavalt Õiglane Süsteem</h2>
      <p>
        Selleks, et iga Dropboxi avamine oleks nii{" "}
        <strong>õiglane kui ka läbipaistev</strong>, kasutame{" "}
        <strong>tõestatavalt õiglast süsteemi</strong>. See süsteem loob
        juhusliku tulemuse, kasutades kolme sõltumatut komponenti, võimaldades
        sul <strong>iga tulemust ise kontrollida</strong>.
      </p>
      <p>
        See on sarnane füüsilise mänguga, kus kasutatakse täringuid või kaarte —
        sa tead, et täringul on kuus külge või kaardipakis on 52 kaarti.
        Online'is järgime sama loogikat, et tagada iga tulemuse täielik
        juhuslikkus ja usaldusväärsus.
      </p>

      <h2>Kuidas Tulemused Määratakse</h2>
      <p>Iga avamise tulemus põhineb kolmel võtmeteguril:</p>
      <ul>
        <li>
          <strong>Sinu Käik:</strong> Unikaalne kood, mis luuakse sinu sisendi
          põhjal. Sa saad seda koodi muuta ja võrrelda teiste mängijate
          koodidega.
        </li>
        <li>
          <strong>Meie Käik:</strong> Peidetud kood, mis avalikustatakse alles
          pärast tulemuse näitamist.
        </li>
        <li>
          <strong>Mängude Arv:</strong> Mängude arv, mida oled mänginud,
          suureneb iga korraga.
        </li>
      </ul>
      <p>
        Need kolm elementi kombineeritakse, et genereerida number vahemikus 0
        kuni 100 000 000. See number määrab, millise eseme sa saad.
      </p>
      <p>Süsteem kasutab iga tulemuse arvutamiseks järgmisi seemneid:</p>
      <ul>
        <li>
          <strong>Kliendi Seeme:</strong> Kasutaja määratud väärtus, mida saad
          igal ajal vaadata ja muuta.
        </li>
        <li>
          <strong>Serveri Seeme:</strong> Turvaline, krüpteeritud väärtus, mille
          genereerime meie. Enne mängu näed selle räsi; pärast mängu
          avalikustatakse algne seeme, et saaksid tulemuse õiglust kontrollida.
        </li>
        <li>
          <strong>Mängude Arv:</strong> Tagab iga mängu unikaalsuse, isegi kui
          seemed on samad.
        </li>
      </ul>
      <p>
        Tänu sellele struktuurile on iga tulemus mitte ainult juhuslik, vaid ka
        kontrollitav. Allpool on näidiskood, mida saad kasutada eelmise viske
        kontrollimiseks:
      </p>
    </div>
  );
};

export default PFEST;
