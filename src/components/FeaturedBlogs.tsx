import { Link } from 'react-router-dom';
import ImageTag from './ImageTag';

const FeaturedBlogs = () => {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <ImageTag
          src="/postOne.png"
          className="rounded-3xl object-cover img-shadow"
          width={'895'}
        />
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link to="/blogs?cat=memory-loop" className="text-orange-600 lg:text-lg">
            Memory Loop
          </Link>
          <span className="text-gray-500">1 day ago</span>
        </div>
        <Link to="/blog" className="text-xl lg:text-3xl font-semibold lg:font-bold opacity-80">
          Let It Rip: The Beyblade Days
        </Link>
      </div>
      {/* Sub blogs */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <ImageTag
              src="/postTwo.png"
              className="rounded-3xl object-cover img-shadow w-full h-full"
              width={'298'}
            />
          </div>
          <div className="w-2/3">
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link to="/blogs?cat=lost-hours" className="text-orange-600">
                Lost Hours
              </Link>
              <span className="text-gray-500 text-sm">1 day ago</span>
            </div>
            <Link
              to="/blog"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl opacity-80"
            >
              Mac & Mayhem
            </Link>
          </div>
        </div>
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <ImageTag
              src="/logo.png"
              className="rounded-3xl object-cover img-shadow w-full h-full"
              width={'298'}
            />
          </div>
          <div className="w-2/3">
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">03.</h1>
              <Link to="/blogs?cat=future-rust" className="text-orange-600">
                Future Rust
              </Link>
              <span className="text-gray-500 text-sm">2 day ago</span>
            </div>
            <Link
              to="/blog"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl opacity-80"
            >
              One Space for Mindful Moments & Timeless Memories
            </Link>
          </div>
        </div>
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <ImageTag
              src="/postFour.png"
              className="rounded-3xl object-cover img-shadow w-full h-full"
              width={'298'}
            />
          </div>
          <div className="w-2/3">
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">04.</h1>
              <Link to="/blogs?cat=echo-chambers" className="text-orange-600">
                Echo Chambers
              </Link>
              <span className="text-gray-500 text-sm">1 day ago</span>
            </div>
            <Link
              to="/blog"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl opacity-80"
            >
              Berlin Rhythms: Days of Wonder, Nights Without End
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
