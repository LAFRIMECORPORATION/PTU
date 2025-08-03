// les likes et les commentaires
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaRegThumbsUp, FaCommentAlt } from 'react-icons/fa';
import './LikeCommentaire.css'


function LikeCommentaire({
    projetId, userId
}) {
    const [likesCount, setLikesCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState('');
    // chager les likes et commentaires
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://localhost:5000/api/projets/${projetId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLikesCount(res.data.likes);
            setHasLiked(res.data.hasLiked);
            setComments(res.data.comments);
        };
        fetchData();
    }, [projetId]);

    const toggleLike = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.post(
            `http://localhost:5000/api/projets/${projetId}/like`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikesCount(res.data.likes);
        setHasLiked(res.data.hasLiked);
    }


    const submitComment = async () => {
        const token = localStorage.getItem('token')
        if (newComment.trim() === '') return;
        const res = await axios.post(`http://localhost:5000/api/projets/${projetId}/comment`,
            { content: newComment },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(res.data.comments)
        setNewComment('');

    };

    return (
        <div className='like-comment-section'>
            <div className='actions'>
                <button className={`like-btn ${hasLiked ? 'liked' : ''}`} onClick={toggleLike}>
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
                                <strong> {c.nom_utilisateur} : </strong> {c.content}
                            </div>
                        ))}

                    </div>
                    <div className='add-comment'>
                        <input
                            type='text'
                            placeholder='ajouter un commentaire...'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={submitComment} > Envoyer </button>
                    </div>
                </div>
            )}

        </div >
    )



}

export default LikeCommentaire;