import { useMemo } from "react"
import { Link, useLoaderData } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { thunkCollectionAlbums } from "../../redux/collection"
import "./UserProfile.css"
import { useEffect } from "react"


function Collection() {
  const currentUser = useSelector(state => state.session.user);
  const albumCountObj = useSelector(state => state.collection);
  const albumCountArr = Object.values(albumCountObj);
  const albumsInCollectionObj = useSelector(state => state.collection);
  const albumsInCollection = Object.values(albumsInCollectionObj);
  const albumsInOwnCollection = albumsInCollection.filter(collection => collection.user_id === currentUser.id);
  const albums = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkCollectionAlbums())
  }, [dispatch]);

  const albumArtMapping = useMemo(() => {
    return albums.reduce((acc, album) => {
      acc[album.id] = album.album_art[0]?.album_art;
      return acc;
    }, {});
  }, [albums]);

  if (!currentUser) return null

  return albumsInOwnCollection ? (
    <div id="container-album-listing-wishlist">
      {albumsInOwnCollection?.map(album => {
        if (!album || !album.id) return null; // fixes ghost album issue
        const albumCount = albumCountArr.find(countAlbum => countAlbum.id === album.id)?.count || 0;
        const albumArtUrl = albumArtMapping[album.id];

        return (
          <Link
            to={`/albums/${album.id}`}
            key={album.id}
            id="container-album-wishlist"
          >
            <img
              src={albumArtUrl}
              style={{ width: "220px", aspectRatio: "1/1" }}
              alt="album-cover-image"
            />
            <span style={{ paddingTop: "10px" }}>{album.name}</span>
            <span style={{ fontSize: "0.75rem" }}>by {album.user_username}</span>
            {albumCount === 1
              ? <span style={{ marginTop: "auto", fontSize: "0.75rem" }}>appears in {albumCount} collection</span>
              : <span style={{ marginTop: "auto", fontSize: "0.75rem" }}>appears in {albumCount} collections</span>
            }
          </Link>
        )
      })}
    </div>

  ) : (

    <div style={{ minHeight: "800px" }}></div >
  );
}


export default Collection
