import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GrCatalog } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import axios from 'axios'

export default function Store() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRes = await axios.get('https://macalistervadim.site/api/categories');
                const productRes = await axios.get('https://macalistervadim.site/api/products');
                setCategories(categoryRes.data);
                setProducts(productRes.data);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredProducts = products.filter(product => {
        return (
            (!selectedCategory || product.category === selectedCategory) &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    if (loading) {
        return <div className='loading'><div className='loader'></div></div>
    }

    if (error) {
        return <div className='error-message'><p>{error}</p></div>
    }

    return (
        <div>
            <div className='store'>
                <div className="store-header">
                    <div>
                        <h1>Catalog</h1>
                        <GrCatalog className='store-header__icon' />
                    </div>
                    <div></div>
                </div>
                <div className="store-blok">
                    <div className="store-blok__section-1">
                        <div className="store-blok__section-1-header">
                            <input
                                type="search"
                                placeholder='Search...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <CiSearch className='store-blok__section-1__icon' />
                        </div>
                        <div className="store-blok__section-1-footer">
                            <button
                                className={!selectedCategory ? "active" : ""}
                                onClick={() => setSelectedCategory(null)}
                            >
                                Alls
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={selectedCategory === category.id ? "active" : ""}
                                    onClick={(e) => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                        <div className="store-blok__section-1-part"></div>
                    </div>
                    <div className="store-blok__section-2">
                        <div className="product-list">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <div className="product-item" key={product.id}>
                                        <Link to={`/store/product/${product.id}`}>
                                            <img src={product.image || "/images/product-placeholder.jpg"} alt={product.name} />
                                        </Link>
                                        <h3>{product.name}</h3>
                                        <p>Price: {new Intl.NumberFormat('ru-RU').format(product.price)} UZS</p>
                                        <Link to={`/store/product/${product.id}`} className="view-details">Detail</Link>
                                    </div>
                                ))
                            ) : (
                                <div className='store__no-data'><p>There are no matching products</p></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};