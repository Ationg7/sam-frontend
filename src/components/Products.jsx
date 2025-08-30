import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Badge
} from 'react-bootstrap';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: ''
  });

  // API base URL - adjust this to match your Laravel backend URL
  const API_BASE_URL = 'http://localhost:8000/api';

  // Fetch products from Laravel backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch products from:', `${API_BASE_URL}/products`);
      
      const response = await axios.get(`${API_BASE_URL}/products`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 5000
      });
      
      console.log('Products fetched successfully:', response.data);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please check if your Laravel backend is running.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new product
  const createProduct = async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productData);
      setProducts([...products, response.data.product]);
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Failed to create product');
      console.error('Error creating product:', err);
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/products/${id}`, productData);
      setProducts(products.map(product => 
        product.id === id ? response.data.product : product
      ));
      setShowModal(false);
      setEditingProduct(null);
      resetForm();
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`);
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        setError('Failed to delete product');
        console.error('Error deleting product:', err);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: formData.image
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      createProduct(productData);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for editing
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image || ''
    });
    setShowModal(true);
  };

  // Open modal for creating new product
  const handleAdd = () => {
    setEditingProduct(null);
    resetForm();
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      image: ''
    });
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Spinner animation="border" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 fs-5">Loading products from Laravel backend...</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">Products</h2>
        <Button variant="primary" size="lg" onClick={handleAdd}>
          <i className="bi bi-plus"></i> Add New Product
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}//whyyyyyyyyyyy

      {products.length === 0 && !loading ? (
        <Alert variant="info" className="text-center">
          <h4>No products found</h4>
          <p>Add your first product to get started!</p>
          <Button variant="primary" onClick={handleAdd}>
            Add Your First Product
          </Button>
        </Alert>
      ) : ( //whyyyyyyyyyyy
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} xl={3} lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm product-card">
                {product.image && (
                  <CardImg
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                )}
                <CardBody className="d-flex flex-column">
                  <CardTitle className="h5 fw-bold">{product.name}</CardTitle>
                  <CardText className="flex-grow-1">
                    {product.description || 'No description available'}
                  </CardText>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Badge bg="success" className="fs-6 px-3 py-2"  >
                       ₱{product.price}
                      </Badge>
                      <Badge bg={product.stock > 0 ? "info" : "danger"} className="px-3 py-2">
                        Stock: {product.stock}
                      </Badge>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(product)}
                        className="flex-fill"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteProduct(product.id)}
                        className="flex-fill"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                size="lg"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    size="lg"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} size="lg">
              Cancel
            </Button>
            <Button variant="primary" type="submit" size="lg">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
