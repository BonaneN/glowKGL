# ✨ GlowKGL API

<div align="center">

![Python](https://img.shields.io/badge/Python-3.12%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.0%2B-092E20?style=for-the-badge&logo=django&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**The under development stage backend solution for hybrid beauty e-commerce and service booking platform.**

[API SWAGGER DOCUMENTATION
](https://bonane00.pythonanywhere.com/api/docs/) || [POSTMAN PUBLIC COLLECTION LINK](https://www.postman.com/rbonane336/beautyverse-public/collection/48914431-865262c4-80a1-41b7-856b-969700359350/?action=share&creator=0)

</div>

## Project Overview

**GlowKGL API** is a high-performance backend engine designed to bridge the gap between premium beauty products and professional artist services. It provides a unified platform where users can seamlessly transition from purchasing skincare and cosmetics to booking verified beauty professionals.

## Core Features

- **Dynamic User Evolution**: A unique "Action-based" role system. All users start as `clients`. Posting a product upgrades the account to a `seller`, while creating a professional profile upgrades it to an `artist`.
- **Enterprise Security**: Implementation of JWT (JSON Web Tokens) for safe, stateless authentication and strict object-level permissions.
- **Smart Appointment Engine**: Professionals can manage their daily availability, and clients can book non-conflicting sessions in real-time.
- **Hybrid Marketplace**: Supports physical products with category management, automated discount logic, and location-based shop discovery.
- **Persistent Shopping Cart**: A modern cart implementation allowing users to aggregate professional products from various sellers.
- **Advanced Filtering**: Deep search capabilities for both the product marketplace and the artist directory based on category, price, and location.

---

## 📍 Primary API Endpoints

| Category     | Endpoint                              | Method | Description                                          |
| :----------- | :------------------------------------ | :----- | :--------------------------------------------------- |
| **Auth**     | `/glowKGL/users/token/`               | `POST` | Login & receive JWT access/refresh tokens.           |
| **Auth**     | `/glowKGL/users/create-account/`      | `POST` | Register a new user account (Client by default).     |
| **Artists**  | `/glowKGL/artists/list-artists/`      | `GET`  | **Public**. Browse all professional artist profiles. |
| **Artists**  | `/glowKGL/artists/register-artist/`   | `POST` | Create an artist profile (Upgrades tag to `artist`). |
| **Products** | `/glowKGL/products/list-products/`    | `GET`  | **Public**. Browse the beauty product marketplace.   |
| **Products** | `/glowKGL/products/add-new-product/`  | `POST` | Post a new product (Upgrades tag to `seller`).       |
| **Booking**  | `/glowKGL/appointments/book-session/` | `POST` | Book a specific time slot with an artist.            |
| **Cart**     | `/glowKGL/cart/view-my-cart/`         | `GET`  | View items in your personal shopping cart.           |

---

## Tech Stack

- **Framework**: Django & Django REST Framework
- **Database**: MySQL (PythonAnywhere)
- **Auth**: SimpleJWT
- **Dependencies**: [requirements.txt](requirements.txt)

---

## Installation guide

### 1. Repository Setup

```bash
git clone https://github.com/BonaneN/glowKGLAPI.git
cd glowKGLAPI
```

### 2. Environment Configuration

Create a virtual environment and install the required packages:

```bash
python -m venv venv
# On Windows: venv\Scripts\activate | On MacOS/Linux: source venv/bin/activate
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file in the root directory (using this as a template):

```env
SECRET_KEY=[your_secret_key]
DEBUG=True
DB_NAME=[your_database_username]$[your_database_name]
DB_USER=[your_database_username]
DB_PASSWORD=[your_database_password]
DB_HOST=[your_database_username].mysql.pythonanywhere-services.com
DB_PORT=3306
ALLOWED_HOSTS=[your_database_name].pythonanywhere.com
```

```bash
#To generate a secret key in the virtual environment
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 4. Database Initialization

```bash
python manage.py migrate
python manage.py createsuperuser
```

#### 4.1. Local Development

```bash
python manage.py runserver
```

---

## 👨‍💻 Built By

**Bonane NIYIGENA**
