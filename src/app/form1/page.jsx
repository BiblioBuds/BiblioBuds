import NewBookInputs from "@/components/NewBookInputs/NewBookInputs";

const fetchGenres =  ()=> {
    return fetch("http://localhost:3000/api/genres")
        .then(res => res.json())
        .then(res => res.map(e => e.genre))
}

const fetchLanguages =  ()=> {
    return fetch("http://localhost:3000/api/languages")
        .then(res => res.json())
        .then(res => res.map(e => e.language))
}

const fetchFormats =  ()=> {
    return fetch("http://localhost:3000/api/formats")
        .then(res => res.json())
        .then(res => res.map(e => e.format))
}

const Form = async () => {
    const bookGenres = await fetchGenres()
    const languages = await fetchLanguages()
    const formats = await fetchFormats()
    
    return (
        <div className="h-full w-screen grid grid-cols-1 mb-14 mx-12">
            <div className="mt-14 w-[97%] bg-neutral-100 place-self-center rounded-xl border-gray-400 border-[1px]">
                 <NewBookInputs bookGenres={bookGenres} languages={languages} formats={formats} />
            </div>
        </div>
    )
}
export default Form;

