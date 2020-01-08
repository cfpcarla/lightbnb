SELECT reservations.*, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE
GROUP BY properties.id
ORDER BY start_date
LIMIT 10;