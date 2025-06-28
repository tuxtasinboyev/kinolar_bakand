Endpointlar va Rollar

Autentifikatsiya

POST /api/auth/register

Ruxsat: Barchaga (Public)

POST /api/auth/login

Ruxsat: Barchaga (Public)

Profil

GET /api/profile

Ruxsat: Faqat user, admin, superadmin

Maqsad: Foydalanuvchi faqat o'z profilini ko'radi

PUT /api/profile

Ruxsat: Faqat user, admin, superadmin

Maqsad: O'z profilini yangilash

Obunalar

GET /api/subscription/plans

Ruxsat: Barchaga (Public)

POST /api/subscription/purchase

Ruxsat: Faqat user

Kinolar (Movies)

GET /api/movies

Ruxsat: Barchaga (Public)

GET /api/movies/{slug}

Ruxsat: Barchaga (Public), ammo to'liq ko'rish faqat premium foydalanuvchilar uchun

Sevimlilar (Favorites)

GET /api/favorites

Ruxsat: Faqat user

POST /api/favorites

Ruxsat: Faqat user

DELETE /api/favorites/{movie_id}

Ruxsat: Faqat user

Sharhlar (Reviews)

POST /api/movies/{movie_id}/reviews

Ruxsat: Faqat user

DELETE /api/movies/{movie_id}/reviews/{review_id}

Ruxsat: user (o'z sharhini), admin (barcha sharhlar)

Admin paneli (faqat admin va superadmin)

GET /api/admin/movies

Ruxsat: admin, superadmin

POST /api/admin/movies

Ruxsat: admin, superadmin

PUT /api/admin/movies/{movie_id}

Ruxsat: admin, superadmin

DELETE /api/admin/movies/{movie_id}

Ruxsat: admin, superadmin

POST /api/admin/movies/{movie_id}/files

Ruxsat: admin, superadmin

Superadmin uchun qo'shimcha imkoniyatlar

Adminlar ro'yxatini ko'rish, qo'shish, tahrirlash, o'chirish

Tizim sozlamalarini o'zgartirish

Obuna rejalarini boshqarish (CRUD):

GET /api/admin/subscription/plans

POST /api/admin/subscription/plans

PUT /api/admin/subscription/plans/{id}

DELETE /api/admin/subscription/plans/{id}

Ruxsat: Faqat superadmin

