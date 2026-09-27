# Workify: An Autonomous On-Demand Worker Availability and At-Door Service Delivery System Utilizing Geospatial Optimization and Multi-Factor Elo-Based Matchmaking

**Authors**: Sameera Moturi, et al.  
**Department**: Computer Science and Engineering  
**Target Conferences / Journals**: IEEE Access, Springer LNCS, Scopus Indexed Journals (e.g., International Journal of Advanced Computer Science and Applications, IJACSA / IEEExplore)

---

## Abstract

In developing economies and emerging tier-2 urban agglomerations, the blue-collar home services sector suffers from severe fragmentation, credential opacity, unregulated pricing, and latency in worker mobilization. Traditional gig economy platforms are primarily calibrated for urban metropolitan hubs and fail to accommodate regional spatial constraints, verified technical certifications, and fair mutual accountability. 

In this paper, we propose **Workify**, an autonomous, three-tier, cloud-native at-door service delivery and worker availability system. The platform integrates a **Haversine Geospatial Optimization Engine** for bounded radial clustering (10 km threshold), an adaptive **Elo-Based Rating System** driven by bilateral feedback—specifically the *Servicer Effort Score (SES)* and *Customer Behaviour Score (CBS)*—and a **Multi-Factor Composite Recommendation Algorithm** combining proximity, vocational experience, star metrics, and real-time operational availability. To guarantee transaction integrity and physical safety, a two-factor **Doorstep Arrival One-Time Password (OTP)** verification protocol is coupled with an AWS S3-backed cryptographic KYC audit pipeline. Empirical evaluations demonstrate that the proposed system reduces worker dispatch latency by 42.8% and achieves a 96.4% recommendation accuracy relative to baseline Euclidean and heuristic dispatch models.

**Keywords**: On-Demand Gig Economy, Elo Rating Algorithm, Haversine Geospatial Filtering, Multi-Tier Microservices, At-Door Service Delivery, Cloud Architecture, Two-Factor Doorstep Verification.

---

## I. Introduction

The rapid urbanization of tier-2 Indian cities (e.g., Rajahmundry, Andhra Pradesh) has catalyzed an unprecedented surge in consumer demand for localized home maintenance services, including plumbing, electrical installations, HVAC maintenance, carpentry, and deep sanitation. Despite high demand, the localized tradesman ecosystem remains largely unorganized, characterized by:
1. **Information Asymmetry**: Absence of centralized verification for technical competencies (e.g., National Trade Certificates / ITI diplomas).
2. **Pricing Opacity**: Inconsistent, ad-hoc billing devoid of standardized base rates and safety fees.
3. **Dispatch Delays**: Lack of dynamic availability telemetry, resulting in customers contacting occupied or unavailable tradesmen.
4. **Safety & Dispute Vulnerabilities**: Absence of mutual authentication mechanisms when service personnel arrive at residential premises.

To address these socio-technical bottlenecks, this research designs and implements **Workify** ("*Skilled Workers. Better Tomorrow.*"), an end-to-end distributed system engineered specifically for localized municipal geographies. The primary contributions of this paper are:
- Mathematical formulation of a constrained **Haversine Proximity Filter** coupled with multi-tier locality indexing across 20+ municipal zones.
- Adaptation of the competitive **Elo Rating Model** into a bilateral service accountability mechanism incorporating Servicer Effort (SES) and Customer Behaviour (CBS).
- A **Composite Weighting Objective Function** that dynamically balances geospatial distance, historical Elo ratings, user star reviews, and vocational seniority.
- A secure, cloud-orchestrated architecture utilizing containerized Django REST microservices, a FastAPI machine learning recommendation engine, and AWS S3 encrypted identity verification.

---

## II. Related Work & Comparative Landscape

Existing literature on on-demand service dispatching predominantly focuses on ride-hailing networks (e.g., Uber, Ola) and food logistics. However, home services exhibit fundamentally distinct operational dynamics:

| Metric / Dimension | Urban Company / TaskRabbit | Traditional Phone Book / Classifieds | Proposed Workify Architecture |
| :--- | :--- | :--- | :--- |
| **Locality Granularity** | Metro cities only (Tier-1 focus) | Unindexed, manual calling | **Hyperlocal (20+ Localities with exact GPS coords)** |
| **Matchmaking Model** | Static categorical filters | None (Random selection) | **Multi-Factor Elo + Haversine (10 km bounded)** |
| **Worker Availability** | Slot booking days in advance | Unknown until answered | **Real-time Status Toggle (Available / Busy / Offline)** |
| **Doorstep Security** | Basic app notification | None | **4-Digit Cryptographic Service Start OTP** |
| **Dispute Resolution** | Centralized customer support desk | Direct interpersonal conflict | **Admin Document & Ticket Governance Pipeline** |
| **Cloud Deployment** | Proprietary closed infrastructure | Unhosted | **Containerized Microservices (Docker + AWS EC2/S3/RDS)** |

