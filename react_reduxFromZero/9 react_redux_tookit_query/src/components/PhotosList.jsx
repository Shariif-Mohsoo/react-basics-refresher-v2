import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import PhotosListItem from "./PhotosListIem";
import Skeleton from "./Skeleton";
import Button from "./Button";

const PhotosList = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  // console.log(data, error, isLoading);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
    // console.log(addPhotoResults);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error fetching photos... {error.message}</div>;
  } else {
    content = data.map((photo) => (
      <PhotosListItem key={photo.id} photo={photo} />
    ));
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button
          loading={addPhotoResults.isLoading}
          onClick={handleAddPhoto}
          className="cursor-pointer"
        >
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-wrap flex-row justify-center">
        {content}
      </div>
    </div>
  );
};

export default PhotosList;
