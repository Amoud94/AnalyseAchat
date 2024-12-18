
## Tech Stack

- **Frontend**: Vue.js 3, Vue Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: Docker, Redis (for caching)

---

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Docker (optional for containerized setup)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amoud94/AnalyseAchat.git
   cd AnalyseAchat
   ```

2. **Install dependencies**:

   For the backend:
   ```bash
   cd backend
   npm install
   ```

   For the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**:

   - Create `.env` files for both `backend` and `frontend` (examples provided as `.env.example`).
   - Fill in the required values (e.g., MongoDB URI, API keys).

4. **Run the application**:

   - Start the backend:
     ```bash
     cd backend
     npm run dev
     ```

   - Start the frontend:
     ```bash
     cd ../frontend
     npm run serve
     ```

   The application should now be available at `http://localhost:8080`.

5. **(Optional) Run with Docker**:
   ```bash
   docker-compose up
   ```

---

## Usage

1. **Login**: Register or log in to access the analytics dashboard.
2. **Analyze Data**: Use the analytics features to view sales, trending products, and category breakdowns.
3. **View Products**: Access detailed product information and sales performance.

---

## API Endpoints

### Analytics
- `GET /analytics/total_sales`: Returns the total sales amount for the selected period.
- `GET /analytics/trending_products`: Returns a list of the top 3 best-selling products, including name, quantity sold, and total sales.
- `GET /analytics/category_sales`: Returns sales distribution by category, including count and percentage of sales.

### Products
- `GET /products`: Returns an array of products with their total sales and quantities sold.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For inquiries or support, reach out to [Amoud94](mailto:your-email@example.com).