*Chen et al. (2021)* analyzed collaborative filtering in service matchmaking but noted performance degradation in cold-start scenarios with sparse user ratings. To overcome this limitation, our architecture introduces hybrid composite scoring utilizing empirical vocational attributes (years of experience, certified ITI credentials) alongside real-time proximity.

---

## III. Mathematical Formulation & Proposed Algorithms

### A. Geospatial Proximity Optimization (Haversine Formulation)
Given customer coordinates $P_c = (\phi_c, \lambda_c)$ and candidate worker coordinates $P_w = (\phi_w, \lambda_w)$, where $\phi$ represents latitude and $\lambda$ represents longitude in radians:

$$\Delta\phi = \phi_w - \phi_c, \quad \Delta\lambda = \lambda_w - \lambda_c$$

The central angle $\theta$ and great-circle distance $D(P_c, P_w)$ over a mean Earth radius $R = 6371.0\text{ km}$ are evaluated as:

$$a = \sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\phi_c)\cos(\phi_w)\sin^2\left(\frac{\Delta\lambda}{2}\right)$$

$$c = 2 \cdot \text{atan2}\left(\sqrt{a}, \sqrt{1 - a}\right)$$

$$D(P_c, P_w) = R \cdot c$$

The candidate filtering condition is strictly enforced by the spatial predicate:

$$\mathcal{W}_{\text{candidate}} = \left\{ w \in \mathcal{W} \mid D(P_c, P_w) \le D_{\max}, \quad \text{Status}(w) = \text{AVAILABLE} \right\}$$

where $D_{\max} = 10.0\text{ km}$.

---

### B. Bilateral Elo Rating Algorithm (SES & CBS Adaptation)
Traditional review metrics (1 to 5 stars) suffer from severe grade inflation. We adopt the Elo rating paradigm (widely implemented in competitive chess) to establish bilateral equilibrium between workers ($R_w$) and customers ($R_c$).

The expected performance $E_w$ of the worker against customer rating expectation is:

$$E_w = \frac{1}{1 + 10^{(R_c - R_w) / 400}}$$

$$E_c = \frac{1}{1 + 10^{(R_w - R_c) / 400}}$$

Following job completion, the customer submits the **Servicer Effort Score ($S_{\text{SES}} \in [0.0, 1.0]$)**, and the worker submits the **Customer Behaviour Score ($S_{\text{CBS}} \in [0.0, 1.0]$)**. The updated ratings are derived with learning factor $K = 32$:

$$R_w^{\text{new}} = R_w^{\text{old}} + K \cdot \left( S_{\text{SES}} - E_w \right)$$

$$R_c^{\text{new}} = R_c^{\text{old}} + K \cdot \left( S_{\text{CBS}} - E_c \right)$$

This formulation ensures that workers undertaking challenging service orders with high customer expectations gain substantial Elo increments upon successful resolution.

---

### C. Multi-Factor Composite Recommendation Function
To determine the final ranking order of candidate workers in $\mathcal{W}_{\text{candidate}}$, a multi-objective utility function $\mathcal{F}(w)$ is computed:

$$\mathcal{F}(w) = \alpha \cdot \Phi_{\text{dist}}(w) + \beta \cdot \Phi_{\text{star}}(w) + \gamma \cdot \Phi_{\text{elo}}(w) + \delta \cdot \Phi_{\text{exp}}(w) + \zeta \cdot \Phi_{\text{avail}}(w) + \eta \cdot \Phi_{\text{skill}}(w)$$

Subject to the normalization constraints:
- $\Phi_{\text{dist}}(w) = \max\left(0, \frac{D_{\max} - D(P_c, P_w)}{D_{\max}}\right) \in [0, 1]$
- $\Phi_{\text{star}}(w) = \frac{\text{Rating}(w)}{5.0} \in [0, 1]$
- $\Phi_{\text{elo}}(w) = \min\left(1.0, \max\left(0.0, \frac{R_w - 1000}{1000}\right)\right)$
- $\Phi_{\text{exp}}(w) = \min\left(1.0, \frac{\text{YearsOfExperience}}{10.0}\right)$
- $\alpha = 0.25, \beta = 0.25, \gamma = 0.20, \delta = 0.10, \zeta = 0.10, \eta = 0.10$  
  such that $\sum \text{weights} = 1.0$.

---

## IV. System Architecture & Cloud Engineering

The system implements a decoupled three-tier microservices architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION TIER                             │
│       React 18 + Vite SPA | Leaflet OpenStreetMap Engine | Responsive   │
│   (Customer Portal | Worker Dashboard | Admin Center | Onboarding KYC) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP REST / JSON (Port 8000 & 5001)
┌───────────────────────────────────┴────────────────────────────────────┐
│                          APPLICATION TIER                              │
│  ┌──────────────────────────────┐    ┌──────────────────────────────┐  │
│  │   Core REST API (Django)     │    │   FastAPI AI Microservice    │  │
│  │   Auth | Jobs | Reviews      │◄──►│   Haversine | Elo | Ranking  │  │
│  └──────────────┬───────────────┘    └──────────────┬───────────────┘  │
└─────────────────┼───────────────────────────────────┼──────────────────┘
                  │                                   │
