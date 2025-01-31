import PostForm from '../../components/PostForm/PostForm';
import PostCard from '../../components/PostCard/PostCard';
import SidebarRight from '../../components/SidebarRight/SidebarRight';
import { getPostsBefore, clearStatus } from '../../redux/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Login from '../auth/login';

export default function Home() {
    const dispatch = useDispatch();
    const { posts, loading, hasMore } = useSelector((state) => state.post);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const observer = useRef();
    const loadingRef = useRef(false);

    const lastPostElementRef = useCallback(node => {
        if (loading || !hasMore || loadingRef.current) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadingRef.current = true;
                console.log("Observer déclenché, chargement de posts supplémentaires.");
                dispatch(getPostsBefore()).then(() => {
                    loadingRef.current = false;
                });
            }
        }, {
            rootMargin: '100px', // Une marge pour déclencher plus tôt
            threshold: 0.1
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore, dispatch]);

    useEffect(() => {
        // Charger seulement s'il n'y a aucun post
        if (posts.length === 0) {
            dispatch(getPostsBefore());
        }
        return () => observer.current?.disconnect();
    }, [dispatch, posts.length]);

    useEffect(() => {
        return () => {
            dispatch(clearStatus());
        };
    }, [dispatch]);

    return (
        <>
        {isAuthenticated ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <div className="col-span-2">
                    <>
                        <PostForm />
                        <div className="divide-y divide-gray-200">
                            {posts.map((post, index) => (
                                <div

                                    key={`${post._id}-${post.createdAt}`}
                                    ref={index === posts.length - 1 ? lastPostElementRef : null}
                                >
                                    <PostCard post={post} />
                                </div>
                            ))}
                            {loading && (
                                <div className="p-4 text-center text-gray-500">
                                    Chargement...
                                </div>
                            )}
                        </div>
                    </>
                </div>
                {isAuthenticated && <SidebarRight />}
            </div>
        ) : (
            <Login />
        )}

        </>

    );
}