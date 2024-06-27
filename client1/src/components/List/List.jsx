import './List.scss'
import Card from '../Card/Card'

function List ({posts}){
    return(
        <div className='List'>
            {posts.map(item => (
                <Card key={item.id} item={item}/>
            ))}
        </div>
    )
}
export default List