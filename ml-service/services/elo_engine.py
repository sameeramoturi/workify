import math

K_FACTOR_DEFAULT = 32

def calculate_expected_score(rating_a: float, rating_b: float) -> float:
    """
    Calculate expected outcome for participant A against participant B.
    E_A = 1 / (1 + 10 ^ ((R_B - R_A) / 400))
    """
    return 1.0 / (1.0 + math.pow(10, (rating_b - rating_a) / 400.0))

def update_elo_ratings(worker_elo: float, customer_elo: float, ses_score: float, cbs_score: float, k_factor: int = K_FACTOR_DEFAULT) -> dict:
    """
    Update Elo ratings after a completed service order.
    - ses_score: Servicer Effort Score given by Customer (normalized between 0.0 and 1.0)
    - cbs_score: Customer Behaviour Score given by Servicer (normalized between 0.0 and 1.0)
    """
    expected_worker = calculate_expected_score(worker_elo, customer_elo)
    expected_customer = calculate_expected_score(customer_elo, worker_elo)

    # Actual scores (normalized 0.0 to 1.0)
    actual_worker = min(max(ses_score, 0.0), 1.0)
    actual_customer = min(max(cbs_score, 0.0), 1.0)

    # Elo update formula: R_new = R_old + K * (Actual - Expected)
    new_worker_elo = round(worker_elo + k_factor * (actual_worker - expected_worker), 2)
    new_customer_elo = round(customer_elo + k_factor * (actual_customer - expected_customer), 2)

    return {
        "previous_worker_elo": worker_elo,
        "new_worker_elo": new_worker_elo,
        "worker_delta": round(new_worker_elo - worker_elo, 2),
        "previous_customer_elo": customer_elo,
        "new_customer_elo": new_customer_elo,
        "customer_delta": round(new_customer_elo - customer_elo, 2),
    }
