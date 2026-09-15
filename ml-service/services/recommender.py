from .haversine import filter_workers_by_radius

def rank_workers(
    customer_lat: float,
    customer_lon: float,
    required_skill: str,
    workers: list,
    max_radius_km: float = 10.0,
    preferred_budget: float = None
) -> list:
    """
    Ranks workers using multi-factor recommendation score:
    1. Distance score (closer workers get higher weight)
    2. Elo / Rating score
    3. Experience score
    4. Availability boost
    5. Skill match boost
    """
    # 1. Filter by radius (<= 10km)
    nearby_workers = filter_workers_by_radius(customer_lat, customer_lon, workers, max_radius_km)
    
    ranked_results = []
    for w in nearby_workers:
        # Distance penalty/reward (closer is better, max distance is 10 km)
        distance_km = w.get("distance_km", 10.0)
        distance_factor = max(0.0, (10.0 - distance_km) / 10.0)  # 0 to 1

        # Rating score (0 to 5 normalized to 0 to 1)
        rating = float(w.get("rating", 3.0))
        rating_factor = rating / 5.0

        # Elo rating score (normalized around 1200 - 2000)
        elo = float(w.get("elo_rating", 1500))
        elo_factor = min(max((elo - 1000) / 1000.0, 0.0), 1.0)

        # Experience factor (capped at 10 years)
        exp_years = float(w.get("experience_years", 1))
        exp_factor = min(exp_years / 10.0, 1.0)

        # Availability boost
        is_available = 1.0 if w.get("availability_status") == "AVAILABLE" else 0.2

        # Skill match
        skills = [s.lower() for s in w.get("skills", [])]
        skill_match = 1.0 if any(required_skill.lower() in s for s in skills) else 0.5

        # Final composite score (Weighted sum)
        final_score = (
            (distance_factor * 0.25) +
            (rating_factor * 0.25) +
            (elo_factor * 0.20) +
            (exp_factor * 0.10) +
            (is_available * 0.10) +
            (skill_match * 0.10)
        )

        ranked_worker = dict(w)
        ranked_worker["match_score"] = round(final_score * 100, 1) # Percentage 0-100%
        ranked_results.append(ranked_worker)

    # Sort descending by match_score
    ranked_results.sort(key=lambda x: x["match_score"], reverse=True)
    return ranked_results
