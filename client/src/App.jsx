import { useState, useEffect } from 'react'

function App() {
    const [products, setProducts] = useState([{
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
    }, {
        name: 'Product 2',
        description: 'Description 2',
        price: 200,
    }, {
        name: 'Product 3',
        description: 'Description 3',
        price: 300,
    }]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';

        // Fetch health
        fetch(`${apiUrl}/api/health`)
            .then(res => res.json())
            .then(data => setStatus(data.status))
            .catch(err => console.error('Error fetching health check:', err));

        // Fetch products
        fetch(`${apiUrl}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    return (
        <div className="container">
            <header className="header">
                <h1 className="logo">ShopSmart</h1>
                <div className="status-badge">Backend: {status === 'ok' ? '🟢 Online' : '🔴 Offline'}</div>
            </header>

            <main className="main-content">
                <h2 className="section-title">Featured Products</h2>
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product._id} className="product-card">
                                <div className="product-image-placeholder">🛒</div>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-desc">{product.description || 'Awesome product'}</p>
                                <div className="product-footer">
                                    <span className="product-price">${product.price}</span>
                                    <button className="btn-buy">Buy Now</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="empty-state">No products available at the moment.</p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default App
