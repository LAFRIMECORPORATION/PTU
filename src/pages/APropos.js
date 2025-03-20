import React from "react";
import "./apropos.css";
import avatar from "./photo cv.JPG"
import avata from "./ENTREPRISE LAFRIME-Récupéré.jpg"

const APropos = () => {
    return (
        <div className="page">
            <h1 className="pp"> a propos de PROJET_TECH_UNIVERSITY</h1>
            <p>Bienvenue sur PROJET_TECH_UNIVERSITY.</p>
            <div class="grand1">
                <h3>DESCRIPTION</h3>
                <b>
                    <li> <span>projet_tech_university</span> est un site et apllcation web developpé par un etudiant de l
                        institut
                        universitaire des technologies IUT de douala developpé a la base pour son projet dut niveua2 et
                        license
                        niveau3 a pris de l empleur grace a sa determination et son envie de fouloir changer les choses et
                        rendre sa famille fiere de lui
                    </li>
                    <li> <span>projet_tech_university</span> est persuadé qu il sera hebergé d ici peu de temp
                        et changera le monde et va faire avancé l independance camerounaise prevu pour 2035.
                    </li>
                    <li> <span>projet_tech_university</span> compte sur vous et votre soutiens pour une independance proche
                        et meilleur
                        car il
                        crois que le cameroun en a des posibilité mais manque juste de comment faire valoir ces capacités
                        projet_tech_university un etudiant un projet pour un futur et une independace proche
                    </li> .

                </b>

                <h3> EQUIPE</h3>
                l equipe projet_tech_university est constitué comme suite
                <br />
                <b>
                    <img src={avatar} alt="avatar" height="200px" width="220px"
                    />
                    <li>LE CHEF ET CREATEUR DU PROJET le nomme <span>KAKTCHEU SIEWE NICO MERIME </span>commune appellé
                        <span> LAFRIME</span>,il a appelle son entreprise de developpemrnt LAFRIME COOPORATION5().
                        camerounais originaire
                        de l ouest cameroun est de la tribu bafang fils de siewe pascal et de tiako nina francoise
                    </li>
                    <li>LAFRIME COOPORATION remercie formellement l entreprise META car c est grace a l une de leur
                        technologies ( META IA) qu il c est inspiré et a recu beaucoup d aide de ce dernier</li>
                    <li> l equipe maintenace dont ()</li>
                </b>

            </div>

            <div class="grand1">
                <h3> OBJECTIFS </h3>
                <b> <span>projet_tech_university</span> a pour but principale de faire valoire les differents projets
                    universitaires dans l optique que ces dernier soient connus plus facile sur le web enfin de
                    trouverfacilement des investisseur et motivateur des chef d entreprise (par exemple un etudiant peut
                    publier a projet_tech_university un projet et sa interesse un chef d entreprise ce dernier va se mettre
                    en contact avec le dit etudiant et collaborer pour la finalisation et la mise en oeuvre sur pied du dit
                    projet)
                    <span>projet_tech_university</span> est present pour fulgarisé les differents projets des etudiant sur
                    le plan planetaire visible par tout le monde entier. <span>projet_tech_university</span> un etudiant un
                    projet pour un futur meilleur.
                </b>
            </div>
            <div className="tt" >
                <footer>

                    <b ><span>projet_tech_university </span> une invention de lafrimecooporation</b>
                    <br />
                    <i>from lafrimecooporation</i>
                </footer>
                <img src={avata} alt="avatar" height="500px" width="100%"
                />
            </div>

        </div >


    );
};

export default APropos;