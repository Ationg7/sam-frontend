# D-Frontend - React Bootstrap Frontend for Laravel Backend

A modern React Bootstrap frontend application that connects to your Laravel backend to manage and display products.

## Features

- 🎨 **Modern UI**: Beautiful React Bootstrap interface with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🔄 **Real-time Updates**: Automatic data synchronization with Laravel backend
- ➕ **CRUD Operations**: Create, Read, Update, and Delete products
- 🖼️ **Image Support**: Display product images from URLs
- ⚡ **Fast Performance**: Built with Vite for optimal development experience

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Laravel backend running on `http://localhost:8000`

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:5173` to view the application

## Backend Connection

The frontend is configured to connect to your Laravel backend at `http://localhost:8000/api`. Make sure your Laravel backend is running with:

```bash
cd ../D-prelim
php artisan serve
```

### API Endpoints Used

- `GET /api/products` - Fetch all products
- `GET /api/products/{id}` - Fetch single product
- `POST /api/products` - Create new product
- `PATCH /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## Product Model Structure

The frontend expects products with the following structure:
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "stock": 10,
  "image": "https://example.com/image.jpg"
}
```

## Features Overview

### Product Display
- Grid layout with responsive cards
- Product images with hover effects
- Price and stock badges
- Edit and delete buttons for each product

### Add/Edit Products
- Modal forms for creating and editing products
- Form validation
- Real-time updates to the product list

### Error Handling
- Loading states with spinners
- Error messages for failed API calls
- User-friendly notifications

## Customization

### Changing API URL
If your Laravel backend runs on a different URL, update the `API_BASE_URL` in `src/components/Products.jsx`:

```javascript
const API_BASE_URL = 'http://your-backend-url:port/api';
```

### Styling
- Modify `src/App.css` for custom styling
- Bootstrap classes are available for quick styling
- Custom CSS variables can be added for theming

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your Laravel backend has CORS configured properly. Add this to your Laravel backend:

```php
// In config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

### Connection Issues
- Verify Laravel backend is running on `http://localhost:8000`
- Check browser console for error messages
- Ensure all API endpoints are working in Laravel

## Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Technologies Used

- **React 19** - UI library
- **React Bootstrap** - UI components
- **Bootstrap 5** - CSS framework
- **Axios** - HTTP client
- **Vite** - Build tool

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Products.jsx      # Main products component
│   ├── App.jsx              # Main app component
│   ├── App.css              # Custom styles
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── package.json             # Dependencies
└── README.md               # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
