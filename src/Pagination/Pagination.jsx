import { usePagination } from "./usePagination";

const Pagination = ({slides , paginate , currentSlideId }) => {

    const paginationRange = usePagination({
        slidesArray : slides ,
        currentSlideId : currentSlideId ,
        siblingCount : 2
    })

    console.log("paginationRange" , paginationRange);
    // const numbers = slides.map((slide , index)=>{
    //     return {
    //         id:slide.id ,
    //         number:++index
    //     }
    // })
    
    
    return ( <>
        <nav>
            <ul className="pagination">
                {
                    paginationRange.map((element)=>{
                        if(element === "DOTS"){
                            return (
                                <li className={`page-item`}><a className="page-link">&#8230;</a></li>
                            )
                        }
                        return (
                            <li key={element.id} className={`page-item`}>
                                <a onClick={() => paginate(element.id)} className={`page-link ${currentSlideId === element.id && "bg-primary text-white"}`}>{element.number}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    </> );
}
 
export default Pagination;