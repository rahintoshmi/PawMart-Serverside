# 🐾 **PawMart – Pet Adoption & Supply Portal**

### *Find Your Furry Friend Today!*

Live Site: ***Add your live link here***  <br>
Server Repo: ***Add your server repo link*** <br>
Client Repo: ***Add your client repo link***

---

## 🌟 **About the Project**

**PawMart** is a community-driven platform that connects **pet owners, adopters and pet product sellers** in one place. Pets can be listed for adoption while buyers can browse supplies like food, accessories, and care products.

With a clean UI, powerful search & filter features, protected user dashboard and fully responsive design — PawMart delivers a modern and smooth user experience.

---

## 🚀 **Features**

### 🔐 **Authentication**

* Firebase authentication (Email/Password + Google Sign-in)
* Custom password validation rules
* Protected routes for:

  * Add Listing
  * My Listings
  * My Orders
* Logged-in users stay authenticated even on page reload

---

### 🏠 **Home Page**

* Stunning hero banner with taglines
* 4 main category cards:

  * 🐶 Pets (Adoption)
  * 🍖 Pet Food
  * 🎒 Accessories
  * 🧴 Pet Care Products
* Recent 6 listings from MongoDB
* 2 meaningful extra sections:

  * “Why Adopt from PawMart?”
  * “Meet Our Pet Heroes”

---

### 🐕 **Pets & Supplies Page**

* View all listings in a clean 3-column layout
* Search products by name
* Filter by category
* Detailed listing cards with See Details button

---

### 📄 **Listing Details (Private Route)**

Shows complete pet/product info:

* Full details (Name, Category, Price, Description, Owner Email, etc.)
* **Adopt / Order Now** button
* Order Modal Form:

  * Auto-filled fields (buyer name, email, product info)
  * Quantity auto-set to 1 for pets
  * Saves data to MongoDB
  * Success toast after order

---

### ➕ **Add Listing Page (Private Route)**

Pet owners can add new items with fields:

* Name
* Category dropdown
* Price (auto 0 for pets)
* Location
* Description
* Image URL
* Date
* Owner Email (readonly)

---

### 📋 **My Listings (Private)**

* All listings created by logged-in user
* Displayed in table format
* Update (edit modal/route)
* Delete (with confirmation)
* Fully dynamic filtering by user email

---

### 🛍️ **My Orders (Private)**

* All orders made by logged-in user
* Table format with full details
* **Download Report (PDF)** button
  → Generates PDF using jsPDF + AutoTable

---

## 🎁 **Extra Features**

* 🔄 Live dynamic page titles
* 🌗 Dark / Light mode toggle
* ⚠️ 404 Custom Page (without Navbar & Footer)
* 🔄 Loading Spinner for API
* 🌐 Fully responsive layout
* ⚡ Toast notifications for all CRUD operations
* ⚙️ Framer Motion animations
* 🔍 Search functionality
* PDF Report Generator

---

## 🛠️ **Tech Stack**

### **Frontend**

* React.js (SPA)
* React Router DOM
* Firebase Authentication
* TailwindCSS + DaisyUI
* React Hot Toast
* Framer Motion
* jsPDF + AutoTable

### **Backend**

* Node.js
* Express.js
* MongoDB
* Vercel deployment

---

## 📁 **Folder Structure**

```
client/
 ├── src/
 │    ├── pages/
 │    ├── components/
 │    ├── routes/
 │    ├── provider/
 │    ├── assets/
 │    
 │   
server/
 ├── index.js
 ├── routes/
 └── config/
```

---


## ❤️ **Acknowledgements**

Thanks to all teachers, mentors, and the guidance that made this project possible.

---