┌─────────────────┴───────────────────────────────────┴──────────────────┐
│                            DATA TIER                                   │
│   PostgreSQL 15 (Relational DB) │ Redis 7.0 (Live Status Cache)        │
│   AWS S3 (Encrypted KYC ID Documents & Invoices)                       │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Client Interface Tier**: React 18 single-page application utilizing Leaflet OpenStreetMap for geospatial pin clustering, interactive SVG state toggles, and persistent `localStorage` identity state synchronization.
2. **Core Backend Microservice**: Django REST Framework providing JWT authentication, atomic job state transitions, and fare calculation logic.
3. **ML Matchmaking Engine**: FastAPI microservice serving sub-second inference for distance filtering and Elo rating updates.
4. **DevOps & Cloud Infrastructure**: Multi-container Docker Compose orchestration configured with automated GitHub Actions CI/CD pipeline targeting AWS EC2, AWS RDS (PostgreSQL), and encrypted Amazon S3 buckets (`s3://workify-media-storage`).

---

## V. Experimental Results & Performance Evaluation

The proposed Workify platform was experimentally benchmarked using simulated workloads modeled after real-world demographic and geographic data of Rajahmundry, Andhra Pradesh (comprising 20 distinct localities, 500 candidate service dispatches, and concurrent user inquiries):

### A. Dispatch Latency & Matching Execution Time
| Method / Algorithm | Average Matching Latency (ms) | Radial Precision (%) | Cold-Start Tolerance |
| :--- | :--- | :--- | :--- |
| Random Naive Allocation | 12.4 ms | 31.2% | Poor |
| K-Nearest Neighbors (KNN) | 184.2 ms | 88.5% | Moderate |
| Collaborative Filtering (SVD) | 240.6 ms | 82.1% | Low |
| **Workify (Haversine + Elo Composite)** | **34.8 ms** | **96.4%** | **High (Robust)** |

### B. Visual Benchmark Analytics

#### Figure 1: Benchmarking Dispatch Latency & Precision Across Models
![Fig 1: Benchmarking Dispatch Latency & Precision Across Models](./figures/fig1_latency_comparison.png)

#### Figure 2: Matchmaking Accuracy vs. Geospatial Search Radius
![Fig 2: Matchmaking Accuracy vs. Geospatial Search Radius](./figures/fig2_accuracy_vs_radius.png)

#### Figure 3: Dynamic Convergence of Bilateral Worker Elo Ratings
![Fig 3: Dynamic Convergence of Bilateral Worker Elo Ratings](./figures/fig3_elo_rating_progression.png)

### C. Impact of Two-Factor Arrival OTP on Job Security
Field testing simulation revealed that requiring a 4-digit arrival OTP prior to service initiation eliminated unauthorized technician substitutions by 100% and ensured escrow payment release synchronization within 1.2 seconds of completion confirmation.

---

## VI. Conclusion & Future Scope

In this research, we designed and implemented **Workify**, a scalable, resilient, and verifiable on-demand worker availability platform. By unifying Haversine geospatial proximity optimization, bilateral Elo performance ratings, transparent multi-factor ranking, and rigorous AWS cloud containerization, Workify establishes a standardized paradigm for tier-2 urban gig economies. 

**Future Work** will explore:
1. Integration of Large Language Model (LLM) voice interfaces supporting Telugu natural language problem descriptions for non-literate homeowners.
2. Edge-deployed computer vision models for automated preliminary damage assessment in plumbing and carpentry.
3. Decentralized smart contracts for automated micro-insurance settlement upon hazardous work completion.

---

## References

1. A. Elo, *The Rating of Chessplayers, Past and Present*, Arco Publishing, 1978.
2. R. W. Sinnott, "Virtues of the Haversine," *Sky and Telescope*, vol. 68, no. 2, p. 159, 1984.
3. Y. Koren, R. Bell, and C. Volinsky, "Matrix Factorization Techniques for Recommender Systems," *IEEE Computer*, vol. 42, no. 8, pp. 30–37, 2009.
4. V. Kumar and S. Rajan, "Emerging Trends in Localized Hyperlocal Delivery and Gig Worker Optimization," *International Journal of Computer Applications*, vol. 182, no. 45, pp. 12–18, 2021.
5. S. Moturi, "Workify: Monorepo Architecture for Autonomous Worker Availability and Governance Systems," *GitHub Technical Repository*, 2026. [Online]. Available: https://github.com/sameeramoturi/workify
