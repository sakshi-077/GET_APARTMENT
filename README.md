# WanderLust 🌍

A full-stack web application inspired by Airbnb, designed for discovering, renting, and listing unique accommodations around the world. Built using the **MVC (Model-View-Controller)** architecture pattern, this platform ensures secure user authentication, robust data validation, and seamless cloud deployments.

---

## 🚀 Features

*   **User Authentication & Authorization:** Secure signup and login functionalities using `passport` and `passport-local`.
*   **Listing Management:** Users can seamlessly create, read, update, and delete (CRUD) accommodation listings.
*   **Image Uploads:** Integrates with Cloudinary to handle dynamic image uploads and optimizations for property listings.
*   **Review System:** Users can leave ratings and text reviews for individual listings.
*   **Session Management:** Production-ready session tracking stored securely using MongoDB Session Stores.
---

## 🛠️ Tech Stack

*   **Frontend:** HTML5, CSS3, Bootstrap 5, EJS (Embedded JavaScript templates)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB Atlas (Production) / MongoDB Local (Development)
*   **Authentication:** Passport.js
*   **Storage:** Cloudinary API (for image hosting)
*   **Deployment:** Render

---

## 📦 Prerequisites

Before running this project locally, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   [MongoDB](https://www.mongodb.com/)

---

## 🔧 Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name

```

2. **Install dependencies:**
```bash
npm install

```


3. **Set up Environment Variables:**
Create a `.env` file in the root directory and add your credentials:
```env
NODE_ENV=development
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_code
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

```


4. **Start the server:**
```bash
# Using nodemon for development
nodemon app.js

# Or using standard node
node app.js

```


Open `http://localhost:8080` (or your configured port) in your browser.

---

## 🌐 Production Deployment

This project is optimized and configured for seamless deployment on platforms like **Render**:

* Uses **`connect-mongo` (v6+)** for robust production session tracking.
* Fully supports secure reverse-proxies via `app.set("trust proxy", 1)` configurations to enforce secure cookie rules over HTTPS transitions safely.

---

## 📜 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
