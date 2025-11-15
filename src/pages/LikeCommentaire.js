// les likes et les commentaires
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaRegThumbsUp, FaCommentAlt } from 'react-icons/fa';
import './LikeCommentaire.css'


export default function LikeCommentSection({ projetId, token }) {
    const [likesCount, setLikesCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState('');
    // chager les likes et commentaires

    const fetchInteraction = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://localhost:5000/api/projets/${projetId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLikesCount(res.data.likes);
            setHasLiked(res.data.hasLiked);
            setComments(res.data.comments);
        }
        catch (err) {
            console.error('erreur fetch interaction:', err)
        }
    }, [projetId]);



    const handleLike = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `http://localhost:5000/api/projets/${projetId}/like`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setHasLiked(res.data.hasLiked);
            fetchInteraction();
        } catch (err) {
            console.error('erreur like:', err)
        }
    }


    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token')
        if (newComment.trim() === '') return;
        try {
            await axios.post(`http://localhost:5000/api/projets/${projetId}/comment`,
                { content: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setNewComment('');
            fetchInteraction();
        } catch (err) {
            console.error('erreur ajout commnetaire:', err)
        }

    };
    useEffect(() => {
        fetchInteraction()
    }, [fetchInteraction]);

    return (
        <div className='like-comment-section'>
            <div className='actions'>
                <button className={`like-btn ${hasLiked ? 'liked' : ''}`} onClick={handleLike}>
                    {hasLiked ? <FaThumbsUp /> : <FaRegThumbsUp />} {likesCount}</button>

                <button className='comment-btn' onClick={() => setShowComments(!showComments)}>
                    <FaCommentAlt /> commenter
                </button>


            </div>
            {showComments && (
                <div className='comments-area'>
                    <div className='exesting-comments'>
                        {comments.map((c, idx) => (
                            <div className='comment' key={idx}>
                                <strong> {c.nom_utilisateur} : </strong>

                                <p>{c.content}</p>
                                <smail> {new Date(comments.data_creation).toLocaleString()} </smail>
                            </div>
                        ))}

                    </div>
                    <div className='add-comment'>
                        <form onSubmit={handleCommentSubmit}>
                            <input
                                type='text'
                                placeholder='ajouter un commentaire...'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}

                            />
                            <button type="submit" > Envoyer </button>
                        </form>
                    </div>
                </div>
            )}

        </div >
    )



}

