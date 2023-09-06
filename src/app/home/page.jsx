"use client";
import axios from 'axios';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { useEffect, useState } from 'react';
import { StarIcon } from "@heroicons/react/24/solid";
import { useGlobalContext } from "@/app/Context/store";
import Card from '@/components/cards/card';
import { useRouter } from "next/navigation";


export const Home = () => {

    // const { books } = useGlobalContext();
    // console.log(books)
  
    const [books, setBooks] = useState([]);
    const [books2, setBooks2] = useState([]);
    
  
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`/api/books`);
        const data = response.data;
        setBooks(data.slice(6, 12));
        setBooks2(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    useEffect(() => {
      fetchBooks();
    }, []);

    const router = useRouter();

  return (
    <div className='w-screen h-full justify-center'>
        <div className='mb-2 h-80'>
            <h1 className='text-3xl font-bold pt-4 ml-20'>For you</h1>
            <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={6}
            visibleSlides={3}
            step={1}
            orientation="horizontal"
            infinite={true} interval={4000} isPlaying={true}
            >
                <div className='overflow-x-hidden overflow-y-hidden h-72'>
                <Slider className="mt-4 ml-4 justify-start transition ease-out duration-5000" classNameAnimation='transition duration-5000 ease-in-out'>
                <div className="h-full flex lg:gap-12 md:gap-6 gap-12 justify-start transition ease-out duration-5000">
                    {books?.length > 0 ?
                    books?.map((book,id)=> {
                        return (
                            <Slide index={id} className='cursor-pointer' onClick={() => router.push(`/shop/${book.id}`)}>
                            <div className="grid grid-cols-2 bg-gradient-to-b from-indigo-500 from-10% to-light-blue-200 to-90% w-[400px] h-64 rounded-lg">
                                    <div>
                                        <img src={book?.image} alt="black chair and white table" className="w-32 h-56 mt-4 ml-4 rounded-lg grid-cols-1" />
                                    </div>
                                    <div className="justify-start mr-2">
                                        <h2 className="mt-6 text-xl lg:text-xl font-semibold leading-5 lg:leading-6 text-white">{book?.title}</h2>
                                        <h2 className="mt-1 text-lg lg:text-lg font-light italic leading-5 lg:leading-6 text-white">{book?.author}</h2>
                                        <div className="flex flex-row mt-1">
                                            <StarIcon className="h-6 w-6 text-white" />
                                            <StarIcon className="h-6 w-6 text-white" />
                                            <StarIcon className="h-6 w-6 text-white" />
                                            <StarIcon className="h-6 w-6 text-white" />
                                            <StarIcon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                </div> 
                            </Slide>
                        )
                    })
                    : <p>Loading...</p>
                    }
                    </div>
                </Slider>
                </div>  
            </CarouselProvider>
        </div>
        <div className="p-4 w-full ml-2">
            <div className=" space-y-5">
                <h1 className='text-3xl font-bold pt-4 ml-20'>Top Rated</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center items-center w-full mx-auto">
                {books2?.length > 0 ? (
                    books2?.map(
                    (book) =>
                        book.stock > 0 &&
                        book.isActive && <Card key={book.id} book={book} />
                    )
                ) : (
                    <p className="font-raleway text-lg font-bold text-center">
                    Loading...
                    </p>
                )}
                </div>
            </div>
        </div>
    </div>
  )
}
export default Home;