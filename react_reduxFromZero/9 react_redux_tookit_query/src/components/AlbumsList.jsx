import {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  // useRemoveAlbumMutation,
} from "../store/apis/albumsApi";
import Skeleton from "./Skeleton";
import Button from "./Button";
// import ExpandablePanel from "./ExpandablePanel";
import AlbumsListItem from "./AlbumsListItem";

const AlbumsList = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  // console.log(data, error, isFetching);
  const [addAlbum, results] = useAddAlbumMutation();

  // const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  // const handleRemoveAlbum = () => {
  //   removeAlbum();
  // };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>Error Loading Albums. {error.message}</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button
          onClick={handleAddAlbum}
          loading={results.isLoading}
          className="cursor-pointer"
        >
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
