import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import ImgUpload from '../components/ImgUpload';
import { useCreateBlog } from '../hooks/useCreateBlog';
import { useAuthState } from '../hooks/useAuthState';

interface CoverImage {
  filePath: string;
}

const CreateBlog = () => {
  const { isLoaded, isUnauthenticated, user } = useAuthState();
  const [content, setContent] = useState('');
  const [cover, setCover] = useState<CoverImage | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const mutation = useCreateBlog();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (isUnauthenticated) {
    return <div>Please login.</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) {
      console.error('User ID not available');
      return;
    }
    const formData = new FormData(e.currentTarget);
    const newBlogPostData = {
      title: formData.get('title') ? String(formData.get('title')) : null,
      category: formData.get('category') ? String(formData.get('category')) : null,
      desc: formData.get('desc') ? String(formData.get('desc')) : null,
      content: content,
      clerkUserId: user.id,
      coverImg: cover?.filePath || '',
    };
    mutation.mutate(newBlogPostData);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 mb-6">
      <h1 className="text-2xl font-medium opacity-65">Write a blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <ImgUpload
          type="image"
          setProgress={setProgress}
          setData={(data: string) => setCover({ filePath: data })}
        >
          <button type="button" className="bg-jix w-max">
            Add a picture
          </button>
        </ImgUpload>
        <input
          className="text-4xl h-15  font-semibold bg-transparent outline-none opacity-80"
          type="text"
          placeholder="Write a header text..."
          name="title"
        />
        <div className="flex items-center gap-3">
          <label className="text-sm ">Choose category</label>
          <select className="p-2 rounded bg-white shadow" id="" name="category">
            <option value="time-capsules">Time Capsules</option>
            <option value="travel">Travel</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="lost-hours">Lost Hours</option>
          </select>
        </div>
        <textarea
          name="desc"
          placeholder="Tell about this"
          className="p-3 rounded bg-white shadow outline-none"
        />
        <div className="flex">
          <MDEditor
            value={content}
            onChange={(value) => setContent(value || '')}
            preview="edit"
            hideToolbar={false}
            data-color-mode="light"
            className="flex-1 rounded bg-white shadow"
          />
        </div>
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-jix w-64 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? 'Creating...' : 'Create Blog'}
        </button>
        {'progress:' + progress}
        {mutation.isError && (
          <div className="text-red-500">An error occurred: {mutation.error.message}</div>
        )}
      </form>
    </div>
  );
};

export default CreateBlog;
