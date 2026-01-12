import React, { useEffect, useState, useCallback } from "react";
import "./Accueil.css";
import axios from 'axios';
import LikeCommentaire from "./LikeCommentaire";

const Accueil = () => {
    const [projets, setProjet] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fecthProjets =
            async () => {
                setLoading(true);

                const token = localStorage.getItem("token");

                try {
                    console.log('loading =', loading)
                    const res = await axios.get(`http://localhost:5000/api/gesAccueil?page=${page}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                    if (res.data.length === 0) {
                        setHasMore(false);
                    } else {
                        setProjet((prev) => [...prev, ...res.data]);
                        setPage((prev) => prev + 1);
                    }
                } catch (err) {
                    console.error('erreur lors du chargement des projets : ', err);
                }
                setLoading(false);
            };
        fecthProjets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    // callback evite du scroll evite de recreer la fonction a chaque render
    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeigth, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeigth - 5 && hasMore && !loading

        ) {
            setPage((prev) => prev + 1);
        }

    }, [hasMore, loading])
    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, [handleScroll])// depend de l handlescroll(usecallback garde sa reference stable)

    return (
        <div className='accueil-container'>
            {projets.map((projets, index) => (
                <div key={index} className="card">
                    <div className='card-header'>
                        <img src={`http://localhost:5000/UPLOAD/${projets.photo_profil}`} alt="profil" className="profil-pic" />
                        <div>
                            <h4>{projets.username} </h4>
                            <small> {new Date(projets.date_publication).toLocaleDateString()} </small>
                        </div>
                    </div>
                    <div className="post-body">
                        <h3>{projets.titre}</h3>
                        <p className='category'>{projets.categorie} </p>
                        <p className='description'>{projets.description} </p>
                        {projets.fichier && <img src={`http://localhost:5000/uploads/${projets.fichier}`} alt="projet" className='projet-image' />}
                    </div>
                    {/*like et commentaire*/}
                    <LikeCommentaire projetId={projets.id} />
                </div>

            ))

            }
            {/* skeleton loader pendant chargement*/}
            {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                    <div className="skeleton" key={index}>
                        <div className="card-header">
                            <div className="skeleton-img"></div>
                            <div className="skeleton-text short"></div>

                        </div>
                        <div className="skeleton-text long"></div>
                        <div className="skeleton-text medium"></div>
                        <div className="skeleton-img-large"></div>

                    </div>
                ))}

        </div>

    );
};

export default Accueil;