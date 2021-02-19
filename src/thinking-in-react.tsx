import {ReactNode} from "react";




const SearchBar = () => {
    return <form>
        <input type="text" defaultValue='Search...'/>
        <input type="checkbox" value='Only show products in stock'/>
    </form>
}

interface product {
    name: string
    price: string
    stocked: boolean
}

const ProductRow = (props: product) => {
    let name;
    if (props.stocked) {
        name = <p>{props.name}</p>
    } else {
        name = <p color='red'>{props.name}</p>
    }
    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                {props.price}
            </td>
        </tr>
    )
}

export interface IProductCategory {
    category: string
    products: product[]
}


const ProductCategory = (props: IProductCategory) => {
    let trs = Array<ReactNode>()
    props.products.forEach((val, _idx, _array) => {
        trs.push(
            <ProductRow name={val.name} price={val.price} stocked={val.stocked}/>
        )
    })

    return (
        <table>
            <tr><b>{props.category}</b></tr>
            {trs}
        </table>
    )
}

interface IAllProductCategory {
    categories: IProductCategory[]
}


const ProductTable = (props: IAllProductCategory) => {
    let categories = Array<ReactNode>()
    props.categories.forEach(function (val, _idx, _array) {
        categories.push(
            <ProductCategory category={val.category} products={val.products}/>
        )
    })
    return (
        <div>
            <b>Name Price</b>
            {categories}
        </div>
    )
}


export const FilterableProductTable = (data:IAllProductCategory) => {
    return <div>
        <SearchBar/>
        <ProductTable categories={data.categories}/>
    </div>
}
