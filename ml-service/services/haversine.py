import math

def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great circle distance between two points on Earth in kilometers
    using the Haversine formula.
    """
    # Earth radius in kilometers
    R = 6371.0

    # Convert degrees to radians
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (math.sin(delta_phi / 2.0) ** 2 +
         math.cos(phi1) * math.cos(phi2) * (math.sin(delta_lambda / 2.0) ** 2))
    
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))

    distance = R * c
    return round(distance, 2)

def filter_workers_by_radius(customer_lat: float, customer_lon: float, workers: list, max_radius_km: float = 10.0) -> list:
    """
    Filter candidate workers within the specified radius (default: 10 km).
    Appends calculated distance in km to each worker.
    """
    nearby_workers = []
    for worker in workers:
        w_lat = worker.get("latitude")
        w_lon = worker.get("longitude")
        if w_lat is not None and w_lon is not None:
            dist = calculate_haversine_distance(customer_lat, customer_lon, w_lat, w_lon)
            if dist <= max_radius_km:
                worker_with_dist = dict(worker)
                worker_with_dist["distance_km"] = dist
                nearby_workers.append(worker_with_dist)
    
    # Sort by nearest distance first
    nearby_workers.sort(key=lambda x: x["distance_km"])
    return nearby_workers
