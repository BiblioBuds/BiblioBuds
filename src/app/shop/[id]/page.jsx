import { StarIcon } from '@heroicons/react/24/solid'

const fetchBookById = (id)=> {
    return fetch(`http://localhost:3000/api/books/${id}`)
        .then(res => res.json())
        // .then(res => res.map(e => e.genre))
}


const Detail = async ({params}) => {
    const {id} = params
    const book = await fetchBookById(id)
    console.log(book)

    return (
        <div className="h-screen w-screen flex">
            <div className="self-center w-[80%] h-[75%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-r-3xl">
                <div className="mx-4 mt-3 h-20 grid grid-cols-2 gap-1 justify-center">
                    <div className="justify-center flex flex-col">
                        <img 
                        style={{ display:"inline" }}
                        className="ml-12 mt-8 transition duration-500 max-h-[400px] max-w-[270px] rounded-md"
                        src={book.image}
                        alt="imagen"/>
                    </div>
                    <div className="justify-center flex flex-col mr-6">
                        <div className="flex flex-row">
                            <StarIcon className="h-6 w-6 text-white" />
                            <StarIcon className="h-6 w-6 text-white" />
                            <StarIcon className="h-6 w-6 text-white" />
                            <StarIcon className="h-6 w-6 text-white" />
                            <StarIcon className="h-6 w-6 text-white" />
                        </div>
                        <h1 className=" text-4xl mt-2 pt-0 mb-4 font-serif mx-6 ml-0 text-white drop-shadow-lg">
                            {book.title}
                        </h1>
                        <div className="grid grid-cols-2 gap-1">
                            <h1 className=" text-2xl pt-0 mb-4 font-serif mx-6 ml-0 text-white indent-3 drop-shadow-lg">
                                {book.author}
                            </h1>
                            <h1 className=" text-2xl pt-0 mb-4 font-serif mx-6 ml-0 text-white indent-3 drop-shadow-lg">
                                ${book.price}
                            </h1>
                        </div>
                        <h1 className=" text-lg pt-0 mb-4 font-serif mx-6 ml-0 text-white italic drop-shadow-lg">
                            {book.synopsis}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Detail;